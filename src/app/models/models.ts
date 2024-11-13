// import { AxiosError } from "axios";
import { KeyLineDescription } from "../services/backend.service";
import { sportsIdMap } from "../services/sportsEnum";





export class CustomError implements Error{
  name: string;
  message: string;
  code: number;
  data: any;
     constructor(message:string, statusCode:number, data:any){
      this.message=message;
      this.name="CustomError";
      this.code=statusCode;
      this.data=data;
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
          // console.log(_data);
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
      this.gameName = _data["gameName"].replace(' ', '').toLowerCase();
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

/** Sports or event types */
export class EventTypeSS implements IEventTypeSS {
  /** List of Competitions */
  competition!: CompetitionSS[] | null;
  /** Id */
  id!: string | null;
  /** Name */
  name!: string | null;

  constructor(data?: IEventTypeSS) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["competition"])) {
        this.competition = [] as any;
        for (let item of _data["competition"])
          this.competition!.push(CompetitionSS.fromJS(item));
      }
      else {
        this.competition = <any>null;
      }
      this.id = _data["id"] !== undefined ? _data["id"] : <any>null;
      this.name = _data["name"] !== undefined ? _data["name"] : <any>null;
    }
  }

  static fromJS(data: any): EventTypeSS {
    data = typeof data === 'object' ? data : {};
    let result = new EventTypeSS();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.competition)) {
      data["competition"] = [];
      for (let item of this.competition)
        data["competition"].push(item.toJSON());
    }
    data["id"] = this.id !== undefined ? this.id : <any>null;
    data["name"] = this.name !== undefined ? this.name : <any>null;
    return data;
  }
}

/** Sports or event types */
export interface IEventTypeSS {
  /** List of Competitions */
  competition: CompetitionSS[] | null;
  /** Id */
  id: string | null;
  /** Name */
  name: string | null;
}

/** Sports Navigation */
export class Menu implements IMenu {
  /** Unique Id of each item */
  id!: string;
  /** Name of the item e.g sports, competitions, events, markets */
  name!: string;
  /** uri of the tree child node */
  childNode!: string | null;
  /** specific Markets detail of each level (Page Content Area) */
  detail!: string | null;
  /** if it's market level then it will show isinplay */
  inPlay!: boolean | null;
  /** indicate about node item in navigation is Market or not */
  isMarket!: boolean | null;
  childs: any = [];
  active = false;
  filter = false;
  collapse = true
  url? = ''
  constructor(data?: IMenu) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"] !== undefined ? _data["id"] : <any>null;
      this.name = _data["name"] !== undefined ? _data["name"] : <any>null;
      this.childNode = _data["childNode"] !== undefined ? _data["childNode"] : <any>null;
      this.detail = _data["detail"] !== undefined ? _data["detail"] : <any>null;
      this.inPlay = _data["inPlay"] !== undefined ? _data["inPlay"] : <any>null;
      this.isMarket = _data["isMarket"] !== undefined ? _data["isMarket"] : <any>null;
      this.childs = _data["childs"] !== undefined ? _data["childs"] : [];
      // this.collapse = _data["collapse"] !== undefined ? _data["collapse"] : <any>null;
      this.url = _data['url'] ? _data['url'] : ''
    }
  }

  static fromJS(data: any): Menu {
    data = typeof data === 'object' ? data : {};
    let result = new Menu();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id !== undefined ? this.id : <any>null;
    data["name"] = this.name !== undefined ? this.name : <any>null;
    data["childNode"] = this.childNode !== undefined ? this.childNode : <any>null;
    data["detail"] = this.detail !== undefined ? this.detail : <any>null;
    data["inPlay"] = this.inPlay !== undefined ? this.inPlay : <any>null;
    data["isMarket"] = this.isMarket !== undefined ? this.isMarket : <any>null;
    // data["collapse"] = this.collapse !== undefined ? this.collapse : <any>null;
    return data;
  }
}

/** Sports Navigation */
export interface IMenu {
  /** Unique Id of each item */
  id: string;
  /** Name of the item e.g sports, competitions, events, markets */
  name: string;
  /** uri of the tree child node */
  childNode?: string | null;
  /** specific Markets detail of each level (Page Content Area) */
  detail?: string | null;
  /** if it's market level then it will show isinplay */
  inPlay?: boolean | null;
  /** indicate about node item in navigation is Market or not */
  isMarket?: boolean | null;
  // collapse: boolean | null;
  /** SEO FRIENDLY URL */
  url?: string | null;
}

export type MarketStatus = "INACTIVE" | "OPEN" | "SUSPENDED" | "CLOSED";
/** Custome Market Catalogue */
export class MarketCatalogueSS implements IMarketCatalogueSS {
  event?: any;
  /** MarketStatus */
  status?: MarketStatus;
  /** Unique market id */
  marketId?: string | undefined;
  /** Market Name */
  marketName?: string | undefined;
  /** No of winners */
  numberOfWinner?: number;
  /** Market is inplay */
  inplay?: boolean | undefined;
  /** Belonge to local market */
  isLocalMarket?: boolean | undefined;
  /** Betting is stoped or not */
  stopBet?: boolean | undefined;
  /** Last bet Match time */
  lastMatchTime?: Date | undefined;
  /** Market start Time */
  marketStartTime?: string | undefined;
  /** Market definition */
  description?: MarketDescription | undefined;
  /** Market Version */
  version?: number | undefined;
  /** Total Matched in this market */
  totalMatched?: number | undefined;
  /** Total Available in this Market */
  totalAvailable?: number | undefined;
  /** Market Runners */
  runners?: MarketRunners[] | undefined;
  /** Minimum Bet settings */
  minSettings?: number | undefined;
  /** Maximum Bet Settings */
  maxSettings?: number | undefined;
  /** Maximum Market settings */
  maxMarketSettings?: number | undefined;
  /** Client parameters for this market */
  clientSettings?: string | undefined;
  /** score if match is inplay */
  score?: any;
  /** seo friendly url */
  url? = '';
  betslip?: any;
  routerLink?: string;

  constructor(data?: IMarketCatalogueSS) {
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
      this.marketId = _data["marketId"];
      this.marketName = _data["marketName"];
      this.numberOfWinner = _data["numberOfWinner"];
      this.inplay = _data["inplay"];
      this.isLocalMarket = _data["isLocalMarket"];
      this.stopBet = _data["stopBet"];
      this.lastMatchTime = _data["lastMatchTime"] ? new Date(_data["lastMatchTime"].toString()) : <any>undefined;
      this.marketStartTime = _data["marketStartTime"];
      this.description = _data["description"] ? MarketDescription.fromJS(_data["description"]) : <any>undefined;
      this.version = _data["version"];
      this.totalMatched = _data["totalMatched"];
      this.totalAvailable = _data["totalAvailable"];
      if (Array.isArray(_data["runners"])) {
        this.runners = [] as any;
        for (let item of _data["runners"])
          this.runners!.push(MarketRunners.fromJS(item));
      }
      this.minSettings = _data["minSettings"];
      this.maxSettings = _data["maxSettings"];
      this.maxMarketSettings = _data["maxMarketSettings"];
      this.clientSettings = _data["clientSettings"];
      this.event = _data["event"];
      this.routerLink = _data["routerLink"];
    }
  }

  static fromJS(data: any): MarketCatalogueSS {
    data = typeof data === 'object' ? data : {};
    let result = new MarketCatalogueSS();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["status"] = this.status;
    data["marketId"] = this.marketId;
    data["marketName"] = this.marketName;
    data["numberOfWinner"] = this.numberOfWinner;
    data["inplay"] = this.inplay;
    data["isLocalMarket"] = this.isLocalMarket;
    data["stopBet"] = this.stopBet;
    data["lastMatchTime"] = this.lastMatchTime ? this.lastMatchTime.toISOString() : <any>undefined;
    data["marketStartTime"] = this.marketStartTime;
    data["description"] = this.description ? this.description.toJSON() : <any>undefined;
    data["version"] = this.version;
    data["totalMatched"] = this.totalMatched;
    data["totalAvailable"] = this.totalAvailable;
    if (Array.isArray(this.runners)) {
      data["runners"] = [];
      for (let item of this.runners)
        data["runners"].push(item.toJSON());
    }
    data["minSettings"] = this.minSettings;
    data["maxSettings"] = this.maxSettings;
    data["maxMarketSettings"] = this.maxMarketSettings;
    data["clientSettings"] = this.clientSettings;
    data["event"] = this.event;
    data["routerLink"] = this.routerLink

    return data;
  }
}

/** Custome Market Catalogue */
export interface IMarketCatalogueSS {
  event?: any;
  /** MarketStatus */
  status?: MarketStatus;
  /** Unique market id */
  marketId?: string | undefined;
  /** Market Name */
  marketName?: string | undefined;
  /** No of winners */
  numberOfWinner?: number;
  /** Market is inplay */
  inplay?: boolean | undefined;
  /** Belonge to local market */
  isLocalMarket?: boolean | undefined;
  /** Betting is stoped or not */
  stopBet?: boolean | undefined;
  /** Last bet Match time */
  lastMatchTime?: Date | undefined;
  /** Market start Time */
  marketStartTime?: string | undefined;
  /** Market definition */
  description?: MarketDescription | undefined;
  /** Market Version */
  version?: number | undefined;
  /** Total Matched in this market */
  totalMatched?: number | undefined;
  /** Total Available in this Market */
  totalAvailable?: number | undefined;
  /** Market Runners */
  runners?: MarketRunners[] | undefined;
  /** Minimum Bet settings */
  minSettings?: number | undefined;
  /** Maximum Bet Settings */
  maxSettings?: number | undefined;
  /** Maximum Market settings */
  maxMarketSettings?: number | undefined;
  /** Client parameters for this market */
  clientSettings?: string | undefined;
  routerLink?: string
}


/** Race Markets */
export class RaceEvents implements IRaceEvents {
  /** Event id */
  id?: string | undefined;
  /** Event Name */
  name?: string | undefined;
  /** Start Time */
  startTime?: string | undefined;
  /** List of Markets in this event */
  childs?: RaceMarket[] | undefined;
  /** Get markets details of current event */
  detail?: string | undefined;
  /** SEO friendly url **/
  url?: string = ''

  constructor(data?: IRaceEvents) {
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
      this.name = _data["name"];
      this.startTime = _data["startTime"];
      if (Array.isArray(_data["childs"])) {
        this.childs = [] as any;
        for (let item of _data["childs"])
          this.childs!.push(RaceMarket.fromJS(item));
      }
      this.detail = _data["detail"];
      this.url = _data['url'];
    }
  }

  static fromJS(data: any): RaceEvents {
    data = typeof data === 'object' ? data : {};
    let result = new RaceEvents();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["startTime"] = this.startTime;
    if (Array.isArray(this.childs)) {
      data["childs"] = [];
      for (let item of this.childs)
        data["childs"].push(item.toJSON());
    }
    data["detail"] = this.detail;
    return data;
  }
}

/** Race Markets */
export interface IRaceEvents {
  /** Event id */
  id?: string | undefined;
  /** Event Name */
  name?: string | undefined;
  /** Start Time */
  startTime?: string | undefined;
  /** List of Markets in this event */
  childs?: RaceMarket[] | undefined;
  /** Get markets details of current event */
  detail?: string | undefined;
}

/** Market definition */
export class MarketDescription implements IMarketDescription {
  /** If 'true' the market supports 'Keep' bets if the market is to be turned in-play */
  persistenceEnabled!: boolean;
  /** If 'true' the market supports Betfair SP betting */
  bspMarket!: boolean;
  /** The market start time */
  marketTime!: Date;
  /** The market suspend time */
  suspendTime!: Date | null;
  settleTime!: Date | null;
  /** See MarketBettingType */
  bettingType!: MarketBettingType | null;
  /** If 'true' the market is set to turn in-play */
  turnInPlayEnabled!: boolean;
  /** Market base type */
  marketType!: string | null;
  /** The market regulator */
  regulator!: string | null;
  /** The commission rate applicable to the market */
  marketBaseRate!: number;
  /** Indicates whether or not the user's discount rate is taken into account on this market. If ‘false’ all users will be charged the same commission rate, regardless of discount rate */
  discountAllowed!: boolean;
  /** The wallet to which the market belongs (UK/AUS) */
  wallet!: string | null;
  /** The market rules */
  rules!: string | null;
  rulesHasDate!: boolean;
  /** The divisor is returned for the marketType EACH_WAY only and refers to the fraction of the win odds at which the place portion of an each way bet  is settled */
  eachWayDivisor!: number | null;
  /** Any additional information regarding the market */
  clarifications!: string | null;
  /** Market Line Range Info */
  lineRangeInfo!: MarketLineRangeInfo | null;

  constructor(data?: IMarketDescription) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.persistenceEnabled = _data["persistenceEnabled"] !== undefined ? _data["persistenceEnabled"] : <any>null;
      this.bspMarket = _data["bspMarket"] !== undefined ? _data["bspMarket"] : <any>null;
      this.marketTime = _data["marketTime"] ? new Date(_data["marketTime"].toString()) : <any>null;
      this.suspendTime = _data["suspendTime"] ? new Date(_data["suspendTime"].toString()) : <any>null;
      this.settleTime = _data["settleTime"] ? new Date(_data["settleTime"].toString()) : <any>null;
      this.bettingType = _data["bettingType"] !== undefined ? _data["bettingType"] : <any>null;
      this.turnInPlayEnabled = _data["turnInPlayEnabled"] !== undefined ? _data["turnInPlayEnabled"] : <any>null;
      this.marketType = _data["marketType"] !== undefined ? _data["marketType"] : <any>null;
      this.regulator = _data["regulator"] !== undefined ? _data["regulator"] : <any>null;
      this.marketBaseRate = _data["marketBaseRate"] !== undefined ? _data["marketBaseRate"] : <any>null;
      this.discountAllowed = _data["discountAllowed"] !== undefined ? _data["discountAllowed"] : <any>null;
      this.wallet = _data["wallet"] !== undefined ? _data["wallet"] : <any>null;
      this.rules = _data["rules"] !== undefined ? _data["rules"] : <any>null;
      this.rulesHasDate = _data["rulesHasDate"] !== undefined ? _data["rulesHasDate"] : <any>null;
      this.eachWayDivisor = _data["eachWayDivisor"] !== undefined ? _data["eachWayDivisor"] : <any>null;
      this.clarifications = _data["clarifications"] !== undefined ? _data["clarifications"] : <any>null;
      this.lineRangeInfo = _data["lineRangeInfo"] ? MarketLineRangeInfo.fromJS(_data["lineRangeInfo"]) : <any>null;
    }
  }

  static fromJS(data: any): MarketDescription {
    data = typeof data === 'object' ? data : {};
    let result = new MarketDescription();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["persistenceEnabled"] = this.persistenceEnabled !== undefined ? this.persistenceEnabled : <any>null;
    data["bspMarket"] = this.bspMarket !== undefined ? this.bspMarket : <any>null;
    data["marketTime"] = this.marketTime ? this.marketTime.toISOString() : <any>null;
    data["suspendTime"] = this.suspendTime ? this.suspendTime.toISOString() : <any>null;
    data["settleTime"] = this.settleTime ? this.settleTime.toISOString() : <any>null;
    data["bettingType"] = this.bettingType !== undefined ? this.bettingType : <any>null;
    data["turnInPlayEnabled"] = this.turnInPlayEnabled !== undefined ? this.turnInPlayEnabled : <any>null;
    data["marketType"] = this.marketType !== undefined ? this.marketType : <any>null;
    data["regulator"] = this.regulator !== undefined ? this.regulator : <any>null;
    data["marketBaseRate"] = this.marketBaseRate !== undefined ? this.marketBaseRate : <any>null;
    data["discountAllowed"] = this.discountAllowed !== undefined ? this.discountAllowed : <any>null;
    data["wallet"] = this.wallet !== undefined ? this.wallet : <any>null;
    data["rules"] = this.rules !== undefined ? this.rules : <any>null;
    data["rulesHasDate"] = this.rulesHasDate !== undefined ? this.rulesHasDate : <any>null;
    data["eachWayDivisor"] = this.eachWayDivisor !== undefined ? this.eachWayDivisor : <any>null;
    data["clarifications"] = this.clarifications !== undefined ? this.clarifications : <any>null;
    data["lineRangeInfo"] = this.lineRangeInfo ? this.lineRangeInfo.toJSON() : <any>null;
    return data;
  }
}

export type MarketBettingType = "ODDS" | "LINE" | "RANGE" | "ASIAN_HANDICAP_DOUBLE_LINE" | "ASIAN_HANDICAP_SINGLE_LINE" | "FIXED_ODDS";
/** Market definition */
export interface IMarketDescription {
  /** If 'true' the market supports 'Keep' bets if the market is to be turned in-play */
  persistenceEnabled: boolean;
  /** If 'true' the market supports Betfair SP betting */
  bspMarket: boolean;
  /** The market start time */
  marketTime: Date;
  /** The market suspend time */
  suspendTime: Date | null;
  settleTime: Date | null;
  /** See MarketBettingType */
  bettingType: MarketBettingType | null;
  /** If 'true' the market is set to turn in-play */
  turnInPlayEnabled: boolean;
  /** Market base type */
  marketType: string | null;
  /** The market regulator */
  regulator: string | null;
  /** The commission rate applicable to the market */
  marketBaseRate: number;
  /** Indicates whether or not the user's discount rate is taken into account on this market. If ‘false’ all users will be charged the same commission rate, regardless of discount rate */
  discountAllowed: boolean;
  /** The wallet to which the market belongs (UK/AUS) */
  wallet: string | null;
  /** The market rules */
  rules: string | null;
  rulesHasDate: boolean;
  /** The divisor is returned for the marketType EACH_WAY only and refers to the fraction of the win odds at which the place portion of an each way bet  is settled */
  eachWayDivisor: number | null;
  /** Any additional information regarding the market */
  clarifications: string | null;
  /** Market Line Range Info */
  lineRangeInfo: MarketLineRangeInfo | null;
}

/** Market Line Range Info */
export class MarketLineRangeInfo implements IMarketLineRangeInfo {
  /** maxPrice */
  maxUnitValue!: number | null;
  /** minPrice */
  minUnitValue!: number | null;
  /** interval */
  interval!: number | null;
  /** unit */
  marketUnit!: string | null;

  constructor(data?: IMarketLineRangeInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.maxUnitValue = _data["maxUnitValue"] !== undefined ? _data["maxUnitValue"] : <any>null;
      this.minUnitValue = _data["minUnitValue"] !== undefined ? _data["minUnitValue"] : <any>null;
      this.interval = _data["interval"] !== undefined ? _data["interval"] : <any>null;
      this.marketUnit = _data["marketUnit"] !== undefined ? _data["marketUnit"] : <any>null;
    }
  }

  static fromJS(data: any): MarketLineRangeInfo {
    data = typeof data === 'object' ? data : {};
    let result = new MarketLineRangeInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["maxUnitValue"] = this.maxUnitValue !== undefined ? this.maxUnitValue : <any>null;
    data["minUnitValue"] = this.minUnitValue !== undefined ? this.minUnitValue : <any>null;
    data["interval"] = this.interval !== undefined ? this.interval : <any>null;
    data["marketUnit"] = this.marketUnit !== undefined ? this.marketUnit : <any>null;
    return data;
  }
}

/** Market Line Range Info */
export interface IMarketLineRangeInfo {
  /** maxPrice */
  maxUnitValue: number | null;
  /** minPrice */
  minUnitValue: number | null;
  /** interval */
  interval: number | null;
  /** unit */
  marketUnit: string | null;
}


