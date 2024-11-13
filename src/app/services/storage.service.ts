import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import SecureStorage from 'secure-web-storage';
import * as CryptoJS from 'crypto-js';

const SECRET_KEY: any = 'secret_key';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private secureStorage: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.secureStorage = new SecureStorage(localStorage as any, {
        hash: (key: any) => CryptoJS.SHA256(key, SECRET_KEY).toString(),
        encrypt: (data: any) => CryptoJS.AES.encrypt(data, SECRET_KEY).toString(),
        decrypt: (data: any) => CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8),
      });
    }
  }

  getItem(key: string): any {
    return this.isBrowser ? this.secureStorage.getItem(key) : null;
  }

  setItem(key: string, value: any): void {
    if (this.isBrowser) {
      this.secureStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      this.secureStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser) {
      this.secureStorage.clear()
    }
  }
}
