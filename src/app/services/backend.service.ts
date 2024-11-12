import { AxiosError } from 'axios';
import { ToastService } from 'src/app/services/toast.service';
import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
} from 'axios';
import { environment } from 'src/environments/environment';
import {
  AccountStatementSubReport,
  AccountstmtInputModel,
  AccountstmtModel,
  ActivityLogs,
  AllFancyData,
  AuthenticateRequest,
  BettingResponse,
  CancellAllOrders,
  CancelOrders,
  CasinoBetsInputModel,
  CasinoOrders,
  ChangePassword,
  CheckUserNameModel,
  ClientBankAccountsWithKYC,
  ClientGetPhoneNumber,
  ClientkBankAccounts,
  ClientkBankAccountsResponse,
  ClientParameters,
  ClientPosition,
  ClientPosXgameInput,
  ClientStake,
  ClientStakes,
  ClientWallet,
  ClientWalletModel,
  CreatePaymentResp,
  CurrentBetResp,
  CurrentBets,
  CurrentBetsGame,
  CurrentBetsGameAll,
  CurrentBetsInput,
  CurrentBetsModel,
  CustomMenu,
  CustomTreeModel,
  DefaultInplay,
  DirectEvents,
  EventMarkets,
  EventTypeRaces,
  EventTypeSS,
  ExceptionResponse,
  FancyMarketLiabilty,
  FancyModel,
  FileParameter,
  GreezPaymentResponse,
  GrezPayInputModel,
  IPAddressForBetIds,
  isAxiosError,
  KYCResponse,
  LineLiablityMulti,
  LineMarket,
  LocalMarketBet,
  ManualPayamentHistoryResponse,
  MarketBook, MarketCatalogueSS,
  MarketDetail,
  MarketOrders,
  MatchedUnmatched,
  MatchUnModel,
  Menu,
  MultilevelMenu,
  MyBetsInputModel,
  MyMarket,
  NewPasswordOTP,
  OrderPlaceModel,
  OthersMarkets,
  PaymentRequestModel,
  PendingWithdrawRequests,
  PLInner,
  PLInnerInput,
  PLInnerSub,
  PLModel,
  PreparedForPyamentModel,
  ProblemDetails, RaceCountry,
  RaceDate,
  RaceEvents, RaceNumber, RaceTrack,
  RequetedAmount,
  ResetPasswordResponse,
  Results,
  SignupModel,
  SignupOTPModal,
  SignupWhitelabelModel,
  SignupWithOTPModal,
  SignupWithOTPResponse,
  SportsBettingModel, SportsBookModelSingle,
  SportsResult,
  throwException,
  UserPhoneCheckingForOTP,
  UserPosition,
  XGameCurrentBetsInput,
  XGameDetail,
  XGameDetails,
  XgameInputModel,
  XgameNow,
  XGameOrderCancelModel,
  XGameSingleBook,
} from '../models/models';
import { AxiosinstanceService } from './axiosinstance.service';
import { GoogleAnalyticsService } from './google-analytics.service';
import { SportsIdMapperService } from "./sportsIdMapper.service";
import { sportsIdMap } from "./sportsEnum";
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private instance: AxiosInstance;
  private baseUrl: string = environment.apiurl;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;
  gameUrl?: undefined;

  constructor(
    private Instance: AxiosinstanceService,
    private toastService: ToastService,
    public googleAnalyticsService: GoogleAnalyticsService,
    private sportsMapperService: SportsIdMapperService
  ) {
    //if(baseHref.length<5){
    this.baseUrl = environment.apiurl;
    // }else{
    //   this.baseUrl =baseHref;
    // }
    this.instance = Instance.getInstance();
  }

  slugifyName(name: string) {
    return name
      .toLowerCase()
      .trim()
      .split(' ')
      .join('-')
      .replace(/[^a-z0-9-]/g, '')
      .replace('-v-', '-vs-')
  }

  /**
   * @param body (optional)
   * @return Success
   */
  changePassword_POST(
    body: ChangePassword | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/changepassword';
    url_ = url_.replace(/[?&]$/, '');

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
        return this.processChangePasswordFirstTime_POST(_response);
      });
  }

  protected processChangePasswordFirstTime_POST(
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
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return Promise.resolve<BettingResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  TvOnBookmaker(
    id: number,
    cancelToken?: CancelToken | undefined
  ): Promise<EventTv> {
    let url_ = this.baseUrl + '/exchangeapi/client/withoutbftv/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processTvOnBookmaker(_response);
      });
  }

  protected processTvOnBookmaker(response: AxiosResponse): Promise<EventTv> {
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
      result200 = EventTv.fromJS(resultData200);
      return Promise.resolve<EventTv>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  setFavourite(
    id: number,
    gameId: number,
    cancelToken?: CancelToken | undefined
  ): Promise<EventTv> {
    let url_ = this.baseUrl + '/exchangeapi/client/{marketId}/faviourts/{id}';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace('{marketId}', encodeURIComponent('' + gameId));
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processsetFavourite(_response);
      });
  }


  protected processsetFavourite(response: AxiosResponse): Promise<EventTv> {
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
      result200 = EventTv.fromJS(resultData200);
      return Promise.resolve<EventTv>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  sportsBookCall(
    eventid: number,
    from: string,
    cancelToken?: CancelToken | undefined
  ): Promise<SportsBookMarkets[]> {
    let url_;
    if (_window().sportsbookgetdata) {
      if (eventid === undefined || eventid === null)
        throw new Error("The parameter 'eventid' must be defined.");
      url_ = _window().sportsbookgetdata + eventid;
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
        return this.processsportsBookCall_GET(_response);
      });
  }

  protected processsportsBookCall_GET(
    response: AxiosResponse
  ): Promise<SportsBookMarkets[]> {
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(SportsBookMarkets.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else {
      const _responseText = response.data;
      this.googleAnalyticsService.recordExceptions(response);
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Sign up code

  signupOTPRequest_POST(
    body: SignupWithOTPModal | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<SignupWithOTPResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/signup';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
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
        return this.processSignupOTPRequest_POST(_response);
      });
  }

  protected processSignupOTPRequest_POST(
    response: AxiosResponse
  ): Promise<SignupWithOTPResponse> {
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
      result200 = SignupWithOTPResponse.fromJS(resultData200);
      return Promise.resolve<SignupWithOTPResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Sign up code

  // SignUpOTPRequest

  signupOTPRequest_POST2(
    body: SignupOTPModal | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<SignupWithOTPModal> {
    let url_ = this.baseUrl + '/exchangeapi/client/signupotp';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
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
        return this.processSignupOTPRequest_POST2(_response);
      });
  }

  protected processSignupOTPRequest_POST2(
    response: AxiosResponse
  ): Promise<SignupWithOTPModal> {
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // SignUpOTPRequest

  // SignUp Final Registration Step

  signupOTPRequest_POST3(
    body: SignupModel | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<SignupModel> {
    let url_ = this.baseUrl + '/exchangeapi/client/signuprequest';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
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
        return this.processSignupOTPRequest_POST3(_response);
      });
  }

  protected processSignupOTPRequest_POST3(
    response: AxiosResponse
  ): Promise<SignupModel> {
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // SignUp Final Registration Step

  // Get payment Gateway

  getDepositDetails(
    type: string | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_ = this.baseUrl + _window().getbankdetail;
    url_ = url_.replace(/[?&]$/, '');
    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        type: type,
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
        return this.processgetDepositDetails(_response);
      });
  }

  protected processgetDepositDetails(response: AxiosResponse): Promise<any> {
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
      // result200 = depositDetailsModel.fromJS(resultData200);
      return Promise.resolve(resultData200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }
  // Get payment Gateway

  getGetConfig(cancelToken?: CancelToken | undefined): Promise<any> {
    //
    let url_ = this.baseUrl + '/exchangeapi/website/GetConfig';
    url_ = url_.replace(/[?&]$/, '');
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
        return this.processGetConfig(_response);
      });
  }

  protected processGetConfig(response: AxiosResponse): Promise<any> {
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
      // result200 = depositDetailsModel.fromJS(resultData200);
      return Promise.resolve(resultData200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }
  // Post Payment Gateway

  // Post Payment Gateway

  pyamentgetway_POST(
    body: PaymentRequestModel | undefined,
    requestUrl: string,
    cancelToken?: CancelToken | undefined
  ): Promise<CreatePaymentResp> {
    let url_;
    if (requestUrl) {
      url_ = this.baseUrl + requestUrl;
      url_ = url_.replace(/[?&]$/, '');
    }
    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
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
        return this.processPyamentgetway_POST(_response);
      });
  }

  protected processPyamentgetway_POST(
    response: AxiosResponse
  ): Promise<CreatePaymentResp> {
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
      result200 = CreatePaymentResp.fromJS(resultData200);
      return Promise.resolve<CreatePaymentResp>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Post Payment Gateway

  pyamentgetway_GET(
    cancelToken?: CancelToken | undefined
  ): Promise<PreparedForPyamentModel> {
    let url_ = this.baseUrl + '/exchangeapi/client/prepareforpayment';
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processPyamentgetway_GET(_response);
      });
  }

  protected processPyamentgetway_GET(
    response: AxiosResponse
  ): Promise<PreparedForPyamentModel> {
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
      result200 = PreparedForPyamentModel.fromJS(resultData200);
      return Promise.resolve<PreparedForPyamentModel>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Get payment Gateway

  // manualPaymentPost
  manualPayment_POST(
    file: FileParameter | undefined,
    amount: number | undefined,
    paymentMethod: string | undefined,
    transactoinId: string | undefined,
    recap?: string,
    bnkId?: any,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_ = this.baseUrl + '/exchangeapi/client/manualpayment';
    url_ = url_.replace(/[?&]$/, '');
    const content_ = new FormData();
    if (file === null || file === undefined)
      throw new Error("The parameter 'file' cannot be null.");
    else
      content_.append(
        'File',
        file.data,
        file.fileName ? file.fileName : 'File'
      );
    if (amount === null || amount === undefined)
      throw new Error("The parameter 'amount' cannot be null.");
    else content_.append('Amount', amount.toString());
    if (paymentMethod === null || paymentMethod === undefined)
      throw new Error("The parameter 'paymentMethod' cannot be null.");
    else content_.append('PaymentMethod', paymentMethod.toString());
    if (transactoinId === null || transactoinId === undefined)
      throw new Error("The parameter 'transactoinId' cannot be null.");
    else content_.append('TransactoinId', transactoinId.toString());
    if (bnkId) {
      if (bnkId === null || bnkId === undefined)
        throw new Error("The parameter 'Id' cannot be null.");
      else content_.append('id', bnkId.toString());
    }
    if (recap === null || recap === undefined)
      throw new Error("The parameter 'recap' cannot be null.");
    else content_.append('recaptcha', recap.toString());
    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
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
        return this.processManualPayment_POST(_response);
      });
  }

  protected processManualPayment_POST(response: AxiosResponse): Promise<any> {
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
      return response.data;
      let resultData200 = _responseText;
      result200 = ExceptionResponse.fromJS(resultData200);
      return Promise.resolve<ExceptionResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }
  // manualPaymentPost

  manualPaymentStatus(id, component, cancelToken?: CancelToken | undefined) {
    let url_;
    if (_window().manualpaymentstatus) {
      url_ = this.baseUrl + _window().manualpaymentstatus;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }
    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
        Accept: 'application/json',
        from: component,
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
        return this.manualPaymentStatus_GET(_response);
      });
  }

  protected manualPaymentStatus_GET(response: AxiosResponse): Promise<any> {
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
      result200 = KYCResponse.fromJS(resultData200);
      return Promise.resolve<KYCResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  searchCasinoPost(
    body: any | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_ = this.baseUrl + '/exchangeapi/casino/games/search';
    url_ = url_.replace(/[?&]$/, '');

    // const content_ = JSON.stringify(body);
    let options_: AxiosRequestConfig = {
      data: body,
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
        return this.processSearchCasinoPost(_response);
      });
  }

  protected processSearchCasinoPost(response: AxiosResponse): Promise<any> {
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
      result200 = resultData200;
      return Promise.resolve<any>(result200);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Client KYC

  clientKYC_POST(
    file: FileParameter | undefined,
    paymentMethod: string | undefined,
    recap: string,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/addclientkyc';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (file === null || file === undefined)
      throw new Error("The parameter 'file' cannot be null.");
    else
      content_.append(
        'File',
        file.data,
        file.fileName ? file.fileName : 'File'
      );
    if (paymentMethod === null || paymentMethod === undefined)
      throw new Error("The parameter 'paymentMethod' cannot be null.");
    else content_.append('PaymentMethod', paymentMethod.toString());
    if (recap === null || recap === undefined)
      throw new Error("The parameter 'recap' cannot be null.");
    else content_.append('recaptcha', recap.toString());
    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
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
        return this.processClientKYC_POST(_response);
      });
  }

  protected processClientKYC_POST(
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
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return Promise.resolve<BettingResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  CheckKYC(
    component: any,
    cancelToken?: CancelToken | undefined
  ): Promise<KYCResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/checkkyc';
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
        Accept: 'application/json',
        from: component,
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
        return this.processClientKYC_GET(_response);
      });
  }

  protected processClientKYC_GET(
    response: AxiosResponse
  ): Promise<KYCResponse> {
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
      result200 = KYCResponse.fromJS(resultData200);
      return Promise.resolve<KYCResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }
  /**
   * @param body (optional)
   * @return Success
   */
  changePassword_First(
    body: ChangePassword,

  ): Promise<BettingResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/changepasswordfirst';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_ = <AxiosRequestConfig>{
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        seconds: sessionStorage.getItem('token'),
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
        return this.processChangePassword_POST2(_response);
      });
  }

  protected processChangePassword_POST2(
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
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return Promise.resolve<BettingResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  GetNews(cancelToken?: CancelToken | undefined): Promise<string> {
    let url_;
    if (_window().getnews) {
      url_ = this.baseUrl + _window().getnews;
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processNews_GET(_response);
      });
  }

  protected processNews_GET(response: AxiosResponse): Promise<string> {
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
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
      return result200;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  GetxGameDetails(
    id: number,
    cancelToken?: CancelToken | undefined
  ): Promise<XGameDetails> {
    let url_;
    if (_window().getxgdetails) {
      url_ = this.baseUrl + _window().getxgdetails;
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
        return this.processXGameDetailGET(_response);
      });
  }

  protected processXGameDetailGET(
    response: AxiosResponse
  ): Promise<XGameDetails> {
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
      result200 = XGameDetails.fromJS(resultData200);
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }
  GetNextRace(
    from: string,
    cancelToken?: CancelToken | undefined
  ): Promise<NextRaceWithStatus[]> {
    let url_;
    if (_window().nextrace) {
      url_ = this.baseUrl + _window().nextrace;
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        Accept: 'application/json',
        FROM: from,
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
        return this.processNextRace(_response);
      });
  }

  protected processNextRace(
    response: AxiosResponse
  ): Promise<NextRaceWithStatus[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(NextRaceWithStatus.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * @return Success
   */
  GetTv(cancelToken?: CancelToken | undefined): Promise<TVResponseToClient> {
    let url_;
    if (_window().gettv) {
      url_ = this.baseUrl + _window().gettv;
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processTV_GET(_response);
      });
  }

  protected processTV_GET(
    response: AxiosResponse
  ): Promise<TVResponseToClient> {
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
        console.error(_responseText.message);
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
      result200 = TVResponseToClient.fromJS(resultData200);
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * Order cancel in local Market
   * @param body (optional) all inputs are required
   * @return Success
   */
  matchUnmatchAllSports(
    body: MatchUnModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MatchedUnmatched> {
    let url_;
    if (_window().matchunmatchallsports) {
      url_ = this.baseUrl + _window().matchunmatchallsports;
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
        return this.processMatchUnmatchAllSports(_response);
      });
  }

  protected processMatchUnmatchAllSports(
    response: AxiosResponse
  ): Promise<MatchedUnmatched> {
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
        console.error(_responseText.message);
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
      result200 = MatchedUnmatched.fromJS(resultData200);
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * Other then Soccer
   * @param id Event id
   * @return Success
   */
  timeLine2(
    id: number,
    from: string,
    cancelToken?: CancelToken | undefined
  ): Promise<void> {
    let url_;
    if (_window().timeline2) {
      url_ = this.baseUrl + _window().timeline2;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processTimeLine_GET(_response);
      });
  }

  protected processTimeLine_GET(response: AxiosResponse): Promise<void> {
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
        console.error(_responseText.message);
        return throwException(
          'Error',
          _responseText.code,
          _responseText,
          _headers,
          _responseText.message
        );
      }
      return _responseText;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * For Football only
   * @param id Event id
   * @return Success
   */
  timeLineNew1(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<void> {
    let url_;
    if (_window().timeline1) {
      url_ = this.baseUrl + _window().timeline1;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processTimeLineNew_GET(_response);
      });
  }

  protected processTimeLineNew_GET(response: AxiosResponse): Promise<void> {
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
        console.error(_responseText.message);
        return throwException(
          'Error',
          _responseText.code,
          _responseText,
          _headers,
          _responseText.message
        );
      }
      //return Promise.resolve<void>(<any>null);
      return _responseText;
    } else {
      const _responseText = response.data;
      return throwException(
        'An unexpected server error occurred.',
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<void>(<any>null);
  }

  ModifiedScore(data: any): any {
    if (data) {
      // football
      if (data.eventTypeId === 1) {
        return {
          time: data.timeElapsed,
          home: data.score.home.score,
          away: data.score.away.score,
        };
      } else if (data.eventTypeId === 2) {
        let home = {};
        let away = {};
        if (data.score.home) {
          let { sets, games, score } = data.score.home;
          home = { sets, games, score };
        }
        if (data.score.away) {
          let { sets, games, score } = data.score.away;
          away = { sets, games, score };
        }
        return { home, away };
      } else if (data.eventTypeId === 7522) {
        let q = '';
        if (data.status) {
          q = data.status;

          if (data.matchStatus.toUpperCase().indexOf('FIRST') !== -1) {
            q = 'Q1';
          } else if (data.matchStatus.toUpperCase().indexOf('SECOND') !== -1) {
            q = 'Q2';
          } else if (data.matchStatus.toUpperCase().indexOf('THIRD') !== -1) {
            q = 'Q3';
          } else if (data.matchStatus.toUpperCase().indexOf('FOURTH') !== -1) {
            q = 'Q4';
          } else {
            q = 'Q';
          }
        }
        return {
          quarter: q,
          time: data.timeElapsed,
          home: data.score.home.score,
          away: data.score.away.score,
        };
      } else if (data.eventTypeId === 998917) {
        let home = {};
        let away = {};
        if (data.score.home) {
          let { sets, score } = data.score.home;
          home = { sets, score };
        }
        if (data.score.away) {
          let { sets, score } = data.score.away;
          away = { sets, score };
        }
        return { home, away };
      } else if (data.eventTypeId === 4) {
        if (data.matchType.toUpperCase() == 'TEST') {
          let home = {};
          let away = {};
          if (data.score.away.inning1) {
            let { runs, wickets } = data.score.away.inning1;
            away = { runs, wickets: wickets == 'ALL_OUT' ? '10' : wickets };
          }
          if (data.score.home.inning1) {
            let { runs, wickets } = data.score.home.inning1;
            home = { runs, wickets: wickets == 'ALL_OUT' ? '10' : wickets };
          }
          return { home, away };
        }
      } else if (data.eventTypeId === 3503) {
        let home = {};
        let away = {};
        if (data.score.home) {
          let { sets, score } = data.score.home;
          home = { sets, score };
        }
        if (data.score.away) {
          let { sets, score } = data.score.away;
          away = { sets, score };
        }
        return { home, away };
      } else if (data.eventTypeId === 5) {
        return {
          time: data.timeElapsed,
          home: data.score.home.score,
          away: data.score.away.score,
        };
      } else if (data.eventTypeId === 468328) {
        return {
          time: data.timeElapsed,
          home: data.score.home.score,
          away: data.score.away.score,
        };
      } else {
        //console.warn(data);
      }
    }
  }

  /**
   * @param body (optional)
   * @return Success
   */
  CasinoPOST(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<{ [key: string]: string }> {
    let url_;
    if (_window().casinopost) {
      url_ = this.baseUrl + _window().casinopost;
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
        return this.processCasino_POST(_response);
      });
  }

  protected processCasino_POST(
    response: AxiosResponse
  ): Promise<{ [key: string]: string }> {
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
        console.error(_responseText.message);
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
      if (resultData200) {
        result200 = {} as any;
        for (let key in resultData200) {
          if (resultData200.hasOwnProperty(key))
            (<any>result200)![key] = resultData200[key];
        }
      } else {
        result200 = <any>null;
      }
      return result200;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * @return Success
   */
  casinoGET(
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<{ [key: string]: string }> {
    let url_;
    if (_window().casinoget) {
      url_ = this.baseUrl + _window().casinoget;
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
        return this.processCasino_GET(_response);
      });
  }

  protected processCasino_GET(
    response: AxiosResponse
  ): Promise<{ [key: string]: string }> {
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
        console.error(_responseText.message);
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
      if (resultData200) {
        result200 = {} as any;
        for (let key in resultData200) {
          if (resultData200.hasOwnProperty(key))
            (<any>result200)![key] = resultData200[key];
        }
      } else {
        result200 = <any>null;
      }
      return result200;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }
  /**
   * Client Position Market wise
   * @param body (optional) Sports Market Id
   * @return Success
   */
  clientpositionsports(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<ClientPosition[]> {
    let url_;
    if (_window().clientpositionsports) {
      url_ = this.baseUrl + _window().clientpositionsports;
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
        return this.processClientPosition_POST(_response);
      });
  }

  protected processClientPosition_POST(
    response: AxiosResponse
  ): Promise<ClientPosition[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(ClientPosition.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Client Position Market wise
   * @param body (optional)
   * @return Success
   */
  ClientPositionFancy(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<FancyMarketLiabilty[]> {
    let url_;
    if (_window().clientpositionfancy) {
      url_ = this.baseUrl + _window().clientpositionfancy;
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
        return this.processClientPositionFancy_POST(_response);
      });
  }

  protected processClientPositionFancy_POST(
    response: AxiosResponse
  ): Promise<FancyMarketLiabilty[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(FancyMarketLiabilty.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else {
      const _responseText = response.data;
      return throwException(
        'An unexpected server error occurred.',
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<FancyMarketLiabilty[]>(<any>null);
  }
  /**
   * Fancy Market liability
   * @param eventid EventId
   * @return Success
   */
  FancyMarketsLiability(
    eventid: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<FancyMarketLiabilty[]> {
    let url_;
    if (_window().fancymarketsliability) {
      url_ = this.baseUrl + _window().fancymarketsliability;
      if (eventid === undefined || eventid === null)
        throw new Error("The parameter 'eventid' must be defined.");
      url_ = url_.replace('{eventid}', encodeURIComponent('' + eventid));
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
        return this.processFancyMarketsLiability_GET(_response);
      });
  }

  protected processFancyMarketsLiability_GET(
    response: AxiosResponse
  ): Promise<FancyMarketLiabilty[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(FancyMarketLiabilty.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }
  /**
   * Event Wise Current Bets in Race Event Markets
   * @param id (optional) Event Id
   * @return Success
   */
  localMarketCurrentBetsEventWise(
    id: number | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<CurrentBets[]> {
    let url_;
    if (_window().racemarketcurrentbets) {
      url_ = this.baseUrl + _window().racemarketcurrentbets;
      if (id === null) throw new Error("The parameter 'id' cannot be null.");
      else if (id !== undefined)
        url_ += 'id=' + encodeURIComponent('' + id) + '&';
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
        return this.processlocalMarketCurrentBetsEventWise(_response);
      });
  }

  protected processlocalMarketCurrentBetsEventWise(
    response: AxiosResponse
  ): Promise<CurrentBets[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(CurrentBets.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * Order cancel in local Market
   * @param body (optional)
   * @return Success
   */
  MatchUnmatchRace(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MatchedUnmatched[]> {
    let url_;
    if (_window().matchunmatchrace) {
      url_ = this.baseUrl + _window().matchunmatchrace;
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
        return this.processMatchUnmatchRace(_response);
      });
  }

  protected processMatchUnmatchRace(
    response: AxiosResponse
  ): Promise<MatchedUnmatched[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(MatchedUnmatched.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * Order cancel in local Market
   * @param body (optional)
   * @return Success
   */
  // SportsMatchUnmatch(body: string | undefined, cancelToken?: CancelToken | undefined): Promise<MatchedUnmatched> {
  //   let url_ = this.baseUrl + "/exchangeapi/sports/matchunmatch";
  //   url_ = url_.replace(/[?&]$/, "");

  //   const content_ = JSON.stringify(body);

  //   let options_ = <AxiosRequestConfig>{
  //     data: content_,
  //     method: "POST",
  //     url: url_,
  //     headers: {
  //       "Content-Type": "application/json",
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
  //     return this.processSportsMatchUnmatch(_response);
  //   });
  // }

  // protected processSportsMatchUnmatch(response: AxiosResponse): Promise<MatchedUnmatched> {
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
  //     result200 = MatchedUnmatched.fromJS(resultData200);
  //     return result200;
  //   } else {
  //     const _responseText = response.data;
  //     let resultdefault: any = null;
  //     let resultDatadefault = _responseText;
  //     resultdefault = ProblemDetails.fromJS(resultDatadefault);
  //     return throwException("Error", status, _responseText, _headers, resultdefault);
  //   }
  // }

  /**
   * Current bets sports
   * @param body (optional) Marketid, eventid
   * @return Success
   */
  localmarketcurrentbets(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<CurrentBets[]> {
    let url_;
    if (_window().localmarketcurrentbets) {
      url_ = this.baseUrl + _window().localmarketcurrentbets;
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
        return this.processLocalmarketcurrentbets(_response);
      });
  }

  protected processLocalmarketcurrentbets(
    response: AxiosResponse
  ): Promise<CurrentBets[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(CurrentBets.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Get Fancy Markets with Book maker
   * @param id Event id
   * @return Success
   */

  FancyMarketsAny(
    v: string,
    id: number,
    from: string,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_;
    if (_window().fancymarketsany) {
      if (_window().fancymarketsany.startsWith('http')) {
        url_ = _window().fancymarketsany;
      } else {
        url_ = this.baseUrl + _window().fancymarketsany + `/${v}/${id}`;
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
        return this.processFancyMarketsAny(_response);
      });
  }

  protected processFancyMarketsAny(response: AxiosResponse): Promise<any> {
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

  FancyMarketsV3(
    id: number,
    from: string,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_;
    if (_window().fancymarkets) {
      if (_window().fancymarkets.startsWith('http')) {
        url_ = _window().fancymarkets;
      } else {
        url_ = this.baseUrl + _window().fancymarkets;
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
        return this.processFancyMarketsV3(_response);
      });
  }

  protected processFancyMarketsV3(response: AxiosResponse): Promise<any> {
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
  LotteryOrdersplaced(
    body: FancyModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().lotteryordersplaced) {
      url_ = this.baseUrl + _window().lotteryordersplaced;
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
        return this.processLotteryOrdersplaced(_response);
      });
  }

  protected processLotteryOrdersplaced(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
  FancyMarkets(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<AllFancyData> {
    let url_;
    if (_window().fancymarkets) {
      if (_window().fancymarkets.startsWith('http')) {
        url_ = _window().fancymarkets;
      } else {
        url_ = this.baseUrl + _window().fancymarkets;
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
        return this.processFancyMarkets(_response);
      });
  }

  protected processFancyMarkets(
    response: AxiosResponse
  ): Promise<AllFancyData> {
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
        console.error(_responseText.message);
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
      result200 = AllFancyData.fromJS(resultData200);
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
   * @return Success
   */
  GetWallet(
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<ClientWallet> {
    let url_;
    if (_window().getwallet) {
      url_ = this.baseUrl + _window().getwallet;
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
        return this.processWallet(_response);
      });
  }

  /**
   * Market Book for multiple market id's
   * @param marketId (optional)
   * @param runnerId (optional)
   * @return Success
   */
  runnergraph(
    marketId: string | undefined,
    runnerId: number | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    if (marketId) {
      marketId = marketId.replace('1.', '');
    }
    let url_;
    if (_window().runnergraph) {
      url_ = this.baseUrl + _window().runnergraph;
      if (marketId === null)
        throw new Error("The parameter 'marketId' cannot be null.");
      else if (marketId !== undefined)
        url_ += 'marketId=' + encodeURIComponent('' + marketId) + '&';
      if (runnerId === null)
        throw new Error("The parameter 'runnerId' cannot be null.");
      else if (runnerId !== undefined)
        url_ += 'runnerId=' + encodeURIComponent('' + runnerId) + '&';
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
        return this.processRunnergraph(_response);
      });
  }

  protected processRunnergraph(response: AxiosResponse): Promise<any> {
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
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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
   * Fancy Market liability
   * @param body (optional)
   * @return Success
   */
  SportsMarketliability(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<LineLiablityMulti[]> {
    let url_;
    if (_window().sportsmarketliability) {
      url_ = this.baseUrl + _window().sportsmarketliability;
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
        return this.processSportsmarketliability(_response);
      });
  }

  protected processSportsmarketliability(
    response: AxiosResponse
  ): Promise<LineLiablityMulti[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(LineLiablityMulti.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Get My Markets of client
   * @return Success
   */
  MyMarkets(cancelToken?: CancelToken | undefined): Promise<MyMarket[]> {
    let url_;
    if (_window().mymarket) {
      url_ = this.baseUrl + _window().mymarket;
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processMymarkets(_response);
      });
  }

  protected processMymarkets(response: AxiosResponse): Promise<MyMarket[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(MyMarket.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * @return Success
   */
  SportAllMarketLibility(
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<LineLiablityMulti[]> {
    let url_;
    if (_window().allmarketsliability) {
      url_ = this.baseUrl + _window().allmarketsliability;
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
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
        return this.processSportAllMarketLibility(_response);
      });
  }

  protected processSportAllMarketLibility(
    response: AxiosResponse
  ): Promise<LineLiablityMulti[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(LineLiablityMulti.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * @return Success
   */
  currentBetsAll_GET(
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<CurrentBetsModel[]> {
    let url_;
    if (_window().currentbetsall) {
      url_ = this.baseUrl + _window().currentbetsall;
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
        return this.processCurrentBetsAll_GET(_response);
      });
  }

  protected processCurrentBetsAll_GET(
    response: AxiosResponse
  ): Promise<CurrentBetsModel[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(CurrentBetsModel.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * Current bets sports
   * @param body (optional) Marketid, eventid
   * @return Success
   */
  SportsCurrentbets(
    body: CurrentBetsInput | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<CurrentBets[]> {
    let url_;
    if (_window().sportscurrentbets) {
      url_ = this.baseUrl + _window().sportscurrentbets;
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
        return this.processCurrentbetsPost(_response);
      });
  }

  protected processCurrentbetsPost(
    response: AxiosResponse
  ): Promise<CurrentBets[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(CurrentBets.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * @param body (optional)
   * @return Success
   */
  racemarket(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MarketDetail> {
    let url_;
    if (_window().racemarket) {
      url_ = this.baseUrl + _window().racemarket;
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
        return this.processRacemarket(_response);
      });
  }

  protected processRacemarket(response: AxiosResponse): Promise<MarketDetail> {
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
        console.error(_responseText.message);
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
      result200 = MarketDetail.fromJS(resultData200);
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
   * @param body (optional)
   * @return Success
   */
  customtree(
    body: CustomTreeModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<CustomMenu> {
    let url_;
    if (_window().customtree) {
      url_ = this.baseUrl + _window().customtree;
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
        return this.processCustomtree(_response);
      });
  }

  protected processCustomtree(response: AxiosResponse): Promise<CustomMenu> {
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
        console.error(_responseText.message);
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
      result200 = CustomMenu.fromJS(resultData200);
      if (result200) {
        // console.log(window.location, ' <<<<<<<<<<< window location')
        if (window.location.pathname.includes('sports')) {
          if (result200.name) {
            if (result200.name.toLowerCase() == 'greyhound racing') {
              result200.url = '/' + 'grey-hound-racing/all'
            } else if (result200.name.toLowerCase() == 'horse racing') {
              result200.url = '/' + 'horse-racing/all'
            } else {
              result200.url = '/' + result200?.name.toLowerCase()
            }
          }
        } else {
          result200.url = '/sports/' + result200?.name.toLowerCase()
        }
      }
      if (result200.childs) {
        result200.childs.forEach((tournament: any) => {
          if (tournament.id == '12306853') {
            tournament.url = 'politics/usa-' + tournament.id + '/' + tournament.name.toLowerCase().trim().split(' ').join('-') + '-' + tournament.id
          } else {
            tournament.url = 'tournament/' + tournament.name.toLowerCase().trim().split(' ').join('-') + '-' + tournament.id
          }
          // console.log(tournament, ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< competitions here ++++++++++++++++++++++')
          if (tournament.childs) {
            tournament.childs.forEach((market: any) => {
              let marktName = market.name
                .toLowerCase()
                .trim()
                .split(' ')
                .join('-')
                .replace(/[^a-z0-9-]/g, '')
                .replace('-v-', '-vs-')
              if (market.detail && market.detail.includes('bookmaker') || market.id.length > 9) {
                if (market.id == '1721131733') {
                  market.url = '/politics/usa-1.176878927/presidential-elections-1.176878927'
                } else {
                  market.url = '/bookmaker/' + market.id + '/' + marktName + '-' + market.id;
                }
              } else {
                market.url = result200?.name.toLowerCase().trim() + '/' + marktName + '-' + market.id;
              }
              // console.log(market, ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< markets here ++++++++++++++++++++++')
              if (market.childs) {
                market.childs.forEach((marketDetail: any) => {
                  let matchName = market.name.toLowerCase().trim().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
                  let marketName = marketDetail.name.toLowerCase().trim().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
                  if (marketDetail.name && marketDetail.name.trim().toLowerCase() == 'match odds') {
                    // console.log(window.location.pathname, market, marketDetail, ' <<<<<<<<<<<<<<< match odds case')
                    marketDetail.url = result200?.name.toLowerCase().trim() + '/' + matchName + '/' + marketName + '-' + marketDetail.id
                  } else if (marketDetail.id && !marketDetail.id.includes('.')) {
                    marketDetail.url = '/bookmaker/' + marketDetail.id + '/' + matchName + '-' + marketDetail.id;
                  } else if (marketDetail.id == '1.176878927') {
                    marketDetail.url = '/politics/usa-1.176878927/presidential-elections-1.176878927'
                  } else {
                    marketDetail.url = result200?.name.toLowerCase().trim() + '/' + matchName + '/' + marketName + '-' + marketDetail.id
                  }
                  // console.log(marketDetail, ' <<<<<<<<<<<< market detail ')
                })
              }
            })
          }
        })
      }
      // console.log(result200, ' <<<<<<<<<<<<<<<<<<<<<<<< custom tree result in service')
      if (result200.url == '/politics') {
        result200.url = '/politics/usa-1.176878927/presidential-elections-1.176878927'
      }
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

  GetPopularSports(
    cancelToken?: CancelToken | undefined
  ): Promise<PopularSports[]> {
    let url_ = this.baseUrl + _window().populapSports;
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processGetPopular_GET(_response);
      });
  }

  protected processGetPopular_GET(
    response: AxiosResponse
  ): Promise<PopularSports[]> {
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(PopularSports.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return Promise.resolve<PopularSports[]>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  otherRacesPost(
    body: any | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_ = this.baseUrl + _window().otherracesordersplaced;
    url_ = url_.replace(/[?&]$/, '');
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
        return this.processLocalMarketOrdersplaceds(_response);
      });
  }
  protected processLocalMarketOrdersplaceds(
    response: AxiosResponse
  ): Promise<BettingResponse> {
    //debugger
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
   * Order Placed in local market
   * @param body (optional) all inputs are required
   * @return Success
   */
  LocalMarketOrdersplaced(
    body: LocalMarketBet | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().localordersplaced) {
      url_ = this.baseUrl + _window().localordersplaced;
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
        return this.processOrdersplacedLocalMarket(_response);
      });
  }

  protected processOrdersplacedLocalMarket(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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

  searchMarkets_POST(
    query: string | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<SearchResult[]> {
    let url_;

    if (_window().search) {
      url_ = this.baseUrl + _window().search;
      url_ = url_.replace(/[?&]$/, '');
    }
    //  ;
    let options_: AxiosRequestConfig = {
      method: 'POST',
      url: url_,
      headers: {
        query: query !== undefined && query !== null ? '' + query : '',
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
        return this.processSearchMarkets_POST(_response);
      });
  }

  protected processSearchMarkets_POST(
    response: AxiosResponse
  ): Promise<SearchResult[]> {
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(SearchResult.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return Promise.resolve<SearchResult[]>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * Current bets sports
   * @param body (optional) Marketid, eventid
   * @return Success
   */
  clientparameters(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<ClientParameters> {
    let url_;
    if (_window().clientparameters) {
      url_ = this.baseUrl + _window().clientparameters;
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
        return this.processClientparameters(_response);
      });
  }

  protected processClientparameters(
    response: AxiosResponse
  ): Promise<ClientParameters> {
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
        console.error(_responseText.message);
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
      result200 = ClientParameters.fromJS(resultData200);
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
   * @return Success
   */
  casinoCatagory(
    catagory: string,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_ = this.baseUrl + '/exchangeapi/casino/catagory/{catagory}';
    if (catagory === undefined || catagory === null)
      throw new Error("The parameter 'catagory' must be defined.");
    url_ = url_.replace('{catagory}', encodeURIComponent('' + catagory));
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {},
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
        return this.processCasinoCatagory(_response);
      });
  }

  protected processCasinoCatagory(response: AxiosResponse): Promise<any> {
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
      result200 = resultData200;
      return result200;
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        'An unexpected server error occurred.',
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<any>(null as any);
  }


  /**
   * @return Success
   */
  casnioGametype(
    gametype: string,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_ = this.baseUrl + '/exchangeapi/casino/games/{gametype}';
    if (gametype === undefined || gametype === null)
      throw new Error("The parameter 'gametype' must be defined.");
    url_ = url_.replace('{gametype}', encodeURIComponent('' + gametype));
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {},
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
        return this.processCasnioGametype(_response);
      });
  }

  protected processCasnioGametype(response: AxiosResponse): Promise<any> {
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
      result200 = resultData200;
      return result200;
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        'An unexpected server error occurred.',
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  casinoProviders(cancelToken?: CancelToken | undefined): Promise<any> {
    let url_ = this.baseUrl + '/exchangeapi/casino/providers';
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {},
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
        return this.processcasinoProviders(_response);
      });
  }

  protected processcasinoProviders(response: AxiosResponse): Promise<any> {
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
      result200 = resultData200;
      return result200;
      // return Promise.resolve<any>(null as any);
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        'An unexpected server error occurred.',
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<any>(null as any);
  }

  /**
   * @return Success
   */
  casinoProviderWise(
    providers: string,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_ = this.baseUrl + '/exchangeapi/casino/{providers}/games';
    if (providers === undefined || providers === null)
      throw new Error("The parameter 'providers' must be defined.");
    url_ = url_.replace('{providers}', encodeURIComponent('' + providers));
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {},
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
        return this.processcasinoProviderWise(_response);
      });
  }

  protected processcasinoProviderWise(response: AxiosResponse): Promise<any> {
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
      result200 = resultData200;
      return result200;
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        'An unexpected server error occurred.',
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<any>(null as any);
  }

  // casino end
  /**
   * Market Book for multiple market id's
   * @param body (optional) Market Id's comma seperated
   * @return Success
   */

  directMarketsbook(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MarketBook[]> {
    let url_;
    if (_window().directmarketsbook) {
      url_ = this.baseUrl + _window().directmarketsbook;
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
        return this.processDirectMarketsbook(_response);
      });
  }

  protected processDirectMarketsbook(
    response: AxiosResponse
  ): Promise<MarketBook[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(MarketBook.fromJS(item));
      } else {
        result200 = [resultData200];
      }
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
  marketsbook(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MarketBook[]> {
    let url_;
    if (_window().marketsbook) {
      url_ = this.baseUrl + _window().marketsbook;
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
        return this.processMarketsbook(_response);
      });
  }

  protected processMarketsbook(response: AxiosResponse): Promise<MarketBook[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(MarketBook.fromJS(item));
      } else {
        result200 = [resultData200];
      }
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
   * Market Book for multiple market id's IN CRICKET
   * @param body (optional) Market Id's comma seperated
   * @return Success
   */
  marketsbookforCricket(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MarketBook[]> {
    let url_;
    if (_window().cricketmarketsbook) {
      url_ = this.baseUrl + _window().cricketmarketsbook;
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
        return this.processMarketsbookforCricket(_response);
      });
  }

  protected processMarketsbookforCricket(
    response: AxiosResponse
  ): Promise<MarketBook[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(MarketBook.fromJS(item));
      } else {
        result200 = [resultData200];
      }
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
   * Markets shows on sports pages
   * @param id Sports Id
   * @return Success
   */
  eventsbydatemarkets(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<DirectEvents> {
    let url_;
    if (_window().eventbydatemarkets) {
      url_ = this.baseUrl + _window().eventbydatemarkets;
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
        return this.processEventsbydatemarkets(_response);
      });
  }

  protected processEventsbydatemarkets(
    response: AxiosResponse
  ): Promise<DirectEvents> {
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
        console.error(_responseText.message);
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
      result200 = DirectEvents.fromJS(resultData200);
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
   * Market Book
   * @param body (optional) Market Id
   * @return Success
   */

  directSinglemarketbook(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MarketBook> {
    let url_;
    if (_window().directmarketsbook) {
      url_ = this.baseUrl + _window().directmarketsbook;
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
        return this.processDirectSinglemarketbook(_response);
      });
  }

  protected processDirectSinglemarketbook(
    response: AxiosResponse
  ): Promise<MarketBook> {
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(MarketBook.fromJS(item));
      } else {
        result200 = [resultData200];
      }
      return result200[0];
    } else {
      // console.info(response);
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
  /**
   * Score for Mulitple Events
   * @param body (optional) comma seperated event ids
   * @return Success
   */
  MultipleScore(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<any[]> {
    let url_;
    if (_window().multiplescore) {
      url_ = _window().multiplescore;
      // window.multiplescore = "https://score.urexch.net/score/all"; in global so removed baseurl
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
        return this.processAll(_response);
      });
  }

  protected processAll(response: AxiosResponse): Promise<any[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(item);
      } else {
        result200 = <any>null;
      }
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
   * List of Competitions
   * @param id Sports Id
   * @return Success
   */
  getcompetition(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().getcompetition) {
      url_ = this.baseUrl + _window().getcompetition;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processGetcompetition(_response, id);
      });
  }

  protected processGetcompetition(response: AxiosResponse, id: number): Promise<Menu[]> {
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
      const _responseText = _window().isShowVirtualCricket
        ? response.data
        : response.data.filter((item) => item.id !== '70707070');
      if (
        _responseText.message == 'UNAUTHRORIZED' &&
        _responseText.status == false &&
        _responseText.code !== 200
      ) {
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(Menu.fromJS(item));
      } else {
        result200 = <any>null;
      }
      // console.log(resultData200, ' <<<<<<<<<<<<<< response from get competition')
      if (id == 1) {
        result200.forEach((menuItem: any) => {
          menuItem.childs.forEach((item: any) => {
            item.url = 'tournament/' + item.name.toLowerCase().trim().split(' ').join('-') + '-' + item.id
          })
        })
      } else {
        result200.forEach((item: any) => {
          item.url = 'tournament/' + item.name.toLowerCase().trim().split(' ').join('-') + '-' + item.id
        })
      }
      // console.log(result200, ' <<<<<<<<<<<<<<<< results from get competition')
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
   * List of Countries
   * @param id Sports Id
   * @param all Optional
   * @return Success
   */
  getcountries(
    id: number,
    all: string,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().getcountries) {
      url_ = this.baseUrl + _window().getcountries;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      if (all === undefined || all === null)
        throw new Error("The parameter 'all' must be defined.");
      url_ = url_.replace('{all}', encodeURIComponent('' + all));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processGetcountries(_response);
      });
  }

  protected processGetcountries(response: AxiosResponse): Promise<Menu[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(Menu.fromJS(item));
      } else {
        result200 = <any>null;
      }
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

  SignupRequest(
    body: SignUpB2CModel | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<ExceptionResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/signup';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
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
        return this.processSignupRequest(_response);
      });
  }

  protected processSignupRequest(
    response: AxiosResponse
  ): Promise<ExceptionResponse> {
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
      result200 = ExceptionResponse.fromJS(resultData200);
      return Promise.resolve<ExceptionResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  CheckUserNameAndPhone(
    username: string | undefined,
    body: CheckUserNameOrPhone | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<PhoneNOResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/checkusername';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        username:
          username !== undefined && username !== null ? '' + username : '',
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
        return this.processCheckUserNameAndPhone(_response);
      });
  }
  CheckUserPhone(
    username: string | undefined,
    body: CheckUserNameOrPhone | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<PhoneNOResponse> {
    let url_ = this.baseUrl + '/exchangeapi/user/checkusername/v1';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        username:
          username !== undefined && username !== null ? '' + username : '',
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
        return this.processCheckUserNameAndPhone(_response);
      });
  }

  protected processCheckUserNameAndPhone(
    response: AxiosResponse
  ): Promise<PhoneNOResponse> {
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
      result200 = PhoneNOResponse.fromJS(resultData200);
      return Promise.resolve<PhoneNOResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  RequestOTP(
    username: string | undefined,
    body: CheckRequestOTP | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<PhoneNOResponse> {
    let url_ = this.baseUrl + '/exchangeapi/user/requestotp';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        username:
          username !== undefined && username !== null ? '' + username : '',
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
        return this.processRequestOTP(_response);
      });
  }

  protected processRequestOTP(
    response: AxiosResponse
  ): Promise<PhoneNOResponse> {
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
      result200 = PhoneNOResponse.fromJS(resultData200);
      return Promise.resolve<PhoneNOResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * List of Events
   * @param countryCode ISO country code
   * @param id Sport Id
   * @return Success
   */
  geteventsbycountry(
    countryCode: string,
    id: number,
    url: string,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().geteventsbycountry) {
      url_ = this.baseUrl + _window().geteventsbycountry;
      if (countryCode === undefined || countryCode === null)
        throw new Error("The parameter 'countryCode' must be defined.");
      url_ = url_.replace(
        '{countryCode}',
        encodeURIComponent('' + countryCode)
      );
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processGeteventsbycountry(_response, url);
      });
  }

  protected processGeteventsbycountry(
    response: AxiosResponse, url: string
  ): Promise<Menu[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) {
          if (url.includes('grey-hound-racing')) {
            item.url = 'sports/grey-hound-racing/' + item.name.toLowerCase().trim().split(' ').join('-') + '-' + item.id
          } else {
            item.url = 'sports/horse-racing/' + item.name.toLowerCase().trim().split(' ').join('-') + '-' + item.id
          }
          result200!.push(Menu.fromJS(item));
        }
      } else {
        result200 = <any>null;
      }
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
   * Get Events Date Wise
   * @param id Datetime as number
   * @return Success
   */
  geteventsbydate(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().geteventsbydate) {
      url_ = this.baseUrl + _window().geteventsbydate;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processGeteventsbydate(_response);
      });
  }

  protected processGeteventsbydate(response: AxiosResponse): Promise<Menu[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(Menu.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Return List of Events in a Competition
   * @param id Competition ID
   * @return Success
   */
  getevents(
    id: number,
    url: string,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().getevents) {
      url_ = this.baseUrl + _window().getevents;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processGetevents(_response, url);
      });
  }

  protected processGetevents(response: AxiosResponse, url: string): Promise<Menu[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(Menu.fromJS(item));
      } else {
        result200 = <any>null;
      }
      // console.log(url.split('/'), ' <<<<<<<<<<< url before url assign')
      // console.log(result200, ' <<<<<<<<< get events response')
      result200.forEach((item: any) => {
        item.childs.forEach((child: any) => {
          // console.log(child, ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<< child here')
          let childName = this.slugifyName(child.name.replace('/', '-'))
          if (url.split('/').length > 3) {
            // console.log(' in if condition');
            if (child.detail.includes('bookmaker') || child.id.length > 9) {
              child.url = '/bookmaker/' + child.id + '/' + childName + '-' + child.id
              // console.log(child, child.url, ' in BOOK MAKER condition')
            } else {
              child.url = url.split('/')[2] + '/' + childName + '-' + child.id;
            }
            // console.log(child.url);
          } else {
            // console.log(' in else condition');
            if (child.detail.includes('bookmaker') || child.id.length > 9) {
              child.url = '/bookmaker/' + child.id + '/' + childName + '-' + child.id
              // console.log(child, child.url, ' in BOOK MAKER condition')
            } else {
              child.url = url.split('/')[url.split('/').length - 1] + '/' + childName + '-' + child.id
            }
            // console.log(child.url);
          }
        });
        let itemName = this.slugifyName(item.name.replace('/', '-'))
        if (item.childs.length == 0 && item.detail.includes('marketdetail')) {
          item.url = url.split('/')[url.split('/').length - 1] + '/tournament/' + itemName + '-' + item.id;
        }
        if (url.includes('american-football')) {
          item.url = url.split('/')[url.split('/').length - 1] + '/' + itemName + '-' + item.id;
        }
      });
      // console.log(result200, ' <<<<<<<<< get events result')
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
   * @return Success
   */
  todayRacesOld(
    id: number,
    from: string,
    cancelToken?: CancelToken | undefined
  ): Promise<TodayRacesASSS[]> {
    let url_ = this.baseUrl + _window().todayracesOld;
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace('{id}', encodeURIComponent('' + id));
    url_ = url_.replace(/[?&]$/, '');

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processTodayRacesOld(_response);
      });
  }

  protected processTodayRacesOld(
    response: AxiosResponse
  ): Promise<TodayRacesASSS[]> {
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) {
          result200!.push(TodayRacesASSS.fromJS(item));
        }
      } else {
        result200 = <any>null;
      }
      return Promise.resolve<TodayRacesASSS[]>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * List of Today Races
   * @param id Sports Id
   * @return Success
   */
  getgroupmarkets(
    id: number,
    url: string,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<TodayRacesASSS[]> {
    let url_;
    if (_window().getgroupmarkets) {
      url_ = this.baseUrl + _window().getgroupmarkets;
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
        return this.processGetgroupmarkets(_response, url);
      });
  }

  protected processGetgroupmarkets(
    response: AxiosResponse, url: string
  ): Promise<TodayRacesASSS[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) {
          if (url.toLowerCase().trim().includes('grey-hound-racing')) {
            if (url.toLowerCase().trim().includes('all')) {
              item.url = 'grey-hound-racing/all/' + this.slugifyName(item.name) + '-' + item.id
            } else {
              item.url = 'grey-hound-racing/today/' + this.slugifyName(item.name) + '-' + item.id
            }
          } else {
            if (url.toLowerCase().trim().includes('all')) {
              item.url = 'horse-racing/all/' + this.slugifyName(item.name) + '-' + item.id
            } else {
              item.url = 'horse-racing/today/' + this.slugifyName(item.name) + '-' + item.id
            }
          }
          result200!.push(RaceEvents.fromJS(item));
        }
      } else {
        result200 = <any>null;
      }
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
  sSCasino_POST(
    body: CasinoRequest | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_ = this.baseUrl + '/exchangeapi/client/sscasino';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
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
        return this.processSSCasino_POST(_response);
      });
  }

  protected processSSCasino_POST(response: AxiosResponse): Promise<any> {
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
      result200 = resultData200;
      return Promise.resolve<any>(result200);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }
  /**
   * Return List of Events1 in a Competition
   * @param id Competition ID
   * @return Success
   */
  getevent1(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().getevent1) {
      url_ = this.baseUrl + _window().getevent1;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processGetevent1(_response);
      });
  }

  protected processGetevent1(response: AxiosResponse): Promise<Menu[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(Menu.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Return List of Events1 in a Competition
   * @param id Competition ID
   * @return Success
   */
  getevent2(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().getevent2) {
      url_ = this.baseUrl + _window().getevent2;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processGetevent2(_response);
      });
  }

  protected processGetevent2(response: AxiosResponse): Promise<Menu[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(Menu.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Return List of Events1 in a Competition
   * @param id Competition ID
   * @return Success
   */
  getevent3(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().getevent3) {
      url_ = this.baseUrl + _window().getevent3;
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
        return this.processGetevent3(_response);
      });
  }

  protected processGetevent3(response: AxiosResponse): Promise<Menu[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(Menu.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Get All Sports
   * @return Success
   */
  eventtypes(
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().eventtypes) {
      url_ = this.baseUrl + _window().eventtypes;
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processEventtypes(_response);
      });
  }

  protected processEventtypes(response: AxiosResponse): Promise<Menu[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) {
          // console.log(item, '<<<<<<<<<<<< ' )
          if (item.detail.includes('raceschedule')) {
            if (item.detail.includes('7')) {
              if (item.detail.includes('ALL')) {
                item.url = 'horse-racing/all'
              } else {
                item.url = 'horse-racing/today'
              }
            } else {
              if (item.detail.includes('ALL')) {
                item.url = 'grey-hound-racing/all'
              } else {
                item.url = 'grey-hound-racing/today'
              }
            }
          } else if (item.name == 'Politics') {
            item.url = '/politics/usa-' + item.detail.split('/')[item.detail.split('/').length - 1] + '/presidential-elections-' + item.detail.split('/')[item.detail.split('/').length - 1]
          } else {
            item.url = this.sportsMapperService.getSportById(Number(item.detail.split('/')[item.detail.split('/').length - 1]))
          }
          result200!.push(Menu.fromJS(item))
        }
      } else {
        result200 = <any>null;
      }
      // console.log(result200, ' <<<<<<<<< result of event types here')
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
   * Soccer fixture
   * @param id id of Soccer
   * @return Success
   */
  getfixtures(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().getfixtures) {
      url_ = this.baseUrl + _window().getfixtures;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processGetfixtures(_response);
      });
  }

  protected processGetfixtures(response: AxiosResponse): Promise<Menu[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(Menu.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * List of Markets in an Event
   * @param id event id
   * @return Success
   */

  getmarkets(
    id: number,
    from: String,
    url: string | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<MultilevelMenu[]> {
    let url_;
    if (_window().getmarkets) {
      url_ = this.baseUrl + _window().getmarkets;
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
        return this.processMarkets_GET(_response, url);
      });
  }

  protected processMarkets_GET(
    response: AxiosResponse, url?: string
  ): Promise<MultilevelMenu[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(MultilevelMenu.fromJS(item));
      } else {
        result200 = <any>null;
      }
      // console.log(url, ' <<<<<<< previous url')
      let _url = ''
      if (url) {
        _url = url.split('-').slice(0, -1).join('-')
      } else {
        throw Error('url not found in get events service, check getevents method and sidebar')
      }
      result200.forEach((multiLevelMenu: MultilevelMenu) => {
        if (multiLevelMenu.name.toLowerCase().trim() == 'match odds') {
          multiLevelMenu.url = url;
        } else if (multiLevelMenu.detail && multiLevelMenu.detail.includes('bookmaker')) {
          multiLevelMenu.url = _url + '-' + multiLevelMenu.id
        } else {
          multiLevelMenu.url =
            _url +
            '/' +
            multiLevelMenu.name
              ?.replace('/', '-')
              .toLowerCase()
              .trim()
              .split(' ')
              .join('-') +
            '-' +
            multiLevelMenu.detail?.split('/')[multiLevelMenu.detail?.split('/').length - 1];
        }
        // console.log(multiLevelMenu, _url, ' <<<<<<<<<<<<<<<<<<<<<<<<< MULTI LEVEL MENU ')
      });
      // console.log(result200, ' <<<<<<<<<< result in get events')
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
   * List of Today Races
   * @param id Sports Id
   * @return Success
   */
  todayraces(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<RaceEvents[]> {
    let url_;
    if (_window().todayraces) {
      url_ = this.baseUrl + _window().todayraces;
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
        return this.processTodayraces(_response);
      });
  }

  protected processTodayraces(response: AxiosResponse): Promise<RaceEvents[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(RaceEvents.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * List of Event Markets
   * @param id Event id
   * @return Success
   */
  geteventmarkets(
    id: number | string,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<EventMarkets> {
    let url_;
    if (_window().geteventmarkets) {
      url_ = this.baseUrl + _window().geteventmarkets;
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
        return this.processGeteventmarkets(_response);
      });
  }

  protected processGeteventmarkets(
    response: AxiosResponse
  ): Promise<EventMarkets> {
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
        console.error(_responseText.message);
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
      result200 = EventMarkets.fromJS(resultData200);
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
   * Line Markets under match odds
   * @param id Event id
   * @return Success
   */
  linemarketsundermo(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<LineMarket[]> {
    let url_;
    if (_window().linemarketsundermo) {
      url_ = this.baseUrl + _window().linemarketsundermo;
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
        return this.processLinemarketsundermo(_response);
      });
  }

  protected processLinemarketsundermo(
    response: AxiosResponse
  ): Promise<LineMarket[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(LineMarket.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * List of markets using competition id
   * @param id Competition id
   * @return Success
   */
  getcompetitionmarkets(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<DirectEvents> {
    let url_;
    if (_window().getcompetitonmarkets) {
      url_ = this.baseUrl + _window().getcompetitonmarkets;
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
        return this.processGetcompetitionmarkets(_response);
      });
  }

  protected processGetcompetitionmarkets(
    response: AxiosResponse
  ): Promise<DirectEvents> {
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
        console.error(_responseText.message);
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
      result200 = DirectEvents.fromJS(resultData200);
      // console.log(result200, ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< in processGetcompetitionmarkets')
      if (result200.competitions) {
        result200.competitions.forEach((competitions: any) => {
          competitions.markets.forEach((market: any) => {
            // console.log(market, '<<<<<<<<<<<<<<<<<<<<<<<<<< market')
            if (!market.marketId.includes('.')) {
              let marketName = this.slugifyName(market.marketName)
              let competitionName = this.slugifyName(competitions.name)
              market.url = '/sports/bookmaker/' + competitionName + '-' + market.marketId + '/' + marketName + '-' + market.version;
            } else {
              market.url = '/sports/' + result200.name.toLowerCase().trim() + '/' + this.slugifyName(market.marketName) + '-' + market.version;
            }
          });
        });
      }
      // console.log(result200, ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< in processGetcompetitionmarkets after')
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
   * Race Schedule for Horse and greyhound
   * @param all Possible value ALL/TODAY
   * @param id sports id
   * @return Success
   */
  raceschedule(
    all: string,
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<RaceDate[]> {
    let url_;
    if (_window().raceschedule) {
      url_ = this.baseUrl + _window().raceschedule;
      if (all === undefined || all === null)
        throw new Error("The parameter 'all' must be defined.");
      url_ = url_.replace('{all}', encodeURIComponent('' + all));
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processRaceschedule(_response, id, all);
      });
  }

  protected processRaceschedule(response: AxiosResponse, id: number, all: string): Promise<RaceDate[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(RaceDate.fromJS(item));
      } else {
        result200 = <any>null;
      }
      // console.log(id, this.sportsMapperService.getSportById(Number(id)), all, ' <<<<<<<<<<<<<<<<<<<<<<<<< id ')
      result200.forEach((raceDate: RaceDate) => {
        raceDate.childs.forEach((raceCountry: RaceCountry) => {
          raceCountry.childs.forEach((raceTrack: RaceTrack) => {
            raceTrack.childs.forEach((raceNumber: RaceNumber) => {
              raceNumber.url = this.sportsMapperService.getSportById(Number(id)) + '/' + all.toLowerCase() + '/' + raceNumber.detailLink.split('/')[raceNumber.detailLink.split('/').length - 1]
            })
          })
        })
      })
      // console.log(result200, ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< results in processRaceschedule')
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
   * Markets that will show on the index or default page
   * @return Success
   */
  // getdefaultpage(cancelToken?: CancelToken | undefined): Promise<DefaultInplay[]> {
  //   let url_ = this.baseUrl + "/exchangeapi/sports/getdefaultpage";
  //   url_ = url_.replace(/[?&]$/, "");

  //   let options_ = <AxiosRequestConfig>{
  //     method: "GET",
  //     url: url_,
  //     headers: {
  //       "Accept": "application/json",
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
  //     return this.processGetdefaultpage(_response);
  //   });
  // }
  getdefaultpage(
    page: number | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<DefaultInplay[]> {
    let url_;
    if (_window().getdefaultpage) {
      url_ = this.baseUrl + _window().getdefaultpage;
      if (page === null)
        throw new Error("The parameter 'page' cannot be null.");
      else if (page !== undefined)
        url_ += 'page=' + encodeURIComponent('' + page) + '&';
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
        return this.processGetdefaultpage(_response);
      });
  }

  protected processGetdefaultpage(
    response: AxiosResponse
  ): Promise<DefaultInplay[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(DefaultInplay.fromJS(item));
      } else {
        result200 = <any>null;
      }
      // console.log(result200, ' <<<<<<<<<<<<<<<<<<<<<< api response in get default page')
      if (result200.length > 0) {
        result200.forEach((catalogue: any) => {
          let id = catalogue.id
          catalogue.markets.forEach((item: any) => {
            let itemName = this.slugifyName(item.marketName)
            if (item.runners.length == 0) {
              item.url = '/sports/bookmaker/' + item.marketId + '/' + itemName + '-' + item.marketId
            } else if (item.runners.length > 3) {
              item.url = '/sports/' + this.sportsMapperService.getSportById(Number(id)) + '/' + itemName + '/winner-' + item.marketId
            } else {
              item.url = '/sports/' + this.sportsMapperService.getSportById(Number(id)) + '/' + itemName + '-' + item.version;
            }
          });
        })
      }
      // console.log(result200, ' <<<<<<<<<<<<<<<<<<<<<< result in get default page')
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
   * Event Wise Markets
   * @param id Event Id
   * @return Success
   */
  eventmarkets(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<EventTypeSS> {
    let url_;
    if (_window().eventmarkets) {
      url_ = this.baseUrl + _window().eventmarkets;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processEventmarkets(_response);
      });
  }

  protected processEventmarkets(response: AxiosResponse): Promise<EventTypeSS> {
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
        console.error(_responseText.message);
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
      result200 = EventTypeSS.fromJS(resultData200);
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
   * Markets shows on Inplay Page
   * @return Success
   */
  // inplayevents(cancelToken?: CancelToken | undefined): Promise<DefaultInplay[]> {
  //   let url_ = this.baseUrl + "/exchangeapi/sports/inplayevents";
  //   url_ = url_.replace(/[?&]$/, "");

  //   let options_ = <AxiosRequestConfig>{
  //     method: "GET",
  //     url: url_,
  //     headers: {
  //       "Accept": "application/json",
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
  //     return this.processInplayevents(_response);
  //   });
  // }

  inplayevents(
    page: number | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<DefaultInplay[]> {
    let url_;
    if (_window().inplayevents) {
      url_ = this.baseUrl + _window().inplayevents;
      if (page === null)
        throw new Error("The parameter 'page' cannot be null.");
      else if (page !== undefined)
        url_ += 'page=' + encodeURIComponent('' + page) + '&';
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
        return this.processInplayevents(_response);
      });
  }

  protected processInplayevents(
    response: AxiosResponse
  ): Promise<DefaultInplay[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(DefaultInplay.fromJS(item));
      } else {
        result200 = <any>null;
      }
      result200.forEach((defaultInplay: DefaultInplay) => {
        let id = defaultInplay.id
        if (defaultInplay && defaultInplay.markets) {
          defaultInplay.markets.forEach((market: MarketCatalogueSS) => {
            if (market.marketName) {
              let mName = this.slugifyName(market.marketName)
              if (market.marketId == '70707070') {
                market.url = '/sports/bookmaker/virtual-cricket-' + market.marketId + '/' + mName + '-' + market.version
              } else if (market.runners && market.runners.length == 0) {
                market.url = '/sports/bookmaker/' + mName + '-' + market.marketId + '/' + mName + '-' + market.version
              } else if (market.runners && market.runners.length > 3) {
                market.url = '/sports/' + this.sportsMapperService.getSportById(Number(id)) + '/' + mName + '/winner-' + market.marketId
              } else {
                market.url = '/sports/' + this.sportsMapperService.getSportById(Number(id)) + '/' + mName + '-' + market.version
              }
            }
          })
        }
      })
      // console.log(result200, ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< result of inplay ')
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
   * Detail of Single Markets
   * @param body (optional) Market Id
   * @return Success
   */
  marketdetail(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MarketDetail> {
    let url_;
    if (_window().marketdetail) {
      url_ = this.baseUrl + _window().marketdetail;
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
        return this.processMarketdetail(_response);
      });
  }

  protected processMarketdetail(
    response: AxiosResponse
  ): Promise<MarketDetail> {
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
        console.error(_responseText.message);
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
      result200 = MarketDetail.fromJS(resultData200);
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
   * @return Success
   */
  raceeventmarkets(
    eventID1: string,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<EventTypeRaces> {
    let url_;
    if (_window().raceeventmarkets) {
      url_ = this.baseUrl + _window().raceeventmarkets;
      if (eventID1 === undefined || eventID1 === null)
        throw new Error("The parameter 'eventID1' must be defined.");
      url_ = url_.replace('{EventID1}', encodeURIComponent('' + eventID1));
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
        return this.processRaceeventmarkets(_response);
      });
  }

  protected processRaceeventmarkets(
    response: AxiosResponse
  ): Promise<EventTypeRaces> {
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
        console.error(_responseText.message);
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
      result200 = EventTypeRaces.fromJS(resultData200);
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
   * Markets shows on sports pages
   * @param id Sports Id
   * @return Success
   */
  // sportsbyid(id: number, cancelToken?: CancelToken | undefined): Promise<DirectEvents> {
  //   let url_ = this.baseUrl + "/exchangeapi/sports/sportsbyid/{id}";
  //   if (id === undefined || id === null)
  //     throw new Error("The parameter 'id' must be defined.");
  //   url_ = url_.replace("{id}", encodeURIComponent("" + id));
  //   url_ = url_.replace(/[?&]$/, "");

  //   let options_ = <AxiosRequestConfig>{
  //     method: "GET",
  //     url: url_,
  //     headers: {
  //       "Accept": "application/json",
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
  //     return this.processSportsbyid(_response);
  //   });
  // }
  sportsbyid(
    sport: string,
    page: number | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<DirectEvents> {
    let url_;
    let id = this.sportsMapperService.getSportByName(sport)
    if (_window().sportsbyid) {
      url_ = this.baseUrl + _window().sportsbyid;
      if (sport === undefined || sport === null)
        throw new Error("The parameter 'sport' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      if (page === null)
        throw new Error("The parameter 'page' cannot be null.");
      else if (page !== undefined)
        url_ += 'page=' + encodeURIComponent('' + page) + '&';
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
        return this.processSportsbyid(_response, id);
      });
  }

  protected processSportsbyid(response: AxiosResponse, id: string): Promise<DirectEvents> {
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
        console.error(_responseText.message);
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
      result200 = DirectEvents.fromJS(resultData200);
      result200.competitions.forEach((com: any) => {
        com.markets.forEach((market: any) => {
          let competitionName = this.slugifyName(com.name)
          let mName = this.slugifyName(market.marketName)
          if (_window().sportsbyid && _window().sportsbyid.includes('v2')) {
            // v2 includes a routerlink in api so handling routes through routerlink
            if (market.routerLink.includes('marketdetail')) {
              if (market.description && market.description.marketType) {
                market.url = '/sports/' + this.sportsMapperService.getSportById(Number(id)) + '/' + competitionName + '-' + market.marketId + '/' + market.description.marketType.toLowerCase().replace('_', '-') + '-' + market.marketId
              } else {
                market.url = '/sports/' + this.sportsMapperService.getSportById(Number(id)) + '/' + competitionName + '-' + market.marketId + '/' + mName + '-' + market.marketId
              }
            } else if (market.routerLink.includes('bookmaker')) {
              market.url = '/sports/bookmaker/' + competitionName + '-' + market.marketId + '/' + mName + '-' + market.version
            } else {
              market.url = '/sports/' + this.sportsMapperService.getSportById(Number(id)) + '/' + mName + '-' + market.version
            }
          } else {
            // for v1 compatibility
            if (com.id == '70707070') {
              market.url = '/sports/bookmaker/virtual-cricket-' + market.marketId + '/' + mName + '-' + market.version
            } else if (market.runners.length == 0) {
              market.url = '/sports/bookmaker/' + competitionName + '-' + market.marketId + '/' + mName + '-' + market.version
            } else if (market.runners.length > 3) {
              market.url = '/sports/' + this.sportsMapperService.getSportById(Number(result200.id)) + '/' + mName + '/winner-' + market.marketId
            } else {
              market.url = '/sports/' + this.sportsMapperService.getSportById(Number(result200.id)) + '/' + mName + '-' + market.version
            }
          }
        });
      });
      // console.log(result200, ' <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< in process sports by id')
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
   * @param body (optional) all inputs are required
   * @return Success
   */
  MatchUnmatchXG(
    body: XgameInputModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MatchedUnmatched> {
    let url_;
    if (_window().matchunmatchxg) {
      url_ = this.baseUrl + _window().matchunmatchxg;
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
        return this.processMatchUnmatchXG_POST(_response);
      });
  }

  protected processMatchUnmatchXG_POST(
    response: AxiosResponse
  ): Promise<MatchedUnmatched> {
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
        console.error(_responseText.message);
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
      result200 = MatchedUnmatched.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  popularbyid(
    id: string,
    page: number | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_;
    if (_window().popularbyid) {
      url_ = this.baseUrl + _window().popularbyid;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      if (page === null)
        throw new Error("The parameter 'page' cannot be null.");
      else if (page !== undefined)
        url_ += 'page=' + encodeURIComponent('' + page) + '&';
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
        return this.processPopularbyid(_response, id);
      });
  }

  protected processPopularbyid(response: AxiosResponse, id: string): Promise<any> {
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
        console.error(_responseText.message);
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
      if (result200.length > 0) {
        result200.forEach((item: any) => {
          let mName = this.slugifyName(item.marketName)
          if (item.routerLink.includes('bookmaker')) {
            item.url = '/sports/bookmaker/' + mName + '-' + item.marketId + '/' + item.version;
          } else if (item.marketType == 'TOURNAMENT_WINNER') {
            item.url = '/sports/' + this.sportsMapperService.getSportById(Number(id)) + '/winner' + '-' + item.version + '/' + mName + '-' + item.marketId;
          } else {
            item.url = '/sports/' + this.sportsMapperService.getSportById(Number(id)) + '/' + mName + '-' + item.version;
          }
        })
      }
      // console.log(result200, ' <<<<<< processPopularbyid result here')
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
   * Market Data based on channel id https://api.games.betfair.com/rest/v1/channels/1444074/snapshot?type=json
   * @param body (optional) Channel Id
   * @return Success
   */
  book(
    body: any | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_;
    if (_window().singlebook) {
      url_ = this.baseUrl + _window().singlebook;
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
        return this.processBook(_response);
      });
  }

  protected processBook(response: AxiosResponse): Promise<any> {
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
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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
   * Game detail
   * @param id channel id
   * @return Success
   */
  gamedetail(
    id: number,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<XGameDetail[]> {
    let url_;
    if (_window().gamedetail) {
      url_ = this.baseUrl + _window().gamedetail;
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
        return this.processGamedetail(_response);
      });
  }

  protected processGamedetail(response: AxiosResponse): Promise<XGameDetail[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(XGameDetail.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Result of the Market based on Channel id link startRecord=6 and recordCount=5 and type=json
   * @param body (optional) Channel id, Start Record and End Record
   * @return Success
   */
  result(
    body: Results | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_;
    if (_window().result) {
      url_ = this.baseUrl + _window().result;
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
        return this.processResult(_response);
      });
  }

  protected processResult(response: AxiosResponse): Promise<any> {
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
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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
  //       "Accept": "application/json",
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
  games(
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<XgameNow[]> {
    let url_;
    if (_window().games) {
      url_ = this.baseUrl + _window().games;
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
        return this.processGames(_response);
      });
  }

  protected processGames(response: AxiosResponse): Promise<XgameNow[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(XgameNow.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      let result417: any = null;
      let resultData417 = _responseText;
      result417 = ProblemDetails.fromJS(resultData417);
      return throwException(
        'Client Error',
        status,
        _responseText,
        _headers,
        result417
      );
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
   * @param body (optional)
   * @return Success
   */
  singlebook(
    body: XGameSingleBook | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_;
    if (_window().singlebook) {
      url_ = this.baseUrl + _window().singlebook;
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
        return this.processSinglebook(_response);
      });
  }

  protected processSinglebook(response: AxiosResponse): Promise<any> {
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
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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
   * Cancel order in Exchange Game
   * @param body (optional) all inputs are required
   * @return Success
   */
  CancelOrdersXgame(
    body: XGameOrderCancelModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().cancelorders) {
      url_ = this.baseUrl + _window().cancelorders;
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
        return this.processCancelordersPost(_response);
      });
  }

  protected processCancelordersPost(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
   * order placed in exchange game
   * @param body (optional) all inputs are required
   * @return Success
   */
  ordersplacedPost(
    body: OrderPlaceModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().ordersplacedxg) {
      url_ = this.baseUrl + _window().ordersplacedxg;
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
        return this.processOrdersplacedPostxgame(_response);
      });
  }

  protected processOrdersplacedPostxgame(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
   * Exchange Game Current Bets
   * @param body (optional) Channel id, marketid, roundNo and Game id
   * @return Success
   */
  CurrentbetsXGame(
    body: XGameCurrentBetsInput | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<CurrentBetsGame[]> {
    let url_;
    if (_window().currentbetsxg) {
      url_ = this.baseUrl + _window().currentbetsxg;
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
        return this.processCurrentbetsxgamePost(_response);
      });
  }

  protected processCurrentbetsxgamePost(
    response: AxiosResponse
  ): Promise<CurrentBetsGame[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(CurrentBetsGame.fromJS(item));
      } else {
        result200 = <any>null;
      }
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

  ClientPositionXgame(
    body: ClientPosXgameInput | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<UserPosition[]> {
    let url_;
    if (_window().clientpositionxg) {
      url_ = this.baseUrl + _window().clientpositionxg;
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
        return this.processClientPositionXgame_POST(_response);
      });
  }

  protected processClientPositionXgame_POST(
    response: AxiosResponse
  ): Promise<UserPosition[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(UserPosition.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * @param body (optional)
   * @return Success
   */
  walletXgame(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<ClientWallet> {
    let url_;
    if (_window().walletxg) {
      url_ = this.baseUrl + _window().walletxg;
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
        return this.processWallet_POST2(_response);
      });
  }

  protected processWallet_POST2(
    response: AxiosResponse
  ): Promise<ClientWallet> {
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
        console.error(_responseText.message);
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
      result200 = ClientWallet.fromJS(resultData200);
      return result200;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * @param body (optional)
   * @return Success
   */
  signupb2c_POST2(
    body: SignupWhitelabelModel | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<ExceptionResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/signupwhitelabel';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
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
        return this.processSignupb2c_POST2(_response);
      });
  }

  protected processSignupb2c_POST2(
    response: AxiosResponse
  ): Promise<ExceptionResponse> {
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
      result200 = ExceptionResponse.fromJS(resultData200);
      return Promise.resolve<ExceptionResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Single Screen Signup

  signupb2c_POST(
    username: string,
    body: CheckUserNameModel | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<SignupWithOTPResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/checkusername';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        username: 'username',
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
        return this.processSignupb2c_POST(_response);
      });
  }

  protected processSignupb2c_POST(
    response: AxiosResponse
  ): Promise<SignupWithOTPResponse> {
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
      result200 = SignupWithOTPResponse.fromJS(resultData200);
      return Promise.resolve<SignupWithOTPResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  authenticate(
    body: AuthenticateRequest | undefined,
    otp: string,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_;
    let options_;
    url_ = this.baseUrl + '/exchangeapi/user/authenticate';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);
    if (!otp) {
      options_ = <AxiosRequestConfig>{
        data: content_,
        method: 'POST',
        url: url_,
        headers: {
          Authorization:
            'Basic ' + window.btoa(body?.username + ':' + body?.password),
          'Content-Type': 'application/json',
          Accept: 'application/json',
          from: from,
        },
        cancelToken,
      };
    } else {
      options_ = <AxiosRequestConfig>{
        data: content_,
        method: 'POST',
        url: url_,
        headers: {
          Authorization:
            'Basic ' + window.btoa(body?.username + ':' + body?.password),
          'Content-Type': 'application/json',
          Accept: 'application/json',
          from: from,
          otp: otp,
        },
        cancelToken,
      };
    }

    // let options_ = <AxiosRequestConfig>{
    //   data: content_,
    //   method: "POST",
    //   url: url_,
    //   headers: {
    //     "Authorization": "Basic " + window.btoa(body?.username + ':' + body?.password),
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     "from": from
    //   },
    //   cancelToken
    // };

    return this.instance
      .request(options_)

      .catch((_error: any) => {
        throw throwException(
          "Can't be reached to server",
          404,
          "Can't Reached to server",
          {},
          null
        );
        //
        // if (isAxiosError(_error) && _error.response) {
        //   return _error.response;
        // } else {
        //   throw _error;
        // }
      })
      .then((_response: AxiosResponse) => {
        return this.processAuthenticate(_response);
      });
  }

  protected processAuthenticate(response: AxiosResponse): Promise<string> {
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
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
      return result200;
    } else {
      const _responseText = response.data;
      return throwException(
        'An unexpected server error occurred.',
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<string>(<any>null);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  ChangePassword(
    body: ChangePassword | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().changepassword) {
      url_ = this.baseUrl + _window().changepassword;
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
        return this.processChangePassword_POST(_response);
      });
  }

  protected processChangePassword_POST(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
      return result200;
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Forgot Password Portion Starts

  Getphonenumber(
    body: ClientGetPhoneNumber | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<ResetPasswordResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/getphonenumber';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json-patch+json',
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
        return this.processChangePasswordKheloyar_POST(_response);
      });
  }

  protected processChangePasswordKheloyar_POST(
    response: AxiosResponse
  ): Promise<ResetPasswordResponse> {
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
      result200 = ResetPasswordResponse.fromJS(resultData200);
      return Promise.resolve<ResetPasswordResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  Checkuserphone(
    type: string | undefined,
    body: UserPhoneCheckingForOTP | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<ResetPasswordResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/checkuserphone';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        type: type !== undefined && type !== null ? '' + type : '',
        'Content-Type': 'application/json-patch+json',
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
        return this.processChangePasswordKheloyar_POST2(_response);
      });
  }

  protected processChangePasswordKheloyar_POST2(
    response: AxiosResponse
  ): Promise<ResetPasswordResponse> {
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
      result200 = ResetPasswordResponse.fromJS(resultData200);
      return Promise.resolve<ResetPasswordResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  Verifyotpphone(
    type: string | undefined,
    body: UserPhoneCheckingForOTP | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<ResetPasswordResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/verifyotpphone';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        type: type !== undefined && type !== null ? '' + type : '',
        'Content-Type': 'application/json-patch+json',
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
        return this.processChangePasswordKheloyar_POST3(_response);
      });
  }

  protected processChangePasswordKheloyar_POST3(
    response: AxiosResponse
  ): Promise<ResetPasswordResponse> {
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
      result200 = ResetPasswordResponse.fromJS(resultData200);
      return Promise.resolve<ResetPasswordResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  Newpassword(
    type: string | undefined,
    body: NewPasswordOTP | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<ResetPasswordResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/newpassword';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        type: type !== undefined && type !== null ? '' + type : '',
        'Content-Type': 'application/json-patch+json',
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
        return this.processChangePasswordKheloyar_POST4(_response);
      });
  }

  protected processChangePasswordKheloyar_POST4(
    response: AxiosResponse
  ): Promise<ResetPasswordResponse> {
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
      result200 = ResetPasswordResponse.fromJS(resultData200);
      return Promise.resolve<ResetPasswordResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Forgot Password Portion Ends
  /**
   * Account Statement
   * @param body (optional) From-To date
   * @return Success
   */
  accountstatement(
    body: AccountstmtInputModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<AccountstmtModel[]> {
    let url_;
    if (_window().accountstatement) {
      url_ = this.baseUrl + _window().accountstatement;
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
        return this.processAccountstatement(_response);
      });
  }

  protected processAccountstatement(
    response: AxiosResponse
  ): Promise<AccountstmtModel[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(AccountstmtModel.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Account statement Sub Reports
   * @param body (optional) Market Id
   * @return Success
   */
  accountstatementsub(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<AccountStatementSubReport[]> {
    let url_;
    if (_window().accountstatementsub) {
      url_ = this.baseUrl + _window().accountstatementsub;
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
        return this.processAccountstatementsub(_response);
      });
  }

  protected processAccountstatementsub(
    response: AxiosResponse
  ): Promise<AccountStatementSubReport[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(AccountStatementSubReport.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Casino Bets
   * @param body (optional) Bets filter from- to filter
   * @return Success
   */
  casinobets(
    body: CasinoBetsInputModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<CasinoOrders[]> {
    let url_;
    if (_window().casinobets) {
      url_ = this.baseUrl + _window().casinobets;
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
        return this.processCasinobets(_response);
      });
  }

  protected processCasinobets(
    response: AxiosResponse
  ): Promise<CasinoOrders[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(CasinoOrders.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Get Client Stake
   * @return Success
   */
  stakesGet(
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<ClientStake> {
    let url_;
    if (_window().stakesget) {
      url_ = this.baseUrl + _window().stakesget;
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
        return this.processStakesGet(_response);
      });
  }

  protected processStakesGet(response: AxiosResponse): Promise<ClientStake> {
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
        console.error(_responseText.message);
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
      result200 = ClientStake.fromJS(resultData200);
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
   * Update Client Stake
   * @param body (optional) Stake value from 1 to 8
   * @return Success
   */
  createPin(
    body: any,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<string> {
    let url_;
    if (_window().createWithDrawPin) {
      url_ = this.baseUrl + _window().createWithDrawPin;
      url_ = url_.replace(/[?&]$/, '');
    }

    const content_ = JSON.stringify(body);
    //
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
        return this.processCreatePin(_response);
      });
  }

  protected processCreatePin(response: AxiosResponse): Promise<string> {
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
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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
  RequestWithDrawPin(
    body: any,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<string> {
    let url_;
    if (_window().requestWithDrawPin) {
      url_ = this.baseUrl + _window().requestWithDrawPin;
      url_ = url_.replace(/[?&]$/, '');
    }

    const content_ = JSON.stringify(body);
    //
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
        return this.processRequestWithDrawPin(_response);
      });
  }

  protected processRequestWithDrawPin(
    response: AxiosResponse
  ): Promise<string> {
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
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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
  ResetWithdrawpin(
    body: any,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<string> {
    let url_;
    if (_window().resetWithdrawpin) {
      url_ = this.baseUrl + _window().resetWithdrawpin;
      url_ = url_.replace(/[?&]$/, '');
    }

    const content_ = JSON.stringify(body);
    //
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
        return this.processResetWithdrawpin(_response);
      });
  }

  protected processResetWithdrawpin(response: AxiosResponse): Promise<string> {
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
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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

  // Back Details

  stakesPost(
    body: any,
    from: String,
    recaptcha: any,
    cancelToken?: CancelToken | undefined
  ): Promise<string> {
    let url_;
    if (_window().stakespost) {
      url_ = this.baseUrl + _window().stakespost;
      url_ = url_.replace(/[?&]$/, '');
    }
    let body1 = { ...body, recaptcha };
    // body1.recaptcha = token;
    const content_ = JSON.stringify(body1);
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
        return this.processStakesPost(_response);
      });
  }

  protected processStakesPost(response: AxiosResponse): Promise<string> {
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
        console.error(_responseText.message);
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
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

  GetBankAccounts(
    cancelToken?: CancelToken | undefined
  ): Promise<ClientkBankAccounts> {
    let url_ = this.baseUrl + '/exchangeapi/client/getclientbankaccounts';
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processWithdraws_GET(_response);
      });
  }

  protected processWithdraws_GET(
    response: AxiosResponse
  ): Promise<ClientkBankAccounts> {
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
      let resultData200: any = _responseText;
      if (Array.isArray(resultData200.banks)) {
        result200 = [] as any;
        for (let item of resultData200.banks)
          result200!.push(ClientkBankAccounts.fromJS(item));
      } else {
        result200 = <any>null;
      }
      let objectResult: any = {
        banks: result200,
        otpRequired: resultData200.otpRequired,
      };
      return Promise.resolve<ClientkBankAccounts>(objectResult);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  GetBankAccount(
    cancelToken?: CancelToken | undefined
  ): Promise<ClientkBankAccounts[]> {
    let url_ = this.baseUrl + '/exchangeapi/client/getclientbankaccount';
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processWithdraw_GET(_response);
      });
  }

  protected processWithdraw_GET(
    response: AxiosResponse
  ): Promise<ClientkBankAccounts[]> {
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(ClientkBankAccounts.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return Promise.resolve<ClientkBankAccounts[]>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Add Other Transaction Methods Detail

  AddOtherWallet(
    body: ClientWalletModel | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/addclientwalletaccount';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json-patch+json',
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
        return this.processWithdraw_POST3(_response);
      });
  }

  protected processWithdraw_POST3(
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
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return Promise.resolve<BettingResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Add bank with kyc

  addclientbankaccountwithkyc(
    image_File: FileParameter | undefined,
    image_PaymentMethod: string | undefined,
    haveKyc: boolean | undefined,
    accountNo: string | undefined,
    accountHolderName: string | undefined,
    iFSCCode: string | undefined,
    bankName: string | undefined,
    branchName: string | undefined,
    accountType: string | undefined,
    bankType: string | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/addclientbankaccountwithkyc';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (image_File === null || image_File === undefined)
      throw new Error("The parameter 'image_File' cannot be null.");
    else
      content_.append(
        'Image.File',
        image_File.data,
        image_File.fileName ? image_File.fileName : 'Image.File'
      );
    if (image_PaymentMethod === null || image_PaymentMethod === undefined)
      throw new Error("The parameter 'image_PaymentMethod' cannot be null.");
    else content_.append('Image.PaymentMethod', image_PaymentMethod.toString());
    if (haveKyc === null || haveKyc === undefined)
      throw new Error("The parameter 'haveKyc' cannot be null.");
    else content_.append('HaveKyc', haveKyc.toString());
    if (accountNo === null || accountNo === undefined)
      throw new Error("The parameter 'accountNo' cannot be null.");
    else content_.append('AccountNo', accountNo.toString());
    if (accountHolderName === null || accountHolderName === undefined)
      throw new Error("The parameter 'accountHolderName' cannot be null.");
    else content_.append('AccountHolderName', accountHolderName.toString());
    if (iFSCCode === null || iFSCCode === undefined)
      throw new Error("The parameter 'iFSCCode' cannot be null.");
    else content_.append('IFSCCode', iFSCCode.toString());
    if (bankName === null || bankName === undefined)
      throw new Error("The parameter 'bankName' cannot be null.");
    else content_.append('BankName', bankName.toString());
    if (branchName === null || branchName === undefined)
      throw new Error("The parameter 'branchName' cannot be null.");
    else content_.append('BranchName', branchName.toString());
    if (accountType === null || accountType === undefined)
      throw new Error("The parameter 'accountType' cannot be null.");
    else content_.append('AccountType', accountType.toString());
    if (bankType === null || bankType === undefined)
      throw new Error("The parameter 'bankType' cannot be null.");
    else content_.append('BankType', bankType.toString());

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
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
        return this.processaddclientbankaccountwithkyc(_response);
      });
  }

  protected processaddclientbankaccountwithkyc(
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
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return Promise.resolve<BettingResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Add bank with kyc

  // Update Bank with kyc

  updatebankdetailkyc(
    accountNo: string | undefined,
    file: FileParameter | undefined,
    paymentMethod: string | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/updatebankdetailkyc';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = new FormData();
    if (accountNo === null || accountNo === undefined)
      throw new Error("The parameter 'accountNo' cannot be null.");
    else content_.append('AccountNo', accountNo.toString());
    if (file === null || file === undefined)
      throw new Error("The parameter 'file' cannot be null.");
    else
      content_.append(
        'File',
        file.data,
        file.fileName ? file.fileName : 'File'
      );
    if (paymentMethod === null || paymentMethod === undefined)
      throw new Error("The parameter 'paymentMethod' cannot be null.");
    else content_.append('PaymentMethod', paymentMethod.toString());

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
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
        return this.processupdatebankdetailkyc(_response);
      });
  }

  protected processupdatebankdetailkyc(
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
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return Promise.resolve<BettingResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Update Bank with kyc

  // view kyc method

  getbankdetailkyc(
    body: string | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/getbankdetailkyc';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json-patch+json',
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
        return this.processgetbankdetailkyc(_response);
      });
  }

  protected processgetbankdetailkyc(
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
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return Promise.resolve<BettingResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // view kyc method

  // get bank with kyc

  getclientbankaccountwithkyc(
    cancelToken?: CancelToken | undefined
  ): Promise<ClientkBankAccountsResponse[]> {
    let url_ = this.baseUrl + '/exchangeapi/client/getclientbankaccountwithkyc';
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processgetclientbankaccountwithkyc(_response);
      });
  }

  protected processgetclientbankaccountwithkyc(
    response: AxiosResponse
  ): Promise<ClientkBankAccountsResponse[]> {
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(ClientkBankAccountsResponse.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return Promise.resolve<ClientkBankAccountsResponse[]>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // get bank with kyc

  // Add Other Transaction Methods Detail

  /**
   * @param body (optional)
   * @return Success
   */
  AddBankAccount(
    body: ClientkBankAccounts | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_ = this.baseUrl + '/exchangeapi/client/addclientbankaccounts';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json-patch+json',
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
        return this.processWithdraw_POST(_response);
      });
  }

  protected processWithdraw_POST(
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
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return Promise.resolve<BettingResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  //Remove
  /**
   * @param body (optional)
   * @return Success
   */
  RemoveBankAccount(
    body: any | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_ = this.baseUrl + '/exchangeapi/client/removebankdetail';
    url_ = url_.replace(/[?&]$/, '');
    const content_ = JSON.stringify(body);
    let options_: AxiosRequestConfig = {
      // data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json-patch+json',
        Accept: 'application/json',
        accountNumber: body,
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
        return this.processRemoveBank(_response);
      });
  }

  protected processRemoveBank(response: AxiosResponse): Promise<any> {
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
      return resultData200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Request History

  ManualPaymentHistory(
    cancelToken?: CancelToken | undefined
  ): Promise<ManualPayamentHistoryResponse[]> {
    let url_ = this.baseUrl + '/exchangeapi/client/manualpaymenthistory';
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processManualPayment_GET(_response);
      });
  }

  protected processManualPayment_GET(
    response: AxiosResponse
  ): Promise<ManualPayamentHistoryResponse[]> {
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(ManualPayamentHistoryResponse.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return Promise.resolve<ManualPayamentHistoryResponse[]>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Request History

  /**
   * @param body (optional)
   * @return Success
   */
  WithdrawRequest(
    body: RequetedAmount | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_ = this.baseUrl + _window().requestwithdraw;
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: 'POST',
      url: url_,
      headers: {
        'Content-Type': 'application/json-patch+json',
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
        return this.processWithdraw_POST2(_response);
      });
  }

  protected processWithdraw_POST2(
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
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = BettingResponse.fromJS(resultData200);
      return Promise.resolve<BettingResponse>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * @return Success
   */
  GetWithdrawRequests(
    cancelToken?: CancelToken | undefined
  ): Promise<PendingWithdrawRequests[]> {
    let url_ = this.baseUrl + '/exchangeapi/client/withdrawrequests';
    url_ = url_.replace(/[?&]$/, '');

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {
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
        return this.processWithdraw_GET2(_response);
      });
  }

  protected processWithdraw_GET2(
    response: AxiosResponse
  ): Promise<PendingWithdrawRequests[]> {
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(PendingWithdrawRequests.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return Promise.resolve<PendingWithdrawRequests[]>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  // Back Details

  /**
   * Exchange My bets
   * @param body (optional) Bets filter from- to filter
   * @return Success
   */
  fancybets(
    body: MyBetsInputModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MarketOrders[]> {
    let url_;
    if (_window().fancybets) {
      url_ = this.baseUrl + _window().fancybets;
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
        return this.processFancybets(_response);
      });
  }

  protected processFancybets(response: AxiosResponse): Promise<MarketOrders[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(MarketOrders.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Exchange My bets
   * @param body (optional) Bets filter from- to filter
   * @return Success
   */
  exchangemybets(
    body: MyBetsInputModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MarketOrders[]> {
    let url_;
    if (_window().exchangemybets) {
      url_ = this.baseUrl + _window().exchangemybets;
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
        return this.processExchangemybets(_response);
      });
  }

  protected processExchangemybets(
    response: AxiosResponse
  ): Promise<MarketOrders[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(MarketOrders.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Sports My bets
   * @param body (optional) Bets filter from- to filterType(SETTLED,MATCHED,UN-MATCHED,VOIDED,LAPSED,CANCELLED)
   * @return Success
   */
  sportsbets(
    body: MyBetsInputModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MarketOrders[]> {
    let url_;
    if (_window().sportsbets) {
      url_ = this.baseUrl + _window().sportsbets;
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
        return this.processSportsbets(_response);
      });
  }

  protected processSportsbets(
    response: AxiosResponse
  ): Promise<MarketOrders[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(MarketOrders.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Profit and Loss
   * @param body (optional) From-To date filter
   * @return Success
   */
  pl(
    body: AccountstmtInputModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<PLModel[]> {
    let url_;
    if (_window().pl) {
      url_ = this.baseUrl + _window().pl;
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
        return this.processPl(_response);
      });
  }

  protected processPl(response: AxiosResponse): Promise<PLModel[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(PLModel.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Sports Markets reports
   * @param body (optional) sports/ type filter
   * @return Success
   */
  plsmarketwise(
    body: PLInnerInput | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<PLInnerSub[]> {
    let url_;
    if (_window().plmarketwise) {
      url_ = this.baseUrl + _window().plmarketwise;
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
        return this.processPlsmarketwise(_response);
      });
  }

  protected processPlsmarketwise(
    response: AxiosResponse
  ): Promise<PLInnerSub[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(PLInnerSub.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Sports Markets reports
   * @param body (optional) sports/ type filter
   * @return Success
   */
  plsportswise(
    body: PLInnerInput | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<PLInner[]> {
    let url_;
    if (_window().plsportswise) {
      url_ = this.baseUrl + _window().plsportswise;
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
        return this.processPlsportswise(_response);
      });
  }

  protected processPlsportswise(response: AxiosResponse): Promise<PLInner[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(PLInner.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Sports Results
   * @param body (optional) Filter type is provided (Sports id ) and Date (yyyy-MM-dd)
   * @return Success
   */
  results(
    body: CasinoBetsInputModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<SportsResult[]> {
    let url_;
    if (_window().results) {
      url_ = this.baseUrl + _window().results;
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
        return this.processResults(_response);
      });
  }

  protected processResults(response: AxiosResponse): Promise<SportsResult[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(SportsResult.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * Client Activity
   * @return Success
   */
  activity(
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<ActivityLogs[]> {
    let url_;
    if (_window().activity) {
      url_ = this.baseUrl + _window().activity;
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
        return this.processActivity(_response);
      });
  }

  protected processActivity(response: AxiosResponse): Promise<ActivityLogs[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(ActivityLogs.fromJS(item));
      } else {
        result200 = <any>null;
      }
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
   * @param body (optional)
   * @return Success
   */
  GetBanners(
    body: string | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<Banners[]> {
    let url_;
    if (_window().banners) {
      url_ = this.baseUrl + _window().banners;
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
        return this.processBanners_POST(_response);
      });
  }

  protected processBanners_POST(response: AxiosResponse): Promise<Banners[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) result200!.push(Banners.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  GetEventTv(
    id: number,
    cancelToken?: CancelToken | undefined
  ): Promise<EventTv> {
    let url_;
    if (_window().eventtv) {
      url_ = this.baseUrl + _window().eventtv;
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
        return this.processTV_GET2(_response);
      });
  }

  protected processTV_GET2(response: AxiosResponse): Promise<EventTv> {
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
        console.error(_responseText.message);
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
      result200 = EventTv.fromJS(resultData200);
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  //virtualTV
  GetVirtualTv(
    id: number,
    cancelToken?: CancelToken | undefined
  ): Promise<any> {
    let url_;
    if (_window().virtualtv) {
      url_ = this.baseUrl + _window().virtualtv;
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
        return this.processVIRTV_GET2(_response);
      });
  }

  protected processVIRTV_GET2(response: AxiosResponse): Promise<any> {
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
        console.error(_responseText.message);
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
      result200 = EventTv.fromJS(resultData200);
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  getcompetitionsbycountry(
    countryCode: string,
    id: number,
    from: string,
    cancelToken?: CancelToken | undefined
  ): Promise<Menu[]> {
    let url_;
    if (_window().getcompetitionsbycountry) {
      url_ = this.baseUrl + _window().getcompetitionsbycountry;
      if (countryCode === undefined || countryCode === null)
        throw new Error("The parameter 'countryCode' must be defined.");
      url_ = url_.replace(
        '{countryCode}',
        encodeURIComponent('' + countryCode)
      );
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace('{id}', encodeURIComponent('' + id));
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
      url: url_,
      headers: {
        ContentType: 'application/json',
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
        return this.processgetcompetitionsbycountry(_response);
      });
  }

  protected processgetcompetitionsbycountry(
    response: AxiosResponse
  ): Promise<Menu[]> {
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200) {
          if (item.detail.includes('competitionsmarkets')) {
            item.url = 'tournament/' + item.name.toLowerCase().trim().split(' ').join('-') + '-' + item.id
          }
          result200!.push(Menu.fromJS(item));
        }
      } else {
        result200 = <any>null;
      }
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

  /**
   * @return Success
   */
  wallet(
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<ClientWallet> {
    let url_;
    if (_window().wallet) {
      url_ = this.baseUrl + _window().wallet;
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
        return this.processWallet(_response);
      });
  }

  protected processWallet(response: AxiosResponse): Promise<ClientWallet> {
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
        console.error(_responseText.message);
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
      result200 = ClientWallet.fromJS(resultData200);
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
   * @param body (optional)
   * @return Success
   */
  Sportswallet(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<ClientWallet> {
    let url_;
    if (_window().sportswallet) {
      url_ = this.baseUrl + _window().sportswallet;
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
        return this.processSportswallet(_response);
      });
  }

  protected processSportswallet(
    response: AxiosResponse
  ): Promise<ClientWallet> {
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
        console.error(_responseText.message);
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
      result200 = ClientWallet.fromJS(resultData200);
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
   * @param body (optional)
   * @return Success
   */
  XgameWallet(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<ClientWallet> {
    let url_;
    if (_window().xgwallet) {
      url_ = this.baseUrl + _window().xgwallet;
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
        return this.processXgamewallet(_response);
      });
  }

  protected processXgamewallet(response: AxiosResponse): Promise<ClientWallet> {
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
        console.error(_responseText.message);
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
      result200 = ClientWallet.fromJS(resultData200);
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

  BookMakerOrdersplaced(
    lookSabha: boolean = false,
    body: FancyModel | undefined,
    from: String,
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
  MatchunmatchLocalMarket(
    body: string | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<MatchedUnmatched> {
    let url_;
    if (_window().matchunmatchlocalmarket) {
      url_ = this.baseUrl + _window().matchunmatchlocalmarket;
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
        return this.processMatchunmatchlocal(_response);
      });
  }

  protected processMatchunmatchlocal(
    response: AxiosResponse
  ): Promise<MatchedUnmatched> {
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
        console.error(_responseText.message);
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
      result200 = MatchedUnmatched.fromJS(resultData200);
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
   * @param body (optional) all inputs are required
   * @return Success
   */
  LocalMarketCancelorders(
    body: CancelOrders | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<CurrentBetResp> {
    let url_;
    if (_window().cancelorderslocal) {
      url_ = this.baseUrl + _window().cancelorderslocal;
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
        return this.processLocalMarketCancelorders(_response);
      });
  }

  protected processLocalMarketCancelorders(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
  SportsCancelOrders(
    body: CancelOrders | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<CurrentBetResp> {
    let url_;
    if (_window().sportscancelorders) {
      url_ = this.baseUrl + _window().sportscancelorders;
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
        return this.processSportsCancelOrders(_response);
      });
  }

  protected processSportsCancelOrders(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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

  /**
   * @param body (optional)
   * @return Success
   */
  cancellallOrdersSports(
    body: CancellAllOrders | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<CurrentBetResp> {
    let url_ = this.baseUrl + '/exchangeapi/sports/cancellallorders';
    url_ = url_.replace(/[?&]$/, '');

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
        return this.processCancelOrdersSports_POST2(_response);
      });
  }

  protected processCancelOrdersSports_POST2(
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
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = CurrentBetResp.fromJS(resultData200);
      return Promise.resolve<CurrentBetResp>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * Cancel order in Exchange Game
   * @param body (optional) all inputs are required
   * @return Success
   */
  XGameCancelOrders(
    body: XGameOrderCancelModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().xgcancelorders) {
      url_ = this.baseUrl + _window().xgcancelorders;
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
        return this.processXGameCancelOrders(_response);
      });
  }

  protected processXGameCancelOrders(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
   * order placed sports in orders model
   * @param body (optional) all inputs are required
   * @return Success
   */
  SportsOrdersplaced(
    body: SportsBettingModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().sportsordersplaced) {
      url_ = this.baseUrl + _window().sportsordersplaced;
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
        return this.processSportsOrdersplaced(_response);
      });
  }

  protected processSportsOrdersplaced(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
        console.error(_responseText.message);
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

  /**
   * order placed in fancy market
   * @param body (optional) all inputs are required
   * @return Success
   */
  FancyOrdersplaced(
    lookSabha: boolean = false,
    body: FancyModel | undefined,
    from: String,
    isSportsBook?: boolean,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().fancyordersplacedSingle && _window().sportsbookplacedSingle) {
      if (isSportsBook == true) {
        url_ = this.baseUrl + _window().sportsbookplacedSingle;
        url_ = url_.replace(/[?&]$/, '');
      } else {
        let version = lookSabha
          ? _window().loksabhafancyOrderPlVersion
          : _window().fancyOrderPlVersion;
        url_ = this.baseUrl + _window().fancyordersplaced + `${version}`;
        url_ = url_.replace(/[?&]$/, '');
      }
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
   * order placed in exchange game
   * @param body (optional) all inputs are required
   * @return Success
   */
  XgameOrdersplaced(
    body: OrderPlaceModel | undefined,
    from: String,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().ordersplacedxg) {
      url_ = this.baseUrl + _window().ordersplacedxg;
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
        return this.processXgameOrdersplaced(_response);
      });
  }

  protected processXgameOrdersplaced(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
   * Detail of Single Markets
   * @param body (optional) Market Id
   * @return Success
   */
  GetOthersMarkets(
    body: string | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<OthersMarkets[]> {
    let url_;
    if (_window().othersmarkets) {
      url_ = this.baseUrl + _window().othersmarkets;
      url_ = url_.replace(/[?&]$/, '');
    }

    const content_ = body;

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
        return this.processOthersMarkets_POST(_response);
      });
  }

  protected processOthersMarkets_POST(
    response: AxiosResponse
  ): Promise<OthersMarkets[]> {
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
        console.error(_responseText.message);
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
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(OthersMarkets.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return result200;
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  jorhiTigarhiPOST(
    body: MultiPlaceBet | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<BettingResponse> {
    let url_;
    if (_window().jorhipost) {
      url_ = this.baseUrl + _window().jorhipost;
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
        return this.processJorhiTigarhi_POST(_response);
      });
  }

  protected processJorhiTigarhi_POST(
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
        // this.googleAnalyticsService.recordExceptions(_responseText.message);
        console.error(_responseText.message);
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
      return throwException('Error', status, _responseText, _headers);
    }
  }

  GetiPAddressForBetid(
    body: IPAddressForBetIds | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<string> {
    let url_ = this.baseUrl + '/exchangeapi/reports/ipaddress';
    url_ = url_.replace(/[?&]$/, '');

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
        return this.processIPAddressForBetid_POST(_response);
      });
  }

  protected processIPAddressForBetid_POST(
    response: AxiosResponse
  ): Promise<string> {
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
      result200 = resultData200 !== undefined ? resultData200 : <any>null;
      return Promise.resolve<string>(result200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  /**
   * @return Success
   */
  GetBlog(
    from?: String,
    cancelToken?: CancelToken | undefined
  ): Promise<LineLiablityMulti[]> {
    let url_;
    if (_window().getBlogDetail) {
      url_ = _window().getBlogDetail;
      url_ = url_.replace(/[?&]$/, '');
    }

    let options_ = <AxiosRequestConfig>{
      method: 'GET',
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
        return this.processGetBlog(_response);
      });
  }

  protected processGetBlog(
    response: AxiosResponse
  ): Promise<LineLiablityMulti[]> {
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
      // if (Array.isArray(resultData200)) {
      //   result200 = [] as any;
      //   for (let item of resultData200)
      //     result200!.push(PendingWithdrawRequests.fromJS(item));
      // } else {
      //   result200 = <any>null;
      // }
      return Promise.resolve<[]>(resultData200);
    } else if (status === 417) {
      const _responseText = response.data;
      return throwException('Client Error', status, _responseText, _headers);
    } else {
      const _responseText = response.data;
      return throwException('Error', status, _responseText, _headers);
    }
  }

  getFavorite(cancelToken?: CancelToken | undefined): Promise<any> {
    let url_ = this.baseUrl + '/exchangeapi/casino/games/favourite';

    let options_: AxiosRequestConfig = {
      method: 'GET',
      url: url_,
      headers: {},
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
        return this.processgetFavorite(_response);
      });
  }

  protected processgetFavorite(response: AxiosResponse): Promise<any> {
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
      result200 = resultData200;
      return result200;
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        'An unexpected server error occurred.',
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<any>(null as any);
  }
}

export function _window(): any {
  // return the global native browser window object
  return window;
}

export class TodayRacesASSS implements ITodayRacesASSS {
  startTime?: string | undefined;
  /** Market id */
  id?: string | undefined;
  /** Market Name */
  name?: string | undefined;
  /** this is market */
  isMarket?: boolean;
  /** if it's market level then it will show isinplay */
  inPlay?: boolean | undefined;
  /** for local market or Race Market */
  detail?: string | undefined;

  constructor(data?: ITodayRacesASSS) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.startTime = _data['startTime'];
      this.id = _data['id'];
      this.name = _data['name'];
      this.isMarket = _data['isMarket'];
      this.inPlay = _data['inPlay'];
      this.detail = _data['detail'];
    }
  }

  static fromJS(data: any): TodayRacesASSS {
    data = typeof data === 'object' ? data : {};
    let result = new TodayRacesASSS();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['startTime'] = this.startTime;
    data['id'] = this.id;
    data['name'] = this.name;
    data['isMarket'] = this.isMarket;
    data['inPlay'] = this.inPlay;
    data['detail'] = this.detail;
    return data;
  }
}

export interface ITodayRacesASSS {
  startTime?: string | undefined;
  /** Market id */
  id?: string | undefined;
  /** Market Name */
  name?: string | undefined;
  /** this is market */
  isMarket?: boolean;
  /** if it's market level then it will show isinplay */
  inPlay?: boolean | undefined;
  /** for local market or Race Market */
  detail?: string | undefined;
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

  constructor(
    marketid: string,
    selectionid: string,
    handicap: string,
    side: string,
    price: string,
    size: string,
    keepaliveon: string
  ) {
    this.marketId = marketid;
    this.selectionId = selectionid;
    this.handiCap = handicap;
    this.side = side;
    this.price = price;
    this.size = size;
    this.keepAliveOn = keepaliveon;
  }
}

export class TVResponseToClient implements ITVResponseToClient {
  data?: TVResponseDB[] | undefined;
  ipAddress?: string | undefined;

  constructor(data?: ITVResponseToClient) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data['data'])) {
        this.data = [] as any;
        for (let item of _data['data'])
          this.data!.push(TVResponseDB.fromJS(item));
      }
      this.ipAddress = _data['ipAddress'];
    }
  }

  static fromJS(data: any): TVResponseToClient {
    data = typeof data === 'object' ? data : {};
    let result = new TVResponseToClient();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.data)) {
      data['data'] = [];
      for (let item of this.data) data['data'].push(item.toJSON());
    }
    data['ipAddress'] = this.ipAddress;
    return data;
  }
}

export interface ITVResponseToClient {
  data?: TVResponseDB[] | undefined;
  ipAddress?: string | undefined;
}

export class TVResponseDB implements ITVResponseDB {
  childs?: TVResponseDB[] | undefined;
  channelId?: string | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;

  constructor(data?: ITVResponseDB) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data['childs'])) {
        this.childs = [] as any;
        for (let item of _data['childs'])
          this.childs!.push(TVResponseDB.fromJS(item));
      }
      this.channelId = _data['channelId'];
      this.id = _data['id'];
      this.name = _data['name'];
    }
  }

  static fromJS(data: any): TVResponseDB {
    data = typeof data === 'object' ? data : {};
    let result = new TVResponseDB();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.childs)) {
      data['childs'] = [];
      for (let item of this.childs) data['childs'].push(item.toJSON());
    }
    data['channelId'] = this.channelId;
    data['id'] = this.id;
    data['name'] = this.name;
    return data;
  }
}

export interface ITVResponseDB {
  childs?: TVResponseDB[] | undefined;
  channelId?: string | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;
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

export class NextRaceWithStatus implements INextRaceWithStatus {
  status?: string | undefined;
  eventTypeId?: number;
  marketId?: string | undefined;
  startTime?: string | undefined;
  countryCode?: string | undefined;
  trackName?: string | undefined;
  isLocalMarket?: boolean;

  constructor(data?: INextRaceWithStatus) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.status = _data['status'];
      this.eventTypeId = _data['eventTypeId'];
      this.marketId = _data['marketId'];
      this.startTime = _data['startTime'];
      this.countryCode = _data['countryCode'];
      this.trackName = _data['trackName'];
      this.isLocalMarket = _data['isLocalMarket'];
    }
  }

  static fromJS(data: any): NextRaceWithStatus {
    data = typeof data === 'object' ? data : {};
    let result = new NextRaceWithStatus();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['status'] = this.status;
    data['eventTypeId'] = this.eventTypeId;
    data['marketId'] = this.marketId;
    data['startTime'] = this.startTime;
    data['countryCode'] = this.countryCode;
    data['trackName'] = this.trackName;
    data['isLocalMarket'] = this.isLocalMarket;
    return data;
  }
}

export interface INextRaceWithStatus {
  status?: string | undefined;
  eventTypeId?: number;
  marketId?: string | undefined;
  startTime?: string | undefined;
  countryCode?: string | undefined;
  trackName?: string | undefined;
  isLocalMarket?: boolean;
}

export class EventTv implements IEventTv {
  ipAddress?: string | undefined;
  channelId?: string | undefined;
  message?: string | undefined;
  status?: boolean | undefined;
  sportsRadarId?: string | undefined;
  constructor(data?: IEventTv) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.ipAddress = _data['ipAddress'];
      this.channelId = _data['channelId'];
      this.message = _data['message'];
      this.status = _data['status'];
      this.sportsRadarId = _data['sportsRadarId'];
    }
  }

  static fromJS(data: any): EventTv {
    data = typeof data === 'object' ? data : {};
    let result = new EventTv();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['ipAddress'] = this.ipAddress;
    data['channelId'] = this.channelId;
    data['message'] = this.message;
    data['status'] = this.status;
    data['sportsRadarId'] = this.sportsRadarId;
    return data;
  }
}

export interface IEventTv {
  ipAddress?: string | undefined;
  channelId?: string | undefined;
  message?: string | undefined;
  status?: boolean | undefined;
  sportsRadarId?: string | undefined;
}

export class SportsBookMarkets implements ISportsBookMarkets {
  marketId?: string;
  marketName?: string | undefined;
  marketStatus?: string | undefined;
  minBet?: number;
  maxBet?: number;
  betSize?: number;
  liability?: number;
  profit?: number;
  maxMarket?: number;
  runners: SportsbookRunners[] = [];
  sortingOrder?: number;
  objectId?: string;
  marketID?: string;
  isFavourite?: boolean;
  specifiers?: string;
  outcomes: Outcome[] | undefined;
  status?: string;

  runnerMap: Map<string, SportsbookRunners> = new Map(); // Memoization map

  constructor(data?: ISportsBookMarkets) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.marketId = _data['marketId'];
      this.marketName = _data['marketName'];
      this.marketStatus = _data['marketStatus'];
      this.minBet = _data['minBet'];
      this.maxBet = _data['maxBet'];
      this.liability = _data['liability'];
      this.maxMarket = _data['maxMarket'];
      if (Array.isArray(_data['runners'])) {
        this.runners = _data['runners'].map(runner => {
          const newRunner = SportsbookRunners.fromJS(runner)
          newRunner.selectionId ? this.runnerMap.set(newRunner.selectionId, newRunner) : {}
          return newRunner
        })
      }
      this.sortingOrder = _data['sortingOrder'];
      this.objectId = _data['objectId'];
      this.marketID = _data['marketID'];
      this.isFavourite = _data['isFavourite'];
      this.specifiers = _data['specifiers'];
      this.outcomes = _data['outcomes'];
      this.status = _data['status'];
    }
  }

  update(data: SportsBookMarkets) {
    this.status !== data.status ? this.status = data.status : {}
    if (data.runners && data.runners.length > 0) {
      data.runners.forEach((runner: SportsbookRunners) => {
        if (runner.selectionId) {
          const previousRunner = this.runnerMap.get(runner.selectionId)
          if (previousRunner) {
            previousRunner.update(
              {
                "status": runner.status,
                "rate": runner.rate,
                "result": runner.result
              }
            )
          } else {
            this.runnerMap.set(runner.selectionId, runner)
            this.runners.push(runner)
          }
        }
      })
    }
  }

  updateRunnerPosition(data: any) {
    let runner = this.runnerMap.get(String(data.runnerId))
    if (runner) {
      runner.position = data.position
      runner.position2 = data.position2
    }
  }

  static fromJS(data: any): SportsBookMarkets {
    let marketDetail = data.split('~')[0].split('|')
    // data = typeof data === 'object' ? data : {};
    let result = new SportsBookMarkets();
    data = {
      "marketId": marketDetail[0],
      "marketName": marketDetail[1],
      "status": marketDetail[2],
      "runners": data.split('~')[1].split('*')
    }
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['marketId'] = this.marketId;
    data['marketName'] = this.marketName;
    data['marketStatus'] = this.marketStatus;
    data['minBet'] = this.minBet;
    data['maxBet'] = this.maxBet;
    data['maxMarket'] = this.maxMarket;
    if (Array.isArray(this.runners)) {
      data['runners'] = [];
      for (let item of this.runners) data['runners'].push(item.toJSON());
    }
    data['sortingOrder'] = this.sortingOrder;
    return data;
  }
}

export interface Outcome {
  outcomeID: string;
  outcomeName?: string;
  outcomeType?: string;
  active: boolean;
  oddsDecimal: number;
  probabilities: number;
  homeOrAwayTeam: any;
  competitor: any;
  outcomeDefinition?: string;
  outcomeResult?: string;
  voidFactor?: string;
  deadHeatFactor: number;
}

export interface ISportsBookMarkets {
  marketId?: string;
  marketName?: string | undefined;
  marketStatus?: string | undefined;
  minBet?: number;
  maxBet?: number;
  betSize?: number;
  maxMarket?: number;
  runners?: SportsbookRunners[] | undefined;
  sortingOrder?: number;
  objectId?: string;
  marketID?: string;
  isFavourite?: boolean;
  specifiers?: string;
  outcomes: Outcome[] | undefined;
}

export class SportsbookRunners implements ISportsbookRunners {
  selectionId?: string;
  runnerName?: string | undefined;
  position?: number;
  position2?: number;
  rate?: number;
  status?: string;
  result?: string;
  betSize?: number;
  liability?: number;

  constructor(data?: ISportsbookRunners) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.selectionId = _data['runnerId'];
      this.runnerName = _data['runnerName'];
      this.rate = _data['odds'];
      this.status = _data['status'];
      this.result = _data['result'];
    }
  }

  update(data?: any) {
    if (data) {
      data.status && this.status !== data.status ? this.status = data.status : {}
      data.rate && this.rate !== data.rate ? this.rate = data.rate : {}
      data.result && this.result !== data.result ? this.result = data.result : {}
      data.betSize && this.betSize !== data.betSize ? this.betSize = data.betSize : {}
      data.liability && this.liability !== data.liability ? this.liability = data.liability : {}
    }
  }

  static fromJS(data: any): SportsbookRunners {
    let runnerDetail = data.split('|')
    // data = typeof data === 'object' ? data : {};
    let result = new SportsbookRunners();
    data = {
      "runnerId": runnerDetail[0],
      "runnerName": runnerDetail[1],
      "status": runnerDetail[2],
      "odds": runnerDetail[3],
      "result": runnerDetail[4]
    }
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['selectionId'] = this.selectionId;
    data['runnerName'] = this.runnerName;
    data['rate'] = this.rate;
    return data;
  }
}

export interface ISportsbookRunners {
  selectionId?: string;
  runnerName?: string | undefined;
  rate?: number;
}

export class BannerDetail implements IBannerDetail {
  id?: number;
  link?: string | undefined;
  text?: string | undefined;

  constructor(data?: IBannerDetail) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.link = _data['link'];
      this.text = _data['text'];
    }
  }

  static fromJS(data: any): BannerDetail {
    data = typeof data === 'object' ? data : {};
    let result = new BannerDetail();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['link'] = this.link;
    data['text'] = this.text;
    return data;
  }
}

export interface IBannerDetail {
  id?: number;
  link?: string | undefined;
  text?: string | undefined;
}

export class Banners implements IBanners {
  type?: string | undefined;
  data?: BannerDetail[] | undefined;
  text?: string | undefined;
  constructor(data?: IBanners) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.type = _data['type'];
      this.text = _data['text'];
      if (Array.isArray(_data['data'])) {
        this.data = [] as any;
        for (let item of _data['data'])
          this.data!.push(BannerDetail.fromJS(item));
      }
    }
  }

  static fromJS(data: any): Banners {
    data = typeof data === 'object' ? data : {};
    let result = new Banners();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['type'] = this.type;
    data['text'] = this.text;
    if (Array.isArray(this.data)) {
      data['data'] = [];
      for (let item of this.data) data['data'].push(item.toJSON());
    }
    return data;
  }
}

export interface IBanners {
  type?: string | undefined;
  data?: BannerDetail[] | undefined;
  text?: string | undefined;
}

/** A list of KeyLineSelection objects describing the key line for the market */
export class KeyLineDescription implements IKeyLineDescription {
  /** A list of KeyLineSelection objects */
  keyLine?: KeyLineSelection[] | undefined;

  constructor(data?: IKeyLineDescription) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data['keyLine'])) {
        this.keyLine = [] as any;
        for (let item of _data['keyLine'])
          this.keyLine!.push(KeyLineSelection.fromJS(item));
      }
    }
  }

  static fromJS(data: any): KeyLineDescription {
    data = typeof data === 'object' ? data : {};
    let result = new KeyLineDescription();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.keyLine)) {
      data['keyLine'] = [];
      for (let item of this.keyLine) data['keyLine'].push(item.toJSON());
    }
    return data;
  }
}

/** A list of KeyLineSelection objects describing the key line for the market */
export interface IKeyLineDescription {
  /** A list of KeyLineSelection objects */
  keyLine?: KeyLineSelection[] | undefined;
}

/** Description of a markets key line selection, comprising the selectionId and handicap of the team it is applied to. */
export class KeyLineSelection implements IKeyLineSelection {
  /** Selection ID of the runner in the key line handicap. */
  selectionId?: number;
  /** Handicap value of the key line. */
  handicap?: number;

  constructor(data?: IKeyLineSelection) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.selectionId = _data['selectionId'];
      this.handicap = _data['handicap'];
    }
  }

  static fromJS(data: any): KeyLineSelection {
    data = typeof data === 'object' ? data : {};
    let result = new KeyLineSelection();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['selectionId'] = this.selectionId;
    data['handicap'] = this.handicap;
    return data;
  }
}

