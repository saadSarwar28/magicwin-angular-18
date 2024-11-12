import { Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import { environment } from 'src/environments/environment';

// import { isAxiosError, ProblemDetails, throwException, _window } from './reports.service';
// import { ClientWallet, LocalMarketBet, SportsBettingModel } from './sports.service';

import { AxiosinstanceService } from './axiosinstance.service';
// import { GoogleAnalyticsService } from './googleAnalytics.service';
import { StorageService } from './storage.service';
import { GoogleAnalyticsService } from "./google-analytics.service";
import {
  ClientWallet,
  isAxiosError,
  LocalMarketBet,
  ProblemDetails,
  SportsBettingModel,
  throwException
} from "../models/models";
import { _window } from "./backend.service";


@Injectable({
  providedIn: 'root'
})
export class BettingService {

  private instance: AxiosInstance;

  // private instance: AxiosInstance = axios.create();

  private baseUrl: string = environment.apiurl;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;


  constructor(
    @Inject(APP_BASE_HREF) private baseHref: string,
    private router: Router,
    public googleAnalyticsService: GoogleAnalyticsService,
    private Instance: AxiosinstanceService,
    private storageService: StorageService
  ) {
    if (baseHref.length < 5) {
      this.baseUrl = environment.apiurl;
    } else {
      this.baseUrl = baseHref;
    }
    this.instance = Instance.getInstance();
  }


  /**
   * @return Success
   */
  wallet(cancelToken?: CancelToken | undefined): Promise<ClientWallet> {
    let url_
    if (_window().wallet) {
      url_ = this.baseUrl + _window().wallet
      url_ = url_.replace(/[?&]$/, "");
    }

    let options_ = <AxiosRequestConfig>{
      method: "GET",
      url: url_,
      headers: {
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processWallet(_response);
    });
  }

  protected processWallet(response: AxiosResponse): Promise<ClientWallet> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = ClientWallet.fromJS(resultData200);
      return result200;
    }
    else {

      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }

  jorhiTigarhiPOST(body: MultiPlaceBet | undefined, cancelToken?: CancelToken | undefined): Promise<BettingResponse> {
    let url_
    if (_window().jorhipost) {
      url_ = this.baseUrl + _window().jorhipost
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processJorhiTigarhi_POST(_response);
    });
  }

  protected processJorhiTigarhi_POST(response: AxiosResponse): Promise<BettingResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      return throwException("Error", status, _responseText, _headers);
    }
  }

  /**
   * @param body (optional)
   * @return Success
   */
  Sportswallet(body: string | undefined, cancelToken?: CancelToken | undefined): Promise<ClientWallet> {
    let url_
    if (_window().sportswallet) {
      url_ = this.baseUrl + _window().sportswallet
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processSportswallet(_response);
    });
  }

  protected processSportswallet(response: AxiosResponse): Promise<ClientWallet> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = ClientWallet.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }
  /**
   * @param body (optional)
   * @return Success
   */
  XgameWallet(body: string | undefined, cancelToken?: CancelToken | undefined): Promise<ClientWallet> {
    let url_
    if (_window().xgwallet) {
      url_ = this.baseUrl + _window().xgwallet
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processXgamewallet(_response);
    });
  }

  protected processXgamewallet(response: AxiosResponse): Promise<ClientWallet> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = ClientWallet.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }

  LotteryMarkets(
    id: number,
    from: string,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_;
    if (_window().lotterycricket) {
      if (_window().lotterycricket.startsWith('http')) {
        url_ = _window().fancymarkets;
      } else {
        url_ = this.baseUrl + _window().lotterycricket;
      }
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        Accept: 'application/json',
        from: from,
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
        return this.processLotteryMarkets(_response);
      });
  }

  protected processLotteryMarkets(response: AxiosResponse): Promise<any> {
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
      if (
        _responseText.message == 'UNAUTHRORIZED' &&
        _responseText.status == false &&
        _responseText.code !== 200
      ) {
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        // this.storageService.secureStorage.removeItem('token');
        return throwException(
          'Error',
          _responseText.code,
          _responseText,
          _headers,
          _responseText.message
        );
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = resultData200;
      return result200;
    } else {
      const _responseText = response.data;
      this.googleAnalyticsService.recordExceptions(response);
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException(
        'Error',
        status,
        _responseText,
        _headers,
        resultdefault
      );
    }
  }




  LotteryOrdersplaced(body: FancyModel | undefined, cancelToken?: CancelToken | undefined): Promise<BettingResponse> {
    let url_
    if (_window().lotteryordersplaced) {
      url_ = this.baseUrl + _window().lotteryordersplaced
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processLotteryOrdersplaced(_response);
    });
  }

  protected processLotteryOrdersplaced(response: AxiosResponse): Promise<BettingResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }

  BookMakerOrdersplaced(
    lookSabha: boolean = false,
    body: FancyModel | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().bookmakerordersplaced) {
      let version = lookSabha
        ? _window().loksabhabookmakerOrderPlVersion
        : _window().bookmakerOrderPlVersion;
      url_ = this.baseUrl + _window().bookmakerordersplaced + `${version}`;
      url_ = url_.replace(/[?&]$/, '');
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
        return this.processBookMakerOrdersplaced(_response);
      });
  }

  protected processBookMakerOrdersplaced(
    response: AxiosResponse
  ): Promise<BettingResponse> {
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
      if (
        _responseText.message == 'UNAUTHRORIZED' &&
        _responseText.status == false &&
        _responseText.code !== 200
      ) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException(
          'Error',
          _responseText.code,
          _responseText,
          _headers,
          _responseText.message
        );
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException(
        'Error',
        status,
        _responseText,
        _headers,
        resultdefault
      );
    }
  }



  /**
     * Order cancel in local Market
     * @param body (optional)
     * @return Success
     */
  MatchunmatchLocalMarket(body: string | undefined, cancelToken?: CancelToken | undefined): Promise<MatchedUnmatched> {
    let url_
    if (_window().matchunmatchlocalmarket) {
      url_ = this.baseUrl + _window().matchunmatchlocalmarket
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processMatchunmatchlocal(_response);
    });
  }

  protected processMatchunmatchlocal(response: AxiosResponse): Promise<MatchedUnmatched> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = MatchedUnmatched.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }

  /**
     * Order cancel in local Market
     * @param body (optional) all inputs are required
     * @return Success
     */
  LocalMarketCancelorders(body: CancelOrders | undefined, cancelToken?: CancelToken | undefined): Promise<CurrentBetResp> {
    let url_
    if (_window().cancelorderslocal) {
      url_ = this.baseUrl + _window().cancelorderslocal
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processLocalMarketCancelorders(_response);
    });
  }

  protected processLocalMarketCancelorders(response: AxiosResponse): Promise<CurrentBetResp> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = CurrentBetResp.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }

  /**
 * Get Xgame position
 * @param body (optional)
 * @return Success
 */

  /**
     * Cancel order in Sports
     * @param body (optional) all inputs are required
     * @return Success
     */
  SportsCancelOrders(body: CancelOrders | undefined, cancelToken?: CancelToken | undefined): Promise<CurrentBetResp> {
    let url_
    if (_window().sportscancelorders) {
      url_ = this.baseUrl + _window().sportscancelorders
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processSportsCancelOrders(_response);
    });
  }

  protected processSportsCancelOrders(response: AxiosResponse): Promise<CurrentBetResp> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = CurrentBetResp.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }

  /**
   * Cancel order in Exchange Game
   * @param body (optional) all inputs are required
   * @return Success
   */
  XGameCancelOrders(body: XGameOrderCancelModel | undefined, cancelToken?: CancelToken | undefined): Promise<BettingResponse> {
    let url_
    if (_window().xgcancelorders) {
      url_ = this.baseUrl + _window().xgcancelorders
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processXGameCancelOrders(_response);
    });
  }

  protected processXGameCancelOrders(response: AxiosResponse): Promise<BettingResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }

  /**
   * order placed sports in orders model
   * @param body (optional) all inputs are required
   * @return Success
   */
  SportsOrdersplaced(body: SportsBettingModel | undefined, cancelToken?: CancelToken | undefined): Promise<BettingResponse> {
    let url_
    if (_window().sportsordersplaced) {
      url_ = this.baseUrl + _window().sportsordersplaced
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processSportsOrdersplaced(_response);
    });
  }

  protected processSportsOrdersplaced(response: AxiosResponse): Promise<BettingResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }

  /**
   * order placed in fancy market
   * @param body (optional) all inputs are required
   * @return Success
   */
  FancyOrdersplaced(
    lookSabha: boolean = false,
    body: FancyModel | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().fancyordersplacedSingle && _window().sportsbookplacedSingle) {
      let version = lookSabha
        ? _window().loksabhafancyOrderPlVersion
        : _window().fancyOrderPlVersion;
      url_ = this.baseUrl + _window().fancyordersplaced + `${version}`;
      url_ = url_.replace(/[?&]$/, '');
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
        return this.processFancyOrdersplaced(_response);
      });
  }

  protected processFancyOrdersplaced(
    response: AxiosResponse
  ): Promise<BettingResponse> {
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
      if (
        _responseText.message == 'UNAUTHRORIZED' &&
        _responseText.status == false &&
        _responseText.code !== 200
      ) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException(
          'Error',
          _responseText.code,
          _responseText,
          _headers,
          _responseText.message
        );
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException(
        'Error',
        status,
        _responseText,
        _headers,
        resultdefault
      );
    }
  }
  cancellallOrdersSports(body: CancellAllOrders | undefined, cancelToken?: CancelToken | undefined): Promise<CurrentBetResp> {
    let url_
    if (_window().sportscancellallorders) {
      url_ = this.baseUrl + _window().sportscancellallorders
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processcancellallOrdersSports(_response);
    });
  }

  protected processcancellallOrdersSports(response: AxiosResponse): Promise<CurrentBetResp> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = CurrentBetResp.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }


  SportsOrdersplacedSingle(
    body: SportsBettingModel | undefined,
    from: string,
    cancelToken?: CancelToken | undefined
  ): Promise<CurrentBetResp> {
    let url_;
    if (_window().sportsordersplacedSingle) {
      url_ = this.baseUrl + _window().sportsordersplacedSingle;
      url_ = url_.replace(/[?&]$/, '');
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        from: from,
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
        return this.processOrdersplacedPostSingle(_response);
      });
  }

  protected processOrdersplacedPostSingle(
    response: AxiosResponse
  ): Promise<CurrentBetResp> {
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
      if (
        _responseText.message == 'UNAUTHRORIZED' &&
        _responseText.status == false &&
        _responseText.code !== 200
      ) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException(
          'Error',
          _responseText.code,
          _responseText,
          _headers,
          _responseText.message
        );
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = CurrentBetResp.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      this.googleAnalyticsService.recordExceptions(response);
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException(
        'Error',
        status,
        _responseText,
        _headers,
        resultdefault
      );
    }
  }

  SportsBookOrdersplacedSingle(
    body: SportsBookModelSingle | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<CurrentBetResp> {
    let url_;
    if (_window().sportsBookOrderPlacedNew) {
      url_ = this.baseUrl + _window().sportsBookOrderPlacedNew;
      url_ = url_.replace(/[?&]$/, '');
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
        return this.processSportsBookOrdersplacedSingle(_response);
      });
  }

  protected processSportsBookOrdersplacedSingle(
    response: AxiosResponse
  ): Promise<CurrentBetResp> {
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
      if (
        _responseText.message == 'UNAUTHRORIZED' &&
        _responseText.status == false &&
        _responseText.code !== 200
      ) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException(
          'Error',
          _responseText.code,
          _responseText,
          _headers,
          _responseText.message
        );
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = CurrentBetResp.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException(
        'Error',
        status,
        _responseText,
        _headers,
        resultdefault
      );
    }
  }
  SportsOrdersplacedMulti(body: SportsBettingModelM | undefined, from: string, cancelToken?: CancelToken | undefined): Promise<CurrentBetResp> {
    let url_
    if (_window().sportsordersplacedSingle) {
      url_ = this.baseUrl + _window().sportsordersplacedMulti
      url_ = url_.replace(/[?&]$/, "");
    }


    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "from": from
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processOrdersplacedPostMulti(_response);
    });
  }

  protected processOrdersplacedPostMulti(response: AxiosResponse): Promise<CurrentBetResp> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = CurrentBetResp.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      this.googleAnalyticsService.recordExceptions(response);
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }


  BookMakerOrdersplacedMulti(body: FancyModelSingle | undefined, cancelToken?: CancelToken | undefined): Promise<CurrentBetResp> {
    let url_
    if (_window().bookmakerordersplaced) {
      url_ = this.baseUrl + _window().bookmakerordersplacedMulti
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processBookMakerOrdersplacedMulti(_response);
    });
  }

  protected processBookMakerOrdersplacedMulti(response: AxiosResponse): Promise<CurrentBetResp> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = CurrentBetResp.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }


  FancyOrdersplacedSingle(lookSabha: boolean = false, body: FancyModelSingle | undefined, isSportsBook: any, cancelToken?: CancelToken | undefined): Promise<CurrentBetResp> {
    let url_
    if (_window().fancyordersplacedSingle && _window().sportsbookplacedSingle) {
      if (isSportsBook == true) {
        url_ = this.baseUrl + _window().sportsbookplacedSingle;
        url_ = url_.replace(/[?&]$/, '');
      } else {
        let version = lookSabha ? _window().loksabhafancyOrderPlVersion : _window().fancyOrderPlVersion;
        url_ = this.baseUrl + _window().fancyordersplaced + `${version}`
        url_ = url_.replace(/[?&]$/, '');
      }
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processFancyOrdersplacedSingle(_response);
    });
  }

  protected processFancyOrdersplacedSingle(response: AxiosResponse): Promise<CurrentBetResp> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = CurrentBetResp.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }
  otherRacesPost(body: any | undefined, cancelToken?: CancelToken | undefined): Promise<any> {
    let url_
    if (_window().otherracesordersplaced) {
      url_ = this.baseUrl + _window().otherracesordersplaced
      url_ = url_.replace(/[?&]$/, "");
    }
    const content_ = JSON.stringify(body);
    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processLocalMarketOrdersplaceds(_response);
    });
  }
  protected processLocalMarketOrdersplaceds(response: AxiosResponse): Promise<BettingResponse> {
    //debugger
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }
  /**
   * Order Placed in local market
   * @param body (optional) all inputs are required
   * @return Success
   */
  LocalMarketOrdersplaced(body: LocalMarketBet | undefined, cancelToken?: CancelToken | undefined): Promise<CurrentBetResp> {
    let url_
    if (_window().localordersplaced) {
      url_ = this.baseUrl + _window().localordersplaced
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processLocalMarketOrdersplaced(_response);
    });
  }

  protected processLocalMarketOrdersplaced(response: AxiosResponse): Promise<CurrentBetResp> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = CurrentBetResp.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }

  /**
   * order placed in exchange game
   * @param body (optional) all inputs are required
   * @return Success
   */
  XgameOrdersplaced(body: OrderPlaceModel | undefined, cancelToken?: CancelToken | undefined): Promise<BettingResponse> {
    let url_
    if (_window().ordersplacedxg) {
      url_ = this.baseUrl + _window().ordersplacedxg
      url_ = url_.replace(/[?&]$/, "");
    }

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processXgameOrdersplaced(_response);
    });
  }

  protected processXgameOrdersplaced(response: AxiosResponse): Promise<BettingResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      if (_responseText.message == 'UNAUTHRORIZED' && _responseText.status == false && _responseText.code !== 200) {
        this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }


}



