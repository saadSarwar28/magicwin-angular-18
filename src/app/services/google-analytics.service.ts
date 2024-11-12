import { Injectable } from '@angular/core';
declare let gtag:Function;
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: any = null,
    eventValue: any = null
  ){
    return
    try{

      gtag('event', eventName, {
        'event_category': eventCategory,
        'event_action': eventAction,
        'event_label': eventLabel,
        'event_value': eventValue
      })
    }
    catch(err){
      console.error(err)
    }
  }

  //EventEmitter for signup & login
  public eventEmitterSign(
    eventName: string,
    username:string
  ){
    return
    try{
      gtag('event', eventName, {
        'username': username
      })
    }
    catch(err){
      console.error(err)
    }
  }

  public eventEmitterRegister(
    event:string
  ){
    return
    try{

      gtag('config', 'GTM-T7XPV5F',{
        'event':event
      })
    } catch(err){
      console.error(err)
    }
  }

  public recordExceptions(excp:any){
    return
    try{

      gtag('event','exception',{
        'description': JSON.stringify(excp),
        'fatal': false   // set to true if the error is fatal
      });
    }
    catch(err){
      console.error(err)
    }
  }
}
