import { Injectable, TemplateRef } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor(private storageService: StorageService) { }
  // show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
  //   if (this.storageService.getItem('toasterNotification') && options.sound == true) {
  //     let audio: HTMLAudioElement = new Audio('../../../assets/sound/alert.mp3');
  //     audio.play();
  //   }
  //   this.toasts[0] = { textOrTpl, ...options }
  // }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    if (this.storageService.getItem('toasterNotification') && options.sound == true) {
      let audio: HTMLAudioElement = new Audio('../../../assets/sound/alert.mp3');
      audio.play();
    }
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast : any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

}


