import { Injectable } from '@angular/core';
import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
} from 'axios';
import { environment } from 'src/environments/environment';
import { AxiosinstanceService } from './axiosinstance.service';
import { _window } from './backend.service';
import { isAxiosError, throwException } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  private instance: AxiosInstance;
  private baseUrl: string = environment.apiurl;
  constructor(private Instance: AxiosinstanceService) {
    this.baseUrl = environment.apiurl;

    this.instance = Instance.getInstance();
  }
  getMySports(cancelToken?: CancelToken | undefined): Promise<any> {
    let url_;
    if (_window().mysport) {
      url_ = this.baseUrl + _window().mysport;
      url_ = url_.replace(/[?&]$/, '');
    }
    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cancelToken,
    };
    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processgetMySports(_response);
      });
  }

  protected processgetMySports(response: AxiosResponse): Promise<any> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === 'object') {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      let result200: any = null;
      let resultData200 = _responseText;
      return Promise.resolve(resultData200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }
}