/** Betting operations response */
export class BettingResponse implements IBettingResponse {
  /** flag for response */
  status!: boolean;
  /** Error or success message */
  message!: string;

  constructor(data?: IBettingResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.status = _data["status"] !== undefined ? _data["status"] : <any>null;
      this.message = _data["message"] !== undefined ? _data["message"] : <any>null;
    }
  }

  static fromJS(data: any): BettingResponse {
    data = typeof data === 'object' ? data : {};
    let result = new BettingResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["status"] = this.status !== undefined ? this.status : <any>null;
    data["message"] = this.message !== undefined ? this.message : <any>null;
    return data;
  }
}

/** Betting operations response */
export interface IBettingResponse {
  /** flag for response */
  status: boolean;
  /** Error or success message */
  message: string;
}


/** Fancy Model */
export class FancyModel implements IFancyModel {
  /** Market id */
  marketId!: string;
  /** Runs */
  runs!: number;
  /** Price */
  price!: number;
  /** Stake */
  stake!: number;
  /** Side */
  side!: string;

  constructor(
    marketid: string,
    run: number,
    prices: number,
    stakes: number,
    bettype: string
  ) {
    this.marketId = marketid;
    this.runs = run;
    this.price = prices;
    this.stake = stakes;
    this.side = bettype;
  }
}

