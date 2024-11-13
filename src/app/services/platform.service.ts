import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isServer() {
    return isPlatformServer(this.platformId);
  }

  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