export class MarketRunners implements IMarketRunners {
  /** Toal Matched On this Runners */
  totalMatched!: number;
  /** Last Price Traded */
  lastPriceTraded!: number;
  /** Runner Status */
  status!: string | null;
  /** Back Prices */
  back!: PriceSizeNew[];
  /** Lay Prices */
  lay!: PriceSizeNew[];
  /** The unique id for the selection. */
  selectionId!: number;
  /** The name of the runner */
  runnerName!: string | null;
  /** Handicap */
  handicap!: number;
  /** The sort priority of this runner */
  sortPriority!: number;
  /** Metadata associated with the runner.  For a description of this data for Horse Racing, please see Runner Metadata Description */
  metadata!: any;
  betslip?: any;
  constructor(data?: IMarketRunners) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.back = [];
      this.lay = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.betslip = null;
      this.totalMatched = _data["totalMatched"] !== undefined ? _data["totalMatched"] : <any>null;
      this.lastPriceTraded = _data["lastPriceTraded"] !== undefined ? _data["lastPriceTraded"] : <any>null;
      this.status = _data["status"] !== undefined ? _data["status"] : <any>null;
      if (Array.isArray(_data["back"])) {
        this.back = [] as any;
        for (let item of _data["back"])
          this.back!.push(PriceSizeNew.fromJS(item));
      }
      else {
        this.back = <any>null;
      }
      if (Array.isArray(_data["lay"])) {
        this.lay = [] as any;
        for (let item of _data["lay"])
          this.lay!.push(PriceSizeNew.fromJS(item));
      }
      else {
        this.lay = <any>null;
      }
      this.selectionId = _data["selectionId"] !== undefined ? _data["selectionId"] : <any>null;
      this.runnerName = _data["runnerName"] !== undefined ? _data["runnerName"] : <any>null;
      this.handicap = _data["handicap"] !== undefined ? _data["handicap"] : <any>null;
      this.sortPriority = _data["sortPriority"] !== undefined ? _data["sortPriority"] : <any>null;
      if (_data["metadata"]) {
        this.metadata = {} as any;
        // for (let key in _data["metadata"]) {
        //   console.warn()
        //     if (_data["metadata"].hasOwnProperty(key))
        this.metadata = JSON.parse(_data["metadata"]);
        if (this.metadata?.COLOURS_FILENAME.endsWith('.gif')) {
          this.metadata.COLOURS_FILENAME = undefined;
        }
        // console.warn(this.metadata);
        //}
      }
      else {
        this.metadata = <any>null;
      }
    }
  }

  static fromJS(data: any): MarketRunners {
    data = typeof data === 'object' ? data : {};
    let result = new MarketRunners();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["totalMatched"] = this.totalMatched !== undefined ? this.totalMatched : <any>null;
    data["lastPriceTraded"] = this.lastPriceTraded !== undefined ? this.lastPriceTraded : <any>null;
    data["status"] = this.status !== undefined ? this.status : <any>null;
    if (Array.isArray(this.back)) {
      data["back"] = [];
      for (let item of this.back)
        data["back"].push(item.toJSON());
    }
    if (Array.isArray(this.lay)) {
      data["lay"] = [];
      for (let item of this.lay)
        data["lay"].push(item.toJSON());
    }
    data["selectionId"] = this.selectionId !== undefined ? this.selectionId : <any>null;
    data["runnerName"] = this.runnerName !== undefined ? this.runnerName : <any>null;
    data["handicap"] = this.handicap !== undefined ? this.handicap : <any>null;
    data["sortPriority"] = this.sortPriority !== undefined ? this.sortPriority : <any>null;
    if (this.metadata) {
      this.metadata = JSON.parse(data["metadata"]);

      // for (let key in this.metadata) {
      //     if (this.metadata.hasOwnProperty(key))
      //         (<any>data["metadata"])[key] = this.metadata[key] !== undefined ? this.metadata[key] : <any>null;
      // }
    }
    return data;
  }
}

export interface IMarketRunners {
  /** Toal Matched On this Runners */
  totalMatched: number;
  /** Last Price Traded */
  lastPriceTraded: number;
  /** Runner Status */
  status: string | null;
  /** Back Prices */
  back: PriceSizeNew[];
  /** Lay Prices */
  lay: PriceSizeNew[];
  /** The unique id for the selection. */
  selectionId: number;
  /** The name of the runner */
  runnerName: string | null;
  /** Handicap */
  handicap: number;
  /** The sort priority of this runner */
  sortPriority: number;
  /** Metadata associated with the runner.  For a description of this data for Horse Racing, please see Runner Metadata Description */
  metadata: { [key: string]: string; } | null;
}


/** Exchange Prices */
export class PriceSizeNew implements IPriceSizeNew {
  /** The price available */
  price!: string | null;
  /** The stake available */
  size!: string | null;

  constructor(data?: IPriceSizeNew) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.price = _data["price"] !== undefined ? _data["price"] : <any>null;
      this.size = _data["size"] !== undefined ? _data["size"] : <any>null;
    }
  }

  static fromJS(data: any): PriceSizeNew {
    data = typeof data === 'object' ? data : {};
    let result = new PriceSizeNew();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["price"] = this.price !== undefined ? this.price : <any>null;
    data["size"] = this.size !== undefined ? this.size : <any>null;
    return data;
  }
}

/** Exchange Prices */
export interface IPriceSizeNew {
  /** The price available */
  price: string | null;
  /** The stake available */
  size: string | null;
}


export class RaceMarket implements IRaceMarket {
  /** Market id */
  id?: string | undefined;
  /** Market Name */
  name?: string | undefined;
  /** this is market */
  isMarket?: boolean;
  inPlay?: boolean | undefined;
  detail?: string | undefined;

  constructor(data?: IRaceMarket) {
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
      this.name = _data["name"];
      this.isMarket = _data["isMarket"];
      this.inPlay = _data["inPlay"];
      this.detail = _data["detail"];
    }
  }

  static fromJS(data: any): RaceMarket {
    data = typeof data === 'object' ? data : {};
    let result = new RaceMarket();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["isMarket"] = this.isMarket;
    data["inPlay"] = this.inPlay;
    data["detail"] = this.detail;
    return data;
  }
}

export interface IRaceMarket {
  /** Market id */
  id?: string | undefined;
  /** Market Name */
  name?: string | undefined;
  /** this is market */
  isMarket?: boolean;
  inPlay?: boolean | undefined;
  detail?: string | undefined;
}


/** Race Schedule */
export class RaceDate implements IRaceDate {
  /** Race Day */
  date!: string;
  /** Race Countries */
  childs!: RaceCountry[];

  constructor(data?: IRaceDate) {
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
      this.date = _data["date"] !== undefined ? _data["date"] : <any>null;
      if (Array.isArray(_data["childs"])) {
        this.childs = [] as any;
        for (let item of _data["childs"])
          this.childs!.push(RaceCountry.fromJS(item));
      }
      else {
        this.childs = <any>null;
      }
    }
  }

  static fromJS(data: any): RaceDate {
    data = typeof data === 'object' ? data : {};
    let result = new RaceDate();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["date"] = this.date !== undefined ? this.date : <any>null;
    if (Array.isArray(this.childs)) {
      data["childs"] = [];
      for (let item of this.childs)
        data["childs"].push(item.toJSON());
    }
    return data;
  }
}

/** Race Schedule */
export interface IRaceDate {
  /** Race Day */
  date: string;
  /** Race Countries */
  childs: RaceCountry[];
}

/** ISO countries */
export class RaceCountry implements IRaceCountry {
  /** Country Code */
  countryCode!: string;
  /** Race Tracks */
  childs!: RaceTrack[];

  constructor(data?: IRaceCountry) {
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
      this.countryCode = _data["countryCode"] !== undefined ? _data["countryCode"] : <any>null;
      if (Array.isArray(_data["childs"])) {
        this.childs = [] as any;
        for (let item of _data["childs"])
          this.childs!.push(RaceTrack.fromJS(item));
      }
      else {
        this.childs = <any>null;
      }
    }
  }

  static fromJS(data: any): RaceCountry {
    data = typeof data === 'object' ? data : {};
    let result = new RaceCountry();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["countryCode"] = this.countryCode !== undefined ? this.countryCode : <any>null;
    if (Array.isArray(this.childs)) {
      data["childs"] = [];
      for (let item of this.childs)
        data["childs"].push(item.toJSON());
    }
    return data;
  }
}

/** ISO countries */
export interface IRaceCountry {
  /** Country Code */
  countryCode: string;
  /** Race Tracks */
  childs: RaceTrack[];
}

/** Tournaments or competitions */
export class CompetitionSS implements ICompetitionSS {
  /** List of Events or Matches */
  events!: EventSS[] | null;
  /** Id */
  id!: string | null;
  /** Name */
  name!: string | null;

  constructor(data?: ICompetitionSS) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["events"])) {
        this.events = [] as any;
        for (let item of _data["events"])
          this.events!.push(EventSS.fromJS(item));
      }
      else {
        this.events = <any>null;
      }
      this.id = _data["id"] !== undefined ? _data["id"] : <any>null;
      this.name = _data["name"] !== undefined ? _data["name"] : <any>null;
    }
  }

  static fromJS(data: any): CompetitionSS {
    data = typeof data === 'object' ? data : {};
    let result = new CompetitionSS();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.events)) {
      data["events"] = [];
      for (let item of this.events)
        data["events"].push(item.toJSON());
    }
    data["id"] = this.id !== undefined ? this.id : <any>null;
    data["name"] = this.name !== undefined ? this.name : <any>null;
    return data;
  }
}

/** Tournaments or competitions */
export interface ICompetitionSS {
  /** List of Events or Matches */
  events: EventSS[] | null;
  /** Id */
  id: string | null;
  /** Name */
  name: string | null;
}


/** Events or Matches */
export class EventSS implements IEventSS {
  /** List of Markets */
  markets!: MarketCatalogueSS[] | null;
  matchId?: string | undefined;
  /** The unique id for the event */
  id!: string | null;
  /** The name of the event */
  name!: string | null;
  /** The ISO-2 code for the event.  A list of ISO-2 codes is available via h ttp://en.wikipedia.org/wi ki/ISO_3166-1_alpha-2 */
  countryCode!: string | null;
  /** This is timezone in which the event is taking place */
  timezone!: string | null;
  /** Venue */
  venue!: string | null;
  /** The scheduled start date and time of the event. This is Europe/L ondon (GMT) by default */
  openDate!: string | null;

  constructor(data?: IEventSS) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["markets"])) {
        this.markets = [] as any;
        for (let item of _data["markets"])
          this.markets!.push(MarketCatalogueSS.fromJS(item));
      }
      else {
        this.markets = <any>null;
      }
      this.id = _data["id"] !== undefined ? _data["id"] : <any>null;
      this.name = _data["name"] !== undefined ? _data["name"] : <any>null;
      this.countryCode = _data["countryCode"] !== undefined ? _data["countryCode"] : <any>null;
      this.timezone = _data["timezone"] !== undefined ? _data["timezone"] : <any>null;
      this.venue = _data["venue"] !== undefined ? _data["venue"] : <any>null;
      this.openDate = _data["openDate"] !== undefined ? _data["openDate"] : <any>null;
      this.matchId = _data["matchId"] !== undefined ? _data["matchId"] : <any>null;
    }
  }

  static fromJS(data: any): EventSS {
    data = typeof data === 'object' ? data : {};
    let result = new EventSS();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.markets)) {
      data["markets"] = [];
      for (let item of this.markets)
        data["markets"].push(item.toJSON());
    }
    data["id"] = this.id !== undefined ? this.id : <any>null;
    data["name"] = this.name !== undefined ? this.name : <any>null;
    data["countryCode"] = this.countryCode !== undefined ? this.countryCode : <any>null;
    data["timezone"] = this.timezone !== undefined ? this.timezone : <any>null;
    data["venue"] = this.venue !== undefined ? this.venue : <any>null;
    data["openDate"] = this.openDate !== undefined ? this.openDate : <any>null;
    data["matchId"] = this.matchId !== undefined ? this.matchId : <any>null;
    return data;
  }
}

/** Events or Matches */
export interface IEventSS {
  /** List of Markets */
  markets: MarketCatalogueSS[] | null;
  matchId?: string | undefined;
  /** The unique id for the event */
  id: string | null;
  /** The name of the event */
  name: string | null;
  /** The ISO-2 code for the event.  A list of ISO-2 codes is available via h ttp://en.wikipedia.org/wi ki/ISO_3166-1_alpha-2 */
  countryCode: string | null;
  /** This is timezone in which the event is taking place */
  timezone: string | null;
  /** Venue */
  venue: string | null;
  /** The scheduled start date and time of the event. This is Europe/L ondon (GMT) by default */
  openDate: string | null;
}


/** Race Venu */
export class RaceTrack implements IRaceTrack {
  /** Track Name */
  trackName!: string;
  /** List of Markets */
  childs!: RaceNumber[];

  constructor(data?: IRaceTrack) {
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
      this.trackName = _data["trackName"] !== undefined ? _data["trackName"] : <any>null;
      if (Array.isArray(_data["childs"])) {
        this.childs = [] as any;
        for (let item of _data["childs"])
          this.childs!.push(RaceNumber.fromJS(item));
      }
      else {
        this.childs = <any>null;
      }
    }
  }

  static fromJS(data: any): RaceTrack {
    data = typeof data === 'object' ? data : {};
    let result = new RaceTrack();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["trackName"] = this.trackName !== undefined ? this.trackName : <any>null;
    if (Array.isArray(this.childs)) {
      data["childs"] = [];
      for (let item of this.childs)
        data["childs"].push(item.toJSON());
    }
    return data;
  }
}

/** Race Venu */
export interface IRaceTrack {
  /** Track Name */
  trackName: string;
  /** List of Markets */
  childs: RaceNumber[];
}


/** Race Number or Race Time */
export class RaceNumber implements IRaceNumber {
  /** Event id */
  eventId!: string;
  /** Start Time */
  startTime!: string;
  /** Detail Event Markets */
  detailLink!: string;
  /** SEO friendly url */
  url!: string;

  constructor(data?: IRaceNumber) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.eventId = _data["eventId"] !== undefined ? _data["eventId"] : <any>null;
      this.startTime = _data["startTime"] !== undefined ? _data["startTime"] : <any>null;
      this.detailLink = _data["detailLink"] !== undefined ? _data["detailLink"] : <any>null;
    }
  }

  static fromJS(data: any): RaceNumber {
    data = typeof data === 'object' ? data : {};
    let result = new RaceNumber();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["eventId"] = this.eventId !== undefined ? this.eventId : <any>null;
    data["startTime"] = this.startTime !== undefined ? this.startTime : <any>null;
    data["detailLink"] = this.detailLink !== undefined ? this.detailLink : <any>null;
    return data;
  }
}

/** Race Number or Race Time */
export interface IRaceNumber {
  /** Event id */
  eventId: string;
  /** Start Time */
  startTime: string;
  /** Detail Event Markets */
  detailLink: string;
}


/** Only Used on Inplay and Default Pages */
export class DefaultInplay implements IDefaultInplay {
  /** List of Markets */
  markets?: MarketCatalogueSS[] | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;

  constructor(data?: IDefaultInplay) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["markets"])) {
        this.markets = [] as any;
        for (let item of _data["markets"])
          this.markets!.push(MarketCatalogueSS.fromJS(item));
      }
      this.id = _data["id"];
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): DefaultInplay {
    data = typeof data === 'object' ? data : {};
    let result = new DefaultInplay();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.markets)) {
      data["markets"] = [];
      for (let item of this.markets)
        data["markets"].push(item.toJSON());
    }
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }
}

/** Only Used on Inplay and Default Pages */
export interface IDefaultInplay {
  /** List of Markets */
  markets?: MarketCatalogueSS[] | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;
}

/** The dynamic data in a market */
export class MarketBook implements IMarketBook {
  /** The unique identifier for the market. MarketId's are prefixed with '1.' or '2.' 1. = UK Exchange 2. = AUS Exchange */
  marketId?: string | undefined;
  /** True if the data returned by listMarketBook will be delayed. The data may be delayed because you are not logged in with a funded account or you are using an Application Key that does not allow up to date data. */
  isMarketDataDelayed?: boolean;
  /** The status of the market, for example OPEN, SUSPENDED, CLOSED (settled), etc. */
  status?: MarketStatus;
  /** The number of seconds an order is held until it is submitted into the market. Orders are usually delayed when the market is in-play */
  betDelay?: number;
  /** True if the market starting price has been reconciled */
  bspReconciled?: boolean | undefined;
  /** If false, runners may be added to the market */
  complete?: boolean | undefined;
  /** True if the market is currently in play */
  inplay?: boolean | undefined;
  /** The number of selections that could be settled as winners */
  numberOfWinners?: number | undefined;
  /** The number of runners in the market */
  numberOfRunners?: number | undefined;
  /** The number of runners that are currently active. An active runner is a selection available for betting */
  numberOfActiveRunners?: number | undefined;
  /** The most recent time an order was executed */
  lastMatchTime?: Date | undefined;
  /** The total amount matched */
  totalMatched?: number;
  /** The total amount of orders that remain unmatched */
  totalAvailable?: number;
  /** True if cross matching is enabled for this market. */
  crossMatching?: boolean | undefined;
  /** True if runners in the market can be voided */
  runnersVoidable?: boolean;
  /** The version of the market. The version increments whenever the market status changes, for example, turning in-play, or suspended when a goal is scored. */
  version?: number;
  /** Information about the runners (selections) in the market. */
  runners?: Runner[] | undefined;
  /** key line for handicap markets */
  keyLineDescription?: KeyLineDescription | undefined;

  constructor(data?: IMarketBook) {
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
      this.isMarketDataDelayed = _data["isMarketDataDelayed"];
      this.status = _data["status"];
      this.betDelay = _data["betDelay"];
      this.bspReconciled = _data["bspReconciled"];
      this.complete = _data["complete"];
      this.inplay = _data["inplay"];
      this.numberOfWinners = _data["numberOfWinners"];
      this.numberOfRunners = _data["numberOfRunners"];
      this.numberOfActiveRunners = _data["numberOfActiveRunners"];
      this.lastMatchTime = _data["lastMatchTime"] ? new Date(_data["lastMatchTime"].toString()) : <any>undefined;
      this.totalMatched = _data["totalMatched"];
      this.totalAvailable = _data["totalAvailable"];
      this.crossMatching = _data["crossMatching"];
      this.runnersVoidable = _data["runnersVoidable"];
      this.version = _data["version"];
      if (Array.isArray(_data["runners"])) {
        this.runners = [] as any;
        for (let item of _data["runners"])
          this.runners!.push(Runner.fromJS(item));
      }
      this.keyLineDescription = _data["keyLineDescription"] ? KeyLineDescription.fromJS(_data["keyLineDescription"]) : <any>undefined;
    }
  }

  static fromJS(data: any): MarketBook {
    data = typeof data === 'object' ? data : {};
    let result = new MarketBook();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketId"] = this.marketId;
    data["isMarketDataDelayed"] = this.isMarketDataDelayed;
    data["status"] = this.status;
    data["betDelay"] = this.betDelay;
    data["bspReconciled"] = this.bspReconciled;
    data["complete"] = this.complete;
    data["inplay"] = this.inplay;
    data["numberOfWinners"] = this.numberOfWinners;
    data["numberOfRunners"] = this.numberOfRunners;
    data["numberOfActiveRunners"] = this.numberOfActiveRunners;
    data["lastMatchTime"] = this.lastMatchTime ? this.lastMatchTime.toISOString() : <any>undefined;
    data["totalMatched"] = this.totalMatched;
    data["totalAvailable"] = this.totalAvailable;
    data["crossMatching"] = this.crossMatching;
    data["runnersVoidable"] = this.runnersVoidable;
    data["version"] = this.version;
    if (Array.isArray(this.runners)) {
      data["runners"] = [];
      for (let item of this.runners)
        data["runners"].push(item.toJSON());
    }
    data["keyLineDescription"] = this.keyLineDescription ? this.keyLineDescription.toJSON() : <any>undefined;
    return data;
  }
}


export class Marketlist implements IMarketlist {
  /** Market Start time */
  marketTime?: string | undefined;
  /** Market id int */
  marketId?: string | undefined;
  /** Market Name */
  marketName?: string | undefined;
  /** Status enum of Market Status INACTIVE, ACTIVE, CLOSED, SUSPENDED */
  statusName?: string | undefined;
  /** Runs No */
  runsNo?: string | undefined;
  /** Runs Yes */
  runsYes?: string | undefined;
  /** Stake, size of NO Runs */
  oddsNo?: string | undefined;
  /** Stake Size of Yes Runs */
  oddsYes?: string | undefined;
  /** Maximum Bet Size */
  rebateRatio?: string | undefined;
  /** Minimum bet size will be multiply with fancyRate */
  minSetting?: string | undefined;
  /** Maximum bet size will be multiply with fancy Rate */
  maxSetting?: string | undefined;
  /** Bet delay in second */
  delayBetting?: string | undefined;
  /** Rating Exposure */
  ratingExposure?: string | undefined;
  /** Order of the markets */
  sortingOrder?: number;
  /** Source id of 1 or 0 */
  source?: number;
  position?: any;
  position2?: any;
  catagory?: string;

  constructor(data?: IMarketlist) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.marketTime = _data["marketTime"];
      this.marketId = _data["marketId"];
      this.marketName = _data["marketName"];
      this.statusName = _data["statusName"];
      this.runsNo = _data["runsNo"];
      this.runsYes = _data["runsYes"];
      this.oddsNo = _data["oddsNo"];
      this.oddsYes = _data["oddsYes"];
      this.rebateRatio = _data["rebateRatio"];
      this.minSetting = _data["minSetting"];
      this.maxSetting = _data["maxSetting"];
      this.delayBetting = _data["delayBetting"];
      this.ratingExposure = _data["ratingExposure"];
      this.sortingOrder = _data["sortingOrder"];
      this.source = _data["source"];
      this.catagory = _data['catagory'];
    }
  }

  static fromJS(data: any): Marketlist {
    data = typeof data === 'object' ? data : {};
    let result = new Marketlist();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketTime"] = this.marketTime;
    data["marketId"] = this.marketId;
    data["marketName"] = this.marketName;
    data["statusName"] = this.statusName;
    data["runsNo"] = this.runsNo;
    data["runsYes"] = this.runsYes;
    data["oddsNo"] = this.oddsNo;
    data["oddsYes"] = this.oddsYes;
    data["rebateRatio"] = this.rebateRatio;
    data["minSetting"] = this.minSetting;
    data["maxSetting"] = this.maxSetting;
    data["delayBetting"] = this.delayBetting;
    data["ratingExposure"] = this.ratingExposure;
    data["sortingOrder"] = this.sortingOrder;
    data["source"] = this.source;
    data['catagory'] = this.catagory;
    return data;
  }
}