/** Fancy Model */
export interface IFancyModel {
  /** Market id */
  marketId: string;
  /** Runs */
  runs: number;
  /** Price */
  price: number;
  /** Stake */
  stake: number;
  /** Side */
  side: string;
}


/** Order cancel Model */
export class XGameOrderCancelModel implements IXGameOrderCancelModel {
  /** Market Id */
  marketId!: string;
  /** Round No */
  roundNo!: number;
  /** Currency */
  currency!: string;
  /** List of Bet id's */
  betIds!: number[];

  constructor(data?: IXGameOrderCancelModel) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.betIds = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.marketId = _data["marketId"] !== undefined ? _data["marketId"] : <any>null;
      this.roundNo = _data["roundNo"] !== undefined ? _data["roundNo"] : <any>null;
      this.currency = _data["currency"] !== undefined ? _data["currency"] : <any>null;
      if (Array.isArray(_data["betIds"])) {
        this.betIds = [] as any;
        for (let item of _data["betIds"])
          this.betIds!.push(item);
      } else {
        this.betIds = <any>null;
      }
    }
  }

  static fromJS(data: any): XGameOrderCancelModel {
    data = typeof data === 'object' ? data : {};
    let result = new XGameOrderCancelModel();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketId"] = this.marketId !== undefined ? this.marketId : <any>null;
    data["roundNo"] = this.roundNo !== undefined ? this.roundNo : <any>null;
    data["currency"] = this.currency !== undefined ? this.currency : <any>null;
    if (Array.isArray(this.betIds)) {
      data["betIds"] = [];
      for (let item of this.betIds)
        data["betIds"].push(item);
    }
    return data;
  }


}

