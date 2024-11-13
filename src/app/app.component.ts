import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, ParamMap, Router, RouterOutlet } from '@angular/router';
import { PlatformService } from './services/platform.service';
import { BrowserService } from './services/browser.service';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { CheckAuthService } from './services/check-auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UtillsService } from './services/utills.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from './services/toast.service';
import { BackendService } from './services/backend.service';
import { RoutingStateService } from './services/router-state.service';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from './services/storage.service';
import { jwtDecode } from 'jwt-decode';
import { FooterComponent } from './standalone/footer/footer.component';
import { SidebarComponent } from './standalone/sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FooterComponent, SidebarComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: []
})
export class AppComponent implements OnInit{

  isServer: boolean = false;
  isBrowser: boolean = false;

  title = this.browserService.getWindow() && this.browserService.getWindow().sitename;
  isLogin: boolean = false
  deviceInfo: any
  showBalanceLiabilityNavbar: boolean = false
  refferrer: any
  toogleSide: boolean = true
  // isShowDownlaodPopup: boolean = false;
  showSideBarToggle: boolean = false
  beforeLoginWhatsappText: string = ''
  showWhatsAppIconWithText: boolean = false;
  cdnUrl: string = '';
  isMobile: boolean = false
  // isOffline: boolean = !navigator.onLine
  landingPage: boolean = true;
  hideSideBarOn: string[] = ['casino', 'reports', 'user', 'deposit'];
  isSidebarOpen: boolean = true

  forWhatsapp() {
    if (!this.isLogin) {
      this.utillsService.whatsappForCutomerSupprtOrId('WAB4');
    } else {
      this.utillsService.whatsappForCutomerSupprtOrId('CA');
    }
  }

  constructor(
    private deviceService: DeviceDetectorService,
    private browserService: BrowserService,
    private checkauthservice: CheckAuthService,
    private routingState: RoutingStateService,
    private utillsService: UtillsService,
    private cookieService: CookieService,
    private router: Router,
    private renderer: Renderer2,
    public toastService: ToastService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService,
    private storageService: StorageService,
    private backendService: BackendService,
    private metaService: Meta,
    private platformService: PlatformService
  ) {
    // this.requestPermission();
    if (this.platformService.isBrowser()) {
      this.deviceInfo = this.deviceService.getDeviceInfo();
    }

    if (this.browserService.getWindow() && this.browserService.getWindow().isShowDownlaodPopup) {
      this.showDownloadAppModal();
    }
    if (this.browserService.getWindow() && this.browserService.getWindow().isIframe) {
      this.isIframe = this.browserService.getWindow() && this.browserService.getWindow().isIframe
    }
    if (this.browserService.getWindow() && this.browserService.getWindow().cdnUrl) {
      this.cdnUrl = this.browserService.getWindow() && this.browserService.getWindow().cdnUrl;
    }
    if (this.browserService.getWindow() && this.browserService.getWindow().showWhatsAppIconInBottom) {
      this.showWhatsAppIconWithText = this.browserService.getWindow() && this.browserService.getWindow().showWhatsAppIconInBottom;
    }

  }
  // Listen for 'online' event
  @HostListener('window:online', ['$event'])
  handleOnlineEvent(event: Event) {
    this.updateOnlineStatus(event);
  }

  // Listen for 'offline' event
  @HostListener('window:offline', ['$event'])
  handleOfflineEvent(event: Event) {
    this.updateOnlineStatus(event);
  }

