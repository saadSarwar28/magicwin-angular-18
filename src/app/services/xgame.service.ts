// import { StorageService } from 'src/app/exchange/services/storage.service';
import { APP_BASE_HREF } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import { environment } from 'src/environments/environment';
import { AxiosinstanceService } from './axiosinstance.service';
import {GoogleAnalyticsService} from "./google-analytics.service";
import {StorageService} from "./storage.service";
import {_window} from "./backend.service";
import {ClientWallet, isAxiosError, MatchedUnmatched, ProblemDetails, throwException} from "../models/models";
// import { MatchedUnmatched } from './betting.service';
// import { GoogleAnalyticsService } from './googleAnalytics.service';
// import { isAxiosError, ProblemDetails, throwException, _window } from './reports.service';
// import { ClientWallet } from './sports.service';

@Injectable({
  providedIn: 'root'
})
export class XgameService {
  private instance: AxiosInstance;
  private baseUrl: string = environment.apiurl;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(
    // @Inject(APP_BASE_HREF) private baseHref: string,
    public googleAnalyticsService: GoogleAnalyticsService,
     private Instance: AxiosinstanceService,
     private storageService:StorageService
     ) {
    // if (baseHref.length < 5) {
    //   this.baseUrl = environment.apiurl;
    // } else {
    //   this.baseUrl = baseHref;
    // }
    this.instance = Instance.getInstance();
  }

