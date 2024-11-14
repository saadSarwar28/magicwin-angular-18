import { PlatformService } from './platform.service';
import { BrowserService } from './browser.service';
import { APP_BASE_HREF } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
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
  KYCResponse,
  LineLiablityMulti,
  LineMarket,
  LocalMarketBet,
  ManualPayamentHistoryResponse,
  MarketBook,
  MarketCatalogueSS,
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
  ProblemDetails,
  RaceCountry,
  RaceDate,
  RaceEvents,
  RaceNumber,
  RaceTrack,
  RequetedAmount,
  ResetPasswordResponse,
  Results,
  SignupModel,
  SignupOTPModal,
  SignupWhitelabelModel,
  SignupWithOTPModal,
  SignupWithOTPResponse,
  SportsBettingModel,
  SportsBookModelSingle,
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
} from "../models/models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { SportsIdMapperService } from './sportsIdMapper.service';
@Injectable({
  providedIn: "root",
})
export class BackendService {
  gameUrl?: undefined;
  constructor(
    private http: HttpClient,
    private BrowserService: BrowserService,
    private PlatformService: PlatformService,
    private sportsMapperService: SportsIdMapperService
  ) { }

  private baseUrl: string = environment.apiurl;

  slugifyName(name: string) {
    return name
      .toLowerCase()
      .trim()
      .split(" ")
      .join("-")
      .replace(/[^a-z0-9-]/g, "")
      .replace("-v-", "-vs-");
  }

  /**
   * @param body (optional)
   * @return Success
   */
  changePassword_POST(
    body: ChangePassword | undefined
  ): Observable<BettingResponse> {
    let url = this.baseUrl + "/exchangeapi/client/changepassword";
    url = url.replace(/[?&]$/, "");
    return this.http.post<BettingResponse>(url, JSON.stringify(body));
  }

  TvOnBookmaker(id: number): Observable<EventTv> {
    let url_ = this.baseUrl + "/exchangeapi/client/withoutbftv/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<EventTv>(url_);
  }

