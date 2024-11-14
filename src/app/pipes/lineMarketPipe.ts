import { Pipe, PipeTransform } from "@angular/core";
import { _window } from "../services/backend.service";



interface GroupedMarket {
  name: string;
  data: any[];
  collapse: boolean
}
@Pipe({
  name: 'groupAndSortLineMarkets',
  standalone: true,
})
export class GroupAndSortLineMarketsPipe implements PipeTransform {
  showLineOtherMarkets: boolean = false

  transform(markets: any[]): GroupedMarket[] {
    if (_window().showLineOtherMarkets) {
      this.showLineOtherMarkets = _window().showLineOtherMarkets;
    }
    const groupedMarkets: { [key: string]: GroupedMarket } = {
      toWinToss: {
        name: 'To Win the Toss',
        data: [],
        collapse: false,
      },
      completedMatch: {
        name: 'Completed Match',
        data: [],
        collapse: false,

      },
      tiedMatch: {
        name: 'Tied Match',
        data: [],
        collapse: false,

      },
      lineMarkets: {
        name: 'Line Markets',
        data: [],
        collapse: false,

      }
    };


    let allMarkets = Object.values(groupedMarkets).map((market: any) => market.name)
    if (markets && markets.length > 0) {
      markets.forEach((market: any) => {
        if (this.showLineOtherMarkets) {
          if (market.marketName === 'To Win the Toss') {
            groupedMarkets['toWinToss'].data.push(market);
          } else if (market.marketName === 'Completed Match') {
            groupedMarkets['completedMatch'].data.push(market);
          } else if (market.marketName === 'Tied Match') {
            groupedMarkets['tiedMatch'].data.push(market);
          }
        }
        if (!allMarkets.includes(market.marketName)) {
          market.runnerName = market.marketName;
          groupedMarkets['lineMarkets'].data.push(market);
        }
      });
    }


    const sortOrder = ['To Win the Toss', 'Completed Match', 'Tied Match', 'Line Markets'];

    return Object.values(groupedMarkets)
      .sort((a, b) => sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name));
  }
}
