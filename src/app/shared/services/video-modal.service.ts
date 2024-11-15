// modal.service.ts
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { VideoModalComponent } from '../../shared/video-modal/video-modal.component';

@Injectable({
  providedIn: 'root',
})
export class VideoModalService {
  modalRef!: ComponentRef<VideoModalComponent>;
  popupClose = new BehaviorSubject(true);
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  open(data: any): void {
    // Create a new modal component
    const factory = this.componentFactoryResolver.resolveComponentFactory(VideoModalComponent);
    this.modalRef = factory.create(this.injector);

    // Set the title and content

    this.modalRef.instance.data = data;

    // Attach the component to the DOM
    this.appRef.attachView(this.modalRef.hostView);

    // Append the component's root DOM element to the body
    document.body.appendChild(this.modalRef.location.nativeElement);
  }

  close(): void {
    if (this.modalRef) {
      // Remove the component from the DOM and destroy it
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.popupClose.next(true)
    }
  }
}
