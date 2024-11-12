import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecentMarketsService {

  private recents: any[] = [];

  constructor() {}

  pushRecentMarkets(market:any) {
    const alreadyPresent = this.recents.some((item: any) => item.name === market.name);
    if (!alreadyPresent) {
      this.recents.push(market)
    }
  }

  getRecentMarkets(): string[] {
    return this.recents;
  }
}