export interface IMarketlist {
  /** Market Start time */
  marketTime?: string | undefined;
  /** Market id int */
  marketId?: string | undefined;
  /** Market Name */
  marketName?: string | undefined;
  /** Status enum of Market Status INACTIVE, ACTIVE, CLOSED, SUSPENDED */
  statusName?: string | undefined;
  /** Runs No */
  runsNo?: string | undefined;
  /** Runs Yes */
  runsYes?: string | undefined;
  /** Stake, size of NO Runs */
  oddsNo?: string | undefined;
  /** Stake Size of Yes Runs */
  oddsYes?: string | undefined;
  /** Maximum Bet Size */
  rebateRatio?: string | undefined;
  /** Minimum bet size will be multiply with fancyRate */
  minSetting?: string | undefined;
  /** Maximum bet size will be multiply with fancy Rate */
  maxSetting?: string | undefined;
  /** Bet delay in second */
  delayBetting?: string | undefined;
  /** Rating Exposure */
  ratingExposure?: string | undefined;
  /** Order of the markets */
  sortingOrder?: number;
  /** Source id of 1 or 0 */
  source?: number;
  catagory?: string;
}
export interface IBookMakerRunners {
  backOdds?: number;
  layOdds?: number;
  selectionId?: string | undefined;
  selectionName?: string | undefined;
  sortPeriority?: number;
  status?: string | undefined;


}
/** BookMaker Market */
export class BookMaker implements IBookMaker {
  betslip?: any;
  betslipR?: any;
  eventId?: number;
  /** Market id in integer */
  marketId?: string | undefined;
  /** Runner id or selection id */
  selectionId?: string | undefined;
  /** Runner Name */
  selectionName?: string | undefined;
  /** Runner status SUSPENDED, INACTIVE */
  selectionStatus?: string | undefined;
  /** back price */
  backOdds?: number;
  /** Lay Price */
  layOdds?: number;
  /** market status OPEN , ACTIVE, SUSPENDED, CLOSED */
  statusName?: string | undefined;
  /** Minimum bet size will be multiply with bookmaker Rate */
  minSetting?: number;
  /** maximum bet size will be multiply with bookmaker Rate */
  maxSetting?: number;
  /** maximum market size will be multiply with bookmaker Rate */
  ratingExposure?: number;
  /** not used on UI */
  rebateRatio?: number;
  /** sorting order not used on UI */
  sortPeriority?: number;
  /** Source id 1 or 0 */
  source?: number;
  marketName?: string;
  runners?: IBookMakerRunners[] | undefined;
  constructor(data?: IBookMaker) {
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
      this.selectionId = _data['selectionId'];
      this.selectionName = _data['selectionName'];
      this.selectionStatus = _data['selectionStatus'];
      this.backOdds = _data['backOdds'];
      this.layOdds = _data['layOdds'];
      this.statusName = _data['statusName'];
      this.minSetting = _data['minSetting'];
      this.maxSetting = _data['maxSetting'];
      this.ratingExposure = _data['ratingExposure'];
      this.rebateRatio = _data['rebateRatio'];
      this.sortPeriority = _data['sortPeriority'];
      this.source = _data['source'];
      this.marketName = _data['marketName'];
      this.eventId = _data['eventId'];
      this.runners = _data['runners'];
    }
  }

  static fromJS(data: any): BookMaker {
    data = typeof data === 'object' ? data : {};
    let result = new BookMaker();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['marketId'] = this.marketId;
    data['selectionId'] = this.selectionId;
    data['selectionName'] = this.selectionName;
    data['selectionStatus'] = this.selectionStatus;
    data['backOdds'] = this.backOdds;
    data['layOdds'] = this.layOdds;
    data['statusName'] = this.statusName;
    data['minSetting'] = this.minSetting;
    data['maxSetting'] = this.maxSetting;
    data['ratingExposure'] = this.ratingExposure;
    data['rebateRatio'] = this.rebateRatio;
    data['sortPeriority'] = this.sortPeriority;
    data['source'] = this.source;
    data['marketName'] = this.marketName;
    data['eventId'] = this.eventId;
    data['runners'] = this.runners;
    return data;
  }
}

/** BookMaker Market */
export interface IBookMaker {
  /** Market id in integer */
  marketId?: string | undefined;
  /** Runner id or selection id */
  selectionId?: string | undefined;
  /** Runner Name */
  selectionName?: string | undefined;
  /** Runner status SUSPENDED, INACTIVE */
  selectionStatus?: string | undefined;
  /** back price */
  backOdds?: number;
  /** Lay Price */
  layOdds?: number;
  /** market status OPEN , ACTIVE, SUSPENDED, CLOSED */
  statusName?: string | undefined;
  /** Minimum bet size will be multiply with bookmaker Rate */
  minSetting?: number;
  /** maximum bet size will be multiply with bookmaker Rate */
  maxSetting?: number;
  /** maximum market size will be multiply with bookmaker Rate */
  ratingExposure?: number;
  /** not used on UI */
  rebateRatio?: number;
  /** sorting order not used on UI */
  sortPeriority?: number;
  /** Source id 1 or 0 */
  source?: number;
  marketName?: string;
  eventId?: number;
  runners?: IBookMakerRunners[] | undefined;
}
/** All Book Maker with Fancy data */
export class AllFancyData implements IAllFancyData {
  /** List Fancy Markets */
  fancy?: Marketlist[] | undefined;
  /** Book Maker Markets */
  bookMaker?: BookMaker[] | undefined;

  constructor(data?: IAllFancyData) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["fancy"])) {
        this.fancy = [] as any;
        for (let item of _data["fancy"])
          this.fancy!.push(Marketlist.fromJS(item));
      }
      if (Array.isArray(_data["bookMaker"])) {
        this.bookMaker = [] as any;
        for (let item of _data["bookMaker"])
          this.bookMaker!.push(BookMaker.fromJS(item));
      }
    }
  }

  static fromJS(data: any): AllFancyData {
    data = typeof data === 'object' ? data : {};
    let result = new AllFancyData();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.fancy)) {
      data["fancy"] = [];
      for (let item of this.fancy)
        data["fancy"].push(item.toJSON());
    }
    if (Array.isArray(this.bookMaker)) {
      data["bookMaker"] = [];
      for (let item of this.bookMaker)
        data["bookMaker"].push(item.toJSON());
    }
    return data;
  }
}

/** All Book Maker with Fancy data */
export interface IAllFancyData {
  /** List Fancy Markets */
  fancy?: Marketlist[] | undefined;
  /** Book Maker Markets */
  bookMaker?: BookMaker[] | undefined;
}

/** The dynamic data in a market */
export interface IMarketBook {
  /** The unique identifier for the market. MarketId's are prefixed with '1.' or '2.' 1. = UK Exchange 2. = AUS Exchange */
  marketId?: string | undefined;
  /** True if the data returned by listMarketBook will be delayed. The data may be delayed because you are not logged in with a funded account or you are using an Application Key that does not allow up to date data. */
  isMarketDataDelayed?: boolean;
  /** The status of the market, for example OPEN, SUSPENDED, CLOSED (settled), etc. */
  status?: MarketStatus;
  /** The number of seconds an order is held until it is submitted into the market. Orders are usually delayed when the market is in-play */
  betDelay?: number;
  /** True if the market starting price has been reconciled */
  bspReconciled?: boolean | undefined;
  /** If false, runners may be added to the market */
  complete?: boolean | undefined;
  /** True if the market is currently in play */
  inplay?: boolean | undefined;
  /** The number of selections that could be settled as winners */
  numberOfWinners?: number | undefined;
  /** The number of runners in the market */
  numberOfRunners?: number | undefined;
  /** The number of runners that are currently active. An active runner is a selection available for betting */
  numberOfActiveRunners?: number | undefined;
  /** The most recent time an order was executed */
  lastMatchTime?: Date | undefined;
  /** The total amount matched */
  totalMatched?: number;
  /** The total amount of orders that remain unmatched */
  totalAvailable?: number;
  /** True if cross matching is enabled for this market. */
  crossMatching?: boolean | undefined;
  /** True if runners in the market can be voided */
  runnersVoidable?: boolean;
  /** The version of the market. The version increments whenever the market status changes, for example, turning in-play, or suspended when a goal is scored. */
  version?: number;
  /** Information about the runners (selections) in the market. */
  runners?: Runner[] | undefined;
  /** key line for handicap markets */
  keyLineDescription?: KeyLineDescription | undefined;
}


/** The dynamic data about runners in a market */
export class Runner implements IRunner {
  /** The unique id of the runner (selection) */
  selectionId?: number;
  /** The handicap.  Enter the specific handicap value (returned by RUNNER in listMaketB ) if the market is anook Asian handicap market. */
  handicap?: number | undefined;
  /** The status of the selection (i.e., ACTIVE, REMOVED, WINNER, LOSER, HIDDEN) Runner status information is available for 90 days following market settlement. */
  status?: RunnerStatus;
  /** The adjustment factor applied if the selection is removed */
  adjustmentFactor?: number | undefined;
  /** The price of the most recent bet matched on this selection */
  lastPriceTraded?: number | undefined;
  /** The total amount matched on this runner */
  totalMatched?: number;
  /** If date and time the runner was removed */
  removalDate?: Date | undefined;
  /** The BSP related prices for this runner */
  sp?: StartingPrices | undefined;
  /** The Exchange prices available for this runner */
  ex?: ExchangePrices | undefined;
  /** List of orders in the market */
  orders?: Order[] | undefined;
  /** List of matches (i.e, orders that have been fully or partially executed) */
  matches?: Match[] | undefined;
  /** List of matches for each strategy, ordered by matched data */
  matchesByStrategy?: { [key: string]: Match[]; } | undefined;

  constructor(data?: IRunner) {
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
      this.status = _data["status"];
      this.adjustmentFactor = _data["adjustmentFactor"];
      this.lastPriceTraded = _data["lastPriceTraded"];
      this.totalMatched = _data["totalMatched"];
      this.removalDate = _data["removalDate"] ? new Date(_data["removalDate"].toString()) : <any>undefined;
      this.sp = _data["sp"] ? StartingPrices.fromJS(_data["sp"]) : <any>undefined;
      this.ex = _data["ex"] ? ExchangePrices.fromJS(_data["ex"]) : <any>undefined;
      if (Array.isArray(_data["orders"])) {
        this.orders = [] as any;
        for (let item of _data["orders"])
          this.orders!.push(Order.fromJS(item));
      }
      if (Array.isArray(_data["matches"])) {
        this.matches = [] as any;
        for (let item of _data["matches"])
          this.matches!.push(Match.fromJS(item));
      }
      if (_data["matchesByStrategy"]) {
        this.matchesByStrategy = {} as any;
        for (let key in _data["matchesByStrategy"]) {
          if (_data["matchesByStrategy"].hasOwnProperty(key))
            (<any>this.matchesByStrategy)![key] = _data["matchesByStrategy"][key] ? _data["matchesByStrategy"][key].map((i: any) => Match.fromJS(i)) : [];
        }
      }
    }
  }

  static fromJS(data: any): Runner {
    data = typeof data === 'object' ? data : {};
    let result = new Runner();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["selectionId"] = this.selectionId;
    data["handicap"] = this.handicap;
    data["status"] = this.status;
    data["adjustmentFactor"] = this.adjustmentFactor;
    data["lastPriceTraded"] = this.lastPriceTraded;
    data["totalMatched"] = this.totalMatched;
    data["removalDate"] = this.removalDate ? this.removalDate.toISOString() : <any>undefined;
    data["sp"] = this.sp ? this.sp.toJSON() : <any>undefined;
    data["ex"] = this.ex ? this.ex.toJSON() : <any>undefined;
    if (Array.isArray(this.orders)) {
      data["orders"] = [];
      for (let item of this.orders)
        data["orders"].push(item.toJSON());
    }
    if (Array.isArray(this.matches)) {
      data["matches"] = [];
      for (let item of this.matches)
        data["matches"].push(item.toJSON());
    }
    if (this.matchesByStrategy) {
      data["matchesByStrategy"] = {};
      for (let key in this.matchesByStrategy) {
        if (this.matchesByStrategy.hasOwnProperty(key))
          (<any>data["matchesByStrategy"])[key] = this.matchesByStrategy[key];
      }
    }
    return data;
  }
}

/** The dynamic data about runners in a market */
export interface IRunner {
  /** The unique id of the runner (selection) */
  selectionId?: number;
  /** The handicap.  Enter the specific handicap value (returned by RUNNER in listMaketB ) if the market is anook Asian handicap market. */
  handicap?: number | undefined;
  /** The status of the selection (i.e., ACTIVE, REMOVED, WINNER, LOSER, HIDDEN) Runner status information is available for 90 days following market settlement. */
  status?: RunnerStatus;
  /** The adjustment factor applied if the selection is removed */
  adjustmentFactor?: number | undefined;
  /** The price of the most recent bet matched on this selection */
  lastPriceTraded?: number | undefined;
  /** The total amount matched on this runner */
  totalMatched?: number;
  /** If date and time the runner was removed */
  removalDate?: Date | undefined;
  /** The BSP related prices for this runner */
  sp?: StartingPrices | undefined;
  /** The Exchange prices available for this runner */
  ex?: ExchangePrices | undefined;
  /** List of orders in the market */
  orders?: Order[] | undefined;
  /** List of matches (i.e, orders that have been fully or partially executed) */
  matches?: Match[] | undefined;
  /** List of matches for each strategy, ordered by matched data */
  matchesByStrategy?: { [key: string]: Match[]; } | undefined;
}

/** Information about the Betfair Starting Price. Only available in BSP markets */
export class StartingPrices implements IStartingPrices {
  /** What the starting price would be if the market was reconciled now taking into account the SP bets as well as unmatched exchange bets on the same selection in the exchange. This data is cached and update every 60 seconds. Plea se note: Type Double may contain numbers, INF, -INF, and NaN. */
  nearPrice?: number;
  /** What the starting price would be if the market was reconciled now taking into account only the currently place SP bets. The Far Price is not as complicated but not as accurate and only accounts for money on the exchange at SP. This data is cached and updated every 60 seconds. Please note: Type Double may contain numbers, INF, -INF, and NaN. */
  farPrice?: number;
  /** The total amount of back bets matched at the actual Betfair Starting Price */
  backStakeTaken?: PriceSize[] | undefined;
  /** The lay amount matched at the actual Betfair Starting Price */
  layLiabilityTaken?: PriceSize[] | undefined;
  /** The final BSP price for this runner. Only available for a BSP market that has been reconciled */
  actualSP?: number;

  constructor(data?: IStartingPrices) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.nearPrice = _data["nearPrice"];
      this.farPrice = _data["farPrice"];
      if (Array.isArray(_data["backStakeTaken"])) {
        this.backStakeTaken = [] as any;
        for (let item of _data["backStakeTaken"])
          this.backStakeTaken!.push(PriceSize.fromJS(item));
      }
      if (Array.isArray(_data["layLiabilityTaken"])) {
        this.layLiabilityTaken = [] as any;
        for (let item of _data["layLiabilityTaken"])
          this.layLiabilityTaken!.push(PriceSize.fromJS(item));
      }
      this.actualSP = _data["actualSP"];
    }
  }

  static fromJS(data: any): StartingPrices {
    data = typeof data === 'object' ? data : {};
    let result = new StartingPrices();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["nearPrice"] = this.nearPrice;
    data["farPrice"] = this.farPrice;
    if (Array.isArray(this.backStakeTaken)) {
      data["backStakeTaken"] = [];
      for (let item of this.backStakeTaken)
        data["backStakeTaken"].push(item.toJSON());
    }
    if (Array.isArray(this.layLiabilityTaken)) {
      data["layLiabilityTaken"] = [];
      for (let item of this.layLiabilityTaken)
        data["layLiabilityTaken"].push(item.toJSON());
    }
    data["actualSP"] = this.actualSP;
    return data;
  }
}

/** Information about the Betfair Starting Price. Only available in BSP markets */
export interface IStartingPrices {
  /** What the starting price would be if the market was reconciled now taking into account the SP bets as well as unmatched exchange bets on the same selection in the exchange. This data is cached and update every 60 seconds. Plea se note: Type Double may contain numbers, INF, -INF, and NaN. */
  nearPrice?: number;
  /** What the starting price would be if the market was reconciled now taking into account only the currently place SP bets. The Far Price is not as complicated but not as accurate and only accounts for money on the exchange at SP. This data is cached and updated every 60 seconds. Please note: Type Double may contain numbers, INF, -INF, and NaN. */
  farPrice?: number;
  /** The total amount of back bets matched at the actual Betfair Starting Price */
  backStakeTaken?: PriceSize[] | undefined;
  /** The lay amount matched at the actual Betfair Starting Price */
  layLiabilityTaken?: PriceSize[] | undefined;
  /** The final BSP price for this runner. Only available for a BSP market that has been reconciled */
  actualSP?: number;
}

/** ExchangePrices */
export class ExchangePrices implements IExchangePrices {
  /** AvailableToBack */
  availableToBack?: PriceSize[] | undefined;
  /** AvailableToLay */
  availableToLay?: PriceSize[] | undefined;
  /** TradedVolume */
  tradedVolume?: PriceSize[] | undefined;

  constructor(data?: IExchangePrices) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["availableToBack"])) {
        this.availableToBack = [] as any;
        for (let item of _data["availableToBack"])
          this.availableToBack!.push(PriceSize.fromJS(item));
      }
      if (Array.isArray(_data["availableToLay"])) {
        this.availableToLay = [] as any;
        for (let item of _data["availableToLay"])
          this.availableToLay!.push(PriceSize.fromJS(item));
      }
      if (Array.isArray(_data["tradedVolume"])) {
        this.tradedVolume = [] as any;
        for (let item of _data["tradedVolume"])
          this.tradedVolume!.push(PriceSize.fromJS(item));
      }
    }
  }

  static fromJS(data: any): ExchangePrices {
    data = typeof data === 'object' ? data : {};
    let result = new ExchangePrices();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.availableToBack)) {
      data["availableToBack"] = [];
      for (let item of this.availableToBack)
        data["availableToBack"].push(item.toJSON());
    }
    if (Array.isArray(this.availableToLay)) {
      data["availableToLay"] = [];
      for (let item of this.availableToLay)
        data["availableToLay"].push(item.toJSON());
    }
    if (Array.isArray(this.tradedVolume)) {
      data["tradedVolume"] = [];
      for (let item of this.tradedVolume)
        data["tradedVolume"].push(item.toJSON());
    }
    return data;
  }
}

/** ExchangePrices */
export interface IExchangePrices {
  /** AvailableToBack */
  availableToBack?: PriceSize[] | undefined;
  /** AvailableToLay */
  availableToLay?: PriceSize[] | undefined;
  /** TradedVolume */
  tradedVolume?: PriceSize[] | undefined;
}

/** Price and Size */
export class PriceSize implements IPriceSize {
  /** The price available */
  price?: number | undefined;
  /** The stake available */
  size?: number | undefined;

  constructor(data?: IPriceSize) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.price = _data["price"];
      this.size = _data["size"];
    }
  }

  static fromJS(data: any): PriceSize {
    data = typeof data === 'object' ? data : {};
    let result = new PriceSize();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["price"] = this.price;
    data["size"] = this.size;
    return data;
  }
}

/** Price and Size */
export interface IPriceSize {
  /** The price available */
  price?: number | undefined;
  /** The stake available */
  size?: number | undefined;
}

/** An individual bet Match, or rollup by price or avg price. Rollup depends on the requested MatchProjection */
export class Match implements IMatch {
  /** Only present if no rollup */
  betId?: string | undefined;
  /** Only present if no rollup */
  matchId?: string | undefined;
  /** Indicates if the bet is a Back or a LAY */
  side?: Side;
  /** Either actual match price or avg match price depending on rollup */
  price?: number;
  /** Size matched at in this fragment, or at this price or avg price depending on rollup */
  size?: number;
  /** Only present if no rollup */
  matchDate?: Date;

  constructor(data?: IMatch) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.betId = _data["betId"];
      this.matchId = _data["matchId"];
      this.side = _data["side"];
      this.price = _data["price"];
      this.size = _data["size"];
      this.matchDate = _data["matchDate"] ? new Date(_data["matchDate"].toString()) : <any>undefined;
    }
  }

  static fromJS(data: any): Match {
    data = typeof data === 'object' ? data : {};
    let result = new Match();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["betId"] = this.betId;
    data["matchId"] = this.matchId;
    data["side"] = this.side;
    data["price"] = this.price;
    data["size"] = this.size;
    data["matchDate"] = this.matchDate ? this.matchDate.toISOString() : <any>undefined;
    return data;
  }
}

/** An individual bet Match, or rollup by price or avg price. Rollup depends on the requested MatchProjection */
export interface IMatch {
  /** Only present if no rollup */
  betId?: string | undefined;
  /** Only present if no rollup */
  matchId?: string | undefined;
  /** Indicates if the bet is a Back or a LAY */
  side?: Side;
  /** Either actual match price or avg match price depending on rollup */
  price?: number;
  /** Size matched at in this fragment, or at this price or avg price depending on rollup */
  size?: number;
  /** Only present if no rollup */
  matchDate?: Date;
}

/** Order */
export class Order implements IOrder {
  /** BetId */
  betId?: string | undefined;
  /** BSP Order type */
  orderType?: OrderType;
  /** Either EXECUTABLE (an unmatched amount remains) or EXECUTION_COMPL ETE (no unmatched amount remains) */
  status?: OrderStatus;
  /** What to do with the order at turn-in-play */
  persistenceType?: PersistenceType;
  /** Indicates if the bet is a Back or a LAY */
  side?: Side;
  /** The price of the bet */
  price?: number;
  /** The size of the bet */
  size?: number;
  /** Not to be confused with size. This is the liability of a given BSP bet */
  bspLiability?: number | undefined;
  /** The date, to the second, the bet was placed */
  placedDate?: Date | undefined;
  /** The average price matched at. Voided match fragments are removed from this average calculation. For MARKET_ON_CLOSE BSP bets this reports the matched SP price following the SP reconciliation process */
  avgPriceMatched?: number | undefined;
  /** The current amount of this bet that was matched */
  sizeMatched?: number | undefined;
  /** The current amount of this bet that is unmatched */
  sizeRemaining?: number | undefined;
  /** The current amount of this bet that was lapsed */
  sizeLapsed?: number | undefined;
  /** The current amount of this bet that was cancelled */
  sizeCancelled?: number | undefined;
  /** The current amount of this bet that was voided */
  sizeVoided?: number | undefined;
  /** The customer order reference sent for this bet */
  customerOrderRef?: string | undefined;
  /** The customer strategy reference sent for this bet */
  customerStrategyRef?: string | undefined;