/** Order cancel Model */
export interface IXGameOrderCancelModel {
  /** Market Id */
  marketId: string;
  /** Round No */
  roundNo: number;
  /** Currency */
  currency: string;
  /** List of Bet id's */
  betIds: number[];
}


/** Order Place Model X game */
export class OrderPlaceModel implements IOrderPlaceModel {
  /** Selection Id or Runner Id */
  selectionId!: number;
  /** channel id */
  channelId!: number;
  /** Round no */
  roundNo!: number;
  /** market Id */
  marketId!: number;
  /** price */
  price!: number;
  /** size */
  size!: number;
  /** bet type */
  betType!: string | null;
  /** currency */
  currency!: string | null;
  /** keep alive not required */
  keepAlive!: boolean;
  /** game id */
  gameId!: number;
  /** selection type */
  selectionType!: string | null;
  /** commission rate */
  commissionRate!: number;
  /** market type */
  marketType!: string | null;

  constructor(data?: IOrderPlaceModel) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.selectionId = _data["selectionId"] !== undefined ? _data["selectionId"] : <any>null;
      this.channelId = _data["channelId"] !== undefined ? _data["channelId"] : <any>null;
      this.roundNo = _data["roundNo"] !== undefined ? _data["roundNo"] : <any>null;
      this.marketId = _data["marketId"] !== undefined ? _data["marketId"] : <any>null;
      this.price = _data["price"] !== undefined ? _data["price"] : <any>null;
      this.size = _data["size"] !== undefined ? _data["size"] : <any>null;
      this.betType = _data["betType"] !== undefined ? _data["betType"] : <any>null;
      this.currency = _data["currency"] !== undefined ? _data["currency"] : <any>null;
      this.keepAlive = _data["keepAlive"] !== undefined ? _data["keepAlive"] : <any>null;
      this.gameId = _data["gameId"] !== undefined ? _data["gameId"] : <any>null;
      this.selectionType = _data["selectionType"] !== undefined ? _data["selectionType"] : <any>null;
      this.commissionRate = _data["commissionRate"] !== undefined ? _data["commissionRate"] : <any>null;
      this.marketType = _data["marketType"] !== undefined ? _data["marketType"] : <any>null;
    }
  }

  static fromJS(data: any): OrderPlaceModel {
    data = typeof data === 'object' ? data : {};
    let result = new OrderPlaceModel();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["selectionId"] = this.selectionId !== undefined ? this.selectionId : <any>null;
    data["channelId"] = this.channelId !== undefined ? this.channelId : <any>null;
    data["roundNo"] = this.roundNo !== undefined ? this.roundNo : <any>null;
    data["marketId"] = this.marketId !== undefined ? this.marketId : <any>null;
    data["price"] = this.price !== undefined ? this.price : <any>null;
    data["size"] = this.size !== undefined ? this.size : <any>null;
    data["betType"] = this.betType !== undefined ? this.betType : <any>null;
    data["currency"] = this.currency !== undefined ? this.currency : <any>null;
    data["keepAlive"] = this.keepAlive !== undefined ? this.keepAlive : <any>null;
    data["gameId"] = this.gameId !== undefined ? this.gameId : <any>null;
    data["selectionType"] = this.selectionType !== undefined ? this.selectionType : <any>null;
    data["commissionRate"] = this.commissionRate !== undefined ? this.commissionRate : <any>null;
    data["marketType"] = this.marketType !== undefined ? this.marketType : <any>null;
    return data;
  }
}

