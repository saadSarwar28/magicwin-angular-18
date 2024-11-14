// modal.service.ts
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ModalComponentComponent } from '../../modal-component/modal-component.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalRef!: ComponentRef<ModalComponentComponent>;
  filterRef!: ComponentRef<any>;
  mybetsRef!: ComponentRef<any>;

  popupClose = new BehaviorSubject(true);
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private dialogRef: MatDialog
  ) { }

  open(data: any): void {
    this.dialogRef.open(ModalComponentComponent, {
      width: '100%',
      maxHeight: '100vh',
      maxWidth: '100vw',
      panelClass: 'game-modal',
      data,
    });
  }

  close(): void {
    if (this.modalRef) {
      // Remove the component from the DOM and destroy it
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.popupClose.next(true)
    }
  }

  openFilterModal(component: any): void {
    // Create a new modal component
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.filterRef = factory.create(this.injector);

    // Set the title and content

    // this.filterRef.instance.data = data;

    // Attach the component to the DOM
    this.appRef.attachView(this.filterRef.hostView);

    // Append the component's root DOM element to the body
    const modalElement = this.filterRef.location.nativeElement;
    modalElement.classList.add('modal-container');

    // Add a class to make the modal visible after it's appended to the body
    setTimeout(() => {
      modalElement.classList.add('modal-visible');
    }, 200);

    document.body.appendChild(modalElement);
  }

  closeFilterModal(): void {
    if (this.filterRef) {
      // Remove the component from the DOM and destroy it
      this.appRef.detachView(this.filterRef.hostView);
      this.filterRef.destroy();
      // this.getStatusService.updateCounterData(false);

    }
  }


}