  constructor(data?: IOrder) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.betId = _data["betId"];
      this.orderType = _data["orderType"];
      this.status = _data["status"];
      this.persistenceType = _data["persistenceType"];
      this.side = _data["side"];
      this.price = _data["price"];
      this.size = _data["size"];
      this.bspLiability = _data["bspLiability"];
      this.placedDate = _data["placedDate"] ? new Date(_data["placedDate"].toString()) : <any>undefined;
      this.avgPriceMatched = _data["avgPriceMatched"];
      this.sizeMatched = _data["sizeMatched"];
      this.sizeRemaining = _data["sizeRemaining"];
      this.sizeLapsed = _data["sizeLapsed"];
      this.sizeCancelled = _data["sizeCancelled"];
      this.sizeVoided = _data["sizeVoided"];
      this.customerOrderRef = _data["customerOrderRef"];
      this.customerStrategyRef = _data["customerStrategyRef"];
    }
  }

  static fromJS(data: any): Order {
    data = typeof data === 'object' ? data : {};
    let result = new Order();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["betId"] = this.betId;
    data["orderType"] = this.orderType;
    data["status"] = this.status;
    data["persistenceType"] = this.persistenceType;
    data["side"] = this.side;
    data["price"] = this.price;
    data["size"] = this.size;
    data["bspLiability"] = this.bspLiability;
    data["placedDate"] = this.placedDate ? this.placedDate.toISOString() : <any>undefined;
    data["avgPriceMatched"] = this.avgPriceMatched;
    data["sizeMatched"] = this.sizeMatched;
    data["sizeRemaining"] = this.sizeRemaining;
    data["sizeLapsed"] = this.sizeLapsed;
    data["sizeCancelled"] = this.sizeCancelled;
    data["sizeVoided"] = this.sizeVoided;
    data["customerOrderRef"] = this.customerOrderRef;
    data["customerStrategyRef"] = this.customerStrategyRef;
    return data;
  }
}

/** Order */
export interface IOrder {
  /** BetId */
  betId?: string | undefined;
  /** BSP Order type */
  orderType?: OrderType;
  /** Either EXECUTABLE (an unmatched amount remains) or EXECUTION_COMPL ETE (no unmatched amount remains) */
  status?: OrderStatus;
  /** What to do with the order at turn-in-play */
  persistenceType?: PersistenceType;
  /** Indicates if the bet is a Back or a LAY */
  side?: Side;
  /** The price of the bet */
  price?: number;
  /** The size of the bet */
  size?: number;
  /** Not to be confused with size. This is the liability of a given BSP bet */
  bspLiability?: number | undefined;
  /** The date, to the second, the bet was placed */
  placedDate?: Date | undefined;
  /** The average price matched at. Voided match fragments are removed from this average calculation. For MARKET_ON_CLOSE BSP bets this reports the matched SP price following the SP reconciliation process */
  avgPriceMatched?: number | undefined;
  /** The current amount of this bet that was matched */
  sizeMatched?: number | undefined;
  /** The current amount of this bet that is unmatched */
  sizeRemaining?: number | undefined;
  /** The current amount of this bet that was lapsed */
  sizeLapsed?: number | undefined;
  /** The current amount of this bet that was cancelled */
  sizeCancelled?: number | undefined;
  /** The current amount of this bet that was voided */
  sizeVoided?: number | undefined;
  /** The customer order reference sent for this bet */
  customerOrderRef?: string | undefined;
  /** The customer strategy reference sent for this bet */
  customerStrategyRef?: string | undefined;
}

/** OrderStatus */
export enum OrderStatus {
  PENDING = "PENDING",
  EXECUTION_COMPLETE = "EXECUTION_COMPLETE",
  EXECUTABLE = "EXECUTABLE",
  EXPIRED = "EXPIRED",
}

/** OrderType */
export enum OrderType {
  LIMIT = "LIMIT",
  LIMIT_ON_CLOSE = "LIMIT_ON_CLOSE",
  MARKET_ON_CLOSE = "MARKET_ON_CLOSE",
}

/** Persistence Type */
export enum PersistenceType {
  LAPSE = "LAPSE",
  PERSIST = "PERSIST",
  MARKET_ON_CLOSE = "MARKET_ON_CLOSE",
}

/** Side */
export enum Side {
  BACK = "BACK",
  LAY = "LAY",
}

/** RunnerStatus */
export enum RunnerStatus {
  ACTIVE = "ACTIVE",
  WINNER = "WINNER",
  LOSER = "LOSER",
  PLACED = "PLACED",
  REMOVED_VACANT = "REMOVED_VACANT",
  REMOVED = "REMOVED",
  HIDDEN = "HIDDEN",
}

/** Client Parameters as per Market */
export class ClientParameters implements IClientParameters {
  /** Currency But Rate */
  cBuyRate!: number;
  /** Currency Sell Rate */
  cSellRate!: number;
  /** P Share decimal or Zero */
  pShare!: number;
  /** C Share decimal or Zero */
  cShare!: number;
  /** ISO Currency Code */
  currencyCode!: string;
  /** Stake Value 1 */
  stakeVal1!: number;
  /** Stake Value 2 */
  stakeVal2!: number;
  /** Stake Value 3 */
  stakeVal3!: number;
  /** Stake Value 4 */
  stakeVal4!: number;
  /** Stake Value 5 */
  stakeVal5!: number;
  /** Stake Value 6 */
  stakeVal6!: number;
  /** Stake Value 7 */
  stakeVal7!: number;
  /** Stake Value 8 */
  stakeVal8!: number;
  /** Fancy Rate */
  fancyRate!: number;
  /** Book maker Rate */
  bookMakerRate!: number;
  /** Local Market Rate */
  localMarketRate!: number;
  /** Line Market Rate */
  lineRate!: number;

  constructor(data?: IClientParameters) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.cBuyRate = _data["cBuyRate"];
      this.cSellRate = _data["cSellRate"];
      this.pShare = _data["pShare"];
      this.cShare = _data["cShare"];
      this.currencyCode = _data["currencyCode"];
      this.stakeVal1 = _data["stakeVal1"];
      this.stakeVal2 = _data["stakeVal2"];
      this.stakeVal3 = _data["stakeVal3"];
      this.stakeVal4 = _data["stakeVal4"];
      this.stakeVal5 = _data["stakeVal5"];
      this.stakeVal6 = _data["stakeVal6"];
      this.stakeVal7 = _data["stakeVal7"];
      this.stakeVal8 = _data["stakeVal8"];
      this.fancyRate = _data["fancyRate"];
      this.bookMakerRate = _data["bookMakerRate"];
      this.localMarketRate = _data["localMarketRate"];
      this.lineRate = _data["lineRate"];
    }
  }

  static fromJS(data: any): ClientParameters {
    data = typeof data === 'object' ? data : {};
    let result = new ClientParameters();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["cBuyRate"] = this.cBuyRate;
    data["cSellRate"] = this.cSellRate;
    data["pShare"] = this.pShare;
    data["cShare"] = this.cShare;
    data["currencyCode"] = this.currencyCode;
    data["stakeVal1"] = this.stakeVal1;
    data["stakeVal2"] = this.stakeVal2;
    data["stakeVal3"] = this.stakeVal3;
    data["stakeVal4"] = this.stakeVal4;
    data["stakeVal5"] = this.stakeVal5;
    data["stakeVal6"] = this.stakeVal6;
    data["stakeVal7"] = this.stakeVal7;
    data["stakeVal8"] = this.stakeVal8;
    data["fancyRate"] = this.fancyRate;
    data["bookMakerRate"] = this.bookMakerRate;
    data["localMarketRate"] = this.localMarketRate;
    data["lineRate"] = this.lineRate;
    return data;
  }
}

/** Client Parameters as per Market */
export interface IClientParameters {
  /** Currency But Rate */
  cBuyRate: number;
  /** Currency Sell Rate */
  cSellRate: number;
  /** P Share decimal or Zero */
  pShare: number;
  /** C Share decimal or Zero */
  cShare: number;
  /** ISO Currency Code */
  currencyCode: string;
  /** Stake Value 1 */
  stakeVal1: number;
  /** Stake Value 2 */
  stakeVal2: number;
  /** Stake Value 3 */
  stakeVal3: number;
  /** Stake Value 4 */
  stakeVal4: number;
  /** Stake Value 5 */
  stakeVal5: number;
  /** Stake Value 6 */
  stakeVal6: number;
  /** Stake Value 7 */
  stakeVal7: number;
  /** Stake Value 8 */
  stakeVal8: number;
  /** Fancy Rate */
  fancyRate: number;
  /** Book maker Rate */
  bookMakerRate: number;
  /** Local Market Rate */
  localMarketRate: number;
  /** Line Market Rate */
  lineRate: number;
}


/** Exchange Betting Model */
export class SportsBettingModel implements ISportsBettingModel {
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
  /** Size */
  side!: string;
  /** keep alive */
  keepAlive!: boolean;
  /** Version */
  version!: number;

  constructor(eventid: number, m: string, s: number, h: number, btype: string, p: number, siz: number, ka: boolean, v: number) {
    this.eventid = eventid;
    this.marketId = m;
    this.selectionId = s;
    this.handicap = h;
    this.betType = btype;
    this.price = p;
    this.size = siz;
    this.keepAliveOn = ka;
    this.version = v;
  }


}

/** Exchange Betting Model */
export interface ISportsBettingModel {
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
  /** Size */
  side: string;
  /** keep alive */
  keepAlive: boolean;
  /** Version */
  version: number;
}
export class EventTypeRaces implements IEventTypeRaces {
  /** Events or Matches */
  event?: EventSS | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;

  constructor(data?: IEventTypeRaces) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.event = _data["event"] ? EventSS.fromJS(_data["event"]) : <any>undefined;
      this.id = _data["id"];
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): EventTypeRaces {
    data = typeof data === 'object' ? data : {};
    let result = new EventTypeRaces();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["event"] = this.event ? this.event.toJSON() : <any>undefined;
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }
}

export interface IEventTypeRaces {
  /** Events or Matches */
  event?: EventSS | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;
}


export class DirectEvents implements IDirectEvents {
  competitions?: DirectCopetitionMarket[] | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;

  constructor(data?: IDirectEvents) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["competitions"])) {
        this.competitions = [] as any;
        for (let item of _data["competitions"])
          this.competitions!.push(DirectCopetitionMarket.fromJS(item));
      }
      this.id = _data["id"];
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): DirectEvents {
    data = typeof data === 'object' ? data : {};
    let result = new DirectEvents();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.competitions)) {
      data["competitions"] = [];
      for (let item of this.competitions)
        data["competitions"].push(item.toJSON());
    }
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }
}

export class DirectCopetitionMarket implements IDirectCopetitionMarket {
  markets?: MarketCatalogueSS[] | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;

  constructor(data?: IDirectCopetitionMarket) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["markets"])) {
        this.markets = [] as any;
        for (let item of _data["markets"])
          this.markets!.push(MarketCatalogueSS.fromJS(item));
      }
      this.id = _data["id"];
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): DirectCopetitionMarket {
    data = typeof data === 'object' ? data : {};
    let result = new DirectCopetitionMarket();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.markets)) {
      data["markets"] = [];
      for (let item of this.markets)
        data["markets"].push(item.toJSON());
    }
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }
}

export interface IDirectCopetitionMarket {
  markets?: MarketCatalogueSS[] | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;
}
export interface IDirectEvents {
  competitions?: DirectCopetitionMarket[] | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;
}


export class EventMarkets implements IEventMarkets {
  competition?: EventCompetition | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;

  constructor(data?: IEventMarkets) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.competition = _data["competition"] ? EventCompetition.fromJS(_data["competition"]) : <any>undefined;
      this.id = _data["id"];
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): EventMarkets {
    data = typeof data === 'object' ? data : {};
    let result = new EventMarkets();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["competition"] = this.competition ? this.competition.toJSON() : <any>undefined;
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }
}

export interface IEventMarkets {
  competition?: EventCompetition | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;
}


export class EventCompetition implements IEventCompetition {
  /** Events or Matches */
  event?: EventSS | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;

  constructor(data?: IEventCompetition) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.event = _data["event"] ? EventSS.fromJS(_data["event"]) : <any>undefined;
      this.id = _data["id"];
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): EventCompetition {
    data = typeof data === 'object' ? data : {};
    let result = new EventCompetition();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["event"] = this.event ? this.event.toJSON() : <any>undefined;
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }
}

export interface IEventCompetition {
  /** Events or Matches */
  event?: EventSS | undefined;
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;
}

/** only for custom tree */
export class CustomMenu implements ICustomMenu {
  /** child nodes */
  childs?: Menu[] | null;
  /** Unique Id of each item */
  id!: string;
  /** Name of the item e.g sports, competitions, events, markets */
  name!: string;
  /** uri of the tree child node */
  childNode?: string | null;
  /** specific Markets detail of each level (Page Content Area) */
  detail?: string | null;
  /** if it's market level then it will show isinplay */
  inPlay?: boolean | null;
  /** indicate about node item in navigation is Market or not */
  isMarket?: boolean | null;
  startTime?: string | null;
  url?: string | null
  constructor(data?: ICustomMenu) {
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
          this.childs!.push(Menu.fromJS(item));
      }
      this.id = _data["id"];
      this.name = _data["name"];
      this.childNode = _data["childNode"];
      this.detail = _data["detail"];
      this.inPlay = _data["inPlay"];
      this.isMarket = _data["isMarket"];
      this.url = _data['url'];
    }
  }

  static fromJS(data: any): CustomMenu {
    data = typeof data === 'object' ? data : {};
    let result = new CustomMenu();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.childs)) {
      data["childs"] = [];
      for (let item of this.childs)
        data["childs"].push(item.toJSON());
    }
    data["id"] = this.id;
    data["name"] = this.name;
    data["childNode"] = this.childNode;
    data["detail"] = this.detail;
    data["inPlay"] = this.inPlay;
    data["isMarket"] = this.isMarket;
    return data;
  }
}

/** only for custom tree */
export interface ICustomMenu {
  /** child nodes */
  childs?: Menu[] | null;
  /** Unique Id of each item */
  id: string;
  /** Name of the item e.g sports, competitions, events, markets */
  name: string;
  /** uri of the tree child node */
  childNode?: string | null;
  /** specific Markets detail of each level (Page Content Area) */
  detail?: string | null;
  /** if it's market level then it will show isinplay */
  inPlay?: boolean | null;
  /** indicate about node item in navigation is Market or not */
  isMarket?: boolean | null;
}

export class CustomTreeModel implements ICustomTreeModel {
  filter?: string | undefined;
  id?: string | undefined;

  constructor(url: string) {
    // console.log(url, ' <<<<<<<<<<<<<<< in custom tree modal constructor')
    // console.log(url.split('/'), ' <<<<<<<<<<<<<<< in custom tree modal constructor')
    let urlSplit = url.split('/')
    if (urlSplit[1] == 'sports' && urlSplit.length == 3) {
      if (urlSplit[2] == 'inplay') {
        // console.log(' +++++++++++++++++++++++++++++++ in play condition +++++++++++++++++++++++++++++++++++')
      }
      this.filter = 'sportsbyid'
      sportsIdMap.forEach((item: any) => {
        if (urlSplit[2] == item.name) {
          this.id = item.id
        }
      })
    } else if (urlSplit[2] == 'horse-racing' || urlSplit[2] == 'grey-hound-racing') {
      this.filter = 'raceschedule'
      sportsIdMap.forEach((item: any) => {
        if (urlSplit[2] == item.name) {
          this.id = item.id
        }
      })
    } else if (urlSplit.length == 4) {
      if (urlSplit[2] == 'tournament') {
        this.filter = 'competitionsmarkets'
      } else if (urlSplit[2] == 'cricket') {
        // console.log(urlSplit[urlSplit.length - 1].split('-')[urlSplit[urlSplit.length - 1].split('-').length - 1], ' <<<<<<<<<<<<<<<<< market or event id')
        if (urlSplit[urlSplit.length - 1].split('-')[urlSplit[urlSplit.length - 1].split('-').length - 1].includes('.')) {
          this.filter = 'marketdetail'
        } else {
          this.filter = 'eventmarkets'
        }
      } else {
        this.filter = 'eventmarkets'
      }
      this.id = urlSplit[urlSplit.length - 1].split('-')[urlSplit[urlSplit.length - 1].split('-').length - 1]
    } else if (urlSplit.length == 5) {
      this.filter = 'marketdetail'
      this.id = urlSplit[urlSplit.length - 1].split('-')[urlSplit[urlSplit.length - 1].split('-').length - 1]
    } else {
      // console.log(url.split('/'), ' <<<<<<<<<<<<<<< in custom tree modal constructor')
      throw Error('Custom Tree mapping not done in CustomTreeModel constructor')
    }

  }


}

export interface ICustomTreeModel {
  filter?: string | undefined;
  id?: string | undefined;
}


/** Current Bets Input */
export class CurrentBetsInput implements ICurrentBetsInput {
  /** Market id */
  marketId!: string;
  /** Event Id */
  eventId?: string | undefined;
  /** AVG Bets */
  avgBets!: boolean;

  constructor(marketid: string, eventid: string = "0", averagebets: boolean = false) {
    this.marketId = marketid;
    this.eventId = eventid;
    this.avgBets = averagebets;
  }
}

/** Current Bets Input */
export interface ICurrentBetsInput {
  /** Market id */
  marketId: string;
  /** Event Id */
  eventId?: string | undefined;
  /** AVG Bets */
  avgBets: boolean;
}

/** Current Bets */
export class CurrentBets implements ICurrentBets {
  /** Bet status */
  betStatus!: string;
  /** Market id */
  marketId!: string;
  /** bet id */
  betId!: string;
  /** selection id */
  selectionId!: number;
  /** runner name */
  runnerName!: string;
  /** side */
  side!: string;
  /** bet price */
  betPrice!: number;
  /** bet size */
  betSize!: number;
  /** Full Market Name */
  fullMarketName!: string;

  constructor(data?: ICurrentBets) {
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
      this.runnerName = _data["runnerName"];
      this.side = _data["side"];
      this.betPrice = _data["betPrice"];
      this.betSize = _data["betSize"];
      this.fullMarketName = _data["fullMarketName"];
    }
  }

  static fromJS(data: any): CurrentBets {
    data = typeof data === 'object' ? data : {};
    let result = new CurrentBets();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["betStatus"] = this.betStatus;
    data["marketId"] = this.marketId;
    data["betId"] = this.betId;
    data["selectionId"] = this.selectionId;
    data["runnerName"] = this.runnerName;
    data["side"] = this.side;
    data["betPrice"] = this.betPrice;
    data["betSize"] = this.betSize;
    data["fullMarketName"] = this.fullMarketName;
    return data;
  }
}

/** Current Bets */
export interface ICurrentBets {
  /** Bet status */
  betStatus: string;
  /** Market id */
  marketId: string;
  /** bet id */
  betId: string;
  /** selection id */
  selectionId: number;
  /** runner name */
  runnerName: string;
  /** side */
  side: string;
  /** bet price */
  betPrice: number;
  /** bet size */
  betSize: number;
  /** Full Market Name */
  fullMarketName: string;
}
export class MarketDetail implements IMarketDetail {
  status?: string | undefined;
  channelId?: string | undefined;
  minSettings?: number | undefined;
  maxSettings?: number | undefined;
  maxMarketSettings?: number | undefined;
  inplay?: boolean | undefined;
  isLocalMarket?: boolean | undefined;
  stopBet?: boolean | undefined;
  runners?: MarketRunnersSS[] | undefined;
  /** The unique identifier for the market. MarketId's are prefixed with '1.' or '2.' 1. = UK Exchange 2. = AUS Exchange. */
  marketId?: string | undefined;
  /** The name of the market */
  marketName?: string | undefined;
  /** The time this market starts at, only returned when the MARKET_START_TIME enum is passed in the marketProjections */
  marketStartTime?: Date;
  /** Details about the market */
  description?: MarketDescription | undefined;
  /** The total amount of money matched on the market */
  totalMatched?: number;
  /** The Event Type the market is contained within */
  eventType?: EventType | undefined;
  /** The event the market is contained within */
  event?: Event | undefined;
  /** The competition the market is contained within. Usually only applies to Football competitions */
  competition?: Competition | undefined;