  GetxGameDetails(id: number, cancelToken?: CancelToken | undefined): Promise<XGameDetails> {
    let url_
    if(_window().getxgdetails){
      url_ = this.baseUrl + _window().getxgdetails
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
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
      return this.processXGameDetailGET(_response);
    });
  }

  protected processXGameDetailGET(response: AxiosResponse): Promise<XGameDetails> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = XGameDetails.fromJS(resultData200);
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException("Client Error", status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException("Error", status, _responseText, _headers);
    }
  }
  /**
* Order cancel in local Market
* @param body (optional) all inputs are required
* @return Success
*/
  MatchUnmatchXG(body: XgameInputModel | undefined, cancelToken?: CancelToken | undefined): Promise<MatchedUnmatched> {
    let url_
    if(_window().matchunmatchxg){
      url_ = this.baseUrl + _window().matchunmatchxg
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
      timeout: _window().requesttimeout,
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processMatchUnmatchXG_POST(_response);
    });
  }

  protected processMatchUnmatchXG_POST(response: AxiosResponse): Promise<MatchedUnmatched> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = MatchedUnmatched.fromJS(resultData200);
      return result200;
    }
    else {
      const _responseText = response.data;
      return throwException("Error", status, _responseText, _headers);
    }
  }
  /**
   * Market Data based on channel id https://api.games.betfair.com/rest/v1/channels/1444074/snapshot?type=json
   * @param body (optional) Channel Id
   * @return Success
   */
  book(body: any | undefined, cancelToken?: CancelToken | undefined): Promise<any> {
    let url_
    if(_window().singlebook){
      url_ = this.baseUrl + _window().singlebook
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
      timeout: _window().requesttimeout,
      cancelToken

    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processBook(_response);
    });
  }

  protected processBook(response: AxiosResponse): Promise<any> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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
     * Game detail
     * @param id channel id
     * @return Success
     */
  gamedetail(id: number, cancelToken?: CancelToken | undefined): Promise<XGameDetail[]> {
    let url_
    if(_window().gamedetail){
      url_ = this.baseUrl + _window().gamedetail
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }

    let options_ = <AxiosRequestConfig>{
      method: "GET",
      url: url_,
      headers: {
        "Accept": "application/json"
      },
      timeout: _window().requesttimeout,
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processGamedetail(_response);
    });
  }

  protected processGamedetail(response: AxiosResponse): Promise<XGameDetail[]> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(XGameDetail.fromJS(item));
      }
      else {
        result200 = <any>null;
      }
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
   * Result of the Market based on Channel id link startRecord=6 and recordCount=5 and type=json
   * @param body (optional) Channel id, Start Record and End Record
   * @return Success
   */
  result(body: Results | undefined, cancelToken?: CancelToken | undefined): Promise<any> {
    let url_
    if(_window().result){
      url_ = this.baseUrl + _window().result
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
      timeout: _window().requesttimeout,
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processResult(_response);
    });
  }

  protected processResult(response: AxiosResponse): Promise<any> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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
   * Get List of X games
   * @return Success
   */
  // games(cancelToken?: CancelToken | undefined): Promise<XGameList[]> {
  //   let url_ = this.baseUrl + "/exchangeapi/xgame/games";
  //   url_ = url_.replace(/[?&]$/, "");

  //   let options_ = <AxiosRequestConfig>{
  //     method: "GET",
  //     url: url_,
  //     headers: {
  //       "Accept": "application/json"
  //     },
  //     cancelToken
  //   };

  //   return this.instance.request(options_).catch((_error: any) => {
  //     if (isAxiosError(_error) && _error.response) {
  //       return _error.response;
  //     } else {
  //       throw _error;
  //     }
  //   }).then((_response: AxiosResponse) => {
  //     return this.processGames(_response);
  //   });
  // }

  // protected processGames(response: AxiosResponse): Promise<XGameList[]> {
  //   const status = response.status;
  //   let _headers: any = {};
  //   if (response.headers && typeof response.headers === "object") {
  //     for (let k in response.headers) {
  //       if (response.headers.hasOwnProperty(k)) {
  //         _headers[k] = response.headers[k];
  //       }
  //     }
  //   }
  //   if (status === 200) {
  //     const _responseText = response.data;
  //     let result200: any = null;
  //     let resultData200 = _responseText;
  //     if (Array.isArray(resultData200)) {
  //       result200 = [] as any;
  //       for (let item of resultData200)
  //         result200!.push(XGameList.fromJS(item));
  //     } else {
  //       result200 = <any>null;
  //     }
  //     return result200;
  //   } else if (status === 417) {
  //     const _responseText = response.data;
  //     let result417: any = null;
  //     let resultData417 = _responseText;
  //     result417 = ProblemDetails.fromJS(resultData417);
  //     return throwException("Client Error", status, _responseText, _headers, result417);
  //   } else {
  //     const _responseText = response.data;
  //     let resultdefault: any = null;
  //     let resultDatadefault = _responseText;
  //     resultdefault = ProblemDetails.fromJS(resultDatadefault);
  //     return throwException("Error", status, _responseText, _headers, resultdefault);
  //   }
  // }


  /**
 * Get List of X games
 * @return Success
 */
  games(cancelToken?: CancelToken | undefined): Promise<XgameNow[]> {
    let url_
    if(_window().games){
      url_ = this.baseUrl + _window().games
      url_ = url_.replace(/[?&]$/, "");
    }

    let options_ = <AxiosRequestConfig>{
      method: "GET",
      url: url_,
      headers: {
        "Accept": "application/json"
      },
      timeout: _window().requesttimeout,
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processGames(_response);
    });
  }

  protected processGames(response: AxiosResponse): Promise<XgameNow[]> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(XgameNow.fromJS(item));
      }
      else {
        result200 = <any>null;
      }
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      let result417: any = null;
      let resultData417 = _responseText;
      result417 = ProblemDetails.fromJS(resultData417);
      return throwException("Client Error", status, _responseText, _headers, result417);
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
  singlebook(body: XGameSingleBook | undefined, cancelToken?: CancelToken | undefined): Promise<any> {
    let url_
    if(_window().singlebook){
      url_ = this.baseUrl + _window().singlebook
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
      timeout: _window().requesttimeout,
      cancelToken
    };

    return this.instance.request(options_).catch((_error: any) => {
      if (isAxiosError(_error) && _error.response) {
        return _error.response;
      } else {
        throw _error;
      }
    }).then((_response: AxiosResponse) => {
      return this.processSinglebook(_response);
    });
  }

  protected processSinglebook(response: AxiosResponse): Promise<any> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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
  CancelOrdersXgame(body: XGameOrderCancelModel | undefined, cancelToken?: CancelToken | undefined): Promise<BettingResponse> {
    let url_
    if(_window().cancelorders){
      url_ = this.baseUrl + _window().cancelorders
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
      return this.processCancelordersPost(_response);
    });
  }

  protected processCancelordersPost(response: AxiosResponse): Promise<BettingResponse> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
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
    * order placed in exchange game
    * @param body (optional) all inputs are required
    * @return Success
    */
  ordersplacedPost(body: any | undefined, cancelToken?: CancelToken | undefined): Promise<any> {
    let url_
    if(_window().ordersplacedxg){
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
      return this.processOrdersplacedPost(_response);
    });
  }

  protected processOrdersplacedPost(response: AxiosResponse): Promise<BettingResponse> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
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
   * Exchange Game Current Bets
   * @param body (optional) Channel id, marketid, roundNo and Game id
   * @return Success
   */
  CurrentbetsXGame(body: XGameCurrentBetsInput | undefined, cancelToken?: CancelToken | undefined): Promise<CurrentBetsGame[]> {
    let url_
    if(_window().currentbetsxg){
      url_ = this.baseUrl + _window().currentbetsxg
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
      return this.processCurrentbetsPost(_response);
    });
  }

  protected processCurrentbetsPost(response: AxiosResponse): Promise<CurrentBetsGame[]> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(CurrentBetsGame.fromJS(item));
      }
      else {
        result200 = <any>null;
      }
      return result200;
    } else {
      const _responseText = response.data;
      let resultdefault: any = null;
      let resultDatadefault = _responseText;
      resultdefault = ProblemDetails.fromJS(resultDatadefault);
      return throwException("Error", status, _responseText, _headers, resultdefault);
    }
  }

  ClientPositionXgame(body: ClientPosXgameInput | undefined, cancelToken?: CancelToken | undefined): Promise<UserPosition[]> {
    let url_
    if(_window().clientpositionxg){
      url_ = this.baseUrl + _window().clientpositionxg
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
      return this.processClientPositionXgame_POST(_response);
    });
  }

  protected processClientPositionXgame_POST(response: AxiosResponse): Promise<UserPosition[]> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(UserPosition.fromJS(item));
      }
      else {
        result200 = <any>null;
      }
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
  walletXgame(body: string | undefined, cancelToken?: CancelToken | undefined): Promise<ClientWallet> {
    let url_
    if(_window().walletxg){
      url_ = this.baseUrl + _window().walletxg
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
      return this.processWallet_POST2(_response);
    });
  }

  protected processWallet_POST2(response: AxiosResponse): Promise<ClientWallet> {
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
      if(_responseText.message=='UNAUTHRORIZED' &&   _responseText.status==false && _responseText.code!==200){
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        this.storageService.secureStorage.removeItem('token');
        return throwException("Error", _responseText.code, _responseText, _headers, _responseText.message);
      }
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = ClientWallet.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      return throwException("Error", status, _responseText, _headers);
    }
  }

}