/** Description of a markets key line selection, comprising the selectionId and handicap of the team it is applied to. */
export interface IKeyLineSelection {
  /** Selection ID of the runner in the key line handicap. */
  selectionId?: number;
  /** Handicap value of the key line. */
  handicap?: number;
}
export class SearchResult implements ISearchResult {
  marketName?: string | undefined;
  marketStartTime?: string | undefined;
  eventName?: string | undefined;
  eventTypeID?: number;
  competitionID?: number;
  marketID?: string | undefined;
  eventID?: number;

  constructor(data?: ISearchResult) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.marketName = _data['marketName'];
      this.marketStartTime = _data['marketStartTime'];
      this.eventName = _data['eventName'];
      this.eventTypeID = _data['eventTypeID'];
      this.competitionID = _data['competitionID'];
      this.marketID = _data['marketID'];
      this.eventID = _data['eventID'];
    }
  }

  static fromJS(data: any): SearchResult {
    data = typeof data === 'object' ? data : {};
    let result = new SearchResult();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['marketName'] = this.marketName;
    data['marketStartTime'] = this.marketStartTime;
    data['eventName'] = this.eventName;
    data['eventTypeID'] = this.eventTypeID;
    data['competitionID'] = this.competitionID;
    data['marketID'] = this.marketID;
    data['eventID'] = this.eventID;
    return data;
  }
}