  // This method will be triggered by the above event listeners
  updateOnlineStatus(event: Event) {
    // this.isOffline = !navigator.onLine;
    // console.log(`Online status changed: ${this.isOffline ? 'Offline' : 'Online'}`);
  }
  isIframe: boolean = false;
  currentToken: any = null;
  iframe() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      let paramsToken: any = params.get('token');
      if (paramsToken) {
        this.storageService.setItem("token", paramsToken)
        let decodedToken: any = jwtDecode(paramsToken);
        this.storageService.setItem('client', decodedToken.unique_name)
      }
      if (this.authService.isLoggedIn()) {
        if ((this.currentToken != paramsToken) && (paramsToken != null)) {
          window.location.reload();
        }
      }
    });

  }

  ngOnInit(): void {
    // this.setFavicon()
    // this.setIndexHeadMetaData();
    // this.isLogin = this.checkauthservice.IsLogin();
    if (this.platformService.isBrowser()) {
      this.utillsService.getBanners();
    }
    // this.utillsService.getIPAddress();
    // if (this.isLogin) {
    //   this.utillsService.getConfig();
    //   this.utillsService.getStackButtons();
    //   this.utillsService.getDepositDetails()
    //   this.checkauthservice.ClientParmeters()

    // }
    if (this.platformService.isBrowser()) {
      this.utillsService.bannerData.subscribe(((res: any) => {
        if (res) {
          let chatData = this.utillsService.returnFormatedData(res, 'Chat')
          if (chatData && chatData.length > 0) {
            this.addChatBot(chatData[0].link)
          }
        }
      }))
    }

    // this.currentToken = this.storageService.getItem("token");
    // if (this.isIframe) {
    //   this.iframe();
    // }
    // this.isMobile = this.browserService.getWindow() && this.browserService.getWindow().innerWidth <= 992;
    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationEnd) {
    //     this.showBalanceLiabilityNavbar = event.urlAfterRedirects !== '/'
    //     let url = event.urlAfterRedirects.split('/')[1]
    //     this.isSidebarOpen = !this.hideSideBarOn.includes(url)
    //   }
    //   if (event instanceof NavigationStart) {
    //     if (event.url == '/' || event.url == '/home') {
    //       this.landingPage = true
    //     } else {
    //       this.landingPage = false
    //     }
    //   }
    // })
    // this.routingState.loadRouting();

    // if (this.browserService.getNavigator() && this.browserService.getNavigator().webdriver) {
    //   document.write("Web Driver isn't supported.");
    // }

    // this.renderer.listen('document', 'DOMContentLoaded', () => {
    //   this.addGoogleTag();
    // });
  }


  addChatBot(link: string) {
    let chatScript = document.createElement('script');
    chatScript.type = 'text/javascript';
    chatScript.innerHTML = `${link}`;
    document.body.appendChild(chatScript);
  }

  addGoogleTag() {
    const dynamicId = this.browserService.getWindow() && this.browserService.getWindow().gtmCode; // Ensure this value is set globally

    const iframe = this.renderer.createElement('iframe');
    // Set attributes for the iframe
    this.renderer.setAttribute(iframe, 'src', `https://www.googletagmanager.com/ns.html?id=${dynamicId}`);
    this.renderer.setAttribute(iframe, 'height', '0');
    this.renderer.setAttribute(iframe, 'width', '0');
    this.renderer.setStyle(iframe, 'display', 'none');
    this.renderer.setStyle(iframe, 'visibility', 'hidden');

    // Append the iframe to the document body
    this.renderer.appendChild(document.body, iframe);
  }
  setFavicon() {
    const link: HTMLLinkElement = this.renderer.createElement('link');

    // Use setAttribute for properties like 'sizes', 'rel', 'type', and 'href'
    this.renderer.setAttribute(link, 'rel', 'icon');
    this.renderer.setAttribute(link, 'type', 'image/x-icon');
    this.renderer.setAttribute(link, 'sizes', '32x32');

    const imgSrc = this.browserService.getWindow() && this.browserService.getWindow().faviconSrc; // Assuming window.faviconSrc is set
    this.renderer.setAttribute(link, 'href', imgSrc);

    // this.renderer.appendChild(document.head, link);
  }

  setIndexHeadMetaData() {
    const canonicalURL = this.router.url; // Dynamically get the current route URL
    let link: HTMLLinkElement = this.renderer.createElement('link');
    link.setAttribute('rel', 'canonical');
    // link.setAttribute('href', `${window.location.origin}${canonicalURL}`);
    // this.renderer.appendChild(document.head, link);
    // Assuming you have `window.keywordName` and `window.keywordContent` set dynamically
    const metaContentName = this.browserService.getWindow() && this.browserService.getWindow().keywordName;
    const metaContent = this.browserService.getWindow() && this.browserService.getWindow().keywordContent;
    // Add new meta tag dynamically
    this.metaService.addTag({
      name: metaContentName,
      content: metaContent
    });
    const metaContentName2 = this.browserService.getWindow() && this.browserService.getWindow().keywordName2;
    const metaContent2 = this.browserService.getWindow() && this.browserService.getWindow().keywordContent2;
    // Add new meta tag dynamically
    this.metaService.addTag({
      name: metaContentName2,
      content: metaContent2
    });
    const metaContentName3 = this.browserService.getWindow() && this.browserService.getWindow().keywordName3;
    const metaContent3 = this.browserService.getWindow() && this.browserService.getWindow().keywordContent3;
    // Add new meta tag dynamically
    this.metaService.addTag({
      name: metaContentName3,
      content: metaContent3
    });



    // <meta name=twitter:creator content="@Magicwin">
    // this.metaService.addTag({
    //   name: 'twitter:title',
    //   content: `${this.browserService.getWindow() && this.browserService.getWindow().sitename} : Best Online Sports Betting Site in India 2024`
    // });
    // this.metaService.addTag({
    //   name: 'twitter:description',
    //   content: `${this.browserService.getWindow() && this.browserService.getWindow().sitename} : India's top legal betting site. Enjoy fast withdrawals, top-notch betting, and 5000+ casino games. Get a 20% welcome bonus up to ₹10,000. Sign up now!`
    // });

    // this.metaService.addTag({
    //   name: 'twitter:site',
    //   content: this.browserService.getWindow() && this.browserService.getWindow().siteLogo
    // });
    // this.metaService.addTag({
    //   name: 'twitter:image',
    //   content: `@${this.browserService.getWindow() && this.browserService.getWindow().sitename}`
    // });
    // this.metaService.addTag({
    //   name: 'twitter:creator',
    //   content: `@${this.browserService.getWindow() && this.browserService.getWindow().sitename}`
    // });


    // this.metaService.addTag({
    //   property: 'og:title',
    //   content: `${this.browserService.getWindow() && this.browserService.getWindow().sitename} :Best Online Sports Betting Site in India 2024`
    // });

    // this.metaService.addTag({
    //   property: 'og:site_name',
    //   content: `${this.browserService.getWindow() && this.browserService.getWindow().sitename}`
    // });

    // this.metaService.addTag({
    //   property: 'og:description',
    //   content: `${this.browserService.getWindow() && this.browserService.getWindow().sitename} India's top legal betting site. Enjoy fast withdrawals, top-notch betting, and 5000+ casino games. Get a 20% welcome bonus up to ₹10,000. Sign up now!`
    // });

    // Assuming you have `window.property` and `window.propertyContent` defined dynamically

    // const metaProperty = this.browserService.getWindow() && this.browserService.getWindow().property;
    // const metaPropertyContent = this.browserService.getWindow() && this.browserService.getWindow().propertyContent;


    // Create the meta tag with property and content attributes
    const meta = this.renderer.createElement('meta');
    // this.renderer.setAttribute(meta, 'property', metaProperty);
    // this.renderer.setAttribute(meta, 'content', metaPropertyContent);

    // const metaProperty2 = this.browserService.getWindow() && this.browserService.getWindow().property2;
    // const metaPropertyContent2 = this.browserService.getWindow() && this.browserService.getWindow().propertyContent2;
    // // Create the meta tag with property and content attributes
    // this.renderer.setAttribute(meta, 'property', metaProperty2);
    // this.renderer.setAttribute(meta, 'content', metaPropertyContent2);

    // Append the meta tag to the document head
    // this.renderer.appendChild(document.head, meta);



  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isTabView();
  }
  defualtOpenInMob = true
  private isTabView(): void {
    this.isMobile = window.innerWidth <= 992;
    this.defualtOpenInMob = window.innerWidth <= 992;
  }

  toggle(event: boolean) {
    this.toogleSide = event
    this.defualtOpenInMob = false

    if (window.innerWidth <= 1200) {
      if (this.toogleSide) {
        this.renderer.addClass(document.body, 'no-scroll');
      } else {
        this.renderer.removeClass(document.body, 'no-scroll');
      }
    }
  }

  setDownloadAppPopupCookieWithExpiry(): void {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 60 * 60 * 1000); // 1 hour
    // expiryDate.setTime(expiryDate.getTime() + (60 * 5 * 1000)); // five mins for testing
    this.cookieService.set('downloadAppPopup', '...', expiryDate);
  }

  isDownloadAppPopupCookieExpired(): boolean {
    const cookieValue = this.cookieService.get('downloadAppPopup');
    if (cookieValue) {
      return new Date() > new Date(this.cookieService.get('downloadAppPopup'));
    }
    return true; // If cookie doesn't exist, consider it expired
  }

  isApk(): boolean {
    return /Android/.test(navigator.userAgent);
  }

  isIphone(): boolean {
    return /iPhone|iPad|iPod/.test(navigator.userAgent);
  }

  showDownloadAppModal() {
    if (this.isDownloadAppPopupCookieExpired() && !this.isApk() && !this.isIphone()) {
      setTimeout(() => {
        // this.dialog.open(DownloadAppModalComponent, {
        //   panelClass: 'downlaodApp-dialog',
        // })
        this.setDownloadAppPopupCookieWithExpiry();
      }, 1000);
    }
  }

}