/** Game Detail */
export class XGameDetail implements IXGameDetail {
  /** Game Name */
  gameName!: string;
  /** Market Type */
  marketType!: string;
  /** Selection type */
  selectionType!: string;

  constructor(data?: IXGameDetail) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.gameName = _data["gameName"] !== undefined ? _data["gameName"] : <any>null;
      this.marketType = _data["marketType"] !== undefined ? _data["marketType"] : <any>null;
      this.selectionType = _data["selectionType"] !== undefined ? _data["selectionType"] : <any>null;
    }
  }

  static fromJS(data: any): XGameDetail {
    data = typeof data === 'object' ? data : {};
    let result = new XGameDetail();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["gameName"] = this.gameName !== undefined ? this.gameName : <any>null;
    data["marketType"] = this.marketType !== undefined ? this.marketType : <any>null;
    data["selectionType"] = this.selectionType !== undefined ? this.selectionType : <any>null;
    return data;
  }
}

/** Game Detail */
export interface IXGameDetail {
  /** Game Name */
  gameName: string;
  /** Market Type */
  marketType: string;
  /** Selection type */
  selectionType: string;
}


export class XGameList implements IXGameList {
  /** Game Type */
  gameName!: string;
  /** All channel with in a Game Type */
  childs!: XGaming[];

  routerLink: string = "";


  constructor(data?: IXGameList) {

    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.childs = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.gameName = _data["gameName"] !== undefined ? _data["gameName"] : <any>null;
      if (Array.isArray(_data["childs"])) {
        this.childs = [] as any;
        if (_data["childs"].length == 1) {

          this.routerLink = `games/${_data.gameName.replace(/\s/g, "").toLocaleLowerCase()}/${_data.childs[0].channelId}`;
          this.childs = [];
        } else {
          for (let item of _data["childs"]) {
            if (item.isStandard) {
              this.routerLink = `games/${_data.gameName.replace(/\s/g, "").toLocaleLowerCase()}/${_data.childs[0].channelId}`;
              this.childs!.push(XGaming.fromJS(item, _data.gameName));
            } else {
              this.childs!.push(XGaming.fromJS(item, _data.gameName));
            }
          }
        }
      } else {
        this.childs = <any>null;
      }
    }
  }

  static fromJS(data: any): XGameList {
    data = typeof data === 'object' ? data : {};
    let result = new XGameList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["gameName"] = this.gameName !== undefined ? this.gameName : <any>null;
    if (Array.isArray(this.childs)) {
      data["childs"] = [];
      for (let item of this.childs)
        data["childs"].push(item.toJSON());
    }
    return data;
  }
}

