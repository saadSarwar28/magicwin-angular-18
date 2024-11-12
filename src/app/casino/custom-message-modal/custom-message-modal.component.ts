import { Component, Input, OnInit } from '@angular/core';
import { _window } from "../../services/backend.service";
import { GenericService } from "../../services/generic.service";

@Component({
  selector: 'app-custom-message-modal',
  template: `
    <div class="modal-content" id="cookiesPopup">
      <h5> {{gameInvalidTokenMsg?.heading ? gameInvalidTokenMsg.heading : 'Under maintenance'}}</h5>
      <img src="https://iriscdn.b-cdn.net/magicwin.games/icon/gameum.png" alt="cookies-img"/>
      <p id="casinoErrorMessage">
        {{gameInvalidTokenMsg?.description ? gameInvalidTokenMsg.description : 'Game under maintenance.'}}</p>
      <button class="close" (click)="close()"> Close</button>
    </div>
  `,
  styles: [
    `
      .modal-content {
        margin: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--casino-custom-message-modal-bg);
        color: var(--casino-custom-message-modal-text);
        text-align: center;
        border-radius: 20px;
        padding: 30px 30px 70px;
        z-index: 9999;
      }

      img {
        width: 82px;
        margin-bottom: 15px;
      }

      p {
        margin-bottom: 40px;
        font-size: 18px;
      }

      button.close {
        background: var(--casino-custom-message-close-btn-bg);
        border: none;
        /*border-radius: 5px;*/
        width: 200px;
        padding: 14px;
        font-size: 16px;
        color: var(--casino-custom-message-modal-text); /* white */
        box-shadow: 0px 6px 18px -5px var(--casino-custom-message-close-btn-shadow);
        border-radius: 25px;
      }
    `
  ]
})
export class CustomMessageModalComponent implements OnInit {

  gameInvalidTokenMsg!: any;

  @Input() msg: any;

  constructor(private popupService: GenericService) {
    if (_window().gameInvalidTokenMsg) {
      this.gameInvalidTokenMsg = _window().gameInvalidTokenMsg;
    }
  }

  ngOnInit(): void {
  }

  close() {
    this.popupService.closePopup()
  }

}
