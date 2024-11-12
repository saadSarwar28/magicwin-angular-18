import { Component, Input, TemplateRef } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { CheckAuthService } from '../services/check-auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container">
      <div
        *ngFor="let toast of toasts; let i = index"
        class="toast"
        [ngClass]="toast.classname"
        [@fadeOut]
        (@fadeOut.done)="removeToast(i)"
      >
        <ng-container *ngIf="isTemplate(toast); else text">
          <ng-container *ngTemplateOutlet="toast.textOrTpl"></ng-container>
        </ng-container>
        <ng-template #text>{{ toast.textOrTpl }}</ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .toast-container {
        position: fixed;
        top: 40px;
        right: 10px;
        z-index: 1050;
      }

      .toast {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #343a40;
        color: white;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        cursor: pointer;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
      }

      @media (max-width: 400px) {
        .toast-container {
          width: 250px;
        }
      }
    `
  ],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('4000ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ToastsContainer {
  @Input() toasts: any[] = []; // Input to receive the toast array

  constructor(
    public toastService: ToastService,
  ) { }

  removeToast(index: number) {
    // Remove the toast from the array once the animation is complete
    this.toasts.splice(index, 1);
  }

  // Helper method to check if the toast contains a template
  isTemplate(toast: any): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
