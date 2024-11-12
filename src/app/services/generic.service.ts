import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, ComponentRef, Renderer2, RendererFactory2, HostListener } from '@angular/core';
import { GamePopupService } from './game-popup.service';
import { LoginModalComponent } from '../shared/login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private renderer: Renderer2;
  constructor(private gamePopupService: GamePopupService,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    rendererFactory: RendererFactory2,
    private dialog: MatDialog
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }


  openLoginModal() {
    this.dialog.open(LoginModalComponent, {
      width: '500px',
      maxWidth: '94vw',
      panelClass: 'login-dialog',
    });
  }

  openGameModal(data: any) {
    this.gamePopupService.openGameModal(data)
  }

  closeGameModal() {
    this.gamePopupService.closeGameModal()
  }

  openProviderModal(data: any) {
    this.gamePopupService.openProviderModal(data)
  }

  closeProviderModal() {
    this.gamePopupService.closeProviderModal()
  }


  private popupComponentRef: ComponentRef<any> | null = null;
  openPopup(
    component,
    data?: any,
    popupClass: string = 'medium-popup',
    callback?: (value: any) => void) {
    if (this.popupComponentRef) {
      this.closePopup();
    }
    const popupFactory = this.resolver.resolveComponentFactory(component);
    this.popupComponentRef = popupFactory.create(this.injector);
    this.popupComponentRef.instance.popupClass = popupClass;
    (data && data.marketId) ? this.popupComponentRef.instance.marketId = data.marketId : {};
    (data && data.marketName) ? this.popupComponentRef.instance.marketName = data.marketName : {};
    // for bet slip
    // (data && data.r) ? this.popupComponentRef.instance.r = data.r : {};
    // this.popupComponentRef.instance.close.subscribe(() => {
    //   this.closePopup();
    // });
    if (callback) {
      this.popupComponentRef.instance.onClose = callback; // or any other method
    }

    this.appRef.attachView(this.popupComponentRef.hostView);

    const domElem = (this.popupComponentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.showBackdrop()
  }

  closePopup() {
    if (this.popupComponentRef) {
      this.appRef.detachView(this.popupComponentRef.hostView);
      this.popupComponentRef.destroy();
      this.popupComponentRef = null;
      this.hideBackdrop()
    }
  }

  showBackdrop() {

    const backdrop = this.renderer.createElement('div');
    this.renderer.addClass(backdrop, 'modal-backdrop');
    this.renderer.addClass(backdrop, 'fade');
    this.renderer.addClass(backdrop, 'show');
    const modal = document.getElementById('staticBackdrop') as HTMLElement;
    if (modal) {
      modal.style.display = 'block';
      modal.style.opacity = '1';
      modal.style.transition = 'opacity .15s linear';

    }
    const modalDialog = document.querySelector('.modal-dialog') as HTMLElement;
    if (modalDialog) {
      setTimeout(() => {
        modalDialog.style.transform = 'none';
      }, 0)
      //

    }

    let body = document.querySelector('body') as HTMLElement;
    if (body) {
      body.style.overflow = 'hidden';
      // body.style.paddingRight = '17px';
    }
    this.renderer.appendChild(document.body, backdrop);
  }

  hideBackdrop() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      this.renderer.removeChild(document.body, backdrop);
    }
    let body = document.querySelector('body') as HTMLElement;
    if (body) {
      body.style.overflow = 'auto';
      // body.style.paddingRight = '0px';
    }
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modal_backdrop = document.querySelector('.modal-backdrop') as HTMLElement;
    console.log("modal_backdrop", modal_backdrop)
    // if (!this.appRef.contains(event.target)) {
    //   this.closePopup();
    // }
  }

  setRouteBeforeLogin(
    provider,
    gameId,
    tableId,
    isCheckUrl,
    routerLink,
    menuItem = false,
    rummy = false
  ) {
    let routeObj = {
      provider,
      gameId,
      isCheckUrl,
      tableId,
      routerLink,
      menuItem: menuItem,
      rummy: rummy,
    };
    localStorage.setItem('routeCasino', JSON.stringify(routeObj));
  }

}
