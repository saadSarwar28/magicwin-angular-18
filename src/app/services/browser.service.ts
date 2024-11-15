import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getWindow(): any | null {
    return this.isBrowser ? window : null;
  }

  getNavigator(): any | null {
    return this.isBrowser ? navigator : null;
  }

  getSessionStorage(): any | null {
    return this.isBrowser ? sessionStorage : null;
  }
}
