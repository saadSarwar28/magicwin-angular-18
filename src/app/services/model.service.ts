import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private ngbModal: NgbModal,
              private componentFactoryResolver: ComponentFactoryResolver) {}

showDefaultModalComponent(theComponent: any, headerText: any, bodyText: any) {

  const componentFactory = this.componentFactoryResolver.resolveComponentFactory(theComponent);
  const modalRef = this.ngbModal.open(theComponent);
  modalRef.componentInstance.bodyText = bodyText;
  modalRef.componentInstance.headerText = headerText;
  return modalRef;
}

showFeaturedDialog(theComponent: any, heading: any, subheading: any) {
  const componentFactory = this.componentFactoryResolver.resolveComponentFactory(theComponent);

  const modalRef = this.ngbModal.open(theComponent);
  modalRef.componentInstance.bodyText = heading;
  modalRef.componentInstance.headerText = subheading;
  return modalRef;
}


}
