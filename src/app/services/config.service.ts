import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentBetsAll } from '../models/models';
import * as M from "materialize-css";
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private router: Router, private storageService: StorageService) {
    let path = '/assets/text.js';

    fetch(path)
      .then((response: any) => {
        if (response.status == 200) {

          return response.text();
        } else {
          throw response;
        }
      })
      .then(data => {

        if (data && data.length > 0) {

          let resp = window.atob(data);
          let settings = JSON.parse(resp);
          this.banners = settings.banners;
          this.eventtv = settings.eventtv;
          this.nextrace = settings.nextrace;
          this.getnews = settings.getnews
          this.gettv = settings.gettv;
          this.matchunmatchallsports = settings.matchunmatchallsports;
          this.timeline2 = settings.timeline2;
          this.timeline1 = settings.timeline1;
          this.casinopost = settings.casinopost;
          this.casinoget = settings.casinoget;
          this.clientpositionsports = settings.clientpositionsports;
          this.clientpositionfancy = settings.clientpositionfancy;
          this.fancymarketsliability = settings.fancymarketsliability;
          this.racemarketcurrentbets = settings.racemarketcurrentbets;
          this.matchunmatchrace = settings.matchunmatchrace;
          this.matchunmatchsports = settings.matchunmatchsports;
          this.localmarketcurrentbets = settings.localmarketcurrentbets;
          this.fancymarkets = settings.fancymarkets;
          this.getwallet = settings.getwallet;
          this.runnergraph = settings.runnergraph;
          this.sportsmarketliability = settings.sportsmarketliability;
          this.currentbetsall = settings.currentbetsall;
          this.mymarket = settings.mymarket;
          this.allmarketsliability = settings.allmarketsliability;
          this.sportscurrentbets = settings.sportscurrentbets;
          this.racemarket = settings.racemarket;
          this.customtree = settings.customtree;
          this.localordersplaced = settings.localordersplaced;
          this.sportsordersplaced = settings.sportsordersplaced;
          this.clientparameters = settings.clientparameters;
          this.marketsbook = settings.marketsbook;
          this.eventbydatemarkets = settings.eventbydatemarkets;
          this.singlemarketbook = settings.singlemarketbook;
          this.multiplescore = settings.multiplescore;
          this.getcompetition = settings.getcompetition;
          this.getcountries = settings.getcountries;
          this.geteventsbycountry = settings.geteventsbycountry;
          this.geteventsbydate = settings.geteventsbydate;
          this.getevents = settings.getevents;
          this.getgroupmarkets = settings.getgroupmarkets;
          this.getevent1 = settings.getevent1;
          this.getevent2 = settings.getevent2;
          this.getevent3 = settings.getevent3;
          this.eventtypes = settings.eventtypes;
          this.getfixtures = settings.getfixtures;
          this.getmarkets = settings.getmarkets;
          this.todayraces = settings.todayraces;
          this.geteventmarkets = settings.geteventmarkets;
          this.linemarketsundermo = settings.linemarketsundermo;
          this.getcompetitonmarkets = settings.getcompetitonmarkets;
          this.raceschedule = settings.raceschedule;
          this.getdefaultpage = settings.getdefaultpage;
          this.eventmarkets = settings.eventmarkets;
          this.inplayevents = settings.inplayevents;
          this.marketdetail = settings.marketdetail;
          this.raceeventmarkets = settings.raceeventmarkets;
          this.sportsbyid = settings.sportsbyid;
          this.getxgdetails = settings.getxgdetails;
          this.matchunmatchxg = settings.matchunmatchxg;
          this.book = settings.book;
          this.gamedetail = settings.gamedetail;
          this.result = settings.result;
          this.games = settings.games;
          this.singlebook = settings.singlebook;
          this.cancelorders = settings.cancelorders;
          this.ordersplacedxg = settings.ordersplacedxg;
          this.othersmarkets = settings.othermarkets,
            this.currentbetsxg = settings.currentbetsxg;
          this.clientpositionxg = settings.clientpositionxg;
          this.walletxg = settings.walletxg;
          this.authenticate = settings.authenticate;
          this.changepassword = settings.changepassword;
          this.accountstatement = settings.accountstatement;
          this.accountstatementsub = settings.accountstatementsub;
          this.casinobets = settings.casinobets;
          this.stakesget = settings.stakesget;
          this.stakespost = settings.stakespost;
          this.fancybets = settings.fancybets;
          this.exchangemybets = settings.exchangemybets;
          this.sportsbets = settings.sportsbets;
          this.pl = settings.pl;
          this.plmarketwise = settings.plmarketwise;
          this.plsportswise = settings.plsportswise;
          this.results = settings.results;
          this.activity = settings.activity;
          this.wallet = settings.wallet;
          this.jorhipost = settings.jorhipost;
          this.sportswallet = settings.sportswallet;
          this.xgwallet = settings.xgwallet;
          this.bookmakerordersplaced = settings.bookmakerordersplaced;
          this.matchunmatchlocalmarket = settings.matchunmatchlocalmarket;
          this.cancelorderslocal = settings.cancelorderslocal;
          this.sportscancelorders = settings.sportscancelorders;
          this.xgcancelorders = settings.xgcancelorders;
          this.fancyordersplaced = settings.fancyordersplaced;
          this.exchangenewstimer = settings.exchangenewstimer;
          this.casinodatatimer = settings.casinodatatimer;
          this.scorecardtimer = settings.scorecardtimer;
          this.linemarkettimer = settings.linemarkettimer;
          this.marketheadertimer = settings.marketheadertimer;
          this.bookmakertimer = settings.bookmakertimer;
          this.competitionmarkettimer = settings.competitionmarkettimer;
          this.scoretimer = settings.scoretimer;
          this.crickettimer = settings.crickettimer;
          this.fancytimer = settings.fancytimer;
          this.defaulttimer = settings.defaulttimer;
          this.eventmarkettimer = settings.eventmarkettimer;
          this.fancycomponenttimer = settings.fancycomponenttimer;
          this.inplaytimer = settings.inplaytimer;
          this.livestreamtimer = settings.livestreamtimer;
          this.marketdetailtimer = settings.marketdetailtimer;
          this.nextracetimer = settings.nextracetimer;
          this.racemarkettimer = settings.racemarkettimer;
          this.sportsbyidtimer = settings.sportsbyidtimer;
          this.timeremaining = settings.timeremaining;
          this.xgtimer = settings.xgtimer;



        }
      }).catch(er => {
        if (er.status == 401) {
          // this.router.navigate(['signin']);
          this.storageService.secureStorage.removeItem('token');
          window.location.href = window.location.origin

        } else {
          console.log(er)
        }
      });
  }



  public banners!: string;
  public eventtv!: string;
  public nextrace!: string;
  public getnews!: string;
  public gettv!: string;
  public matchunmatchallsports!: string;
  public timeline2!: string;
  public timeline1!: string;
  public casinopost!: string;
  public casinoget!: string;
  public clientpositionsports!: string;
  public clientpositionfancy!: string;
  public fancymarketsliability!: string;
  public racemarketcurrentbets!: string;
  public matchunmatchrace!: string;
  public matchunmatchsports!: string;
  public localmarketcurrentbets!: string;
  public fancymarkets!: string;
  public getwallet!: string;
  public runnergraph!: string;
  public sportsmarketliability!: string;
  public currentbetsall!: string;
  public mymarket!: string;
  public allmarketsliability!: string;
  public sportscurrentbets!: string;
  public racemarket!: string;
  public customtree!: string;
  public localordersplaced!: string;
  public sportsordersplaced!: string;
  public clientparameters!: string;
  public marketsbook!: string;
  public eventbydatemarkets!: string;
  public singlemarketbook!: string;
  public multiplescore!: string;
  public getcompetition!: string;
  public getcountries!: string;
  public geteventsbycountry!: string;
  public geteventsbydate!: string;
  public getevents!: string;
  public getgroupmarkets!: string;
  public getevent1!: string;
  public getevent2!: string;
  public getevent3!: string;
  public eventtypes!: string;
  public getfixtures!: string;
  public getmarkets!: string;
  public todayraces!: string;
  public geteventmarkets!: string;
  public linemarketsundermo!: string;
  public getcompetitonmarkets!: string;
  public raceschedule!: string;
  public getdefaultpage!: string;
  public eventmarkets!: string;
  public inplayevents!: string;
  public marketdetail!: string;
  public raceeventmarkets!: string;
  public sportsbyid!: string;
  public getxgdetails!: string;
  public matchunmatchxg!: string;
  public book!: string;
  public gamedetail!: string;
  public result!: string;
  public games!: string;
  public singlebook!: string;
  public cancelorders!: string;
  public ordersplacedxg!: string;
  public othersmarkets!: string;
  public currentbetsxg!: string;
  public clientpositionxg!: string;
  public walletxg!: string;
  public authenticate!: string;
  public changepassword!: string;
  public accountstatement!: string;
  public accountstatementsub!: string;
  public casinobets!: string;
  public stakesget!: string;
  public stakespost!: string;
  public fancybets!: string;
  public exchangemybets!: string;
  public sportsbets!: string;
  public pl!: string;
  public plmarketwise!: string;
  public plsportswise!: string;
  public results!: string;
  public activity!: string;
  public wallet!: string;
  public jorhipost!: string;
  public sportswallet!: string;
  public xgwallet!: string;
  public bookmakerordersplaced!: string;
  public matchunmatchlocalmarket!: string;
  public cancelorderslocal!: string;
  public sportscancelorders!: string;
  public xgcancelorders!: string;
  public fancyordersplaced!: string;
  public exchangenewstimer!: number;
  public casinodatatimer!: number;
  public scorecardtimer!: number;
  public linemarkettimer!: number;
  public marketheadertimer!: number;
  public bookmakertimer!: number;
  public competitionmarkettimer!: number;
  public scoretimer!: number;
  public crickettimer!: number;
  public fancytimer!: number;
  public defaulttimer!: number;
  public eventmarkettimer!: number;
  public fancycomponenttimer!: number;
  public inplaytimer!: number;
  public livestreamtimer!: number;
  public marketdetailtimer!: number;
  public nextracetimer!: number;
  public racemarkettimer!: number;
  public sportsbyidtimer!: number;
  public timeremaining!: number;
  public xgtimer!: number;


}