export interface ISearchResult {
  marketName?: string | undefined;
  marketStartTime?: string | undefined;
  eventName?: string | undefined;
  eventTypeID?: number;
  competitionID?: number;
  marketID?: string | undefined;
  eventID?: number;
}

export class PopularSports implements IPopularSports {
  id?: string | undefined;
  eventName?: string | undefined;
  marketId?: string | undefined;
  link?: string | undefined;

  constructor(data?: IPopularSports) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.eventName = _data['eventName'];
      this.marketId = _data['marketId'];
      this.link = _data['link'];
    }
  }

  static fromJS(data: any): PopularSports {
    data = typeof data === 'object' ? data : {};
    let result = new PopularSports();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['eventName'] = this.eventName;
    data['marketId'] = this.marketId;
    data['link'] = this.link;
    return data;
  }
}

export interface IPopularSports {
  id?: string | undefined;
  eventName?: string | undefined;
  marketId?: string | undefined;
  link?: string | undefined;
}

export class CasinoRequest implements ICasinoRequest {
  provider?: string | undefined;
  gameType?: string | undefined;
  gameId?: string | undefined;
  isDemo?: boolean;
  device?: string | undefined;
  theme?: string | undefined;
  tableId?: string | undefined;
  constructor(
    provider: string,
    gametype: string | undefined,
    gameid: string | undefined,
    isdemo: boolean,
    device: string,
    theme: string | undefined,
    tableId: string | undefined
  ) {
    this.provider = provider;
    this.gameType = gametype;
    this.gameId = gameid;
    this.isDemo = false;
    this.device = device;
    this.theme = theme;
    this.tableId = tableId;
  }
}