/** Order Place Model X game */
export interface IOrderPlaceModel {
  /** Selection Id or Runner Id */
  selectionId: number;
  /** channel id */
  channelId: number;
  /** Round no */
  roundNo: number;
  /** market Id */
  marketId: number;
  /** price */
  price: number;
  /** size */
  size: number;
  /** bet type */
  betType: string | null;
  /** currency */
  currency: string | null;
  /** keep alive not required */
  keepAlive: boolean;
  /** game id */
  gameId: number;
  /** selection type */
  selectionType: string | null;
  /** commission rate */
  commissionRate: number;
  /** market type */
  marketType: string | null;
}


export class MatchedUnmatched implements IMatchedUnmatched {
  unMatchedSize?: number;
  matchedSize?: number;

  constructor(data?: IMatchedUnmatched) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.unMatchedSize = _data["unMatchedSize"];
      this.matchedSize = _data["matchedSize"];
    }
  }

  static fromJS(data: any): MatchedUnmatched {
    data = typeof data === 'object' ? data : {};
    let result = new MatchedUnmatched();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["unMatchedSize"] = this.unMatchedSize;
    data["matchedSize"] = this.matchedSize;
    return data;
  }
}




export interface IMatchedUnmatched {
  unMatchedSize?: number;
  matchedSize?: number;
}