export interface IXGameList {
  /** Game Type */
  gameName: string;
  /** All channel with in a Game Type */
  childs: XGaming[];
}


/** Filter for Xgame Result */
export class Results implements IResults {
  /** Channel Id */
  channelId!: number;
  /** Start Record number start from 1 desc */
  startRecord!: number;
  /** Maximum 5 markets */
  endRecord!: number;

  constructor(c: number, s: number = 0, e: number = 5) {
    this.channelId = c;
    this.startRecord = s;
    this.endRecord = e;
  }
}

/** Filter for Xgame Result */
export interface IResults {
  /** Channel Id */
  channelId: number;
  /** Start Record number start from 1 desc */
  startRecord: number;
  /** Maximum 5 markets */
  endRecord: number;
}


export class XGaming implements IXGaming {
  /** Xgame Channel id */
  channelId!: number;
  /** Game is trubo or Standard */
  isStandard!: boolean;
  routerLink: string = "";

  constructor(data?: IXGaming) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.channelId = _data["channelId"] !== undefined ? _data["channelId"] : <any>null;
      this.isStandard = _data["isStandard"] !== undefined ? _data["isStandard"] : <any>null;

    }
  }

  static fromJS(data: any, gn: string = ""): XGaming {
    data = typeof data === 'object' ? data : {};
    let result = new XGaming();
    result.init(data);
    result.routerLink = `games/${gn.replace(/\s/g, "").toLocaleLowerCase()}/${data.channelId}`;
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["channelId"] = this.channelId !== undefined ? this.channelId : <any>null;
    data["isStandard"] = this.isStandard !== undefined ? this.isStandard : <any>null;
    return data;
  }
}

export interface IXGaming {
  /** Xgame Channel id */
  channelId: number;
  /** Game is trubo or Standard */
  isStandard: boolean;
}


/** Single Market Book */
export class XGameSingleBook implements IXGameSingleBook {
  /** Channel ID */
  channelId!: number;
  /** Selection Type */
  selectionType!: string;

  constructor(channelid: number, selectiontype: string) {
    this.channelId = channelid;
    this.selectionType = selectiontype;
  }

}

/** Single Market Book */
export interface IXGameSingleBook {
  /** Channel ID */
  channelId: number;
  /** Selection Type */
  selectionType: string;
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
      this.status = _data["status"];
      this.message = _data["message"];
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
    data["status"] = this.status;
    data["message"] = this.message;
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

  constructor(m: string, r: number, currencyCode: string, id: number[]) {
    this.marketId = m;
    this.roundNo = r;
    this.currency = currencyCode;
    this.betIds = id;
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
  selectionId?: number;
  /** channel id */
  channelId?: number;
  /** Round no */
  roundNo?: number;
  /** market Id */
  marketId?: number;
  /** price */
  price?: number;
  /** size */
  size?: number;
  /** bet type */
  betType?: string | undefined;
  /** currency */
  currency?: string | undefined;
  /** keep alive not required */
  keepAlive?: boolean;
  /** game id */
  gameId?: number;
  /** selection type */
  selectionType?: string | undefined;
  /** commission rate */
  commissionRate?: number;
  /** market type */
  marketType?: string | undefined;

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
      this.selectionId = _data["selectionId"];
      this.channelId = _data["channelId"];
      this.roundNo = _data["roundNo"];
      this.marketId = _data["marketId"];
      this.price = _data["price"];
      this.size = _data["size"];
      this.betType = _data["betType"];
      this.currency = _data["currency"];
      this.keepAlive = _data["keepAlive"];
      this.gameId = _data["gameId"];
      this.selectionType = _data["selectionType"];
      this.commissionRate = _data["commissionRate"];
      this.marketType = _data["marketType"];
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
    data["selectionId"] = this.selectionId;
    data["channelId"] = this.channelId;
    data["roundNo"] = this.roundNo;
    data["marketId"] = this.marketId;
    data["price"] = this.price;
    data["size"] = this.size;
    data["betType"] = this.betType;
    data["currency"] = this.currency;
    data["keepAlive"] = this.keepAlive;
    data["gameId"] = this.gameId;
    data["selectionType"] = this.selectionType;
    data["commissionRate"] = this.commissionRate;
    data["marketType"] = this.marketType;
    return data;
  }
}