  constructor(data?: IMarketDetail) {
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
      this.channelId = _data["channelId"];
      this.minSettings = _data["minSettings"];
      this.maxSettings = _data["maxSettings"];
      this.maxMarketSettings = _data["maxMarketSettings"];
      this.inplay = _data["inplay"];
      this.isLocalMarket = _data["isLocalMarket"];
      this.stopBet = _data["stopBet"];
      if (Array.isArray(_data["runners"])) {
        this.runners = [] as any;
        for (let item of _data["runners"])
          this.runners!.push(MarketRunnersSS.fromJS(item));
      }
      this.marketId = _data["marketId"];
      this.marketName = _data["marketName"];
      this.marketStartTime = _data["marketStartTime"] ? new Date(_data["marketStartTime"].toString()) : <any>undefined;

      this.description = _data["description"] ? MarketDescription.fromJS(_data["description"]) : <any>undefined;
      this.totalMatched = _data["totalMatched"];
      this.eventType = _data["eventType"] ? EventType.fromJS(_data["eventType"]) : <any>undefined;
      this.event = _data["event"] ? Event.fromJS(_data["event"]) : <any>undefined;
      this.competition = _data["competition"] ? Competition.fromJS(_data["competition"]) : <any>undefined;
    }
  }

  static fromJS(data: any): MarketDetail {
    data = typeof data === 'object' ? data : {};
    let result = new MarketDetail();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["status"] = this.status;
    data["channelId"] = this.channelId;
    data["minSettings"] = this.minSettings;
    data["maxSettings"] = this.maxSettings;
    data["maxMarketSettings"] = this.maxMarketSettings;
    data["inplay"] = this.inplay;
    data["isLocalMarket"] = this.isLocalMarket;
    data["stopBet"] = this.stopBet;
    if (Array.isArray(this.runners)) {
      data["runners"] = [];
      for (let item of this.runners)
        data["runners"].push(item.toJSON());
    }
    data["marketId"] = this.marketId;
    data["marketName"] = this.marketName;
    data["marketStartTime"] = this.marketStartTime ? this.marketStartTime.toISOString() : <any>undefined;
    data["description"] = this.description ? this.description.toJSON() : <any>undefined;
    data["totalMatched"] = this.totalMatched;
    data["eventType"] = this.eventType ? this.eventType.toJSON() : <any>undefined;
    data["event"] = this.event ? this.event.toJSON() : <any>undefined;
    data["competition"] = this.competition ? this.competition.toJSON() : <any>undefined;
    return data;
  }
}

export class LineMarket implements ILineMarket {
  marketId?: string | undefined;
  marketName?: string | undefined;
  stopBet?: boolean | undefined;
  /** Market Line Range Info */
  lineRangeInfo?: MarketLineRangeInfo | undefined;
  minSettings?: number;
  maxSettings?: number;
  maxMarketSettings?: number;
  sortingOrder?: number;
  /** Toal Matched On this Runners */
  totalMatched!: number;
  /** Last Price Traded */
  lastPriceTraded!: number;
  /** Runner Status */
  status?: string | undefined;
  /** Back Prices */
  back!: PriceSizeNew[];
  /** Lay Prices */
  lay!: PriceSizeNew[];
  /** The unique id for the selection. */
  selectionId?: number;
  /** The name of the runner */
  runnerName?: string | undefined;
  /** Handicap */
  handicap?: number;
  /** The sort priority of this runner */
  sortPriority?: number;
  /** Metadata associated with the runner.  For a description of this data for Horse Racing, please see Runner Metadata Description */
  metadata?: string | undefined;

  constructor(data?: ILineMarket) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.back = [];
      this.lay = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.marketId = _data["marketId"];
      this.marketName = _data["marketName"];
      this.stopBet = _data["stopBet"];
      this.lineRangeInfo = _data["lineRangeInfo"] ? MarketLineRangeInfo.fromJS(_data["lineRangeInfo"]) : <any>undefined;
      this.minSettings = _data["minSettings"];
      this.maxSettings = _data["maxSettings"];
      this.maxMarketSettings = _data["maxMarketSettings"];
      this.sortingOrder = _data["sortingOrder"];
      this.totalMatched = _data["totalMatched"];
      this.lastPriceTraded = _data["lastPriceTraded"];
      this.status = _data["status"];
      if (Array.isArray(_data["back"])) {
        this.back = [] as any;
        for (let item of _data["back"])
          this.back!.push(PriceSizeNew.fromJS(item));
      }
      if (Array.isArray(_data["lay"])) {
        this.lay = [] as any;
        for (let item of _data["lay"])
          this.lay!.push(PriceSizeNew.fromJS(item));
      }
      this.selectionId = _data["selectionId"];
      this.runnerName = _data["runnerName"];
      this.handicap = _data["handicap"];
      this.sortPriority = _data["sortPriority"];
      this.metadata = _data["metadata"];
    }
  }

  static fromJS(data: any): LineMarket {
    data = typeof data === 'object' ? data : {};
    let result = new LineMarket();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketId"] = this.marketId;
    data["marketName"] = this.marketName;
    data["stopBet"] = this.stopBet;
    data["lineRangeInfo"] = this.lineRangeInfo ? this.lineRangeInfo.toJSON() : <any>undefined;
    data["minSettings"] = this.minSettings;
    data["maxSettings"] = this.maxSettings;
    data["maxMarketSettings"] = this.maxMarketSettings;
    data["sortingOrder"] = this.sortingOrder;
    data["totalMatched"] = this.totalMatched;
    data["lastPriceTraded"] = this.lastPriceTraded;
    data["status"] = this.status;
    if (Array.isArray(this.back)) {
      data["back"] = [];
      for (let item of this.back)
        data["back"].push(item.toJSON());
    }
    if (Array.isArray(this.lay)) {
      data["lay"] = [];
      for (let item of this.lay)
        data["lay"].push(item.toJSON());
    }
    data["selectionId"] = this.selectionId;
    data["runnerName"] = this.runnerName;
    data["handicap"] = this.handicap;
    data["sortPriority"] = this.sortPriority;
    data["metadata"] = this.metadata;
    return data;
  }
}

export interface ILineMarket {
  marketId?: string | undefined;
  marketName?: string | undefined;
  stopBet?: boolean | undefined;
  /** Market Line Range Info */
  lineRangeInfo?: MarketLineRangeInfo | undefined;
  minSettings?: number;
  maxSettings?: number;
  maxMarketSettings?: number;
  sortingOrder?: number;
  /** Toal Matched On this Runners */
  totalMatched: number;
  /** Last Price Traded */
  lastPriceTraded: number;
  /** Runner Status */
  status?: string | undefined;
  /** Back Prices */
  back: PriceSizeNew[];
  /** Lay Prices */
  lay: PriceSizeNew[];
  /** The unique id for the selection. */
  selectionId?: number;
  /** The name of the runner */
  runnerName?: string | undefined;
  /** Handicap */
  handicap?: number;
  /** The sort priority of this runner */
  sortPriority?: number;
  /** Metadata associated with the runner.  For a description of this data for Horse Racing, please see Runner Metadata Description */
  metadata?: string | undefined;
}
export interface IMarketDetail {
  status?: string | undefined;
  minSettings?: number | undefined;
  maxSettings?: number | undefined;
  maxMarketSettings?: number | undefined;
  inplay?: boolean | undefined;
  isLocalMarket?: boolean | undefined;
  stopBet?: boolean | undefined;
  runners?: MarketRunnersSS[] | undefined;
  /** The unique identifier for the market. MarketId's are prefixed with '1.' or '2.' 1. = UK Exchange 2. = AUS Exchange. */
  marketId?: string | undefined;
  /** The name of the market */
  marketName?: string | undefined;
  /** The time this market starts at, only returned when the MARKET_START_TIME enum is passed in the marketProjections */
  marketStartTime?: Date;
  /** Details about the market */
  description?: MarketDescription | undefined;
  /** The total amount of money matched on the market */
  totalMatched?: number;
  /** The Event Type the market is contained within */
  eventType?: EventType | undefined;
  /** The event the market is contained within */
  event?: Event | undefined;
  /** The competition the market is contained within. Usually only applies to Football competitions */
  competition?: Competition | undefined;
}

/** Competition */
export class Competition implements ICompetition {
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;

  constructor(data?: ICompetition) {
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
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): Competition {
    data = typeof data === 'object' ? data : {};
    let result = new Competition();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }
}

/** Competition */
export interface ICompetition {
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;
}
/** Event Type */
export class EventType implements IEventType {
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;

  constructor(data?: IEventType) {
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
      this.name = _data["name"];
    }
  }

  static fromJS(data: any): EventType {
    data = typeof data === 'object' ? data : {};
    let result = new EventType();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    return data;
  }
}

/** Event Type */
export interface IEventType {
  /** Id */
  id?: string | undefined;
  /** Name */
  name?: string | undefined;
}

/** Cancel Orders input Model */
export class CancelOrders implements ICancelOrders {
  /** Market Id */
  marketId!: string;
  eventId?: string;

  /** List of Bet id's */
  betIds!: string[];

  constructor(marketid: string, betids: any[], eventId?: string) {
    this.marketId = marketid;
    this.betIds = betids;
    this.eventId = eventId;
  }

}

export class IPAddressForBetIds implements IIPAddressForBetIds {
  marketId!: string;
  betId!: string;
  type!: string;

  constructor(m: string, b: string, t: string) {
    this.marketId = m;
    this.betId = b;
    this.type = t;
  }


}

export interface IIPAddressForBetIds {
  marketId: string;
  betId: string;
  type: string;
}

/** Cancel Orders input Model */
export interface ICancelOrders {
  /** Market Id */
  marketId: string;
  /** List of Bet id's */
  betIds: string[];
  eventId?: string;
}
export class MarketRunnersSS implements IMarketRunnersSS {
  /** Toal Matched On this Runners */
  totalMatched!: number;
  /** Last Price Traded */
  lastPriceTraded!: number;
  /** Runner Status */
  status?: string | undefined;
  /** Back Prices */
  back!: PriceSizeNew[];
  /** Lay Prices */
  lay!: PriceSizeNew[];
  /** The unique id for the selection. */
  selectionId?: number;
  /** The name of the runner */
  runnerName?: string | undefined;
  /** Handicap */
  handicap?: number;
  /** The sort priority of this runner */
  sortPriority?: number;
  /** Metadata associated with the runner.  For a description of this data for Horse Racing, please see Runner Metadata Description */
  metadata?: any;

  constructor(data?: IMarketRunnersSS) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.back = [];
      this.lay = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.totalMatched = _data["totalMatched"];
      this.lastPriceTraded = _data["lastPriceTraded"];
      this.status = _data["status"];
      if (Array.isArray(_data["back"])) {
        this.back = [] as any;
        for (let item of _data["back"])
          this.back!.push(PriceSizeNew.fromJS(item));
      }
      if (Array.isArray(_data["lay"])) {
        this.lay = [] as any;
        for (let item of _data["lay"])
          this.lay!.push(PriceSizeNew.fromJS(item));
      }
      this.selectionId = _data["selectionId"];
      this.runnerName = _data["runnerName"];
      this.handicap = _data["handicap"];
      this.sortPriority = _data["sortPriority"];
      if (_data["metadata"]) {
        this.metadata = JSON.parse(_data["metadata"]);
        if (this.metadata?.COLOURS_FILENAME.endsWith('.gif')) {
          this.metadata.COLOURS_FILENAME = undefined;
        }

      }
    }
  }

  static fromJS(data: any): MarketRunnersSS {
    data = typeof data === 'object' ? data : {};
    let result = new MarketRunnersSS();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["totalMatched"] = this.totalMatched;
    data["lastPriceTraded"] = this.lastPriceTraded;
    data["status"] = this.status;
    if (Array.isArray(this.back)) {
      data["back"] = [];
      for (let item of this.back)
        data["back"].push(item.toJSON());
    }
    if (Array.isArray(this.lay)) {
      data["lay"] = [];
      for (let item of this.lay)
        data["lay"].push(item.toJSON());
    }
    data["selectionId"] = this.selectionId;
    data["runnerName"] = this.runnerName;
    data["handicap"] = this.handicap;
    data["sortPriority"] = this.sortPriority;
    data["metadata"] = this.metadata;
    return data;
  }
}

export interface IMarketRunnersSS {
  /** Toal Matched On this Runners */
  totalMatched: number;
  /** Last Price Traded */
  lastPriceTraded: number;
  /** Runner Status */
  status?: string | undefined;
  /** Back Prices */
  back: PriceSizeNew[];
  /** Lay Prices */
  lay: PriceSizeNew[];
  /** The unique id for the selection. */
  selectionId?: number;
  /** The name of the runner */
  runnerName?: string | undefined;
  /** Handicap */
  handicap?: number;
  /** The sort priority of this runner */
  sortPriority?: number;
  /** Metadata associated with the runner.  For a description of this data for Horse Racing, please see Runner Metadata Description */
  metadata?: string | undefined;
}
/** Event */
export class Event implements IEvent {
  /** The unique id for the event */
  id?: string | undefined;
  /** The name of the event */
  name?: string | undefined;
  /** The ISO-2 code for the event.  A list of ISO-2 codes is available via h ttp://en.wikipedia.org/wi ki/ISO_3166-1_alpha-2 */
  countryCode?: string | undefined;
  /** This is timezone in which the event is taking place */
  timezone?: string | undefined;
  /** Venue */
  venue?: string | undefined;
  /** The scheduled start date and time of the event. This is Europe/L ondon (GMT) by default */
  openDate?: string | undefined;
  /** Match ID */
  matchId?: string | undefined;
  constructor(data?: IEvent) {
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
      this.name = _data["name"];
      this.countryCode = _data["countryCode"];
      this.timezone = _data["timezone"];
      this.venue = _data["venue"];
      this.openDate = _data["openDate"];
      this.matchId = _data["matchId"];
    }
  }

  static fromJS(data: any): Event {
    data = typeof data === 'object' ? data : {};
    let result = new Event();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["countryCode"] = this.countryCode;
    data["timezone"] = this.timezone;
    data["venue"] = this.venue;
    data["openDate"] = this.openDate;
    data["matchId"] = this.matchId;
    return data;
  }
}

/** Event */
export interface IEvent {
  /** The unique id for the event */
  id?: string | undefined;
  /** The name of the event */
  name?: string | undefined;
  /** The ISO-2 code for the event.  A list of ISO-2 codes is available via h ttp://en.wikipedia.org/wi ki/ISO_3166-1_alpha-2 */
  countryCode?: string | undefined;
  /** This is timezone in which the event is taking place */
  timezone?: string | undefined;
  /** Venue */
  venue?: string | undefined;
  /** The scheduled start date and time of the event. This is Europe/L ondon (GMT) by default */
  openDate?: string | undefined;
}


/** Only used for my markets popup */
export class MyMarket implements IMyMarket {
  /** sports or casino */
  exchangeID?: number;
  /** market id of sports */
  marketID?: string | undefined;
  /** sports type if exists */
  eventTypeID?: number;
  /** competition id if exists */
  competitionID?: string | undefined;
  /** event id if exits */
  eventID?: string | undefined;
  /** Path as a string to the market page */
  menuPath?: string | undefined;
  /** liability */
  liability?: string | undefined;

  constructor(data?: IMyMarket) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.exchangeID = _data["exchangeID"];
      this.marketID = _data["marketID"];
      this.eventTypeID = _data["eventTypeID"];
      this.competitionID = _data["competitionID"];
      this.eventID = _data["eventID"];
      this.menuPath = _data["menuPath"];
      this.liability = _data["liability"];
    }
  }

  static fromJS(data: any): MyMarket {
    data = typeof data === 'object' ? data : {};
    let result = new MyMarket();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["exchangeID"] = this.exchangeID;
    data["marketID"] = this.marketID;
    data["eventTypeID"] = this.eventTypeID;
    data["competitionID"] = this.competitionID;
    data["eventID"] = this.eventID;
    data["menuPath"] = this.menuPath;
    data["liability"] = this.liability;
    return data;
  }
}

/** Only used for my markets popup */
export interface IMyMarket {
  /** sports or casino */
  exchangeID?: number;
  /** market id of sports */
  marketID?: string | undefined;
  /** sports type if exists */
  eventTypeID?: number;
  /** competition id if exists */
  competitionID?: string | undefined;
  /** event id if exits */
  eventID?: string | undefined;
  /** Path as a string to the market page */
  menuPath?: string | undefined;
  /** liability */
  liability?: string | undefined;
}


export class LineLiablityMulti implements ILineLiablityMulti {
  marketId?: string | undefined;
  libility?: number;

  constructor(data?: ILineLiablityMulti) {
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
      this.libility = _data["libility"];
    }
  }

  static fromJS(data: any): LineLiablityMulti {
    data = typeof data === 'object' ? data : {};
    let result = new LineLiablityMulti();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketId"] = this.marketId;
    data["libility"] = this.libility;
    return data;
  }
}

export interface ILineLiablityMulti {
  marketId?: string | undefined;
  libility?: number;
}
export class ClientWallet implements IClientWallet {
  balance?: number;
  liability?: number;
  marketLiability?: number;
  xGLiability?: number;

  constructor(data?: IClientWallet) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.balance = _data["balance"];
      this.liability = _data["liability"];
      this.marketLiability = _data["marketLiability"];
      this.xGLiability = _data["xGLiability"];
    }
  }

  static fromJS(data: any): ClientWallet {
    data = typeof data === 'object' ? data : {};
    let result = new ClientWallet();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["balance"] = this.balance;
    data["liability"] = this.liability;
    data["marketLiability"] = this.marketLiability;
    data["xGLiability"] = this.xGLiability;
    return data;
  }
}

export interface IClientWallet {
  balance?: number;
  liability?: number;
  marketLiability?: number;
  xGLiability?: number;
}
/** Bet in Local Market */
export class LocalMarketBet implements ILocalMarketBet {
  eventId!: number
  /** Market Id */
  marketId!: string;
  /** Selection Id or Runner id */
  selectionId!: string;
  /** Handicap */
  handicap!: string;
  /** Bet type LAY or BACK */
  side!: string;
  /** Price */
  price!: string;
  /** Size */
  size!: string;
  /** Keep Alive */
  keepAlive!: string;

  constructor(eventId: number, marketid: string, selectionid: number, handicap: number, bettype: string, price: number, size: number, keepalive: boolean) {
    this.eventId = eventId;
    this.marketId = marketid;
    this.selectionId = selectionid.toString(),
      this.handicap = handicap.toString(),
      this.side = bettype.toUpperCase();
    this.price = price.toString();
    this.size = size.toString();
    this.keepAlive = keepalive.toString();

  }


}

/** Bet in Local Market */
export interface ILocalMarketBet {
  eventId: number;
  /** Market Id */
  marketId: string;
  /** Selection Id or Runner id */
  selectionId: string;
  /** Handicap */
  handicap: string;
  /** Bet type LAY or BACK */
  side: string;
  /** Price */
  price: string;
  /** Size */
  size: string;
  /** Keep Alive */
  keepAlive: string;
}

export class MultilevelMenu implements IMultilevelMenu {
  childs?: MultilevelMenu[] | undefined;
  /** Unique Id of each item */
  id!: string;
  /** Name of the item e.g sports, competitions, events, markets */
  name!: string;
  /** uri of the tree child node */
  childNode?: string | undefined;
  /** specific Markets detail of each level (Page Content Area) */
  detail?: string | undefined;
  /** if it's market level then it will show isinplay */
  inPlay?: boolean | undefined;
  /** indicate about node item in navigation is Market or not */
  isMarket?: boolean | undefined;

  url? = '';

  constructor(data?: IMultilevelMenu) {
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
          this.childs!.push(MultilevelMenu.fromJS(item));
      }
      this.id = _data["id"];
      this.name = _data["name"];
      this.childNode = _data["childNode"];
      this.detail = _data["detail"];
      this.inPlay = _data["inPlay"];
      this.isMarket = _data["isMarket"];
    }
  }

  static fromJS(data: any): MultilevelMenu {
    data = typeof data === 'object' ? data : {};
    let result = new MultilevelMenu();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.childs)) {
      data["childs"] = [];
      for (let item of this.childs)
        data["childs"].push(item.toJSON());
    }
    data["id"] = this.id;
    data["name"] = this.name;
    data["childNode"] = this.childNode;
    data["detail"] = this.detail;
    data["inPlay"] = this.inPlay;
    data["isMarket"] = this.isMarket;
    return data;
  }
}

export interface IMultilevelMenu {
  childs?: MultilevelMenu[] | undefined;
  /** Unique Id of each item */
  id: string;
  /** Name of the item e.g sports, competitions, events, markets */
  name: string;
  /** uri of the tree child node */
  childNode?: string | undefined;
  /** specific Markets detail of each level (Page Content Area) */
  detail?: string | undefined;
  /** if it's market level then it will show isinplay */
  inPlay?: boolean | undefined;
  /** indicate about node item in navigation is Market or not */
  isMarket?: boolean | undefined;
}

/** Market Liability for fancy */
export class FancyMarketLiabilty implements IFancyMarketLiabilty {
  /** Market id */
  marketId!: string;
  /** position */
  position!: string;
  /** Position 2 decimal */
  position2!: string;

  constructor(data?: IFancyMarketLiabilty) {
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
      this.position = _data["position"];
      this.position2 = _data["position2"];
    }
  }

  static fromJS(data: any): FancyMarketLiabilty {
    data = typeof data === 'object' ? data : {};
    let result = new FancyMarketLiabilty();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketId"] = this.marketId;
    data["position"] = this.position;
    data["position2"] = this.position2;
    return data;
  }
}

