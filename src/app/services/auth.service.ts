import { PlatformService } from './platform.service';
import {DOCUMENT, ɵDomAdapter as DomAdapter, ɵgetDOM as getDOM} from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from './storage.service';
import { BrowserService } from './browser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _dom: DomAdapter;
  readonly:HTMLMetaElement | null | undefined;
  constructor(@Inject(DOCUMENT) private _doc: any,private storageService: StorageService,
  private browserService: BrowserService) {
    this._dom = getDOM();
    this.readonly= this.getTag("name");
  }
  // ...
  public isAuthenticated(): boolean {
    const token = this.storageService.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if(this.readonly && this.readonly.content=='readonly')
        return true;
    if(token){
      let decode:any= jwtDecode(token);
      if(Math.floor((new Date).getTime() / 1000) >= decode.exp){
        this.storageService.clear();
        return false;
      }

      return true;
    }
    return false;
  }

  getTag(attrSelector: string): HTMLMetaElement|null {
    if (!attrSelector) return null;
    return this._doc.querySelector(`meta[${attrSelector}]`) || null;
  }
  isLoggedIn(){

    if (this.browserService.getWindow() && this.browserService.getWindow().isIframe) {
    const token = this.storageService.getItem('token');
      if (token) {
        let decode: any = jwtDecode(token);
        if (Math.floor(new Date().getTime() / 1000) >= decode.exp) {
          this.storageService.clear();
          return false;
        }

        return true;
      }
      return false;
    }else{
      return true;
    }
    // Check whether the token is expired and return
    // true or false


  }
}