/** Order Place Model X game */
export interface IOrderPlaceModel {
  /** Selection Id or Runner Id */
  selectionId?: number;
  /** channel id */
  channelId?: number;
  /** Round no */
  roundNo?: number;
  /** market Id */
  marketId?: number;
  /** price */
  price?: number;
  /** size */
  size?: number;
  /** bet type */
  betType?: string | undefined;
  /** currency */
  currency?: string | undefined;
  /** keep alive not required */
  keepAlive?: boolean;
  /** game id */
  gameId?: number;
  /** selection type */
  selectionType?: string | undefined;
  /** commission rate */
  commissionRate?: number;
  /** market type */
  marketType?: string | undefined;
}

/** Request body Input Model */
export class XGameCurrentBetsInput implements IXGameCurrentBetsInput {
  /** Game Id */
  gameId!: number;
  /** Market Id */
  marketId!: number;
  /** channel id */
  channelId!: number;
  /** Round No */
  roundNo!: number;

  constructor(g: number, m: number, c: number, r: number) {
    this.gameId = g;
    this.marketId = m;
    this.channelId = c;
    this.roundNo = r;
  }


}

/** Request body Input Model */
export interface IXGameCurrentBetsInput {
  /** Game Id */
  gameId: number;
  /** Market Id */
  marketId: number;
  /** channel id */
  channelId: number;
  /** Round No */
  roundNo: number;
}

/** Exchange Game Current Bets */
export class CurrentBetsGame implements ICurrentBetsGame {
  /** Bet Status */
  betStatus!: string;
  /** Market Id */
  marketId!: string;
  /** Bet Id */
  betId!: string;
  /** Selection id or Runner Id */
  selectionId!: number;
  /** Runner Name or Selection Name */
  runnerName!: string;
  /** Side BACK OR LAY */
  side!: string;
  /** Bet Price */
  betPrice!: number;
  /** Bet Size */
  betSize!: number;
  /** Bet Value */
  betVal!: number;
  /** Round Number */
  roundNo!: number;
  /** Game Id */
  gameId!: number;
  /** channel id */
  channelId!: number;

  /** pending cancel bets */
  pending!: boolean;

  constructor(data?: ICurrentBetsGame) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.betStatus = _data["betStatus"];
      this.marketId = _data["marketId"];
      this.betId = _data["betId"];
      this.selectionId = _data["selectionId"];
      this.runnerName = _data["runnerName"].replace(/\s/g, "").toLowerCase();
      this.side = _data["side"];
      this.betPrice = _data["betPrice"];
      this.betSize = _data["betSize"];
      this.betVal = _data["betVal"];
      this.roundNo = _data["roundNo"];
      this.gameId = _data["gameId"];
      this.channelId = _data["channelId"];
    }
  }

  static fromJS(data: any): CurrentBetsGame {
    data = typeof data === 'object' ? data : {};
    let result = new CurrentBetsGame();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["betStatus"] = this.betStatus;
    data["marketId"] = this.marketId;
    data["betId"] = this.betId;
    data["selectionId"] = this.selectionId;
    data["runnerName"] = this.runnerName.replace(/\s/g, "").toLowerCase();
    data["side"] = this.side;
    data["betPrice"] = this.betPrice;
    data["betSize"] = this.betSize;
    data["betVal"] = this.betVal;
    data["roundNo"] = this.roundNo;
    data["gameId"] = this.gameId;
    data["channelId"] = this.channelId;
    return data;
  }
}

/** Exchange Game Current Bets */
export interface ICurrentBetsGame {
  /** Bet Status */
  betStatus: string;
  /** Market Id */
  marketId: string;
  /** Bet Id */
  betId: string;
  /** Selection id or Runner Id */
  selectionId: number;
  /** Runner Name or Selection Name */
  runnerName: string;
  /** Side BACK OR LAY */
  side: string;
  /** Bet Price */
  betPrice: number;
  /** Bet Size */
  betSize: number;
  /** Bet Value */
  betVal: number;
  /** Round Number */
  roundNo: number;
  /** Game Id */
  gameId: number;
  /** channel id */
  channelId: number;
}


