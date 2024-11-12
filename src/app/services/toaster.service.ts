import { Injectable, TemplateRef } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];
  constructor(private storageService: StorageService) { }
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {

    console.log('this.storageService.secureStorage.g', this.storageService.secureStorage.getItem('soundMute'));
    if (this.storageService.secureStorage.getItem('soundMute')) {
      let audio: HTMLAudioElement = new Audio('https://dqqdyv927mezc.cloudfront.net/ssexch/web/images/sound/alert.mp3');
      audio.play();
    }

    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