export interface ICasinoRequest {
  provider?: string | undefined;
  gameType?: string | undefined;
  gameId?: string | undefined;
  isDemo?: boolean;
  device?: string | undefined;
  theme?: string | undefined;
  tableId?: string | undefined;
}

export class PhoneNOResponse implements IPhoneNOResponse {
  otpRequired?: number;
  /** flag for response */
  status?: boolean;
  /** Error or success message */
  message?: string | undefined;

  constructor(data?: IPhoneNOResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.otpRequired = _data['otpRequired'];
      this.status = _data['status'];
      this.message = _data['message'];
    }
  }

  static fromJS(data: any): PhoneNOResponse {
    data = typeof data === 'object' ? data : {};
    let result = new PhoneNOResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['otpRequired'] = this.otpRequired;
    data['status'] = this.status;
    data['message'] = this.message;
    return data;
  }
}

export interface IPhoneNOResponse {
  otpRequired?: number;
  /** flag for response */
  status?: boolean;
  /** Error or success message */
  message?: string | undefined;
}

export class CheckUserNameOrPhone {
  countryCode?: string | undefined;
  username?: string | undefined;
  recaptcha?: string | undefined;

  constructor(usern: string, recaptchaa: string, countryCode: string) {
    this.countryCode = countryCode;
    this.username = usern;
    this.recaptcha = recaptchaa;
  }
}
export class CheckRequestOTP {
  countryCode?: string | undefined;
  PhoneOrEmail?: string | undefined;
  recaptcha?: string | undefined;
  IsPhone?: boolean | undefined;

