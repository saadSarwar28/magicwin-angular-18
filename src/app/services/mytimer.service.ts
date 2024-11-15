import { Injectable } from '@angular/core';
import { _window } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class MytimerService {

  private source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.timer = s;
  }
  clearTimer() {
    if (this.source.timer) {
      window.clearTimeout(this.source.timer);
    }
    if (this.source.timer) {
      window.clearInterval(this.source.timer);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class WalletTimerService {

  public source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.WalletTimer = s;
  }
  clearTimer() {
    if (this.source.WalletTimer) {
      window.clearTimeout(this.source.WalletTimer);
    }
    if (this.source.WalletTimer) {
      window.clearInterval(this.source.WalletTimer);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class FancytimerService {

  public source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.Fancytimer = s;
  }
  clearTimer() {
    if (this.source.Fancytimer) {
      window.clearTimeout(this.source.Fancytimer);
    }
    if (this.source.Fancytimer) {
      window.clearInterval(this.source.Fancytimer);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class LotterytimerService {

  public source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.Lotterytimer = s;
  }
  clearTimer() {
    if (this.source.Lotterytimer) {
      window.clearTimeout(this.source.Lotterytimer);
    }
    if (this.source.Lotterytimer) {
      window.clearInterval(this.source.Lotterytimer);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class SportsBookTimerService {

  public source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.SportsBooktimer = s;
  }
  clearTimer() {
    if (this.source.SportsBooktimer) {
      window.clearTimeout(this.source.SportsBooktimer);
    }
    if (this.source.SportsBooktimer) {
      window.clearInterval(this.source.SportsBooktimer);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ScoreCardTimerService {

  public source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.ScoreCardTimer = s;
  }
  clearTimer() {
    if (this.source.ScoreCardTimer) {
      window.clearTimeout(this.source.ScoreCardTimer);
    }
    if (this.source.ScoreCardTimer) {
      window.clearInterval(this.source.ScoreCardTimer);
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class ScoreTimerService {

  public source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.ScoreTimer = s;
  }
  clearTimer() {
    if (this.source.ScoreTimer) {
      window.clearTimeout(this.source.ScoreTimer);
    }
    if (this.source.ScoreTimer) {
      window.clearInterval(this.source.ScoreTimer);
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class NextRaceTimerService {

  public source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.NextRaceTimer = s;
  }
  clearTimer() {
    if (this.source.NextRaceTimer) {
      window.clearTimeout(this.source.NextRaceTimer);
    }
    if (this.source.timer) {
      window.clearInterval(this.source.NextRaceTimer);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class NewsTimerService {

  public source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.NewsTimer = s;
  }
  clearTimer() {
    if (this.source.NewsTimer) {
      window.clearTimeout(this.source.NewsTimer);
    }
    if (this.source.NewsTimer) {
      window.clearInterval(this.source.NewsTimer);
    }
  }
}


@Injectable({
  providedIn: 'root'
})
export class MarketTimerService {

  public source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.MarketTimer = s;
  }
  clearTimer() {
    if (this.source.MarketTimer) {
      window.clearTimeout(this.source.MarketTimer);
    }
    if (this.source.MarketTimer) {
      window.clearInterval(this.source.MarketTimer);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RemainingTimerService {

  private source = _window();
  constructor() { }
  SetTimer(s: any) {
    this.clearTimer();
    this.source.RemainingTimer = s;
  }
  clearTimer() {
    if (this.source.RemainingTimer) {
      window.clearTimeout(this.source.RemainingTimer);
    }
    if (this.source.RemainingTimer) {
      window.clearInterval(this.source.RemainingTimer);
    }
  }
}