/** Cancel Orders input Model */
export class CancelOrders implements ICancelOrders {
  /** Market Id */
  marketId!: string;
  /** List of Bet id's */
  betIds!: string[];

  constructor(marketid: string, betids: string[]) {
    this.marketId = marketid;
    this.betIds = betids;
  }


}

/** Cancel Orders input Model */
export interface ICancelOrders {
  /** Market Id */
  marketId: string;
  /** List of Bet id's */
  betIds: string[];
}


/** Client Postion Market */
export class ClientPosition implements IClientPosition {
  /** Market Id */
  marketId!: string;
  /** used for handicap or score or goal */
  handicap!: number;
  /** selection id or runner id is same */
  runnerId!: number;
  /** position value on current runner */
  position!: number;
  /** Liability on current runner */
  liability!: number;
  /** Runner Position */
  rPosition!: number;
  /** Runner Liability */
  rLiability!: number;

  constructor(data?: IClientPosition) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.marketId = _data["marketId"];
      this.handicap = _data["handicap"];
      this.runnerId = _data["runnerId"];
      this.position = _data["position"];
      this.liability = _data["liability"];
      this.rPosition = _data["rPosition"];
      this.rLiability = _data["rLiability"];
    }
  }

  static fromJS(data: any): ClientPosition {
    data = typeof data === 'object' ? data : {};
    let result = new ClientPosition();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketId"] = this.marketId;
    data["handicap"] = this.handicap;
    data["runnerId"] = this.runnerId;
    data["position"] = this.position;
    data["liability"] = this.liability;
    data["rPosition"] = this.rPosition;
    data["rLiability"] = this.rLiability;
    return data;
  }
}