/** Market Liability for fancy */
export interface IFancyMarketLiabilty {
  /** Market id */
  marketId: string;
  /** position */
  position: string;
  /** Position 2 decimal */
  position2: string;
}
export function getIncremantal(val: number): number {
  let step: number = 0;
  if (val < 2) {
    step = 0.01;
  } else if (val >= 2 && val < 3) {
    step = 0.02;
  } else if (val >= 3 && val < 4) {
    step = 0.05;
  } else if (val >= 4 && val < 6) {
    step = 0.1;
  } else if (val >= 6 && val < 10) {
    step = 0.2;
  } else if (val >= 10 && val < 20) {
    step = 0.5;
  } else if (val >= 20 && val < 30) {
    step = 1;
  } else if (val >= 30 && val < 50) {
    step = 2;
  } else if (val >= 50 && val < 100) {
    step = 5;
  } else if (val >= 100 && val < 1000) {
    step = 10;
  } else if (val > 1000) {
    step = 0;
  }
  return step;
}

export function getDecremantal(val: number): number {
  let step: number = 0;
  if (val <= 2) {
    step = 0.01;
  } else if (val > 2 && val <= 3) {
    step = 0.02;
  } else if (val > 3 && val <= 4) {
    step = 0.05;
  } else if (val > 4 && val <= 6) {
    step = 0.1;
  } else if (val > 6 && val <= 10) {
    step = 0.2;
  } else if (val > 10 && val <= 20) {
    step = 0.5;
  } else if (val > 20 && val <= 30) {
    step = 1;
  } else if (val > 30 && val <= 50) {
    step = 2;
  } else if (val > 50 && val <= 100) {
    step = 5;
  } else if (val > 100 && val <= 1000) {
    step = 10;
  } else if (val > 1000) {
    step = 0;
  }
  return step;
}


/** Login Request Model */
export class AuthenticateRequest implements IAuthenticateRequest {
  /** User Name */
  username!: string;
  /** Password */
  password!: string;
  timezone!: string;
  recaptcha?: string;
  fbtoken?: any;
  constructor(username: string, pass: string, recap?: string, fbtoken?: any) {
    this.username = username;
    this.password = pass;
    if (Intl && Intl.DateTimeFormat()) {
      this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } else {
      this.timezone = 'NOT_FOUND'
    }
    this.recaptcha = recap;
    this.fbtoken = fbtoken;
  }


}

/** Login Request Model */
export interface IAuthenticateRequest {
  /** User Name */
  username: string;
  /** Password */
  password: string;
}




export function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
  // if (result !== null && result !== undefined)
  //   throw result;
  // else
  throw new ApiException(message, status, response, headers, null);
}

// export function isAxiosError(obj: any | undefined): obj is AxiosError {
//   return obj && obj.isAxiosError === true;
// }

export class ProblemDetails implements IProblemDetails {
  type!: string | null;
  title!: string | null;
  status!: number | null;
  detail!: string | null;
  instance!: string | null;

  constructor(data?: IProblemDetails) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.type = _data["Type"] !== undefined ? _data["Type"] : <any>null;
      this.title = _data["Title"] !== undefined ? _data["Title"] : <any>null;
      this.status = _data["Status"] !== undefined ? _data["Status"] : <any>null;
      this.detail = _data["Detail"] !== undefined ? _data["Detail"] : <any>null;
      this.instance = _data["Instance"] !== undefined ? _data["Instance"] : <any>null;
    }
  }

  static fromJS(data: any): ProblemDetails {
    data = typeof data === 'object' ? data : {};
    let result = new ProblemDetails();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["Type"] = this.type !== undefined ? this.type : <any>null;
    data["Title"] = this.title !== undefined ? this.title : <any>null;
    data["Status"] = this.status !== undefined ? this.status : <any>null;
    data["Detail"] = this.detail !== undefined ? this.detail : <any>null;
    data["Instance"] = this.instance !== undefined ? this.instance : <any>null;
    return data;
  }
}

export interface IProblemDetails {
  type: string | null;
  title: string | null;
  status: number | null;
  detail: string | null;
  instance: string | null;
}

export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}


/** As it as used in input of pl */
export class AccountstmtInputModel {
  /** From Date */
  startDate: any;
  /** To Date */
  endDate: any;

  constructor(startDate: Date, endDate: Date) {

    this.startDate = startDate.toUTCString();
    this.endDate = endDate.toUTCString();
  }


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
/** Account statement Response */
export class AccountstmtModel implements IAccountstmtModel {
  /** Voucher id */
  voucherID!: number;
  /** Market id can be null on issurance and withdraw */
  marketID!: string | null;
  /** Setteled Date */
  setteldDate!: string;
  /** Narration */
  narration!: string;
  /** Debit */
  debit!: number;
  /** Credit */
  credit!: number;
  /** Running Balance */
  runningBalance!: number;
  /** Link to next report */
  detailCall!: string | null;

  constructor(data?: IAccountstmtModel) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.voucherID = _data["voucherID"] !== undefined ? _data["voucherID"] : <any>null;
      this.marketID = _data["marketID"] !== undefined ? _data["marketID"] : <any>null;
      this.setteldDate = _data["setteldDate"] !== undefined ? _data["setteldDate"] : <any>null;
      this.narration = _data["narration"] !== undefined ? _data["narration"] : <any>null;
      this.debit = _data["debit"] !== undefined ? _data["debit"] : <any>null;
      this.credit = _data["credit"] !== undefined ? _data["credit"] : <any>null;
      this.runningBalance = _data["runningBalance"] !== undefined ? _data["runningBalance"] : <any>null;
      this.detailCall = _data["detailCall"] !== undefined ? _data["detailCall"] : <any>null;
    }
  }

  static fromJS(data: any): AccountstmtModel {
    data = typeof data === 'object' ? data : {};
    let result = new AccountstmtModel();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["voucherID"] = this.voucherID !== undefined ? this.voucherID : <any>null;
    data["marketID"] = this.marketID !== undefined ? this.marketID : <any>null;
    data["setteldDate"] = this.setteldDate !== undefined ? this.setteldDate : <any>null;
    data["narration"] = this.narration !== undefined ? this.narration : <any>null;
    data["debit"] = this.debit !== undefined ? this.debit : <any>null;
    data["credit"] = this.credit !== undefined ? this.credit : <any>null;
    data["runningBalance"] = this.runningBalance !== undefined ? this.runningBalance : <any>null;
    data["detailCall"] = this.detailCall !== undefined ? this.detailCall : <any>null;
    return data;
  }
}

/** Account statement Response */
export interface IAccountstmtModel {
  /** Voucher id */
  voucherID: number;
  /** Market id can be null on issurance and withdraw */
  marketID: string | null;
  /** Setteled Date */
  setteldDate: string;
  /** Narration */
  narration: string;
  /** Debit */
  debit: number;
  /** Credit */
  credit: number;
  /** Running Balance */
  runningBalance: number;
  /** Link to next report */
  detailCall: string | null;
}


/** Account statement Sub Report */
export class AccountStatementSubReport implements IAccountStatementSubReport {
  /** Unique Bet id */
  betId!: string;
  /** Runner Id */
  selectionId!: string;
  /** Runner Name */
  runnerName!: string;
  /** Back or Lay */
  side!: string;
  /** Price */
  orderPrice!: number;
  /** Stake Value */
  orderSize!: number;
  /** Placed Date */
  placedDate!: string;
  /** Profit or Loss */
  pL!: number;
  /** Win or Loss */
  orderStatus!: string;

  constructor(data?: IAccountStatementSubReport) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.betId = _data["betId"] !== undefined ? _data["betId"] : <any>null;
      this.selectionId = _data["selectionId"] !== undefined ? _data["selectionId"] : <any>null;
      this.runnerName = _data["runnerName"] !== undefined ? _data["runnerName"] : <any>null;
      this.side = _data["side"] !== undefined ? _data["side"] : <any>null;
      this.orderPrice = _data["orderPrice"] !== undefined ? _data["orderPrice"] : <any>null;
      this.orderSize = _data["orderSize"] !== undefined ? _data["orderSize"] : <any>null;
      this.placedDate = _data["placedDate"] !== undefined ? _data["placedDate"] : <any>null;
      this.pL = _data["pL"] !== undefined ? _data["pL"] : <any>null;
      this.orderStatus = _data["orderStatus"] !== undefined ? _data["orderStatus"] : <any>null;
    }
  }

  static fromJS(data: any): AccountStatementSubReport {
    data = typeof data === 'object' ? data : {};
    let result = new AccountStatementSubReport();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["betId"] = this.betId !== undefined ? this.betId : <any>null;
    data["selectionId"] = this.selectionId !== undefined ? this.selectionId : <any>null;
    data["runnerName"] = this.runnerName !== undefined ? this.runnerName : <any>null;
    data["side"] = this.side !== undefined ? this.side : <any>null;
    data["orderPrice"] = this.orderPrice !== undefined ? this.orderPrice : <any>null;
    data["orderSize"] = this.orderSize !== undefined ? this.orderSize : <any>null;
    data["placedDate"] = this.placedDate !== undefined ? this.placedDate : <any>null;
    data["pL"] = this.pL !== undefined ? this.pL : <any>null;
    data["orderStatus"] = this.orderStatus !== undefined ? this.orderStatus : <any>null;
    return data;
  }
}

/** Account statement Sub Report */
export interface IAccountStatementSubReport {
  /** Unique Bet id */
  betId: string;
  /** Runner Id */
  selectionId: string;
  /** Runner Name */
  runnerName: string;
  /** Back or Lay */
  side: string;
  /** Price */
  orderPrice: number;
  /** Stake Value */
  orderSize: number;
  /** Placed Date */
  placedDate: string;
  /** Profit or Loss */
  pL: number;
  /** Win or Loss */
  orderStatus: string;
}


/** Casino Orders */
export class CasinoOrders implements ICasinoOrders {
  /** Game Code */
  gameCode!: string;
  /** Game Name */
  gameName!: string;
  /** Round id */
  roundID!: string;
  /** Runner Name */
  runnerName!: string;
  /** Side */
  side!: string;
  /** Size */
  size!: number;
  /** Price */
  price!: number;
  /** Place Date */
  placeDate!: string;

  constructor(data?: ICasinoOrders) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.gameCode = _data["gameCode"] !== undefined ? _data["gameCode"] : <any>null;
      this.gameName = _data["gameName"] !== undefined ? _data["gameName"] : <any>null;
      this.roundID = _data["roundID"] !== undefined ? _data["roundID"] : <any>null;
      this.runnerName = _data["runnerName"] !== undefined ? _data["runnerName"] : <any>null;
      this.side = _data["side"] !== undefined ? _data["side"] : <any>null;
      this.size = _data["size"] !== undefined ? _data["size"] : <any>null;
      this.price = _data["price"] !== undefined ? _data["price"] : <any>null;
      this.placeDate = _data["placeDate"] !== undefined ? _data["placeDate"] : <any>null;
    }
  }

  static fromJS(data: any): CasinoOrders {
    data = typeof data === 'object' ? data : {};
    let result = new CasinoOrders();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["gameCode"] = this.gameCode !== undefined ? this.gameCode : <any>null;
    data["gameName"] = this.gameName !== undefined ? this.gameName : <any>null;
    data["roundID"] = this.roundID !== undefined ? this.roundID : <any>null;
    data["runnerName"] = this.runnerName !== undefined ? this.runnerName : <any>null;
    data["side"] = this.side !== undefined ? this.side : <any>null;
    data["size"] = this.size !== undefined ? this.size : <any>null;
    data["price"] = this.price !== undefined ? this.price : <any>null;
    data["placeDate"] = this.placeDate !== undefined ? this.placeDate : <any>null;
    return data;
  }
}

/** Casino Orders */
export interface ICasinoOrders {
  /** Game Code */
  gameCode: string;
  /** Game Name */
  gameName: string;
  /** Round id */
  roundID: string;
  /** Runner Name */
  runnerName: string;
  /** Side */
  side: string;
  /** Size */
  size: number;
  /** Price */
  price: number;
  /** Place Date */
  placeDate: string;
}


export class PLInnerSub implements IPLInnerSub {
  /** Selection Id */
  selectionid!: number;
  /** Selection Name */
  selectionName!: string;
  /** Bet Id */
  betId!: string;
  /** Bet Type LAY OR BACK */
  betType!: string;
  /** Placed Date */
  placedDate!: string;
  /** price */
  price!: number;
  /** Size */
  size!: number;
  /** Status Won or Lost */
  status!: string;
  /** Narration */
  narration!: string;
  /** PL Amount */
  cPL!: number;
  /** Commission Amount */
  cCom!: number;

  net: number | undefined;

  constructor(data?: IPLInnerSub) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.selectionid = _data["selectionid"] !== undefined ? _data["selectionid"] : <any>null;
      this.selectionName = _data["selectionName"] !== undefined ? _data["selectionName"] : <any>null;
      this.betId = _data["betId"] !== undefined ? _data["betId"] : <any>null;
      this.betType = _data["BetType"] !== undefined ? _data["BetType"] : <any>null;
      this.placedDate = _data["placedDate"] !== undefined ? _data["placedDate"] : <any>null;
      this.price = _data["price"] !== undefined ? _data["price"] : <any>null;
      this.size = _data["size"] !== undefined ? _data["size"] : <any>null;
      this.status = _data["status"] !== undefined ? _data["status"] : <any>null;
      this.narration = _data["narration"] !== undefined ? _data["narration"] : <any>null;
      this.cPL = _data["cPL"] !== undefined ? _data["cPL"] : <any>null;
      this.cCom = _data["cCom"] !== undefined ? _data["cCom"] : <any>null;
    }
  }

  static fromJS(data: any): PLInnerSub {
    data = typeof data === 'object' ? data : {};
    let result = new PLInnerSub();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["selectionid"] = this.selectionid !== undefined ? this.selectionid : <any>null;
    data["selectionName"] = this.selectionName !== undefined ? this.selectionName : <any>null;
    data["betId"] = this.betId !== undefined ? this.betId : <any>null;
    data["BetType"] = this.betType !== undefined ? this.betType : <any>null;
    data["placedDate"] = this.placedDate !== undefined ? this.placedDate : <any>null;
    data["price"] = this.price !== undefined ? this.price : <any>null;
    data["size"] = this.size !== undefined ? this.size : <any>null;
    data["status"] = this.status !== undefined ? this.status : <any>null;
    data["narration"] = this.narration !== undefined ? this.narration : <any>null;
    data["cPL"] = this.cPL !== undefined ? this.cPL : <any>null;
    data["cCom"] = this.cCom !== undefined ? this.cCom : <any>null;
    return data;
  }
}

export interface IPLInnerSub {
  /** Selection Id */
  selectionid: number;
  /** Selection Name */
  selectionName: string;
  /** Bet Id */
  betId: string;
  /** Bet Type LAY OR BACK */
  betType: string;
  /** Placed Date */
  placedDate: string;
  /** price */
  price: number;
  /** Size */
  size: number;
  /** Status Won or Lost */
  status: string;
  /** Narration */
  narration: string;
  /** PL Amount */
  cPL: number;
  /** Commission Amount */
  cCom: number;
}


/** Casino Bets input Model */
export class CasinoBetsInputModel {
  /** Date in yyyy-MM-dd */
  date!: string;
  /** Filter Type like SETTLED,MATCHED,UN-MATCHED,VOIDED,LAPSED,CANCELLED */
  filterType!: string;

  constructor(date: Date, filter: string) {
    this.date = date.toUTCString();

    this.filterType = filter.toUpperCase();
  }


}


/** Sport Results */
export class SportsResult implements ISportsResult {
  /** Market Id */
  marketId!: string;
  /** Market Name */
  marketName!: string;
  /** Competition Name */
  competition!: string;
  /** Event Name */
  eventName!: string;
  /** Event Id */
  eventId!: string;
  /** Market Time */
  marketTime!: string;
  /** Result */
  result!: string;

  constructor(data?: ISportsResult) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.marketId = _data["marketId"] !== undefined ? _data["marketId"] : <any>null;
      this.marketName = _data["marketName"] !== undefined ? _data["marketName"] : <any>null;
      this.competition = _data["competition"] !== undefined ? _data["competition"] : <any>null;
      this.eventName = _data["eventName"] !== undefined ? _data["eventName"] : <any>null;
      this.eventId = _data["eventId"] !== undefined ? _data["eventId"] : <any>null;
      this.marketTime = _data["marketTime"] !== undefined ? _data["marketTime"] : <any>null;
      this.result = _data["result"] !== undefined ? _data["result"] : <any>null;
    }
  }

  static fromJS(data: any): SportsResult {
    data = typeof data === 'object' ? data : {};
    let result = new SportsResult();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketId"] = this.marketId !== undefined ? this.marketId : <any>null;
    data["marketName"] = this.marketName !== undefined ? this.marketName : <any>null;
    data["competition"] = this.competition !== undefined ? this.competition : <any>null;
    data["eventName"] = this.eventName !== undefined ? this.eventName : <any>null;
    data["eventId"] = this.eventId !== undefined ? this.eventId : <any>null;
    data["marketTime"] = this.marketTime !== undefined ? this.marketTime : <any>null;
    data["result"] = this.result !== undefined ? this.result : <any>null;
    return data;
  }
}

/** Sport Results */
export interface ISportsResult {
  /** Market Id */
  marketId: string;
  /** Market Name */
  marketName: string;
  /** Competition Name */
  competition: string;
  /** Event Name */
  eventName: string;
  /** Event Id */
  eventId: string;
  /** Market Time */
  marketTime: string;
  /** Result */
  result: string;
}


/** Client Stakes */
export class ClientStake implements IClientStake {
  /** Minimum Stake Value */
  minStake!: number;
  /** Maximum Stake Value */
  maxStake!: number;
  /** stake 1 */
  Stake1!: number;
  /** stake 2 */
  Stake2!: number;
  Stake3!: number;
  /** stake 4 */
  Stake4!: number;
  /** stake 5 */
  Stake5!: number;
  /** stake 6 */
  Stake6!: number;
  /** stake 7 */
  Stake7!: number;
  /** Stake 8 */
  Stake8!: number;

  constructor(data?: IClientStake) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.minStake = _data["minStake"] !== undefined ? _data["minStake"] : <any>null;
      this.maxStake = _data["maxStake"] !== undefined ? _data["maxStake"] : <any>null;
      this.Stake1 = _data["Stake1"] !== undefined ? _data["Stake1"] : <any>null;
      this.Stake2 = _data["Stake2"] !== undefined ? _data["Stake2"] : <any>null;
      this.Stake3 = _data["Stake3"] !== undefined ? _data["Stake3"] : <any>null;
      this.Stake4 = _data["Stake4"] !== undefined ? _data["Stake4"] : <any>null;
      this.Stake5 = _data["Stake5"] !== undefined ? _data["Stake5"] : <any>null;
      this.Stake6 = _data["Stake6"] !== undefined ? _data["Stake6"] : <any>null;
      this.Stake7 = _data["Stake7"] !== undefined ? _data["Stake7"] : <any>null;
      this.Stake8 = _data["Stake8"] !== undefined ? _data["Stake8"] : <any>null;
    }
  }

  static fromJS(data: any): ClientStake {
    data = typeof data === 'object' ? data : {};
    let result = new ClientStake();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["minStake"] = this.minStake !== undefined ? this.minStake : <any>null;
    data["maxStake"] = this.maxStake !== undefined ? this.maxStake : <any>null;
    data["Stake1"] = this.Stake1 !== undefined ? this.Stake1 : <any>null;
    data["Stake2"] = this.Stake2 !== undefined ? this.Stake2 : <any>null;
    data["Stake3"] = this.Stake3 !== undefined ? this.Stake3 : <any>null;
    data["Stake4"] = this.Stake4 !== undefined ? this.Stake4 : <any>null;
    data["Stake5"] = this.Stake5 !== undefined ? this.Stake5 : <any>null;
    data["Stake6"] = this.Stake6 !== undefined ? this.Stake6 : <any>null;
    data["Stake7"] = this.Stake7 !== undefined ? this.Stake7 : <any>null;
    data["Stake8"] = this.Stake8 !== undefined ? this.Stake8 : <any>null;
    return data;
  }
}

/** Client Stakes */
export interface IClientStake {
  /** Minimum Stake Value */
  minStake: number;
  /** Maximum Stake Value */
  maxStake: number;
  /** stake 1 */
  Stake1: number;
  /** stake 2 */
  Stake2: number;
  Stake3: number;
  /** stake 4 */
  Stake4: number;
  /** stake 5 */
  Stake5: number;
  /** stake 6 */
  Stake6: number;
  /** stake 7 */
  Stake7: number;
  /** Stake 8 */
  Stake8: number;
}