  constructor(
    usern: string,
    recaptchaa: string,
    countryCode: string,
    IsPhone: boolean
  ) {
    this.countryCode = countryCode;
    this.PhoneOrEmail = usern;
    this.recaptcha = recaptchaa;
    this.IsPhone = IsPhone;
  }
}
export class SignUpB2CModel implements ISignUpB2CModel {
  otp?: string | undefined;
  countryCode?: string | undefined;
  clientname?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  phonenumber?: string | undefined;
  email?: string | undefined;
  dob?: string | undefined;
  recaptcha?: string | undefined;
  option1?: string | undefined | null;
  option2?: string | undefined | null;
  option3?: string | undefined | null;
  option4?: string | undefined | null;

  constructor(
    ottp: string,
    countrycode: string,
    clientName: string,
    userName: string,
    Pass: string,
    Phonenumber: string,
    email: string,
    dob: string,
    recaptcha: string,
    option1: string | null,
    option2: string | null,
    option3: string | null,
    option4: string | null
  ) {
    this.otp = ottp;
    this.countryCode = countrycode;
    this.clientname = clientName;
    this.username = userName;
    this.password = Pass;
    this.phonenumber = Phonenumber;
    this.email = email;
    this.dob = dob;
    this.recaptcha = recaptcha;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
  }
}

export interface ISignUpB2CModel {
  otp?: string | undefined;
  countryCode?: string | undefined;
  clientname?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  phonenumber?: string | undefined;
  email?: string | undefined;
  dob?: string | undefined;
  recaptcha?: string | undefined;
  option1?: string | undefined | null;
  option2?: string | undefined | null;
  option3?: string | undefined | null;
  option4?: string | undefined | null;
}
