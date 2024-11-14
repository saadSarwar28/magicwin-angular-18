import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { style, transition } from '@angular/animations';
import { trigger } from '@angular/animations';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('4000ms', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class ToastComponent {
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