/** Client Stakes For Saving */
export class ClientStakes implements IClientStakes {
  /** stake 1 */
  stake1!: number;
  /** stake 2 */
  stake2!: number;
  stake3!: number;
  /** stake 4 */
  stake4!: number;
  /** stake 5 */
  stake5!: number;
  /** stake 6 */
  stake6!: number;
  /** stake 7 */
  stake7!: number;
  /** Stake 8 */
  stake8!: number;
  recaptcha!: string;
  constructor(data?: IClientStakes) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.stake1 = _data["Stake1"] !== undefined ? _data["Stake1"] : <any>null;
      this.stake2 = _data["Stake2"] !== undefined ? _data["Stake2"] : <any>null;
      this.stake3 = _data["Stake3"] !== undefined ? _data["Stake3"] : <any>null;
      this.stake4 = _data["Stake4"] !== undefined ? _data["Stake4"] : <any>null;
      this.stake5 = _data["Stake5"] !== undefined ? _data["Stake5"] : <any>null;
      this.stake6 = _data["Stake6"] !== undefined ? _data["Stake6"] : <any>null;
      this.stake7 = _data["Stake7"] !== undefined ? _data["Stake7"] : <any>null;
      this.stake8 = _data["Stake8"] !== undefined ? _data["Stake8"] : <any>null;
      this.recaptcha = _data["recaptcha"] !== undefined ? _data["recaptcha"] : <any>null;
    }
  }

  static fromJS(data: any): ClientStakes {
    data = typeof data === 'object' ? data : {};
    let result = new ClientStakes();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["Stake1"] = this.stake1 !== undefined ? this.stake1 : <any>null;
    data["Stake2"] = this.stake2 !== undefined ? this.stake2 : <any>null;
    data["Stake3"] = this.stake3 !== undefined ? this.stake3 : <any>null;
    data["Stake4"] = this.stake4 !== undefined ? this.stake4 : <any>null;
    data["Stake5"] = this.stake5 !== undefined ? this.stake5 : <any>null;
    data["Stake6"] = this.stake6 !== undefined ? this.stake6 : <any>null;
    data["Stake7"] = this.stake7 !== undefined ? this.stake7 : <any>null;
    data["Stake8"] = this.stake8 !== undefined ? this.stake8 : <any>null;
    data["recaptcha"] = this.recaptcha !== undefined ? this.recaptcha : <any>null;
    return data;
  }
}

/** Client Stakes For Saving */
export interface IClientStakes {
  /** stake 1 */
  stake1: number;
  /** stake 2 */
  stake2: number;
  stake3: number;
  /** stake 4 */
  stake4: number;
  /** stake 5 */
  stake5: number;
  /** stake 6 */
  stake6: number;
  /** stake 7 */
  stake7: number;
  /** Stake 8 */
  stake8: number;
  recaptcha?: string;
}


/** My bets Model */
export class MarketOrders implements IMarketOrders {
  /** Market Id */
  marketId!: string | null;
  /** Unique Bet id */
  betId!: string;
  /** Runner Id */
  selectionId!: number;
  /** Runner Name */
  runnerName!: string;
  /** Back or Lay */
  side!: string;
  /** Placed Date */
  placedDate!: string;
  /** Market Name */
  marketName!: string | null;
  /** Price */
  orderPrice!: number;
  /** Stake Value */
  orderSize!: number;

  constructor(data?: IMarketOrders) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.marketId = _data["marketId"] !== undefined ? _data["marketId"] : <any>null;
      this.betId = _data["betId"] !== undefined ? _data["betId"] : <any>null;
      this.selectionId = _data["selectionId"] !== undefined ? _data["selectionId"] : <any>null;
      this.runnerName = _data["runnerName"] !== undefined ? _data["runnerName"] : <any>null;
      this.side = _data["side"] !== undefined ? _data["side"] : <any>null;
      this.placedDate = _data["placedDate"] !== undefined ? _data["placedDate"] : <any>null;
      this.marketName = _data["marketName"] !== undefined ? _data["marketName"] : <any>null;
      this.orderPrice = _data["orderPrice"] !== undefined ? _data["orderPrice"] : <any>null;
      this.orderSize = _data["orderSize"] !== undefined ? _data["orderSize"] : <any>null;
    }
  }

  static fromJS(data: any): MarketOrders {
    data = typeof data === 'object' ? data : {};
    let result = new MarketOrders();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketId"] = this.marketId !== undefined ? this.marketId : <any>null;
    data["betId"] = this.betId !== undefined ? this.betId : <any>null;
    data["selectionId"] = this.selectionId !== undefined ? this.selectionId : <any>null;
    data["runnerName"] = this.runnerName !== undefined ? this.runnerName : <any>null;
    data["side"] = this.side !== undefined ? this.side : <any>null;
    data["placedDate"] = this.placedDate !== undefined ? this.placedDate : <any>null;
    data["marketName"] = this.marketName !== undefined ? this.marketName : <any>null;
    data["orderPrice"] = this.orderPrice !== undefined ? this.orderPrice : <any>null;
    data["orderSize"] = this.orderSize !== undefined ? this.orderSize : <any>null;
    return data;
  }
}

/** My bets Model */
export interface IMarketOrders {
  /** Market Id */
  marketId: string | null;
  /** Unique Bet id */
  betId: string;
  /** Runner Id */
  selectionId: number;
  /** Runner Name */
  runnerName: string;
  /** Back or Lay */
  side: string;
  /** Placed Date */
  placedDate: string;
  /** Market Name */
  marketName: string | null;
  /** Price */
  orderPrice: number;
  /** Stake Value */
  orderSize: number;
}


/** My Bets Input Model */
export class MyBetsInputModel {
  /** Filter Type like SETTLED,MATCHED,UN-MATCHED,VOIDED,LAPSED,CANCELLED */
  filterType!: string;
  /** From Date */
  startDate: any;
  /** To Date */
  endDate: any;

  constructor(fitertype: string, startDate: Date, endDate: Date) {
    this.filterType = fitertype;
    this.startDate = startDate.toUTCString();
    this.endDate = endDate.toUTCString();
  }


}


/** Profit Model */
export class PLModel implements IPLModel {
  /** Event Type id */
  eventTypeId!: number;
  /** Event Type */
  eventType!: string;
  /** PL Amount */
  cPL!: number;
  /** Commission Amount */
  cCom!: number;

  constructor(data?: IPLModel) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.eventTypeId = _data["eventTypeId"] !== undefined ? _data["eventTypeId"] : <any>null;
      this.eventType = _data["eventType"] !== undefined ? _data["eventType"] : <any>null;
      this.cPL = _data["cPL"] !== undefined ? _data["cPL"] : <any>null;
      this.cCom = _data["cCom"] !== undefined ? _data["cCom"] : <any>null;
    }
  }

  static fromJS(data: any): PLModel {
    data = typeof data === 'object' ? data : {};
    let result = new PLModel();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["eventTypeId"] = this.eventTypeId !== undefined ? this.eventTypeId : <any>null;
    data["eventType"] = this.eventType !== undefined ? this.eventType : <any>null;
    data["cPL"] = this.cPL !== undefined ? this.cPL : <any>null;
    data["cCom"] = this.cCom !== undefined ? this.cCom : <any>null;
    return data;
  }
}

/** Profit Model */
export interface IPLModel {
  /** Event Type id */
  eventTypeId: number;
  /** Event Type */
  eventType: string;
  /** PL Amount */
  cPL: number;
  /** Commission Amount */
  cCom: number;
}

/** Inner Report of PL */
export class PLInnerInput implements IPLInnerInput {
  /** Event Type Name */
  eventType!: string;
  /** Type of report */
  type!: string;
  /** From Date */
  startDate!: any;
  /** To Date */
  endDate!: any;

  constructor(data?: IPLInnerInput) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  // init(_data?: any) {
  //   if (_data) {
  //     this.eventType = _data["eventType"] !== undefined ? _data["eventType"] : <any>null;
  //     this.type = _data["type"] !== undefined ? _data["type"] : <any>null;
  //     this.startDate = _data["startDate"] ? new Date(_data["startDate"].toString()) : <any>null;
  //     this.endDate = _data["endDate"] ? new Date(_data["endDate"].toString()) : <any>null;
  //   }
  // }

  static fromJS(data: any): PLInnerInput {
    data = typeof data === 'object' ? data : {};
    let result = new PLInnerInput();
    // result.init(data);
    return result;
  }

  // toJSON(data?: any) {
  //   data = typeof data === 'object' ? data : {};
  //   data["eventType"] = this.eventType !== undefined ? this.eventType : <any>null;
  //   data["type"] = this.type !== undefined ? this.type : <any>null;
  //   data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>null;
  //   data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>null;
  //   return data;
  // }
}

/** Inner Report of PL */
export interface IPLInnerInput {
  /** Event Type Name */
  eventType: string;
  /** Type of report */
  type: string;
  /** From Date */
  startDate: Date;
  /** To Date */
  endDate: Date;
}


export class PLInner implements IPLInner {
  /** Event Type */
  eventType!: number;
  /** Setteld Date */
  setteldDate!: string;
  /** Market id */
  marketId!: string;
  /** Narration */
  narration!: string;
  /** PL Amount */
  cPL!: number;
  /** Commission Amount */
  cCom!: number;

  constructor(data?: IPLInner) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.eventType = _data["eventType"] !== undefined ? _data["eventType"] : <any>null;
      this.setteldDate = _data["setteldDate"] !== undefined ? _data["setteldDate"] : <any>null;
      this.marketId = _data["marketId"] !== undefined ? _data["marketId"] : <any>null;
      this.narration = _data["narration"] !== undefined ? _data["narration"] : <any>null;
      this.cPL = _data["cPL"] !== undefined ? _data["cPL"] : <any>null;
      this.cCom = _data["cCom"] !== undefined ? _data["cCom"] : <any>null;
    }
  }

  static fromJS(data: any): PLInner {
    data = typeof data === 'object' ? data : {};
    let result = new PLInner();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["eventType"] = this.eventType !== undefined ? this.eventType : <any>null;
    data["setteldDate"] = this.setteldDate !== undefined ? this.setteldDate : <any>null;
    data["marketId"] = this.marketId !== undefined ? this.marketId : <any>null;
    data["narration"] = this.narration !== undefined ? this.narration : <any>null;
    data["cPL"] = this.cPL !== undefined ? this.cPL : <any>null;
    data["cCom"] = this.cCom !== undefined ? this.cCom : <any>null;
    return data;
  }
}

export interface IPLInner {
  /** Event Type */
  eventType: number;
  /** Setteld Date */
  setteldDate: string;
  /** Market id */
  marketId: string;
  /** Narration */
  narration: string;
  /** PL Amount */
  cPL: number;
  /** Commission Amount */
  cCom: number;
}


/** Login activity for User */
export class ActivityLogs implements IActivityLogs {
  /** Login Datetime as Unix timestamp */
  loginDateTime!: number;
  /** Web site */
  website!: string;
  /** ip address */
  iPAddress!: string;
  /** Login Status */
  loginStatus!: string;
  /** browser information */
  platform!: string;

  constructor(data?: IActivityLogs) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.loginDateTime = _data["loginDateTime"] !== undefined ? _data["loginDateTime"] : <any>null;
      this.website = _data["website"] !== undefined ? _data["website"] : <any>null;
      this.iPAddress = _data["iPAddress"] !== undefined ? _data["iPAddress"] : <any>null;
      this.loginStatus = _data["loginStatus"] !== undefined ? _data["loginStatus"] : <any>null;
      this.platform = _data["platform"] !== undefined ? _data["platform"] : <any>null;
    }
  }

  static fromJS(data: any): ActivityLogs {
    data = typeof data === 'object' ? data : {};
    let result = new ActivityLogs();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["loginDateTime"] = this.loginDateTime !== undefined ? this.loginDateTime : <any>null;
    data["website"] = this.website !== undefined ? this.website : <any>null;
    data["iPAddress"] = this.iPAddress !== undefined ? this.iPAddress : <any>null;
    data["loginStatus"] = this.loginStatus !== undefined ? this.loginStatus : <any>null;
    data["platform"] = this.platform !== undefined ? this.platform : <any>null;
    return data;
  }
}

/** Login activity for User */
export interface IActivityLogs {
  /** Login Datetime as Unix timestamp */
  loginDateTime: number;
  /** Web site */
  website: string;
  /** ip address */
  iPAddress: string;
  /** Login Status */
  loginStatus: string;
  /** browser information */
  platform: string;
}

export class ChangePassword implements IChangePassword {
  oldpassword!: string;
  newpassword!: string;
  recaptcha!: string;
  constructor(oldpass: string, newpass: string, recaptcha: string) {
    this.oldpassword = oldpass;
    this.newpassword = newpass;
    this.recaptcha = recaptcha;
  }


}

export interface IChangePassword {
  oldpassword: string;
  newpassword: string;
  recaptcha: string;
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

  constructor(eventid: number, marketid: string, run: number, prices: number, stakes: number, bettype: string) {
    this.eventId = eventid;
    this.marketId = marketid;
    this.runs = run;
    this.price = prices;
    this.stake = stakes;
    this.side = bettype;
  }


}

/** Fancy Model */
export interface IFancyModel {
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

export class CurrentBetsAll implements ICurrentBetsAll {
  eventId?: number;
  eventName?: string | undefined;
  bets?: CurrentBets[] | undefined;

  constructor(data?: ICurrentBetsAll) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.eventId = _data["eventId"];
      this.eventName = _data["eventName"];
      if (Array.isArray(_data["bets"])) {
        this.bets = [] as any;
        for (let item of _data["bets"])
          this.bets!.push(CurrentBets.fromJS(item));
      }
    }
  }

  static fromJS(data: any): CurrentBetsAll {
    data = typeof data === 'object' ? data : {};
    let result = new CurrentBetsAll();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["eventId"] = this.eventId;
    data["eventName"] = this.eventName;
    if (Array.isArray(this.bets)) {
      data["bets"] = [];
      for (let item of this.bets)
        data["bets"].push(item.toJSON());
    }
    return data;
  }
}

export interface ICurrentBetsAll {
  eventId?: number;
  eventName?: string | undefined;
  bets?: CurrentBets[] | undefined;
}

export class CurrentBetsGameAll implements ICurrentBetsGameAll {
  channelName!: string;
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

  constructor(data?: ICurrentBetsGameAll) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.channelName = _data["channelName"];
      this.betStatus = _data["betStatus"];
      this.marketId = _data["marketId"];
      this.betId = _data["betId"];
      this.selectionId = _data["selectionId"];
      this.runnerName = _data["runnerName"];
      this.side = _data["side"];
      this.betPrice = _data["betPrice"];
      this.betSize = _data["betSize"];
      this.betVal = _data["betVal"];
      this.roundNo = _data["roundNo"];
      this.gameId = _data["gameId"];
      this.channelId = _data["channelId"];
    }
  }

  static fromJS(data: any): CurrentBetsGameAll {
    data = typeof data === 'object' ? data : {};
    let result = new CurrentBetsGameAll();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["channelName"] = this.channelName;
    data["betStatus"] = this.betStatus;
    data["marketId"] = this.marketId;
    data["betId"] = this.betId;
    data["selectionId"] = this.selectionId;
    data["runnerName"] = this.runnerName;
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

export interface ICurrentBetsGameAll {
  channelName: string;
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

export class CurrentBetsModel implements ICurrentBetsModel {
  sportType?: string | undefined;
  group?: CurrentBetsAll[] | undefined;

  constructor(data?: ICurrentBetsModel) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.sportType = _data["sportType"];
      if (Array.isArray(_data["group"])) {
        this.group = [] as any;
        for (let item of _data["group"])
          this.group!.push(CurrentBetsAll.fromJS(item));
      }
    }
  }

  static fromJS(data: any): CurrentBetsModel {
    data = typeof data === 'object' ? data : {};
    let result = new CurrentBetsModel();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["sportType"] = this.sportType;
    if (Array.isArray(this.group)) {
      data["group"] = [];
      for (let item of this.group)
        data["group"].push(item.toJSON());
    }
    return data;
  }
}

export interface ICurrentBetsModel {
  sportType?: string | undefined;
  group?: CurrentBetsAll[] | undefined;
}

export class MatchUnModel implements IMatchUnModel {
  marketId?: string | undefined;
  eventId?: string | undefined;
  type?: string | undefined;

  constructor(marketid: string, eventid: string, type: string) {
    this.marketId = marketid;
    this.eventId = eventid;
    this.type = type;
  }


}

export interface IMatchUnModel {
  marketId?: string | undefined;
  eventId?: string | undefined;
  type?: string | undefined;
}


export class OthersMarkets implements IOthersMarkets {
  marketId?: string | undefined;
  marketName?: string | undefined;
  isInplay?: boolean;

  constructor(data?: IOthersMarkets) {
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
      this.isInplay = _data["isInplay"];
    }
  }

  static fromJS(data: any): OthersMarkets {
    data = typeof data === 'object' ? data : {};
    let result = new OthersMarkets();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["marketId"] = this.marketId;
    data["marketName"] = this.marketName;
    data["isInplay"] = this.isInplay;
    return data;
  }
}

export interface IOthersMarkets {
  marketId?: string | undefined;
  marketName?: string | undefined;
  isInplay?: boolean;
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

// Payment GateWay


export class PreparedForPyamentModel implements IPreparedForPyamentModel {
  /** User Name Unique */
  phone?: string | undefined;
  /** User Secret Password */
  email?: string | undefined;
  paymentMethod?: string | undefined;

  constructor(data?: IPreparedForPyamentModel) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.phone = _data["phone"];
      this.email = _data["email"];
      this.paymentMethod = _data["paymentMethod"];
    }
  }

  static fromJS(data: any): PreparedForPyamentModel {
    data = typeof data === 'object' ? data : {};
    let result = new PreparedForPyamentModel();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["phone"] = this.phone;
    data["email"] = this.email;
    data["paymentMethod"] = this.paymentMethod;
    return data;
  }
}

export interface IPreparedForPyamentModel {
  /** User Name Unique */
  phone?: string | undefined;
  /** User Secret Password */
  email?: string | undefined;
}


export class PaymentRequestModel implements IPaymentRequestModel {
  amount?: any;
  /** User Name Unique */
  phone?: string | undefined;
  /** User Secret Password */
  email?: string | undefined;

  constructor(amount: any, phoenumber: string, emailadd: string) {
    this.amount = amount;
    this.phone = phoenumber;
    this.email = emailadd;
  }


}

export interface IPaymentRequestModel {
  amount?: number;
  /** User Name Unique */
  phone?: string | undefined;
  /** User Secret Password */
  email?: string | undefined;
}


export class CreatePaymentResp implements ICreatePaymentResp {
  [x: string]: any;
  orderAmount?: number;
  returnURL?: string | undefined;
  customerName?: string | undefined;
  orderId?: string | undefined;
  orderCurrency?: string | undefined;
  salt?: string | undefined;
  tXNTYPE?: string | undefined;
  customerId?: string | undefined;
  customerPhonenumber?: string | undefined;
  email?: string | undefined;
  pAY_ID?: string | undefined;
  signature?: string | undefined;
  hash?: string | undefined;
  status?: boolean;
  message?: string | undefined;
  postURL?: string | undefined;
  checkout_url!: string;
  UATPAYMENTS_URL!: string;
  amount!: number;
  api_key!: string;
  city!: string;
  country!: string;
  currency!: string;
  description!: string;
  mode!: string;
  name!: string;
  order_id!: string;
  phone!: string;
  return_url!: string;
  zip_code!: string;
  Hash!: string;
  constructor(data?: ICreatePaymentResp) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.orderAmount = _data["orderAmount"];
      this.returnURL = _data["returnURL"];
      this.customerName = _data["customerName"];
      this.orderId = _data["orderId"];
      this.orderCurrency = _data["orderCurrency"];
      this.salt = _data["Salt"];
      this.tXNTYPE = _data["TXNTYPE"];
      this.customerId = _data["customerId"];
      this.customerPhonenumber = _data["customerPhonenumber"];
      this.email = _data["email"];
      this.pAY_ID = _data["PAY_ID"];
      this.signature = _data["signature"];
      this.hash = _data["Hash"];
      this.status = _data["status"];
      this.message = _data["message"];
      this.postURL = _data["postURL"];
      this.checkout_url = _data["checkout_url"];
      this.UATPAYMENTS_URL = _data["UATPAYMENTS_URL"];
      this.amount = _data["amount"];
      this.api_key = _data["api_key"];
      this.city = _data["city"];
      this.country = _data["country"];
      this.currency = _data["currency"];
      this.description = _data["description"];
      this.mode = _data["mode"];
      this.name = _data["name"];
      this.order_id = _data["order_id"];
      this.phone = _data["phone"];
      this.return_url = _data["return_url"];
      this.zip_code = _data["zip_code"];
      this.Hash = _data["hash"];
    }
  }

  static fromJS(data: any): CreatePaymentResp {
    data = typeof data === 'object' ? data : {};
    let result = new CreatePaymentResp();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["orderAmount"] = this.orderAmount;
    data["returnURL"] = this.returnURL;
    data["customerName"] = this.customerName;
    data["orderId"] = this.orderId;
    data["orderCurrency"] = this.orderCurrency;
    data["Salt"] = this.salt;
    data["TXNTYPE"] = this.tXNTYPE;
    data["customerId"] = this.customerId;
    data["customerPhonenumber"] = this.customerPhonenumber;
    data["email"] = this.email;
    data["PAY_ID"] = this.pAY_ID;
    data["signature"] = this.signature;
    data["Hash"] = this.hash;
    data["status"] = this.status;
    data["message"] = this.message;
    data["postURL"] = this.postURL;
    data["checkout_url"] = this.checkout_url;
    data["UATPAYMENTS_URL"] = this.UATPAYMENTS_URL;
    data["amount"] = this.amount;
    data["api_key"] = this.api_key;
    data["city"] = this.city;
    data["country"] = this.country;
    data["currency"] = this.currency;
    data["description"] = this.description;
    data["mode"] = this.mode;
    data["name"] = this.name;
    data["order_id"] = this.order_id;
    data["phone"] = this.phone;
    data["return_url"] = this.return_url;
    data["zip_code"] = this.zip_code;
    data["hash"] = this.Hash;
    return data;
  }
}