  setFavourite(id: number, gameId: number): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/client/{marketId}/faviourts/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace("{marketId}", encodeURIComponent("" + gameId));
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }

  sportsBookCall(eventid: number, from: string): Observable<SportsBookMarkets[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().sportsbookgetdata) {
      if (eventid === undefined || eventid === null)
        throw new Error("The parameter 'eventid' must be defined.");
      url_ = this.BrowserService.getWindow().sportsbookgetdata + eventid;
    }
    return this.http.get<SportsBookMarkets[]>(url_);
  }

  // Sign up code

  signupOTPRequest_POST(
    body: SignupWithOTPModal | undefined
  ): Observable<SignupWithOTPResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/signup";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<SignupWithOTPResponse>(url_, JSON.stringify(body));
  }

  // SignUpOTPRequest

  signupOTPRequest_POST2(
    body: SignupOTPModal | undefined
  ): Observable<SignupWithOTPModal> {
    let url_ = this.baseUrl + "/exchangeapi/client/signupotp";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<SignupWithOTPModal>(url_, JSON.stringify(body));
  }

  // SignUp Final Registration Step

  signupOTPRequest_POST3(
    body: SignupModel | undefined
  ): Observable<SignupModel> {
    let url_ = this.baseUrl + "/exchangeapi/client/signuprequest";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<SignupModel>(url_, JSON.stringify(body));
  }

  // Get payment Gateway

  getDepositDetails(type: string | undefined): Observable<any> {
    let url_ = this.baseUrl + this.BrowserService.getWindow().getbankdetail;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }

  getGetConfig(): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/website/GetConfig";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }

  // Post Payment Gateway

  pyamentgetway_POST(
    body: PaymentRequestModel,
    requestUrl: string
  ): Observable<CreatePaymentResp> {
    let url_: string = "";
    if (requestUrl) {
      url_ = this.baseUrl + requestUrl;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<CreatePaymentResp>(url_, JSON.stringify(body));
  }

  // Post Payment Gateway

  pyamentgetway_GET(): Observable<PreparedForPyamentModel> {
    let url_ = this.baseUrl + "/exchangeapi/client/prepareforpayment";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<PreparedForPyamentModel>(url_);
  }

  // Get payment Gateway

  // manualPaymentPost
  manualPayment_POST(
    file: FileParameter | any,
    amount: number | any,
    paymentMethod: string | undefined,
    transactoinId: string | undefined,
    recap?: string,
    bnkId?: any
  ): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/client/manualpayment";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = new FormData();
    if (file === null || file === undefined)
      throw new Error("The parameter 'file' cannot be null.");
    else
      content_.append(
        "File",
        file.data,
        file.fileName ? file.fileName : "File"
      );
    if (amount === null || amount === undefined)
      throw new Error("The parameter 'amount' cannot be null.");
    else content_.append("Amount", amount.toString());
    if (paymentMethod === null || paymentMethod === undefined)
      throw new Error("The parameter 'paymentMethod' cannot be null.");
    else content_.append("PaymentMethod", paymentMethod.toString());
    if (transactoinId === null || transactoinId === undefined)
      throw new Error("The parameter 'transactoinId' cannot be null.");
    else content_.append("TransactoinId", transactoinId.toString());
    if (bnkId) {
      if (bnkId === null || bnkId === undefined)
        throw new Error("The parameter 'Id' cannot be null.");
      else content_.append("id", bnkId.toString());
    }
    if (recap === null || recap === undefined)
      throw new Error("The parameter 'recap' cannot be null.");
    else content_.append("recaptcha", recap.toString());

    return this.http.post<any>(url_, content_);
  }

  // manualPaymentPost

  manualPaymentStatus(id: any, from: string): Observable<any> {
    let url_: string = "";
    if (this.BrowserService.getWindow().manualpaymentstatus) {
      url_ = this.baseUrl + this.BrowserService.getWindow().manualpaymentstatus;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  searchCasinoPost(body: any | undefined): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/casino/games/search";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  // Client KYC

  clientKYC_POST(
    file: FileParameter | any,
    paymentMethod: string | undefined,
    recap: string
  ): Observable<BettingResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/addclientkyc";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    if (file === null || file === undefined)
      throw new Error("The parameter 'file' cannot be null.");
    else
      content_.append(
        "File",
        file.data,
        file.fileName ? file.fileName : "File"
      );
    if (paymentMethod === null || paymentMethod === undefined)
      throw new Error("The parameter 'paymentMethod' cannot be null.");
    else content_.append("PaymentMethod", paymentMethod.toString());
    if (recap === null || recap === undefined)
      throw new Error("The parameter 'recap' cannot be null.");
    else content_.append("recaptcha", recap.toString());

    return this.http.post<BettingResponse>(url_, content_);
  }

  CheckKYC(component: any): Observable<KYCResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/checkkyc";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<KYCResponse>(url_);
  }

  changePassword_First(
    body: ChangePassword | undefined
  ): Observable<BettingResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/changepasswordfirst";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<BettingResponse>(url_, JSON.stringify(body));
  }

  GetNews(): Observable<string> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getnews) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getnews;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  GetxGameDetails(id: number): Observable<XGameDetails> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getxgdetails) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getxgdetails;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<XGameDetails>(url_);
  }

  GetNextRace(from: string): Observable<NextRaceWithStatus> {
    let url_: string = "";
    if (this.BrowserService.getWindow().nextrace) {
      url_ = this.baseUrl + this.BrowserService.getWindow().nextrace;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<NextRaceWithStatus>(url_);
  }

  /**
   * @return Success
   */
  GetTv(): Observable<TVResponseToClient> {
    let url_: string = "";
    if (this.BrowserService.getWindow().gettv) {
      url_ = this.baseUrl + this.BrowserService.getWindow().gettv;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<TVResponseToClient>(url_);
  }

  /**
   * Order cancel in local Market
   * @param body (optional) all inputs are required
   * @return Success
   */
  matchUnmatchAllSports(
    body: MatchUnModel | undefined,
    from: String
  ): Observable<MatchedUnmatched> {
    let url_: string = "";
    if (this.BrowserService.getWindow().matchunmatchallsports) {
      url_ = this.baseUrl + this.BrowserService.getWindow().matchunmatchallsports;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<MatchedUnmatched>(url_, JSON.stringify(body));
  }

  /**
   * Other then Soccer
   * @param id Event id
   * @return Success
   */
  timeLine2(id: number): Observable<void> {
    let url_: string = "";
    if (this.BrowserService.getWindow().timeline2) {
      url_ = this.baseUrl + this.BrowserService.getWindow().timeline2;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<any>(url_);
  }

  /**
   * For Football only
   * @param id Event id
   * @return Success
   */
  timeLineNew1(id: number, from: any): Observable<void> {
    let url_: string = "";
    if (this.BrowserService.getWindow().timeline1) {
      url_ = this.baseUrl + this.BrowserService.getWindow().timeline1;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<any>(url_);
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
        let q = "";
        if (data.status) {
          q = data.status;

          if (data.matchStatus.toUpperCase().indexOf("FIRST") !== -1) {
            q = "Q1";
          } else if (data.matchStatus.toUpperCase().indexOf("SECOND") !== -1) {
            q = "Q2";
          } else if (data.matchStatus.toUpperCase().indexOf("THIRD") !== -1) {
            q = "Q3";
          } else if (data.matchStatus.toUpperCase().indexOf("FOURTH") !== -1) {
            q = "Q4";
          } else {
            q = "Q";
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
        if (data.matchType.toUpperCase() == "TEST") {
          let home = {};
          let away = {};
          if (data.score.away.inning1) {
            let { runs, wickets } = data.score.away.inning1;
            away = { runs, wickets: wickets == "ALL_OUT" ? "10" : wickets };
          }
          if (data.score.home.inning1) {
            let { runs, wickets } = data.score.home.inning1;
            home = { runs, wickets: wickets == "ALL_OUT" ? "10" : wickets };
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
    from: String
  ): Observable<{ [key: string]: string }> {
    let url_: string = "";
    if (this.BrowserService.getWindow().casinopost) {
      url_ = this.baseUrl + this.BrowserService.getWindow().casinopost;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * @return Success
   */
  casinoGET(from: String): Observable<{ [key: string]: string }> {
    let url_: string = "";
    if (this.BrowserService.getWindow().casinoget) {
      url_ = this.baseUrl + this.BrowserService.getWindow().casinoget;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Client Position Market wise
   * @param body (optional) Sports Market Id
   * @return Success
   */
  clientpositionsports(body: string | undefined, from?: string): Observable<ClientPosition[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().clientpositionsports) {
      url_ = this.baseUrl + this.BrowserService.getWindow().clientpositionsports;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<ClientPosition[]>(url_, JSON.stringify(body));
  }

  /**
   * Client Position Market wise
   * @param body (optional)
   * @return Success
   */
  ClientPositionFancy(
    body: string | undefined
  ): Observable<FancyMarketLiabilty> {
    let url_: string = "";
    if (this.BrowserService.getWindow().clientpositionfancy) {
      url_ = this.baseUrl + this.BrowserService.getWindow().clientpositionfancy;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<FancyMarketLiabilty>(url_, JSON.stringify(body));
  }

  /**
   * Fancy Market liability
   * @param eventid EventId
   * @return Success
   */
  FancyMarketsLiability(eventid: number): Observable<FancyMarketLiabilty> {
    let url_: string = "";
    if (this.BrowserService.getWindow().fancymarketsliability) {
      url_ = this.baseUrl + this.BrowserService.getWindow().fancymarketsliability;
      if (eventid === undefined || eventid === null)
        throw new Error("The parameter 'eventid' must be defined.");
      url_ = url_.replace("{eventid}", encodeURIComponent("" + eventid));
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<FancyMarketLiabilty>(url_);
  }

  /**
   * Event Wise Current Bets in Race Event Markets
   * @param id (optional) Event Id
   * @return Success
   */
  localMarketCurrentBetsEventWise(
    id: number | undefined,
    from: String
  ): Observable<CurrentBets> {
    let url_: string = "";
    if (this.BrowserService.getWindow().racemarketcurrentbets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().racemarketcurrentbets;
      if (id === null) throw new Error("The parameter 'id' cannot be null.");
      else if (id !== undefined)
        url_ += "id=" + encodeURIComponent("" + id) + "&";
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<CurrentBets>(url_);
  }

  /**
   * Order cancel in local Market
   * @param body (optional)
   * @return Success
   */
  MatchUnmatchRace(
    body: string | undefined,
    from: String
  ): Observable<MatchedUnmatched> {
    let url_: string = "";
    if (this.BrowserService.getWindow().matchunmatchrace) {
      url_ = this.baseUrl + this.BrowserService.getWindow().matchunmatchrace;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<MatchedUnmatched>(url_, JSON.stringify(body));
  }

  /**
   * Current bets sports
   * @param body (optional) Marketid, eventid
   * @return Success
   */
  localmarketcurrentbets(
    body: string | undefined,
    from: String
  ): Observable<CurrentBets[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().localmarketcurrentbets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().localmarketcurrentbets;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<CurrentBets[]>(url_, JSON.stringify(body));
  }

  /**
   * Get Fancy Markets with Book maker
   * @param id Event id
   * @return Success
   */

  FancyMarketsAny(v: string, id: number): Observable<any> {
    let url_: string = "";
    if (this.BrowserService.getWindow().fancymarketsany) {
      if (this.BrowserService.getWindow().fancymarketsany.startsWith("http")) {
        url_ = this.BrowserService.getWindow().fancymarketsany;
      } else {
        url_ = this.baseUrl + this.BrowserService.getWindow().fancymarketsany + `/${v}/${id}`;
      }
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<any>(url_);
  }

  FancyMarketsV3(id: number): Observable<any> {
    let url_: string = "";
    if (this.BrowserService.getWindow().fancymarkets) {
      if (this.BrowserService.getWindow().fancymarkets.startsWith("http")) {
        url_ = this.BrowserService.getWindow().fancymarkets;
      } else {
        url_ = this.baseUrl + this.BrowserService.getWindow().fancymarkets;
      }
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<any>(url_);
  }

  LotteryMarkets(id: number, from: string): Observable<any> {
    let url_: string = "";
    if (this.BrowserService.getWindow().lotterycricket) {
      if (this.BrowserService.getWindow().lotterycricket.startsWith("http")) {
        url_ = this.BrowserService.getWindow().fancymarkets;
      } else {
        url_ = this.baseUrl + this.BrowserService.getWindow().lotterycricket;
      }
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  LotteryOrdersplaced(
    body: FancyModel | undefined, from?: any
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().lotteryordersplaced) {
      url_ = this.baseUrl + this.BrowserService.getWindow().lotteryordersplaced;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<BettingResponse>(url_, JSON.stringify(body));
  }

  FancyMarkets(id: number, from: String): Observable<AllFancyData> {
    let url_: string = "";
    if (this.BrowserService.getWindow().fancymarkets) {
      if (this.BrowserService.getWindow().fancymarkets.startsWith("http")) {
        url_ = this.BrowserService.getWindow().fancymarkets;
      } else {
        url_ = this.baseUrl + this.BrowserService.getWindow().fancymarkets;
      }
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<AllFancyData>(url_);
  }

  /**
   * @return Success
   */
  GetWallet(from: any): Observable<ClientWallet> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getwallet) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getwallet;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<ClientWallet>(url_);
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
    from: String
  ): Observable<any> {
    if (marketId) {
      marketId = marketId.replace("1.", "");
    }
    let url_: string = "";
    if (this.BrowserService.getWindow().runnergraph) {
      url_ = this.baseUrl + this.BrowserService.getWindow().runnergraph;
      if (marketId === null)
        throw new Error("The parameter 'marketId' cannot be null.");
      else if (marketId !== undefined)
        url_ += "marketId=" + encodeURIComponent("" + marketId) + "&";
      if (runnerId === null)
        throw new Error("The parameter 'runnerId' cannot be null.");
      else if (runnerId !== undefined)
        url_ += "runnerId=" + encodeURIComponent("" + runnerId) + "&";
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<any>(url_);
  }

  /**
   * Fancy Market liability
   * @param body (optional)
   * @return Success
   */
  SportsMarketliability(
    body: string | undefined,
    from?: string
  ): Observable<LineLiablityMulti[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().sportsmarketliability) {
      url_ = this.baseUrl + this.BrowserService.getWindow().sportsmarketliability;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<LineLiablityMulti[]>(url_, JSON.stringify(body));
  }

  /**
   * Get My Markets of client
   * @return Success
   */
  MyMarkets(): Observable<MyMarket[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().mymarket) {
      url_ = this.baseUrl + this.BrowserService.getWindow().mymarket;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<MyMarket[]>(url_);
  }

  /**
   * @return Success
   */
  SportAllMarketLibility(from: String): Observable<LineLiablityMulti> {
    let url_: string = "";
    if (this.BrowserService.getWindow().allmarketsliability) {
      url_ = this.baseUrl + this.BrowserService.getWindow().allmarketsliability;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<LineLiablityMulti>(url_);
  }

  /**
   * @return Success
   */
  currentBetsAll_GET(from: String): Observable<CurrentBetsModel> {
    let url_: string = "";
    if (this.BrowserService.getWindow().currentbetsall) {
      url_ = this.baseUrl + this.BrowserService.getWindow().currentbetsall;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<CurrentBetsModel>(url_);
  }

  /**
   * Current bets sports
   * @param body (optional) Marketid, eventid
   * @return Success
   */
  SportsCurrentbets(
    body: CurrentBetsInput | undefined,
    from: String
  ): Observable<CurrentBets[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().sportscurrentbets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().sportscurrentbets;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<CurrentBets[]>(url_, JSON.stringify(body));
  }

  /**
   * @param body (optional)
   * @return Success
   */
  racemarket(body: string | undefined, from: String): Observable<MarketDetail> {
    let url_: string = "";
    if (this.BrowserService.getWindow().racemarket) {
      url_ = this.baseUrl + this.BrowserService.getWindow().racemarket;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<MarketDetail>(url_, JSON.stringify(body));
  }

  /**
   * @param body (optional)
   * @return Success
   */
  customtree(
    body: CustomTreeModel | undefined,
    from: String
  ): Observable<CustomMenu> {
    let url_: string = "";
    if (this.BrowserService.getWindow().customtree) {
      url_ = this.baseUrl + this.BrowserService.getWindow().customtree;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<CustomMenu>(url_, JSON.stringify(body));
  }

  GetPopularSports(): Observable<PopularSports> {
    let url_ = this.baseUrl + this.BrowserService.getWindow().populapSports;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<PopularSports>(url_);
  }

  otherRacesPost(body: any | undefined): Observable<any> {
    let url_ = this.baseUrl + this.BrowserService.getWindow().otherracesordersplaced;
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(JSON.stringify(body));

    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Order Placed in local market
   * @param body (optional) all inputs are required
   * @return Success
   */
  LocalMarketOrdersplaced(
    body: LocalMarketBet | any,
    from: String
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().localordersplaced) {
      url_ = this.baseUrl + this.BrowserService.getWindow().localordersplaced;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<BettingResponse>(url_, JSON.stringify(body));
  }

  searchMarkets_POST(query: string | undefined): Observable<SearchResult> {
    let url_: string = "";

    if (this.BrowserService.getWindow().search) {
      url_ = this.baseUrl + this.BrowserService.getWindow().search;
      url_ = url_.replace(/[?&]$/, "");
    }
    //  ;
    const headers = new HttpHeaders({
      Accept: "application/json",
      query: query ? query : "",
    });

    return this.http.post<SearchResult>(url_, {}, { headers });
  }

  /**
   * Current bets sports
   * @param body (optional) Marketid, eventid
   * @return Success
   */
  clientparameters(
    body: string | undefined,
    from: String
  ): Observable<ClientParameters> {
    let url_: string = "";
    if (this.BrowserService.getWindow().clientparameters) {
      url_ = this.baseUrl + this.BrowserService.getWindow().clientparameters;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<ClientParameters>(url_, JSON.stringify(body));
  }

  /**
   * @return Success
   */
  casinoCatagory(catagory: string): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/casino/catagory/{catagory}";
    if (catagory === undefined || catagory === null)
      throw new Error("The parameter 'catagory' must be defined.");
    url_ = url_.replace("{catagory}", encodeURIComponent("" + catagory));
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  /**
   * @return Success
   */
  casnioGametype(gametype: string): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/casino/games/{gametype}";
    if (gametype === undefined || gametype === null)
      throw new Error("The parameter 'gametype' must be defined.");
    url_ = url_.replace("{gametype}", encodeURIComponent("" + gametype));
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  /**
   * @return Success
   */
  casinoProviders(): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/casino/providers";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  /**
   * @return Success
   */
  casinoProviderWise(providers: string): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/casino/{providers}/games";
    if (providers === undefined || providers === null)
      throw new Error("The parameter 'providers' must be defined.");
    url_ = url_.replace("{providers}", encodeURIComponent("" + providers));
    url_ = url_.replace(/[?&]$/, "");

    return this.http.get<any>(url_);
  }

  // casino end
  /**
   * Market Book for multiple market id's
   * @param body (optional) Market Id's comma seperated
   * @return Success
   */

  directMarketsbook(
    body: string | undefined,
    from: String
  ): Observable<MarketBook[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().directmarketsbook) {
      url_ = this.baseUrl + this.BrowserService.getWindow().directmarketsbook;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<MarketBook[]>(url_, JSON.stringify(body));
  }

  marketsbook(
    body: string | undefined,
    from: String
  ): Observable<MarketBook[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().marketsbook) {
      url_ = this.baseUrl + this.BrowserService.getWindow().marketsbook;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Market Book for multiple market id's IN CRICKET
   * @param body (optional) Market Id's comma seperated
   * @return Success
   */
  marketsbookforCricket(
    body: string | undefined,
    from: String
  ): Observable<MarketBook[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().cricketmarketsbook) {
      url_ = this.baseUrl + this.BrowserService.getWindow().cricketmarketsbook;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Markets shows on sports pages
   * @param id Sports Id
   * @return Success
   */
  eventsbydatemarkets(id: number, from: String): Observable<DirectEvents> {
    let url_: string = "";
    if (this.BrowserService.getWindow().eventbydatemarkets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().eventbydatemarkets;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<any>(url_);
  }

  /**
   * Market Book
   * @param body (optional) Market Id
   * @return Success
   */

  directSinglemarketbook(
    body: string | undefined,
    from: String
  ): Observable<MarketBook> {
    let url_: string = "";
    if (this.BrowserService.getWindow().directmarketsbook) {
      url_ = this.baseUrl + this.BrowserService.getWindow().directmarketsbook;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Score for Mulitple Events
   * @param body (optional) comma seperated event ids
   * @return Success
   */
  MultipleScore(body: string | undefined, from: String): Observable<any[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().multiplescore) {
      url_ = this.BrowserService.getWindow().multiplescore;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * List of Competitions
   * @param id Sports Id
   * @return Success
   */
  getcompetition(id: number, from: String): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getcompetition) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getcompetition;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * List of Countries
   * @param id Sports Id
   * @param all Optional
   * @return Success
   */
  getcountries(id: number, all: string, from: String): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getcountries) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getcountries;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      if (all === undefined || all === null)
        throw new Error("The parameter 'all' must be defined.");
      url_ = url_.replace("{all}", encodeURIComponent("" + all));
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.get<any>(url_);
  }

  SignupRequest(
    body: SignUpB2CModel | undefined
  ): Observable<ExceptionResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/signup";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  CheckUserNameAndPhone(
    username: string | undefined,
    body: CheckUserNameOrPhone | undefined
  ): Observable<PhoneNOResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/checkusername";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.post<any>(url_, JSON.stringify(body));
  }
  CheckUserPhone(
    username: string | undefined,
    body: CheckUserNameOrPhone | undefined
  ): Observable<PhoneNOResponse> {
    let url_ = this.baseUrl + "/exchangeapi/user/checkusername/v1";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  RequestOTP(
    username: string | undefined,
    body: CheckRequestOTP | undefined
  ): Observable<PhoneNOResponse> {
    let url_ = this.baseUrl + "/exchangeapi/user/requestotp";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
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
    from: String
  ): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().geteventsbycountry) {
      url_ = this.baseUrl + this.BrowserService.getWindow().geteventsbycountry;
      if (countryCode === undefined || countryCode === null)
        throw new Error("The parameter 'countryCode' must be defined.");
      url_ = url_.replace(
        "{countryCode}",
        encodeURIComponent("" + countryCode)
      );
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Get Events Date Wise
   * @param id Datetime as number
   * @return Success
   */
  geteventsbydate(id: number, from: String): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().geteventsbydate) {
      url_ = this.baseUrl + this.BrowserService.getWindow().geteventsbydate;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Return List of Events in a Competition
   * @param id Competition ID
   * @return Success
   */
  getevents(id: number, url: string, from: String): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getevents) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getevents;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * @return Success
   */
  todayRacesOld(id: number, from: string): Observable<TodayRacesASSS[]> {
    let url_ = this.baseUrl + this.BrowserService.getWindow().todayracesOld;
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }

  /**
   * List of Today Races
   * @param id Sports Id
   * @return Success
   */
  getgroupmarkets(
    id: number,
    url: string,
    from: String
  ): Observable<TodayRacesASSS[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getgroupmarkets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getgroupmarkets;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  sSCasino_POST(body: CasinoRequest | undefined): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/client/sscasino";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Return List of Events1 in a Competition
   * @param id Competition ID
   * @return Success
   */
  getevent1(id: number, from: String): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getevent1) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getevent1;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Return List of Events1 in a Competition
   * @param id Competition ID
   * @return Success
   */
  getevent2(id: number, from: String): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getevent2) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getevent2;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Return List of Events1 in a Competition
   * @param id Competition ID
   * @return Success
   */
  getevent3(id: number, from: String): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getevent3) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getevent3;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Get All Sports
   * @return Success
   */
  eventtypes(from: String): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().eventtypes) {
      url_ = this.baseUrl + this.BrowserService.getWindow().eventtypes;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Soccer fixture
   * @param id id of Soccer
   * @return Success
   */
  getfixtures(id: number, from: String): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getfixtures) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getfixtures;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * List of Markets in an Event
   * @param id event id
   * @return Success
   */

  getmarkets(
    id: number,
    from: String,
    url: string | undefined
  ): Observable<MultilevelMenu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getmarkets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getmarkets;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * List of Today Races
   * @param id Sports Id
   * @return Success
   */
  todayraces(id: number, from: String): Observable<RaceEvents[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().todayraces) {
      url_ = this.baseUrl + this.BrowserService.getWindow().todayraces;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * List of Event Markets
   * @param id Event id
   * @return Success
   */
  geteventmarkets(id: number | string, from: String): Observable<EventMarkets> {
    let url_: string = "";
    if (this.BrowserService.getWindow().geteventmarkets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().geteventmarkets;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Line Markets under match odds
   * @param id Event id
   * @return Success
   */
  linemarketsundermo(id: number, from: String): Observable<LineMarket[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().linemarketsundermo) {
      url_ = this.baseUrl + this.BrowserService.getWindow().linemarketsundermo;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * List of markets using competition id
   * @param id Competition id
   * @return Success
   */
  getcompetitionmarkets(id: number, from: String): Observable<DirectEvents> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getcompetitonmarkets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getcompetitonmarkets;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Race Schedule for Horse and greyhound
   * @param all Possible value ALL/TODAY
   * @param id sports id
   * @return Success
   */
  raceschedule(all: string, id: number, from: String): Observable<RaceDate[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().raceschedule) {
      url_ = this.baseUrl + this.BrowserService.getWindow().raceschedule;
      if (all === undefined || all === null)
        throw new Error("The parameter 'all' must be defined.");
      url_ = url_.replace("{all}", encodeURIComponent("" + all));
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Markets that will show on the index or default page
   * @return Success
   */

  getdefaultpage(
    page: number | undefined,
    from: String
  ): Observable<DefaultInplay[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getdefaultpage) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getdefaultpage;
      if (page === null)
        throw new Error("The parameter 'page' cannot be null.");
      else if (page !== undefined)
        url_ += "page=" + encodeURIComponent("" + page) + "&";
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Event Wise Markets
   * @param id Event Id
   * @return Success
   */
  eventmarkets(id: number, from: String): Observable<EventTypeSS> {
    let url_: string = "";
    if (this.BrowserService.getWindow().eventmarkets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().eventmarkets;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Markets shows on Inplay Page
   * @return Success
   */

  inplayevents(
    page: number | undefined,
    from: String
  ): Observable<DefaultInplay[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().inplayevents) {
      url_ = this.baseUrl + this.BrowserService.getWindow().inplayevents;
      if (page === null)
        throw new Error("The parameter 'page' cannot be null.");
      else if (page !== undefined)
        url_ += "page=" + encodeURIComponent("" + page) + "&";
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Detail of Single Markets
   * @param body (optional) Market Id
   * @return Success
   */
  marketdetail(
    body: string | undefined,
    from: String
  ): Observable<MarketDetail> {
    let url_: string = "";
    if (this.BrowserService.getWindow().marketdetail) {
      url_ = this.baseUrl + this.BrowserService.getWindow().marketdetail;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * @return Success
   */
  raceeventmarkets(eventID1: string, from: String): Observable<EventTypeRaces> {
    let url_: string = "";
    if (this.BrowserService.getWindow().raceeventmarkets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().raceeventmarkets;
      if (eventID1 === undefined || eventID1 === null)
        throw new Error("The parameter 'eventID1' must be defined.");
      url_ = url_.replace("{EventID1}", encodeURIComponent("" + eventID1));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Markets shows on sports pages
   * @param id Sports Id
   * @return Success
   */

  sportsbyid(
    sport: string,
    page: number | undefined,
    from: String
  ): Observable<DirectEvents> {
    let url_: string = "";
    let id = this.sportsMapperService.getSportByName(sport);
    if (this.BrowserService.getWindow().sportsbyid) {
      url_ = this.baseUrl + this.BrowserService.getWindow().sportsbyid;
      if (sport === undefined || sport === null)
        throw new Error("The parameter 'sport' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      if (page === null)
        throw new Error("The parameter 'page' cannot be null.");
      else if (page !== undefined)
        url_ += "page=" + encodeURIComponent("" + page) + "&";
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Order cancel in local Market
   * @param body (optional) all inputs are required
   * @return Success
   */
  MatchUnmatchXG(
    body: XgameInputModel | undefined,
    from: String
  ): Observable<MatchedUnmatched> {
    let url_: string = "";
    if (this.BrowserService.getWindow().matchunmatchxg) {
      url_ = this.baseUrl + this.BrowserService.getWindow().matchunmatchxg;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  popularbyid(
    id: string,
    page: number | undefined,
    from: String
  ): Observable<any> {
    let url_: string = "";
    if (this.BrowserService.getWindow().popularbyid) {
      url_ = this.baseUrl + this.BrowserService.getWindow().popularbyid;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      if (page === null)
        throw new Error("The parameter 'page' cannot be null.");
      else if (page !== undefined)
        url_ += "page=" + encodeURIComponent("" + page) + "&";
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }
  /**
   * Market Data based on channel id https://api.games.betfair.com/rest/v1/channels/1444074/snapshot?type=json
   * @param body (optional) Channel Id
   * @return Success
   */
  book(body: any | undefined, from: String): Observable<any> {
    let url_: string = "";
    if (this.BrowserService.getWindow().singlebook) {
      url_ = this.baseUrl + this.BrowserService.getWindow().singlebook;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Game detail
   * @param id channel id
   * @return Success
   */
  gamedetail(id: number, from: String): Observable<XGameDetail[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().gamedetail) {
      url_ = this.baseUrl + this.BrowserService.getWindow().gamedetail;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Result of the Market based on Channel id link startRecord=6 and recordCount=5 and type=json
   * @param body (optional) Channel id, Start Record and End Record
   * @return Success
   */
  result(body: Results | undefined, from: String): Observable<any> {
    let url_: string = "";
    if (this.BrowserService.getWindow().result) {
      url_ = this.baseUrl + this.BrowserService.getWindow().result;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Get List of X games
   * @return Success
   */
  games(from: String): Observable<XgameNow[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().games) {
      url_ = this.baseUrl + this.BrowserService.getWindow().games;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  singlebook(body: XGameSingleBook | undefined, from: String): Observable<any> {
    let url_: string = "";
    if (this.BrowserService.getWindow().singlebook) {
      url_ = this.baseUrl + this.BrowserService.getWindow().singlebook;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Cancel order in Exchange Game
   * @param body (optional) all inputs are required
   * @return Success
   */
  CancelOrdersXgame(
    body: XGameOrderCancelModel | undefined,
    from: String
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().cancelorders) {
      url_ = this.baseUrl + this.BrowserService.getWindow().cancelorders;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }
  /**
   * order placed in exchange game
   * @param body (optional) all inputs are required
   * @return Success
   */
  ordersplacedPost(
    body: OrderPlaceModel | undefined,
    from: String
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().ordersplacedxg) {
      url_ = this.baseUrl + this.BrowserService.getWindow().ordersplacedxg;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Exchange Game Current Bets
   * @param body (optional) Channel id, marketid, roundNo and Game id
   * @return Success
   */
  CurrentbetsXGame(
    body: XGameCurrentBetsInput | undefined,
    from: String
  ): Observable<CurrentBetsGame[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().currentbetsxg) {
      url_ = this.baseUrl + this.BrowserService.getWindow().currentbetsxg;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  ClientPositionXgame(
    body: ClientPosXgameInput | undefined,
    from: String
  ): Observable<UserPosition[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().clientpositionxg) {
      url_ = this.baseUrl + this.BrowserService.getWindow().clientpositionxg;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * @param body (optional)
   * @return Success
   */
  walletXgame(
    body: string | undefined,
    from: String
  ): Observable<ClientWallet> {
    let url_: string = "";
    if (this.BrowserService.getWindow().walletxg) {
      url_ = this.baseUrl + this.BrowserService.getWindow().walletxg;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * @param body (optional)
   * @return Success
   */
  signupb2c_POST2(
    body: SignupWhitelabelModel | undefined
  ): Observable<ExceptionResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/signupwhitelabel";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  // Single Screen Signup

  signupb2c_POST(
    username: string,
    body: CheckUserNameModel | undefined
  ): Observable<SignupWithOTPResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/checkusername";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  authenticate(
    body: AuthenticateRequest | undefined,
    otp: string,
    from: String
  ): Observable<any> {
    let url_: string = "";
    let options_;
    url_ = this.baseUrl + "/exchangeapi/user/authenticate";
    url_ = url_.replace(/[?&]$/, "");

    if (!otp) {
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .append(
          "Authorization",
          "Basic " + window.btoa(body?.username + ":" + body?.password)
        );
      options_ = {
        headers: headers,
      };
    } else {
      const headers = new HttpHeaders()
        .set("Content-Type", "application/json")
        .append(
          "Authorization",
          "Basic " + window.btoa(body?.username + ":" + body?.password)
        )
        .append("otp", otp);
      options_ = {
        headers: headers,
      };
    }
    return this.http.post<any>(url_, JSON.stringify(body), options_);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  ChangePassword(
    body: ChangePassword | undefined,
    from: String
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().changepassword) {
      url_ = this.baseUrl + this.BrowserService.getWindow().changepassword;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  // Forgot Password Portion Starts

  Getphonenumber(
    body: ClientGetPhoneNumber | undefined
  ): Observable<ResetPasswordResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/getphonenumber";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  Checkuserphone(
    type: string | undefined,
    body: UserPhoneCheckingForOTP | undefined
  ): Observable<ResetPasswordResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/checkuserphone";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.post<any>(url_, JSON.stringify(body));
  }

  Verifyotpphone(
    type: string | undefined,
    body: UserPhoneCheckingForOTP | undefined
  ): Observable<ResetPasswordResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/verifyotpphone";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  Newpassword(
    type: string | undefined,
    body: NewPasswordOTP | undefined
  ): Observable<ResetPasswordResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/newpassword";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  // Forgot Password Portion Ends
  /**
   * Account Statement
   * @param body (optional) From-To date
   * @return Success
   */
  accountstatement(
    body: AccountstmtInputModel | undefined,
    from: String
  ): Observable<AccountstmtModel[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().accountstatement) {
      url_ = this.baseUrl + this.BrowserService.getWindow().accountstatement;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Account statement Sub Reports
   * @param body (optional) Market Id
   * @return Success
   */
  accountstatementsub(
    body: string | undefined,
    from: String
  ): Observable<AccountStatementSubReport[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().accountstatementsub) {
      url_ = this.baseUrl + this.BrowserService.getWindow().accountstatementsub;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Casino Bets
   * @param body (optional) Bets filter from- to filter
   * @return Success
   */
  casinobets(
    body: CasinoBetsInputModel | undefined,
    from: String
  ): Observable<CasinoOrders[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().casinobets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().casinobets;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Get Client Stake
   * @return Success
   */
  stakesGet(from: String): Observable<ClientStake> {
    let url_: string = "";
    if (this.BrowserService.getWindow().stakesget) {
      url_ = this.baseUrl + this.BrowserService.getWindow().stakesget;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * Update Client Stake
   * @param body (optional) Stake value from 1 to 8
   * @return Success
   */
  createPin(body: any, from: String): Observable<string> {
    let url_: string = "";
    if (this.BrowserService.getWindow().createWithDrawPin) {
      url_ = this.baseUrl + this.BrowserService.getWindow().createWithDrawPin;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }
  RequestWithDrawPin(body: any, from: String): Observable<string> {
    let url_: string = "";
    if (this.BrowserService.getWindow().requestWithDrawPin) {
      url_ = this.baseUrl + this.BrowserService.getWindow().requestWithDrawPin;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }
  ResetWithdrawpin(body: any, from: String): Observable<string> {
    let url_: string = "";
    if (this.BrowserService.getWindow().resetWithdrawpin) {
      url_ = this.baseUrl + this.BrowserService.getWindow().resetWithdrawpin;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  // Back Details

  stakesPost(body: any, from: String, recaptcha: any): Observable<string> {
    let url_: string = "";
    if (this.BrowserService.getWindow().stakespost) {
      url_ = this.baseUrl + this.BrowserService.getWindow().stakespost;
      url_ = url_.replace(/[?&]$/, "");
    }
    let body1 = { ...body, recaptcha };
    return this.http.post<any>(url_, JSON.stringify(body1));
  }

  GetBankAccounts(): Observable<ClientkBankAccounts> {
    let url_ = this.baseUrl + "/exchangeapi/client/getclientbankaccounts";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }

  GetBankAccount(): Observable<ClientkBankAccounts[]> {
    let url_ = this.baseUrl + "/exchangeapi/client/getclientbankaccount";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }

  // Add Other Transaction Methods Detail

  AddOtherWallet(
    body: ClientWalletModel | undefined
  ): Observable<BettingResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/addclientwalletaccount";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  // Add bank with kyc

  addclientbankaccountwithkyc(
    image_File: FileParameter | any,
    image_PaymentMethod: string | undefined,
    haveKyc: boolean | undefined,
    accountNo: string | undefined,
    accountHolderName: string | undefined,
    iFSCCode: string | undefined,
    bankName: string | undefined,
    branchName: string | undefined,
    accountType: string | undefined,
    bankType: string | undefined
  ): Observable<BettingResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/addclientbankaccountwithkyc";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    if (image_File === null || image_File === undefined)
      throw new Error("The parameter 'image_File' cannot be null.");
    else
      content_.append(
        "Image.File",
        image_File.data,
        image_File.fileName ? image_File.fileName : "Image.File"
      );
    if (image_PaymentMethod === null || image_PaymentMethod === undefined)
      throw new Error("The parameter 'image_PaymentMethod' cannot be null.");
    else content_.append("Image.PaymentMethod", image_PaymentMethod.toString());
    if (haveKyc === null || haveKyc === undefined)
      throw new Error("The parameter 'haveKyc' cannot be null.");
    else content_.append("HaveKyc", haveKyc.toString());
    if (accountNo === null || accountNo === undefined)
      throw new Error("The parameter 'accountNo' cannot be null.");
    else content_.append("AccountNo", accountNo.toString());
    if (accountHolderName === null || accountHolderName === undefined)
      throw new Error("The parameter 'accountHolderName' cannot be null.");
    else content_.append("AccountHolderName", accountHolderName.toString());
    if (iFSCCode === null || iFSCCode === undefined)
      throw new Error("The parameter 'iFSCCode' cannot be null.");
    else content_.append("IFSCCode", iFSCCode.toString());
    if (bankName === null || bankName === undefined)
      throw new Error("The parameter 'bankName' cannot be null.");
    else content_.append("BankName", bankName.toString());
    if (branchName === null || branchName === undefined)
      throw new Error("The parameter 'branchName' cannot be null.");
    else content_.append("BranchName", branchName.toString());
    if (accountType === null || accountType === undefined)
      throw new Error("The parameter 'accountType' cannot be null.");
    else content_.append("AccountType", accountType.toString());
    if (bankType === null || bankType === undefined)
      throw new Error("The parameter 'bankType' cannot be null.");
    else content_.append("BankType", bankType.toString());

    return this.http.post<any>(url_, content_);
  }

  // Add bank with kyc

  // Update Bank with kyc

  updatebankdetailkyc(
    accountNo: string | undefined,
    file: FileParameter | any,
    paymentMethod: string | undefined
  ): Observable<BettingResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/updatebankdetailkyc";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = new FormData();
    if (accountNo === null || accountNo === undefined)
      throw new Error("The parameter 'accountNo' cannot be null.");
    else content_.append("AccountNo", accountNo.toString());
    if (file === null || file === undefined)
      throw new Error("The parameter 'file' cannot be null.");
    else
      content_.append(
        "File",
        file.data,
        file.fileName ? file.fileName : "File"
      );
    if (paymentMethod === null || paymentMethod === undefined)
      throw new Error("The parameter 'paymentMethod' cannot be null.");
    else content_.append("PaymentMethod", paymentMethod.toString());

    return this.http.post<any>(url_, content_);
  }

  // Update Bank with kyc

  // view kyc method

  getbankdetailkyc(body: string | undefined): Observable<BettingResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/getbankdetailkyc";
    url_ = url_.replace(/[?&]$/, "");

    return this.http.post<any>(url_, JSON.stringify(body));
  }

  // view kyc method

  // get bank with kyc

  getclientbankaccountwithkyc(): Observable<ClientkBankAccountsResponse[]> {
    let url_ = this.baseUrl + "/exchangeapi/client/getclientbankaccountwithkyc";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }

  // get bank with kyc

  // Add Other Transaction Methods Detail

  /**
   * @param body (optional)
   * @return Success
   */
  AddBankAccount(
    body: ClientkBankAccounts | undefined
  ): Observable<BettingResponse> {
    let url_ = this.baseUrl + "/exchangeapi/client/addclientbankaccounts";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  //Remove
  /**
   * @param body (optional)
   * @return Success
   */
  RemoveBankAccount(body: any | undefined): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/client/removebankdetail";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(JSON.stringify(body));
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("accountNumber", JSON.stringify(body));
    let options_ = {
      headers: headers,
    };
    return this.http.post<any>(url_, (JSON.stringify(body), options_));
  }

  // Request History

  ManualPaymentHistory(): Observable<ManualPayamentHistoryResponse[]> {
    let url_ = this.baseUrl + "/exchangeapi/client/manualpaymenthistory";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }

  // Request History

  /**
   * @param body (optional)
   * @return Success
   */
  WithdrawRequest(
    body: RequetedAmount | undefined
  ): Observable<BettingResponse> {
    let url_ = this.baseUrl + this.BrowserService.getWindow().requestwithdraw;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * @return Success
   */
  GetWithdrawRequests(): Observable<PendingWithdrawRequests[]> {
    let url_ = this.baseUrl + "/exchangeapi/client/withdrawrequests";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }

  // Back Details

  /**
   * Exchange My bets
   * @param body (optional) Bets filter from- to filter
   * @return Success
   */
  fancybets(
    body: MyBetsInputModel | undefined,
    from: String
  ): Observable<MarketOrders[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().fancybets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().fancybets;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Exchange My bets
   * @param body (optional) Bets filter from- to filter
   * @return Success
   */
  exchangemybets(
    body: MyBetsInputModel | undefined,
    from: String
  ): Observable<MarketOrders[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().exchangemybets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().exchangemybets;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Sports My bets
   * @param body (optional) Bets filter from- to filterType(SETTLED,MATCHED,UN-MATCHED,VOIDED,LAPSED,CANCELLED)
   * @return Success
   */
  sportsbets(
    body: MyBetsInputModel | undefined,
    from: String
  ): Observable<MarketOrders[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().sportsbets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().sportsbets;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Profit and Loss
   * @param body (optional) From-To date filter
   * @return Success
   */
  pl(
    body: AccountstmtInputModel | undefined,
    from: String
  ): Observable<PLModel[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().pl) {
      url_ = this.baseUrl + this.BrowserService.getWindow().pl;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Sports Markets reports
   * @param body (optional) sports/ type filter
   * @return Success
   */
  plsmarketwise(
    body: PLInnerInput | undefined,
    from: String
  ): Observable<PLInnerSub[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().plmarketwise) {
      url_ = this.baseUrl + this.BrowserService.getWindow().plmarketwise;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Sports Markets reports
   * @param body (optional) sports/ type filter
   * @return Success
   */
  plsportswise(
    body: PLInnerInput | undefined,
    from: String
  ): Observable<PLInner[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().plsportswise) {
      url_ = this.baseUrl + this.BrowserService.getWindow().plsportswise;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Sports Results
   * @param body (optional) Filter type is provided (Sports id ) and Date (yyyy-MM-dd)
   * @return Success
   */
  results(
    body: CasinoBetsInputModel | undefined,
    from: String
  ): Observable<SportsResult[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().results) {
      url_ = this.baseUrl + this.BrowserService.getWindow().results;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Client Activity
   * @return Success
   */
  activity(from: String): Observable<ActivityLogs[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().activity) {
      url_ = this.baseUrl + this.BrowserService.getWindow().activity;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  GetBanners(body: string | undefined): Observable<Banners[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow() && this.BrowserService.getWindow().banners) {
      url_ = this.baseUrl + this.BrowserService.getWindow().banners;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  GetEventTv(id: number): Observable<EventTv> {
    let url_: string = "";
    if (this.BrowserService.getWindow().eventtv) {
      url_ = this.baseUrl + this.BrowserService.getWindow().eventtv;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  //virtualTV
  GetVirtualTv(id: number): Observable<any> {
    let url_: string = "";
    if (this.BrowserService.getWindow().virtualtv) {
      url_ = this.baseUrl + this.BrowserService.getWindow().virtualtv;
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  getcompetitionsbycountry(
    countryCode: string,
    id: number,
    from: string
  ): Observable<Menu[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getcompetitionsbycountry) {
      url_ = this.baseUrl + this.BrowserService.getWindow().getcompetitionsbycountry;
      if (countryCode === undefined || countryCode === null)
        throw new Error("The parameter 'countryCode' must be defined.");
      url_ = url_.replace(
        "{countryCode}",
        encodeURIComponent("" + countryCode)
      );
      if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * @return Success
   */
  wallet(from: String): Observable<ClientWallet> {
    let url_: string = "";
    if (this.BrowserService.getWindow().wallet) {
      url_ = this.baseUrl + this.BrowserService.getWindow().wallet;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  /**
   * @param body (optional)
   * @return Success
   */
  Sportswallet(
    body: string | undefined,
    from: String
  ): Observable<ClientWallet> {
    let url_: string = "";
    if (this.BrowserService.getWindow().sportswallet) {
      url_ = this.baseUrl + this.BrowserService.getWindow().sportswallet;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<any>(url_, JSON.stringify(body));
  }
  /**
   * @param body (optional)
   * @return Success
   */
  XgameWallet(
    body: string | undefined,
    from: String
  ): Observable<ClientWallet> {
    let url_: string = "";
    if (this.BrowserService.getWindow().xgwallet) {
      url_ = this.baseUrl + this.BrowserService.getWindow().xgwallet;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  BookMakerOrdersplaced(
    lookSabha: boolean = false,
    body: FancyModel | undefined,
    from: String
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().bookmakerordersplaced) {
      let version = lookSabha
        ? this.BrowserService.getWindow().loksabhabookmakerOrderPlVersion
        : this.BrowserService.getWindow().bookmakerOrderPlVersion;
      url_ = this.baseUrl + this.BrowserService.getWindow().bookmakerordersplaced + `${version}`;
      url_ = url_.replace(/[?&]$/, "");
    }

    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Order cancel in local Market
   * @param body (optional)
   * @return Success
   */
  MatchunmatchLocalMarket(
    body: string | undefined,
    from: String
  ): Observable<MatchedUnmatched> {
    let url_: string = "";
    if (this.BrowserService.getWindow().matchunmatchlocalmarket) {
      url_ = this.baseUrl + this.BrowserService.getWindow().matchunmatchlocalmarket;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Order cancel in local Market
   * @param body (optional) all inputs are required
   * @return Success
   */
  LocalMarketCancelorders(
    body: CancelOrders | undefined,
    from: String
  ): Observable<CurrentBetResp> {
    let url_: string = "";
    if (this.BrowserService.getWindow().cancelorderslocal) {
      url_ = this.baseUrl + this.BrowserService.getWindow().cancelorderslocal;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
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
    from: String
  ): Observable<CurrentBetResp> {
    let url_: string = "";
    if (this.BrowserService.getWindow().sportscancelorders) {
      url_ = this.baseUrl + this.BrowserService.getWindow().sportscancelorders;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * @param body (optional)
   * @return Success
   */
  cancellallOrdersSports(
    body: CancellAllOrders | undefined
  ): Observable<CurrentBetResp> {
    let url_ = this.baseUrl + "/exchangeapi/sports/cancellallorders";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * Cancel order in Exchange Game
   * @param body (optional) all inputs are required
   * @return Success
   */
  XGameCancelOrders(
    body: XGameOrderCancelModel | undefined,
    from: String
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().xgcancelorders) {
      url_ = this.baseUrl + this.BrowserService.getWindow().xgcancelorders;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * order placed sports in orders model
   * @param body (optional) all inputs are required
   * @return Success
   */
  SportsOrdersplaced(
    body: SportsBettingModel | undefined,
    from: String
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().sportsordersplaced) {
      url_ = this.baseUrl + this.BrowserService.getWindow().sportsordersplaced;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  SportsOrdersplacedSingle(
    body: SportsBettingModel | undefined,
    from: string
  ): Observable<CurrentBetResp> {
    let url_: string = "";
    if (this.BrowserService.getWindow().sportsordersplacedSingle) {
      url_ = this.baseUrl + this.BrowserService.getWindow().sportsordersplacedSingle;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  SportsBookOrdersplacedSingle(
    body: SportsBookModelSingle | undefined
  ): Observable<CurrentBetResp> {
    let url_: string = "";
    if (this.BrowserService.getWindow().sportsBookOrderPlacedNew) {
      url_ = this.baseUrl + this.BrowserService.getWindow().sportsBookOrderPlacedNew;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
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
    isSportsBook?: boolean
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().fancyordersplacedSingle && this.BrowserService.getWindow().sportsbookplacedSingle) {
      if (isSportsBook == true) {
        url_ = this.baseUrl + this.BrowserService.getWindow().sportsbookplacedSingle;
        url_ = url_.replace(/[?&]$/, "");
      } else {
        let version = lookSabha
          ? this.BrowserService.getWindow().loksabhafancyOrderPlVersion
          : this.BrowserService.getWindow().fancyOrderPlVersion;
        url_ = this.baseUrl + this.BrowserService.getWindow().fancyordersplaced + `${version}`;
        url_ = url_.replace(/[?&]$/, "");
      }
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * order placed in exchange game
   * @param body (optional) all inputs are required
   * @return Success
   */
  XgameOrdersplaced(
    body: OrderPlaceModel | undefined,
    from: String
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().ordersplacedxg) {
      url_ = this.baseUrl + this.BrowserService.getWindow().ordersplacedxg;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }
  /**
   * Detail of Single Markets
   * @param body (optional) Market Id
   * @return Success
   */
  GetOthersMarkets(body: string | undefined): Observable<OthersMarkets[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().othersmarkets) {
      url_ = this.baseUrl + this.BrowserService.getWindow().othersmarkets;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  jorhiTigarhiPOST(
    body: MultiPlaceBet | undefined
  ): Observable<BettingResponse> {
    let url_: string = "";
    if (this.BrowserService.getWindow().jorhipost) {
      url_ = this.baseUrl + this.BrowserService.getWindow().jorhipost;
      url_ = url_.replace(/[?&]$/, "");
    }


    return this.http.post<any>(url_, JSON.stringify(body));
  }

  GetiPAddressForBetid(
    body: IPAddressForBetIds | undefined
  ): Observable<string> {
    let url_ = this.baseUrl + "/exchangeapi/reports/ipaddress";
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, JSON.stringify(body));
  }

  /**
   * @return Success
   */
  GetBlog(from?: String): Observable<LineLiablityMulti[]> {
    let url_: string = "";
    if (this.BrowserService.getWindow().getBlogDetail) {
      url_ = this.BrowserService.getWindow().getBlogDetail;
      url_ = url_.replace(/[?&]$/, "");
    }
    return this.http.get<any>(url_);
  }

  getFavorite(): Observable<any> {
    let url_ = this.baseUrl + "/exchangeapi/casino/games/favourite";
    return this.http.get<any>(url_);
  }
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
      this.startTime = _data["startTime"];
      this.id = _data["id"];
      this.name = _data["name"];
      this.isMarket = _data["isMarket"];
      this.inPlay = _data["inPlay"];
      this.detail = _data["detail"];
    }
  }

  static fromJS(data: any): TodayRacesASSS {
    data = typeof data === "object" ? data : {};
    let result = new TodayRacesASSS();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["startTime"] = this.startTime;
    data["id"] = this.id;
    data["name"] = this.name;
    data["isMarket"] = this.isMarket;
    data["inPlay"] = this.inPlay;
    data["detail"] = this.detail;
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
      if (Array.isArray(_data["data"])) {
        this.data = [] as any;
        for (let item of _data["data"])
          this.data!.push(TVResponseDB.fromJS(item));
      }
      this.ipAddress = _data["ipAddress"];
    }
  }

  static fromJS(data: any): TVResponseToClient {
    data = typeof data === "object" ? data : {};
    let result = new TVResponseToClient();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.data)) {
      data["data"] = [];
      for (let item of this.data) data["data"].push(item.toJSON());
    }
    data["ipAddress"] = this.ipAddress;
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
      if (Array.isArray(_data["childs"])) {
        this.childs = [] as any;
        for (let item of _data["childs"])
          this.childs!.push(TVResponseDB.fromJS(item));
      }
      this.channelId = _data["channelId"];
      this.id = _data["id"];
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): TVResponseDB {
    data = typeof data === "object" ? data : {};
    let result = new TVResponseDB();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.childs)) {
      data["childs"] = [];
      for (let item of this.childs) data["childs"].push(item.toJSON());
    }
    data["channelId"] = this.channelId;
    data["id"] = this.id;
    data["name"] = this.name;
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
      this.status = _data["status"];
      this.eventTypeId = _data["eventTypeId"];
      this.marketId = _data["marketId"];
      this.startTime = _data["startTime"];
      this.countryCode = _data["countryCode"];
      this.trackName = _data["trackName"];
      this.isLocalMarket = _data["isLocalMarket"];
    }
  }

  static fromJS(data: any): NextRaceWithStatus {
    data = typeof data === "object" ? data : {};
    let result = new NextRaceWithStatus();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["status"] = this.status;
    data["eventTypeId"] = this.eventTypeId;
    data["marketId"] = this.marketId;
    data["startTime"] = this.startTime;
    data["countryCode"] = this.countryCode;
    data["trackName"] = this.trackName;
    data["isLocalMarket"] = this.isLocalMarket;
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
      this.ipAddress = _data["ipAddress"];
      this.channelId = _data["channelId"];
      this.message = _data["message"];
      this.status = _data["status"];
      this.sportsRadarId = _data["sportsRadarId"];
    }
  }

  static fromJS(data: any): EventTv {
    data = typeof data === "object" ? data : {};
    let result = new EventTv();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["ipAddress"] = this.ipAddress;
    data["channelId"] = this.channelId;
    data["message"] = this.message;
    data["status"] = this.status;
    data["sportsRadarId"] = this.sportsRadarId;
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
      this.marketId = _data["marketId"];
      this.marketName = _data["marketName"];
      this.marketStatus = _data["marketStatus"];
      this.minBet = _data["minBet"];
      this.maxBet = _data["maxBet"];
      this.liability = _data["liability"];
      this.maxMarket = _data["maxMarket"];
      if (Array.isArray(_data["runners"])) {
        this.runners = _data["runners"].map((runner) => {
          const newRunner = SportsbookRunners.fromJS(runner);
          newRunner.selectionId
            ? this.runnerMap.set(newRunner.selectionId, newRunner)
            : {};
          return newRunner;
        });
      }
      this.sortingOrder = _data["sortingOrder"];
      this.objectId = _data["objectId"];
      this.marketID = _data["marketID"];
      this.isFavourite = _data["isFavourite"];
      this.specifiers = _data["specifiers"];
      this.outcomes = _data["outcomes"];
      this.status = _data["status"];
    }
  }

  update(data: SportsBookMarkets) {
    this.status !== data.status ? (this.status = data.status) : {};
    if (data.runners && data.runners.length > 0) {
      data.runners.forEach((runner: SportsbookRunners) => {
        if (runner.selectionId) {
          const previousRunner = this.runnerMap.get(runner.selectionId);
          if (previousRunner) {
            previousRunner.update({
              status: runner.status,
              rate: runner.rate,
              result: runner.result,
            });
          } else {
            this.runnerMap.set(runner.selectionId, runner);
            this.runners.push(runner);
          }
        }
      });
    }
  }

  updateRunnerPosition(data: any) {
    let runner = this.runnerMap.get(String(data.runnerId));
    if (runner) {
      runner.position = data.position;
      runner.position2 = data.position2;
    }
  }

  static fromJS(data: any): SportsBookMarkets {
    let marketDetail = data.split("~")[0].split("|");
    // data = typeof data === 'object' ? data : {};
    let result = new SportsBookMarkets();
    data = {
      marketId: marketDetail[0],
      marketName: marketDetail[1],
      status: marketDetail[2],
      runners: data.split("~")[1].split("*"),
    };
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["marketId"] = this.marketId;
    data["marketName"] = this.marketName;
    data["marketStatus"] = this.marketStatus;
    data["minBet"] = this.minBet;
    data["maxBet"] = this.maxBet;
    data["maxMarket"] = this.maxMarket;
    if (Array.isArray(this.runners)) {
      data["runners"] = [];
      for (let item of this.runners) data["runners"].push(item.toJSON());
    }
    data["sortingOrder"] = this.sortingOrder;
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
      this.selectionId = _data["runnerId"];
      this.runnerName = _data["runnerName"];
      this.rate = _data["odds"];
      this.status = _data["status"];
      this.result = _data["result"];
    }
  }

  update(data?: any) {
    if (data) {
      data.status && this.status !== data.status
        ? (this.status = data.status)
        : {};
      data.rate && this.rate !== data.rate ? (this.rate = data.rate) : {};
      data.result && this.result !== data.result
        ? (this.result = data.result)
        : {};
      data.betSize && this.betSize !== data.betSize
        ? (this.betSize = data.betSize)
        : {};
      data.liability && this.liability !== data.liability
        ? (this.liability = data.liability)
        : {};
    }
  }

  static fromJS(data: any): SportsbookRunners {
    let runnerDetail = data.split("|");
    // data = typeof data === 'object' ? data : {};
    let result = new SportsbookRunners();
    data = {
      runnerId: runnerDetail[0],
      runnerName: runnerDetail[1],
      status: runnerDetail[2],
      odds: runnerDetail[3],
      result: runnerDetail[4],
    };
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["selectionId"] = this.selectionId;
    data["runnerName"] = this.runnerName;
    data["rate"] = this.rate;
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
      this.id = _data["id"];
      this.link = _data["link"];
      this.text = _data["text"];
    }
  }

  static fromJS(data: any): BannerDetail {
    data = typeof data === "object" ? data : {};
    let result = new BannerDetail();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["link"] = this.link;
    data["text"] = this.text;
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
      this.type = _data["type"];
      this.text = _data["text"];
      if (Array.isArray(_data["data"])) {
        this.data = [] as any;
        for (let item of _data["data"])
          this.data!.push(BannerDetail.fromJS(item));
      }
    }
  }

  static fromJS(data: any): Banners {
    data = typeof data === "object" ? data : {};
    let result = new Banners();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["type"] = this.type;
    data["text"] = this.text;
    if (Array.isArray(this.data)) {
      data["data"] = [];
      for (let item of this.data) data["data"].push(item.toJSON());
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
      if (Array.isArray(_data["keyLine"])) {
        this.keyLine = [] as any;
        for (let item of _data["keyLine"])
          this.keyLine!.push(KeyLineSelection.fromJS(item));
      }
    }
  }

  static fromJS(data: any): KeyLineDescription {
    data = typeof data === "object" ? data : {};
    let result = new KeyLineDescription();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.keyLine)) {
      data["keyLine"] = [];
      for (let item of this.keyLine) data["keyLine"].push(item.toJSON());
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
      this.selectionId = _data["selectionId"];
      this.handicap = _data["handicap"];
    }
  }

  static fromJS(data: any): KeyLineSelection {
    data = typeof data === "object" ? data : {};
    let result = new KeyLineSelection();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["selectionId"] = this.selectionId;
    data["handicap"] = this.handicap;
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
      this.marketName = _data["marketName"];
      this.marketStartTime = _data["marketStartTime"];
      this.eventName = _data["eventName"];
      this.eventTypeID = _data["eventTypeID"];
      this.competitionID = _data["competitionID"];
      this.marketID = _data["marketID"];
      this.eventID = _data["eventID"];
    }
  }

  static fromJS(data: any): SearchResult {
    data = typeof data === "object" ? data : {};
    let result = new SearchResult();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["marketName"] = this.marketName;
    data["marketStartTime"] = this.marketStartTime;
    data["eventName"] = this.eventName;
    data["eventTypeID"] = this.eventTypeID;
    data["competitionID"] = this.competitionID;
    data["marketID"] = this.marketID;
    data["eventID"] = this.eventID;
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
      this.id = _data["id"];
      this.eventName = _data["eventName"];
      this.marketId = _data["marketId"];
      this.link = _data["link"];
    }
  }

  static fromJS(data: any): PopularSports {
    data = typeof data === "object" ? data : {};
    let result = new PopularSports();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["eventName"] = this.eventName;
    data["marketId"] = this.marketId;
    data["link"] = this.link;
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
      this.otpRequired = _data["otpRequired"];
      this.status = _data["status"];
      this.message = _data["message"];
    }
  }

  static fromJS(data: any): PhoneNOResponse {
    data = typeof data === "object" ? data : {};
    let result = new PhoneNOResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["otpRequired"] = this.otpRequired;
    data["status"] = this.status;
    data["message"] = this.message;
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


// export function _window(): any {
//   // return the global native browser window object
//   return window;
// }

export function _window(): any {
  // Check if the code is running in the browser
  if (typeof window !== 'undefined') {
    // Return the native browser window object if available (client-side)
    return window;
  } else {
    // Return null or an empty object if running on the server (SSR)
    return {};
  }
}
