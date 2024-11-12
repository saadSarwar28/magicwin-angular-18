import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-terms-condition',
  template: `
    <style>
      ::ng-deep .mat-dialog-container {
        padding-top: 0 !important;
      }
    </style>
    <div class="terms-and-condition-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header  mb-2 pb-1 border-0">
            <h1 class="modal-title fs-5">
              {{ 'termsandconditionsagreement' | translate }}
            </h1>
            <button type="button" class="btn-close" (click)="closeModal()">
              <i class="bi bi-x"></i>
            </button>
          </div>
          <div class="modal-body">
            <p>
              {{ 'usersadvisory' | translate }}
              <strong>{{ 'termsandconditions' | translate }}</strong
              >, {{ 'anyuserwhowillplacebet' | translate }}:
            </p>
            <ul class="list-group-numbered p-0">
              <li class="list-group-item">
                {{ 'anysortof' | translate
                }}<strong>{{ 'cheating' | translate }}</strong
                >{{ 'betanysortof' | translate }}
                <strong>{{ 'matchingpassingoffunds' | translate }}</strong
                >, {{ 'courtsiding' | translate }}
                <strong>{{ 'ghaobaazioncommentary' | translate }}</strong>
                {{ 'isnotallowedinexchange' | translate }}
              </li>
              <li class="list-group-item">
                <strong>{{ 'flukehuntingseeking' | translate }}</strong>
                {{ 'flukebetsreserved' | translate }}
              </li>

              <li class="list-group-item">
                {{ 'exchangewillnotbearloss' | translate }}
              </li>
              <li class="list-group-item">
                {{ 'betfairrights' | translate }}
              </li>
              <li class="list-group-item">
                {{ 'exchangedecisionauthority' | translate }}
              </li>
              <li class="list-group-item">
                <span class="badge text-bg-primary align-middle">{{
                  'new' | translate
                }}</span>
                {{ 'warningfortwoids' | translate }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button class="btn bg-success text-light" (click)="closeModal()">
              {{ 'iagreewithallthetermsandconitions' | translate }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
 
})
export class LoginTermsConditionComponent {
  constructor(private dialogRef: MatDialogRef<LoginTermsConditionComponent>) {}

  closeModal() {
    this.dialogRef.close(); // Close the dialog
  }
}