export interface ICreatePaymentResp {
  orderAmount?: number;
  returnURL?: string | undefined;
  customerName?: string | undefined;
  orderId?: string | undefined;
  orderCurrency?: string | undefined;
  salt?: string | undefined;
  tXNTYPE?: string | undefined;
  customerId?: string | undefined;
  customerPhonenumber?: string | undefined;
  email?: string | undefined;
  pAY_ID?: string | undefined;
  signature?: string | undefined;
  hash?: string | undefined;
  status?: boolean;
  message?: string | undefined;
  postURL?: string | undefined;
  checkout_url?: string | undefined;
  UATPAYMENTS_URL?: string | undefined;
  amount?: number | undefined;
  api_key?: string | undefined;
  city?: string | undefined;
  country?: string | undefined;
  currency?: string | undefined;
  description?: string | undefined;
  mode?: string | undefined;
  name?: string | undefined;
  order_id?: string | undefined;
  phone?: string | undefined;
  return_url?: string | undefined;
  zip_code?: string | undefined;
  Hash?: string | undefined;
}

// File Parameter Input Body
export class FileParameter implements IFileParameter {
  data: string | Blob;
  fileName: any;
  constructor(data: string | Blob, fileName: any) {
    this.data = data;
    this.fileName = fileName;
  }
}
export interface IFileParameter {
  data: string | Blob;
  fileName: any
}
// File Parameter Input Body


// Manual Payment Response
export class ExceptionResponse implements IExceptionResponse {
  reponse!: any | null;
  message!: any | null;
  status!: any | null;
  constructor(data?: IExceptionResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.reponse = _data["reponse"] !== undefined ? _data["reponse"] : <any>null;
      this.message = _data["message"] !== undefined ? _data["message"] : <any>null;
      this.status = _data["status"] !== undefined ? _data["status"] : <any>null;
    }
  }


  static fromJS(data: any): ExceptionResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ExceptionResponse();
    result.init(data);
    return result;
  }

}

export interface IExceptionResponse {
  reponse: number;
  /** Market id can be null on issurance and withdraw */
  message: string | null;
}
// Manual Payment Response




// Payment GateWay


export class SignupWithOTPResponse implements ISignupWithOTPResponse {
  phoneoremail?: string | undefined;
  status?: string | undefined;
  message?: string | undefined;

  constructor(data?: ISignupWithOTPResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.phoneoremail = _data["phoneoremail"];
      this.status = _data["status"];
      this.message = _data["message"];
    }
  }

  static fromJS(data: any): SignupWithOTPResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SignupWithOTPResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["phoneoremail"] = this.phoneoremail;
    data["status"] = this.status;
    data["message"] = this.message;
    return data;
  }
}

export interface ISignupWithOTPResponse {
  phoneoremail?: string | undefined;
  status?: string | undefined;
  message?: string | undefined;
}


export class SignupWithOTPModal implements ISignupWithOTPModal {
  countryCode?: string | undefined;
  phoneoremail?: string | undefined;
  isPhone?: boolean;
  recaptcha?: string | undefined;
  code?: number | undefined;
  message?: string | any;
  status?: boolean | undefined;

  constructor(data?: ISignupWithOTPModal) {
    this.countryCode = data?.countryCode;
    this.phoneoremail = data?.phoneoremail;
    this.isPhone = data?.isPhone;
    this.recaptcha = data?.recaptcha;
    this.code = data?.code;
    this.message = data?.message;
    this.status = data?.status;
  }


}

export interface ISignupWithOTPModal {
  countryCode?: string | undefined;
  phoneoremail?: string | undefined;
  isPhone?: boolean;
  recaptcha?: string | undefined;
  code?: number | undefined;
  message?: string | undefined;
  status?: boolean | undefined;
}


export class SignupOTPModal implements ISignupOTPModal {
  otp?: string | undefined;
  phoneoremail?: string | undefined;
  isPhone?: boolean;
  recaptcha?: string | undefined;

  constructor(data?: ISignupOTPModal) {
    this.otp = data?.otp;
    this.phoneoremail = data?.phoneoremail;
    this.isPhone = data?.isPhone;
    this.recaptcha = data?.recaptcha;
  }
}

export interface ISignupOTPModal {
  otp?: string | undefined;
  phoneoremail?: string | undefined;
  isPhone?: boolean;
  recaptcha?: string | undefined;
}




export class SignupModel implements ISignupModel {
  username?: string | undefined;
  password?: string | undefined;
  countryCode?: string | undefined;
  phoneoremail?: string | undefined;
  isPhone?: boolean;
  recaptcha?: string | undefined;
  code: number | any;
  status: boolean | any;
  message: string | any;

  constructor(data?: ISignupModel) {
    this.username = data?.username;
    this.password = data?.password;
    this.countryCode = data?.countryCode;
    this.phoneoremail = data?.phoneoremail;
    this.isPhone = data?.isPhone;
    this.recaptcha = data?.recaptcha;
    this.code = data?.code
    this.status = data?.status;
    this.message = data?.message
  }
}

export interface ISignupModel {
  username?: string | undefined;
  password?: string | undefined;
  countryCode?: string | undefined;
  phoneoremail?: string | undefined;
  isPhone?: boolean;
  recaptcha?: string | undefined;
  code: number | any;
  status: boolean | any;
  message: string | any;
}


export class PendingWithdrawRequests implements IPendingWithdrawRequests {
  requestId?: number;
  amount?: number;
  requestTime?: Date | undefined;
  status?: string | undefined;
  from?: string | undefined;

  constructor(data?: IPendingWithdrawRequests) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.requestId = _data["requestId"];
      this.amount = _data["amount"];
      this.requestTime = _data["requestTime"] ? new Date(_data["requestTime"].toString()) : <any>undefined;
      this.status = _data["status"];
      this.from = _data["from"];
    }
  }

  static fromJS(data: any): PendingWithdrawRequests {
    data = typeof data === 'object' ? data : {};
    let result = new PendingWithdrawRequests();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["requestId"] = this.requestId;
    data["amount"] = this.amount;
    data["requestTime"] = this.requestTime ? this.requestTime.toISOString() : <any>undefined;
    data["status"] = this.status;
    data["from"] = this.from;
    return data;
  }
}

export interface IPendingWithdrawRequests {
  requestId?: number;
  amount?: number;
  requestTime?: Date | undefined;
  status?: string | undefined;
  from?: string | undefined;
}


export class ClientkBankAccounts implements IClientkBankAccounts {
  accountNo?: string | undefined;
  accountHolderName?: string | undefined;
  iFSCCode?: string | undefined;
  bankName?: string | undefined;
  branchName?: string | undefined;
  accountType?: string | undefined;
  type?: string | undefined;
  id?: number | undefined;
  widthdrawpin?: number | undefined;
  recaptcha?: string | undefined;

  constructor(data?: IClientkBankAccounts) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.accountNo = _data["accountNo"];
      this.accountHolderName = _data["accountHolderName"];
      this.iFSCCode = _data["iFSCCode"];
      this.bankName = _data["bankName"];
      this.branchName = _data["branchName"];
      this.accountType = _data["accountType"];
      this.type = _data["type"];
      this.id = _data["id"];
      this.widthdrawpin = _data["widthdrawpin"];
      this.recaptcha = _data["recaptcha"];
    }
  }

  static fromJS(data: any): ClientkBankAccounts {
    data = typeof data === 'object' ? data : {};
    let result = new ClientkBankAccounts();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["accountNo"] = this.accountNo;
    data["accountHolderName"] = this.accountHolderName;
    data["iFSCCode"] = this.iFSCCode;
    data["bankName"] = this.bankName;
    data["branchName"] = this.branchName;
    data["accountType"] = this.accountType;
    data["accountType"] = this.accountType;
    data["recaptcha"] = this.recaptcha;
    data["id"] = this.id;
    data["widthdrawpin"] = this.widthdrawpin;
    return data;
  }
}

export interface IClientkBankAccounts {
  accountNo?: string | undefined;
  accountHolderName?: string | undefined;
  iFSCCode?: string | undefined;
  bankName?: string | undefined;
  branchName?: string | undefined;
  accountType?: string | undefined;
  type?: string | undefined;
  recaptcha?: string | undefined;
  id?: number | undefined;
  widthdrawpin?: number | undefined;
}

export class RequetedAmount implements IRequetedAmount {
  accountNo?: string | undefined;
  amount?: number | string;
  id?: number;
  recaptcha?: string;
  constructor(data?: IRequetedAmount) {
    if (data) {
      this.accountNo = data?.accountNo;
      this.amount = data?.amount;
      this.id = data?.id;
      this.recaptcha = data?.recaptcha;
    }
  }
}

export interface IRequetedAmount {
  accountNo?: string | undefined;
  amount?: number | string;
  id?: number;
  recaptcha?: string;
}

export class KYCResponse implements IKYCResponse {
  redirect?: string | undefined;
  /** flag for response */
  status!: boolean;
  /** Error or success message */
  message!: string;

  constructor(data?: IKYCResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.redirect = _data["redirect"];
      this.status = _data["status"];
      this.message = _data["message"];
    }
  }

  static fromJS(data: any): KYCResponse {
    data = typeof data === 'object' ? data : {};
    let result = new KYCResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["redirect"] = this.redirect;
    data["status"] = this.status;
    data["message"] = this.message;
    return data;
  }
}


export interface IKYCResponse {
  redirect?: string | undefined;
  /** flag for response */
  status: boolean;
  /** Error or success message */
  message: string;
}

export class CheckUserNameModel implements ICheckUserNameModel {
  username?: string | undefined;
  recaptcha?: string | undefined;

  constructor(data?: ICheckUserNameModel) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.username = _data["username"];
      this.recaptcha = _data["recaptcha"];
    }
  }

  static fromJS(data: any): CheckUserNameModel {
    data = typeof data === 'object' ? data : {};
    let result = new CheckUserNameModel();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["username"] = this.username;
    data["recaptcha"] = this.recaptcha;
    return data;
  }
}

export interface ICheckUserNameModel {
  username?: string | undefined;
  recaptcha?: string | undefined;
}

export class SignupWhitelabelModel implements ISignupWhitelabelModel {
  clientname?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  phonenumber?: string | undefined;
  email?: string | undefined;
  recaptcha?: string | undefined;
  dob?: string | undefined

  constructor(data?: ISignupWhitelabelModel) {
    if (data) {
      this.clientname = data.clientname;
      this.username = data.username;
      this.password = data.password;
      this.phonenumber = data.phonenumber;
      this.email = data.email;
      this.recaptcha = data.recaptcha;
      this.dob = data.dob;
    }
  }

  // init(_data?: any) {
  //     if (_data) {
  //         this.clientname = _data["clientname"];
  //         this.username = _data["username"];
  //         this.password = _data["password"];
  //         this.phonenumber = _data["phonenumber"];
  //         this.email = _data["email"];
  //         this.recaptcha = _data["recaptcha"];
  //     }
  // }

  // static fromJS(data: any): SignupWhitelabelModel {
  //     data = typeof data === 'object' ? data : {};
  //     let result = new SignupWhitelabelModel();
  //     result.init(data);
  //     return result;
  // }

  // toJSON(data?: any) {
  //     data = typeof data === 'object' ? data : {};
  //     data["clientname"] = this.clientname;
  //     data["username"] = this.username;
  //     data["password"] = this.password;
  //     data["phonenumber"] = this.phonenumber;
  //     data["email"] = this.email;
  //     data["recaptcha"] = this.recaptcha;
  //     return data;
  // }
}

export interface ISignupWhitelabelModel {
  clientname?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  phonenumber?: string | undefined;
  email?: string | undefined;
  recaptcha?: string | undefined;
  dob?: string | undefined;
}


export interface ISignupWhitelabelModel {
  clientname?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  phonenumber?: string | undefined;
  email?: string | undefined;
  recaptcha?: string | undefined;
  dob?: string | undefined;
}

export class ResetPasswordResponse implements IResetPasswordResponse {
  requestId?: string | undefined;
  /** flag for response */
  status?: boolean;
  /** Error or success message */
  message?: string | undefined;

  constructor(data?: IResetPasswordResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.requestId = _data["requestId"];
      this.status = _data["status"];
      this.message = _data["message"];
    }
  }

  static fromJS(data: any): ResetPasswordResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ResetPasswordResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["requestId"] = this.requestId;
    data["status"] = this.status;
    data["message"] = this.message;
    return data;
  }
}

export interface IResetPasswordResponse {
  requestId?: string | undefined;
  /** flag for response */
  status?: boolean;
  /** Error or success message */
  message?: string | undefined;
}

export class NewPasswordOTP implements INewPasswordOTP {
  username?: string | undefined;
  phoneoremail?: string | undefined;
  recaptcha?: string | undefined;
  requestId?: string | undefined;
  newPassword?: string | undefined;

  constructor(data?: INewPasswordOTP) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.username = _data["username"];
      this.phoneoremail = _data["phoneoremail"];
      this.recaptcha = _data["recaptcha"];
      this.requestId = _data["requestId"];
      this.newPassword = _data["newPassword"];
    }
  }

  static fromJS(data: any): NewPasswordOTP {
    data = typeof data === 'object' ? data : {};
    let result = new NewPasswordOTP();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["username"] = this.username;
    data["phoneoremail"] = this.phoneoremail;
    data["recaptcha"] = this.recaptcha;
    data["requestId"] = this.requestId;
    data["newPassword"] = this.newPassword;
    return data;
  }
}

export interface INewPasswordOTP {
  username?: string | undefined;
  phoneoremail?: string | undefined;
  recaptcha?: string | undefined;
  requestId?: string | undefined;
  newPassword?: string | undefined;
}


export class UserPhoneCheckingForOTP implements IUserPhoneCheckingForOTP {
  username?: string | undefined;
  phoneoremail?: string | undefined;
  recaptcha?: string | undefined;
  otp?: string | undefined;
  requestId?: string | undefined;

  constructor(data?: IUserPhoneCheckingForOTP) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.username = _data["username"];
      this.phoneoremail = _data["phoneoremail"];
      this.recaptcha = _data["recaptcha"];
      this.otp = _data["otp"];
      this.requestId = _data["requestId"];
    }
  }

  static fromJS(data: any): UserPhoneCheckingForOTP {
    data = typeof data === 'object' ? data : {};
    let result = new UserPhoneCheckingForOTP();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["username"] = this.username;
    data["phoneoremail"] = this.phoneoremail;
    data["recaptcha"] = this.recaptcha;
    data["otp"] = this.otp;
    data["requestId"] = this.requestId;
    return data;
  }
}

export interface IUserPhoneCheckingForOTP {
  username?: string | undefined;
  phoneoremail?: string | undefined;
  recaptcha?: string | undefined;
  otp?: string | undefined;
  requestId?: string | undefined;
}


export class ClientGetPhoneNumber implements IClientGetPhoneNumber {
  username?: string | undefined;
  recaptcha?: string | undefined;

  constructor(data?: IClientGetPhoneNumber) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.username = _data["username"];
      this.recaptcha = _data["recaptcha"];
    }
  }

  static fromJS(data: any): ClientGetPhoneNumber {
    data = typeof data === 'object' ? data : {};
    let result = new ClientGetPhoneNumber();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["username"] = this.username;
    data["recaptcha"] = this.recaptcha;
    return data;
  }
}

export interface IClientGetPhoneNumber {
  username?: string | undefined;
  recaptcha?: string | undefined;
}

// Request History


export class ManualPayamentHistoryResponse implements IManualPayamentHistoryResponse {
  amount?: number;
  uploadDate?: string | undefined;
  verified?: boolean;
  file?: string | undefined;
  status?: string | undefined;

  constructor(data?: IManualPayamentHistoryResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.amount = _data["amount"];
      this.uploadDate = _data["uploadDate"];
      this.verified = _data["verified"];
      this.file = _data["file"];
      this.status = _data["status"];
    }
  }

  static fromJS(data: any): ManualPayamentHistoryResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ManualPayamentHistoryResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["amount"] = this.amount;
    data["uploadDate"] = this.uploadDate;
    data["verified"] = this.verified;
    data["file"] = this.file;
    data["status"] = this.status;
    return data;
  }
}

export interface IManualPayamentHistoryResponse {
  amount?: number;
  uploadDate?: string | undefined;
  verified?: boolean;
  file?: string | undefined;
  status?: string | undefined;
}


// Request History

export class ClientWalletModel implements IClientWalletModel {
  accountNo?: string | undefined;
  accountType?: string | undefined;

  constructor(data?: IClientWalletModel) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.accountNo = _data["accountNo"];
      this.accountType = _data["accountType"];
    }
  }

  static fromJS(data: any): ClientWalletModel {
    data = typeof data === 'object' ? data : {};
    let result = new ClientWalletModel();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["accountNo"] = this.accountNo;
    data["accountType"] = this.accountType;
    return data;
  }
}

export interface IClientWalletModel {
  accountNo?: string | undefined;
  accountType?: string | undefined;
}

// Add bank with kyc


export class ClientBankAccountsWithKYC {
  kyc?: FileParameter | undefined;
  haveKyc?: boolean;
  accountNo?: string | undefined;
  accountHolderName?: string | undefined;
  iFSCCode?: string | undefined;
  bankName?: string | undefined;
  branchName?: string | undefined;
  accountType?: string | undefined;
  type?: string | undefined;

  constructor(data?: IClientBankAccountsWithKYC) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    // if (data) {
    //   this.kyc = data.kyc;
    //   this.haveKyc = data.haveKyc;
    //   this.accountNo = data.accountNo;
    //   this.accountHolderName = data.accountHolderName;
    //   this.iFSCCode = data.iFSCCode;
    //   this.bankName = data.bankName;
    //   this.branchName = data.branchName;
    //   this.accountType = data.accountType;
    //   this.type = data.type;
    // }
  }

  init(_data?: any) {
    if (_data) {
      this.kyc = _data["kyc"];
      this.haveKyc = _data["haveKyc"];
      this.accountNo = _data["accountNo"];
      this.accountHolderName = _data["accountHolderName"];
      this.iFSCCode = _data["iFSCCode"];
      this.bankName = _data["bankName"];
      this.branchName = _data["branchName"];
      this.accountType = _data["accountType"];
      this.type = _data["type"];
    }
  }


}

export interface IClientBankAccountsWithKYC {
  kyc?: FileParameter | undefined;
  haveKyc?: boolean;
  accountNo?: string | undefined;
  accountHolderName?: string | undefined;
  iFSCCode?: string | undefined;
  bankName?: string | undefined;
  branchName?: string | undefined;
  accountType?: string | undefined;
  type?: string | undefined;
}


// Add bank with kyc





// get bank with kyc


export class ClientkBankAccountsResponse {
  haveKyc?: boolean | undefined;
  kycVerified?: boolean | undefined;
  accountNo?: string | undefined;
  accountHolderName?: string | undefined;
  iFSCCode?: string | undefined;
  bankName?: string | undefined;
  branchName?: string | undefined;
  accountType?: string | undefined;
  type?: string | undefined;

  constructor(data?: IClientkBankAccountsResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.haveKyc = _data["haveKyc"];
      this.kycVerified = _data["kycVerified"];
      this.accountNo = _data["accountNo"];
      this.accountHolderName = _data["accountHolderName"];
      this.iFSCCode = _data["iFSCCode"];
      this.bankName = _data["bankName"];
      this.branchName = _data["branchName"];
      this.accountType = _data["accountType"];
      this.type = _data["type"];
    }
  }

  static fromJS(data: any): ClientkBankAccountsResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ClientkBankAccountsResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["haveKyc"] = this.haveKyc;
    data["kycVerified"] = this.kycVerified;
    data["accountNo"] = this.accountNo;
    data["accountHolderName"] = this.accountHolderName;
    data["iFSCCode"] = this.iFSCCode;
    data["bankName"] = this.bankName;
    data["branchName"] = this.branchName;
    data["accountType"] = this.accountType;
    data["type"] = this.type;
    return data;
  }
}

export interface IClientkBankAccountsResponse {
  haveKyc?: FileParameter | undefined;
  kycVerified?: boolean;
  accountNo?: string | undefined;
  accountHolderName?: string | undefined;
  iFSCCode?: string | undefined;
  bankName?: string | undefined;
  branchName?: string | undefined;
  accountType?: string | undefined;
  type?: string | undefined;
}


// get bank with kyc

export class GreezPaymentResponse implements IGreezPaymentResponse {
  redirectURL?: string | undefined;
  errorMessage?: string | undefined;
  /** flag for response */
  status!: boolean;
  /** Error or success message */
  message!: any;
  code!: number;

  constructor(data?: IGreezPaymentResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.redirectURL = _data["redirectURL"];
      this.errorMessage = _data["errorMessage"];
      this.status = _data["status"];
      this.message = _data["message"];
      this.code = _data["code"];
    }
  }

  static fromJS(data: any): GreezPaymentResponse {
    data = typeof data === 'object' ? data : {};
    let result = new GreezPaymentResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["redirectURL"] = this.redirectURL;
    data["errorMessage"] = this.errorMessage;
    data["status"] = this.status;
    data["message"] = this.message;
    data["code"] = this.code;
    return data;
  }
}

export interface IGreezPaymentResponse {
  redirectURL?: string | undefined;
  errorMessage?: string | undefined;
  /** flag for response */
  status: boolean;
  /** Error or success message */
  message: any;
  code: number;
}

export class GrezPayInputModel {
  paymentType?: string | undefined;
  mop?: string | undefined;
  amount?: number;
  /** User Name Unique */
  phone?: string | undefined;
  /** User Secret Password */
  email?: string | undefined;

  constructor(amount?: number, paymenttype?: string, mop?: string, phone?: string, email?: string) {
    this.amount = amount;
    this.paymentType = paymenttype;
    this.mop = mop;
    this.email = email
    this.phone = phone
  }

}