/** Client Postion Market */
export interface IClientPosition {
  /** Market Id */
  marketId: string;
  /** used for handicap or score or goal */
  handicap: number;
  /** selection id or runner id is same */
  runnerId: number;
  /** position value on current runner */
  position: number;
  /** Liability on current runner */
  liability: number;
  /** Runner Position */
  rPosition: number;
  /** Runner Liability */
  rLiability: number;
}

export class MultiPlaceBet implements IMultiPlaceBet {
  marketId?: string | undefined;
  bets?: Multibets[] | undefined;

  constructor(marketid: string, bets: Multibets[]) {
    this.marketId = marketid;
    this.bets = bets;
  }
}

export interface IMultiPlaceBet {
  marketId?: string | undefined;
  bets?: Multibets[] | undefined;
}

export class Multibets implements IMultibets {
  marketId?: string | undefined;
  selectionId?: string | undefined;
  handiCap?: string | undefined;
  side?: string | undefined;
  price?: string | undefined;
  size?: string | undefined;
  keepAliveOn?: string | undefined;

  constructor(marketid: string, selectionid: string, handicap: string, side: string, price: string, size: string, keepaliveon: string) {
    this.marketId = marketid;
    this.selectionId = selectionid;
    this.handiCap = handicap;
    this.side = side;
    this.price = price;
    this.size = size;
    this.keepAliveOn = keepaliveon;
  }
}

export class FancyModelSingle implements IFancyModelSingle {
  eventId!: number;
  /** Market id */
  marketId!: string;
  /** Runs */
  runs!: number;
  /** Price */
  price!: number;
  /** Stake */
  stake!: number;
  /** Side */
  side!: string;

  constructor(eventid: number, marketid: string, run: number, prices: number, stakes: number, sides: string) {
    this.eventId = eventid;
    this.marketId = marketid;
    this.runs = run;
    this.price = prices;
    this.stake = stakes;
    this.side = sides;
  }


}