export class XgameNow implements IXgameNow {
  gameName!: string;
  /** Xgame Channel id */
  channelId!: number;
  /** Game is trubo or Standard */
  isStandard!: boolean;
  routerLink: string = "";
  constructor(data?: IXgameNow) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.gameName = _data["gameName"].replace(' ','').toLowerCase();
      this.channelId = _data["channelId"];
      this.isStandard = _data["isStandard"];
      this.routerLink = this.routerLink = `games/${_data["gameName"].replace(/\s/g, "").toLocaleLowerCase()}/${_data.channelId}`;
    }
  }

  static fromJS(data: any): XgameNow {
    data = typeof data === 'object' ? data : {};
    let result = new XgameNow();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["gameName"] = this.gameName;
    data["channelId"] = this.channelId;
    data["isStandard"] = this.isStandard;
    return data;
  }
}

export interface IXgameNow {
  gameName: string;
  /** Xgame Channel id */
  channelId: number;
  /** Game is trubo or Standard */
  isStandard: boolean;
}



export class ClientPosXgameInput implements IClientPosXgameInput {
  gameId?: number;
  channelId?: number;
  marketId?: number;

  constructor(gameid: number, channelid: number, marketid: number) {
    this.gameId = gameid;
    this.channelId = channelid;
    this.marketId = marketid;
  }


}

export interface IClientPosXgameInput {
  gameId?: number;
  channelId?: number;
  marketId?: number;
}


export class UserPosition implements IUserPosition {
  /** Market Id */
  marketId!: string;
  /** selection id or runner id is same */
  runnerId!: number;
  /** Liability on current runner */
  position!: number;
  /** Liability on current runner */
  liability!: number;
  /** Runner Position */
  rPosition!: number;
  /** Runner Liability */
  rLiability!: number;

  constructor(data?: IUserPosition) {
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
      this.runnerId = _data["runnerId"];
      this.position = _data["position"];
      this.liability = _data["liability"];
      this.rPosition = _data["rPosition"];
      this.rLiability = _data["rLiability"];
    }
  }

  static fromJS(data: any): UserPosition {
    data = typeof data === 'object' ? data : {};
    let result = new UserPosition();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketId"] = this.marketId;
    data["runnerId"] = this.runnerId;
    data["position"] = this.position;
    data["liability"] = this.liability;
    data["rPosition"] = this.rPosition;
    data["rLiability"] = this.rLiability;
    return data;
  }
}

export interface IUserPosition {
  /** Market Id */
  marketId: string;
  /** selection id or runner id is same */
  runnerId: number;
  /** Liability on current runner */
  position: number;
  /** Liability on current runner */
  liability: number;
  /** Runner Position */
  rPosition: number;
  /** Runner Liability */
  rLiability: number;
}


export class XgameInputModel implements IXgameInputModel {
  gameId!: number;
  marketId!: number;
  channelId!: number;

  constructor(gameid: number, marketid: number, channelid: number) {
    this.gameId = gameid;
    this.marketId = marketid;
    this.channelId = channelid;
  }

}

export interface IXgameInputModel {
  gameId: number;
  marketId: number;
  channelId: number;
}

export class XGameDetails implements IXGameDetails {
  /** Game Name */
  gameName!: string;
  markets!: XSelections[];

  constructor(data?: IXGameDetails) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.markets = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.gameName = _data["gameName"];
      if (Array.isArray(_data["markets"])) {
        this.markets = [] as any;
        for (let item of _data["markets"])
          this.markets!.push(XSelections.fromJS(item));
      }
    }
  }

  static fromJS(data: any): XGameDetails {
    data = typeof data === 'object' ? data : {};
    let result = new XGameDetails();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["gameName"] = this.gameName;
    if (Array.isArray(this.markets)) {
      data["markets"] = [];
      for (let item of this.markets)
        data["markets"].push(item.toJSON());
    }
    return data;
  }
}

export interface IXGameDetails {
  /** Game Name */
  gameName: string;
  markets: XSelections[];
}

export class XSelections implements IXSelections {
  /** Market Type */
  marketType!: string;
  /** Selection type */
  selectionType!: string;

  constructor(data?: IXSelections) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.marketType = _data["marketType"];
      this.selectionType = _data["selectionType"];
    }
  }

  static fromJS(data: any): XSelections {
    data = typeof data === 'object' ? data : {};
    let result = new XSelections();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketType"] = this.marketType;
    data["selectionType"] = this.selectionType;
    return data;
  }
}

export interface IXSelections {
  /** Market Type */
  marketType: string;
  /** Selection type */
  selectionType: string;
}
