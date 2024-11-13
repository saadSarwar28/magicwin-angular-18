// modal.service.ts
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import { GamePopupComponent } from '../game-popup/game-popup.component';
// import { ProviderModalComponent } from '../provider-modal/provider-modal.component';

@Injectable({
  providedIn: 'root',
})
export class GamePopupService {
  // modalRef!: ComponentRef<GamePopupComponent>;
  // providerModalRef!: ComponentRef<ProviderModalComponent>;

  popupClose = new BehaviorSubject(true);
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  openGameModal(data: any): void {
    // Create a new modal component
    // const factory = this.componentFactoryResolver.resolveComponentFactory(GamePopupComponent);
    // this.modalRef = factory.create(this.injector);

    // Set the title and content

    // this.modalRef.instance.data = data;

    // // Attach the component to the DOM
    // this.appRef.attachView(this.modalRef.hostView);

    // // Append the component's root DOM element to the body
    // document.body.appendChild(this.modalRef.location.nativeElement);
  }

  closeGameModal(): void {
    // if (this.modalRef) {
    //   // Remove the component from the DOM and destroy it
    //   this.appRef.detachView(this.modalRef.hostView);
    //   this.modalRef.destroy();
    //   this.popupClose.next(true)
    // }
  }


  openProviderModal(data: any): void {
    // Create a new modal component
    // const factory = this.componentFactoryResolver.resolveComponentFactory(ProviderModalComponent);
    // this.providerModalRef = factory.create(this.injector);

    // // Set the title and content

    // this.providerModalRef.instance.data = data;

    // // Attach the component to the DOM
    // this.appRef.attachView(this.providerModalRef.hostView);

    // // Append the component's root DOM element to the body
    // document.body.appendChild(this.providerModalRef.location.nativeElement);
  }

  closeProviderModal(): void {
    // if (this.providerModalRef) {
    //   // Remove the component from the DOM and destroy it
    //   this.appRef.detachView(this.providerModalRef.hostView);
    //   this.providerModalRef.destroy();
    //   // this.popupClose.next(true)
    // }
  }




}