export interface IFancyModelSingle {
  eventId: number;
  /** Market id */
  marketId: string;
  /** Runs */
  runs: number;
  /** Price */
  price: number;
  /** Stake */
  stake: number;
  /** Side */
  side: string;
}

export interface IMultibets {
  marketId?: string | undefined;
  selectionId?: string | undefined;
  handiCap?: string | undefined;
  side?: string | undefined;
  price?: string | undefined;
  size?: string | undefined;
  keepAliveOn?: string | undefined;
}

export class CurrentBetResp implements ICurrentBetResp {
  data?: any | undefined;
  /** flag for response */
  status!: boolean;
  /** Error or success message */
  message!: string;

  constructor(data?: ICurrentBetResp) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.data = _data["data"];
      this.status = _data["status"];
      this.message = _data["message"];
    }
  }

  static fromJS(data: any): CurrentBetResp {
    data = typeof data === 'object' ? data : {};
    let result = new CurrentBetResp();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["data"] = this.data;
    data["status"] = this.status;
    data["message"] = this.message;
    return data;
  }
}

export interface ICurrentBetResp {
  data?: any | undefined;
  /** flag for response */
  status: boolean;
  /** Error or success message */
  message: string;
}
export class SportsBookModelSingle implements ISportsBookModelSingle {
  eventId!: number;
  /** Market id */
  marketId!: string;
  /** Runner Id */
  selectionId!: any;
  /** Price */
  price!: number;
  /** Stake */
  stake!: number;
  /** Side */
  side!: string;

  constructor(
    eventid: number,
    marketid: string,
    runnerId: any,
    prices: number,
    stakes: number,
    side: string
  ) {
    this.eventId = eventid;
    this.marketId = marketid;
    this.selectionId = runnerId;
    this.price = prices;
    this.stake = stakes;
    this.side = side;
  }
}

export interface ISportsBookModelSingle {
  eventId: number;
  /** Market id */
  marketId: string;
  /** Runner Id */
  selectionId: any;
  /** Price */
  price: number;
  /** Stake */
  stake: number;
}

export class SportsBettingModelM implements ISportsBettingModelM {
  eventid!: number;
  /** Market Id */
  marketId!: string;
  /** selection id */
  selectionId!: number;
  /** handicap */
  handicap!: number;
  /** bet type */
  betType!: string;
  /** price */
  price!: number;
  /** Size */
  size!: number;
  /** keep alive */
  keepAliveOn!: boolean;
  /** Version */
  version!: number;

  side!: string;
  keepAlive!: string;

  constructor(eventid: number, marketid: string, selectionid: number, handicaps: number, bettypes: string, prices: number, sizes: number, keepalive: boolean, verions: number) {
    this.selectionId = selectionid;
    this.eventid = eventid;
    this.marketId = marketid;
    this.handicap = handicaps;
    this.betType = bettypes;
    this.side = bettypes.toUpperCase();
    this.price = prices;
    this.size = sizes;
    this.keepAliveOn = keepalive;
    this.keepAlive = keepalive.toString();
    this.version = verions;
  }

}

export interface ISportsBettingModelM {
  eventid: number;
  /** Market Id */
  marketId: string;
  /** selection id */
  selectionId: number;
  /** handicap */
  handicap: number;
  /** bet type */
  betType: string;
  /** price */
  price: number;
  /** Size */
  size: number;
  /** keep alive */
  keepAliveOn: boolean;
  /** Version */
  version: number;
}

export class CancellAllOrders implements ICancellAllOrders {
  eventId!: number;
  type!: string;
  cancelOrders!: CancelOrders[];

  constructor(eventid: number, type: string, orders: CancelOrders[]) {
    this.eventId = eventid;
    this.type = type;
    this.cancelOrders = orders;
  }


}

export interface ICancellAllOrders {
  eventId: number;
  type: string;
  cancelOrders: CancelOrders[];
}
