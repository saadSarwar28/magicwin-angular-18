import { Component, OnInit } from '@angular/core';
import { _window } from '../../services/backend.service';
import { GenericService } from "../../services/generic.service";
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-provider-modal',
  template: `
    <div class="provider-modal-container">
      <div class="provider-modal">
        <div class="terms_and_conditions_image qtcmodal" style="margin-top: 16px;" *ngIf="qtcImage">
          <img [src]="qtcImage">
        </div>
        <div class="d-flex justify-content-between i_accept_wrapper">
        <span>
          <button type="button" (click)="accept()" class="btn btn-success">Accept</button>
        </span>
          <span>
          <button type="button" (click)="close()" class="btn btn-danger">Reject</button>
        </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .provider-modal-container {
      position: fixed; /* Fixes the container relative to the viewport */
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10006;
      background: rgba(0, 0, 0, 0.5);
    }

    .provider-modal {
      z-index: 10007 !important;
      display: block;
      background: black;
      border-radius: 10px;
      height: fit-content;
      padding: 5px;
      max-width: fit-content;
    }
  `]
})
export class ProviderModalComponent implements OnInit {
  // @Output() valueEmitted = new EventEmitter<boolean>();
  qtcImage: any;

  onClose!: (result: boolean) => void;

  constructor(
    private modalService: GenericService,
    private platformService: PlatformService
  ) {
    // console.log("valueEmitted", this.valueEmitted);
    if (this.platformService.isBrowser()) {

      if (_window().qtcPoints) {
        this.qtcImage = _window().qtcPoints;
      }
    }
  }

  ngOnInit(): void {

  }


  close() {
    this.modalService.closePopup()
    localStorage.removeItem("routeCasino")
  }

  accept() {
    // this.valueEmitted.emit(true);
    this.onClose(true)
    this.close();
    // this.modalSer.closeFilterModal()
  }


}
