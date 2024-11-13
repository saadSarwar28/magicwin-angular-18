import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService, _window } from '../..//services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { UtillsService } from '../../services/utills.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  CompanyName: any;
  StreetName: any;
  CityName: any;
  CompanyNumber: any;
  waData: any;
  socialData: any = [];
  whatsAppPhoneNumber: any;
  cdnUrl: any = 'https://iriscdn.b-cdn.net/';
  cdnSportsLanding: any;
  contactDetails: any;
  showContactUsBanner: boolean = false;
  constructor(
    private checkauthservice: CheckAuthService,
    private utillsService: UtillsService,
    private activedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.isLogin = this.checkauthservice.IsLogin();

    if (_window().cdnImagesUrl) {
      this.cdnUrl = _window().cdnImagesUrl;
    }
    if (_window().showContactUsBanner) {
      this.showContactUsBanner = _window().showContactUsBanner;
    }
  }
  telegramLink = _window().telegramUrl;
  facebookLink = _window().facebookUrl;
  youtubeLink = _window().youtubeUrl;
  instagramLink = _window().instagramUrl;
  twitterLink = _window().twitterUrl;
  sitename = _window().sitename;
  email = _window().email;
  Phone1: any;
  Phone2: any;
  Phone3: any;
  phone1R: any;
  phone2R: any;
  phone3R: any;
  isLogin: boolean = false;
  contactInfo: any;
  whatsappText: any = 'Hello, I need an ID of kheloyar.net';
  currentRoute: any;
  forWhatsapp() {
    if (this.isLogin) {
      this.utillsService.whatsappForCutomerSupprtOrId('CA')
    } else {
      this.utillsService.whatsappForCutomerSupprtOrId('WAB4')
    }

  }

  phoneCall(number: any) {
    window.open(`tel:${number}`, '_parent');
  }
  ngOnInit(): void {

    this.activedRouter.params.subscribe((p) => {
      this.currentRoute = this.router.url.split('/')[2];
    })
    this.cdnSportsLanding = _window().bannercdnLanding;
    this.utillsService.bannerData.subscribe((resp: any) => {
      if (resp) {
        this.socialData = resp.find((item: any) => item.type === 'Social');
      }
    })
    if (_window().contactDetails) {
      this.contactDetails = _window().contactDetails;
    }
    if (_window().companyName) {
      this.CompanyName = _window().companyName;
    }
    if (_window().streetName) {
      this.StreetName = _window().streetName;
    }
    if (_window().cityName) {
      this.CityName = _window().cityName;
    }
    if (_window().companyNumber) {
      this.CompanyNumber = _window().companyNumber;
    }



  }

}
