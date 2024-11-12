import {
  DOCUMENT,
  ɵDomAdapter as DomAdapter,
  ɵgetDOM as getDOM,
} from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { ApiException } from '../models/models';
// import { ApiException } from './reports.service';
import { StorageService } from './storage.service';
// import { UtillsService } from './utills.service';

@Injectable({
  providedIn: 'root',
})
export class AxiosinstanceService {
  private _dom: DomAdapter;
  readonly: HTMLMetaElement | null;
  Instance: AxiosInstance;
  constructor(
    @Inject(DOCUMENT) private _doc: any,
    private storageService: StorageService,
    // private utilService: UtillsService
  ) {
    this._dom = getDOM();
    this.readonly = this.getTag('name');

    this.Instance = axios.create();
  }
  getInstance(): AxiosInstance {
    this.Instance.interceptors.request.use((req) => {
      const token = this.storageService.secureStorage.getItem('token');
      if (token) {
        req.headers['Authorization'] = 'Bearer ' + token;
      } else {
        if (this.readonly && this.readonly.content == 'readonly') {
        } else if (!req.url?.endsWith('authenticate')) {
          throw new ApiException(
            'Invalid Request',
            401,
            'UNAUTHORIZED',
            req.headers,
            null
          );
        }
      }

      const language = localStorage.getItem('locale');
      if (language) {
        req.headers['Language'] = language;
      } else {
        req.headers['Language'] = 'en';
      }
      req.headers['path'] = window.location.href;
      return req;
    });

    // this.Instance.interceptors.response.use(resp=>{
    //     console.log(resp.status);
    //   if(resp.status==401){

    //     this.storageService.secureStorage.removeItem('token');
    //     localStorage.clear();
    //   }
    //   return resp;
    // });

    this.Instance.interceptors.response.use(
      (resp) => {
        if (resp.status == 401) {
          this.storageService.secureStorage.removeItem('token');
          // localStorage.clear();
        }
        return resp;
      },
      (err) => {
        if (err.response && err.response.status == 401) {
          this.storageService.secureStorage.removeItem('token');
          // localStorage.clear();
        }
        throw err;
      }
    );

    return this.Instance;
  }

  getTag(attrSelector: string): HTMLMetaElement | null {
    if (!attrSelector) return null;
    return this._doc.querySelector(`meta[${attrSelector}]`) || null;
  }
}
