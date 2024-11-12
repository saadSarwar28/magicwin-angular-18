import { shortenLargeNumber, SetAmountXG1 } from "../../services/shortenLargeNumber";
declare let gtag: Function;
export class Channel {
  game: Game;

  constructor(public status: string,
              game: Game,
              public id: number,
              public name: string,
              public gameType: string) {
    this.game = new Game(game.round, game.bettingWindowTime, game.bettingWindowPercentageComplete, game.gameData, game.markets, game.id);
  }

  update(status: string, game: Game, id: number, name: string, gameType: string) {
    // this.status = status.replace(/_/g, '').toLowerCase();
    try {
      this.game.update(game.round, game.bettingWindowTime, game.bettingWindowPercentageComplete, game.gameData, game.markets, game.id);
      this.id = id;
      this.name = name;
      this.gameType = gameType;
    } catch (error) {
console.error(error);
    }
  }
}

export class Game {
  gameData: GameData;
  markets: Markets;

  constructor(public round: number,
              public bettingWindowTime: number,
              public bettingWindowPercentageComplete: number,
              gameData: GameData,
              markets: Markets,
              public id: number) {
    this.gameData = new GameData(gameData.objects);
    this.markets = new Markets(markets.markets, markets.currency);
  }

  update(round: number,
         bettingWindowTime: number,
         bettingWindowPercentageComplete: number,
         gameData: GameData,
         markets: Markets,
         id: number) {
    try {
      this.round = round;
    this.bettingWindowTime = bettingWindowTime;
    this.bettingWindowPercentageComplete = bettingWindowPercentageComplete;
    this.gameData.update(gameData.objects);
    this.markets.update(markets.markets, markets.currency);
    this.id = id;
    } catch (error) {
console.error(error);
    }
  }
}

export class GameData {
  objects: Object[];

  constructor(objects: Object[]) {
    this.objects = Array<Object>();
    if (objects !== undefined && objects.length > 0) {

      this.objects = Array<Object>();
      if (objects.length > 0) {
        objects.forEach(e => {
          this.objects.push(new Object(e.description, e.status, e.properties, e.name));
        });

      }else {
        this.objects = Array<Object>();
      }
    }else {
      this.objects = Array<Object>();
    }
  }

  update(objects: Object[]) {

   try {
    if (objects !== undefined && this.objects !== null) {

      if (objects.length > 0) {
        objects.forEach(e => {
          let c = this.objects.filter(x => x.name === (e.name=='Community Cards'?'Dealer':e.name.replace(' ', '')));
          if (c && c.length>0) {

            c[0].update(e.description, e.status, e.properties, e.name);
          }else{
           // console.warn(e);
          }
        });

      }else {
        this.objects = Array<Object>();
      }
    } else {
      this.objects = Array<Object>();
    }
   } catch (error) {
    console.error(error)
   }
  }
}

export class Object {
  description: string;
  status: string;
  properties: Property[];
  name: string;

  constructor(description: string, status: string,
      properies: Property[],
      name: string) {
      if (name === 'Community Cards') {
          this.name = 'Dealer';
      } else {
          this.name = name.replace(' ', '');
      }
      this.description = description;
      if (status === 'N/A') {
          this.status = 'IN_PLAY';
      } else {
          this.status = status;
      }
      this.properties = Array<Property>();
      if(properies){
      properies.forEach(e => {
          this.properties.push(new Property(e.name, e.value));
      });
    }

  }

  update(description: string, status: string, properes: Property[], name: string) {

      if (name === 'Community Cards') {

          this.name = 'Dealer';
      } else {
          this.name = name.replace(' ', '');
      }
      this.description = description;
      if (status === 'N/A') {
          this.status = 'IN_PLAY';
      } else {
          this.status = status;
      }

      if (properes !== undefined && properes.length > 0) {
          //this.properties = Array<Property>();

          // if(this.properties.length==0){
          //   properes.forEach(e=>{
          //     this.properties.push(new Property(e.name,e.value));
          //   });


          // }else {



              properes.forEach(x=>{
               let c= this.properties.filter(a=>a.name==x.name.replace(' ', ''));
                if(c && c.length>0){

                  c[0].Update(x.name,x.value);
                }else{
                 // console.warn('update card'+ x.value)
                  this.properties.push(new Property(x.name, x.value));
                }
              });


             if(this.properties.length!== properes.length){
               let b=this.properties.length;
             for (let i = 0; i < b; i++) {
                let c:any=[];
                try {
                  if(this.properties.length>=b){
                    c= properes.filter(a=>a.name.replace(' ', '')==this.properties[i].name);
                  }
                } catch (error) {
                  gtag('event','exception', {
                    'description':error,
                    'fatal':false
                  });
                }
                if(c && c.length>0){


                }else{
                  this.properties.splice(i,1);

                }
              }
             }

              // this.properties.forEach( (xx,i)=>{
              //   let xc=properes.filter(xa=>xa.name.replace(' ', '')==xx.name);
              //   if(xc==undefined || xc.length==0){
              //     this.properties.splice(i,1);
              //   }
              // })
         // }
          // properes.forEach(e => {
          //    let c = this.properties.filter(x => x.name === e.name.replace(' ', ''));
          //    if (c[0]) {
          //         c[0].Update(e.name, e.value);
          //     } else {
          //         this.properties.push(new Property(e.name, e.value));
          //     }
          // });
          // this.properties.sort((a,b)=>a.value.localeCompare(b.value));

    } else {
      this.properties = Array<Property>();
    }

  }
}

export class Property {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name.replace(' ', '');
    if (value === 'NOT AVAILABLE') {
      this.value = '55';
    } else {
      this.value = value;
    }
  }

  Update(name: string, value: string) {
    this.name = name.replace(' ', '');
    if (value === 'NOT AVAILABLE') {
      this.value = '55';
    } else {
      this.value = value;
    }
  }
}

export class Market {
  selections: Selections;

  constructor(public status: string,
              public commissionRate: number,
              public marketType: string,
              selections: Selections,
              public id: number,
              public nextId: number) {
    this.selections = new Selections(selections.selections, selections.type);
  }

  update(status: string, commissionRate: number, marketType: string, selections: Selections,
         id: number, nextId: number) {
    this.selections.update(selections.selections, selections.type,status);

    this.status = status;
    this.commissionRate = commissionRate;
    this.marketType = marketType;
    this.nextId = nextId;
    this.id = id;
  }
}

export class Markets {
  markets: Market[]

  constructor(markets: Market[], public currency: string) {
    this.markets = Array<Market>();
    markets.forEach(e => {
      this.markets.push(new Market(e.status, e.commissionRate, e.marketType, e.selections, e.id, e.nextId));
    });
  }

  update(markets: Market[], currency: string) {
    if (this.markets.length > 0) {
      if (markets.length > 0) {
        markets.forEach(e => {
          let b = this.markets.filter(x => x.marketType == e.marketType && x.selections.selections.length== e.selections.selections.length);
          if (b !== undefined && b !== null && b.length > 0) {
            b[0].update(e.status, e.commissionRate, e.marketType, e.selections, e.id, e.nextId);
          }
        });
      }
    }
    this.currency = currency;
  }
}

export class Selection {
  bestAvailableToBackPrices: BestAvailableToBackPrices;
  bestAvailableToLayPrices: BestAvailableToLayPrices;
  betslip:any;
  position:any;
  rPosition:any;
  constructor(public name: string,
              public resource: Resource,
              public status: string,
              public amountMatched: number,
              bestAvailableToBackPrices: BestAvailableToBackPrices,
              bestAvailableToLayPrices: BestAvailableToLayPrices,
              public id: number) {
    this.bestAvailableToBackPrices = new BestAvailableToBackPrices(bestAvailableToBackPrices.prices);
    this.bestAvailableToLayPrices = new BestAvailableToLayPrices(bestAvailableToLayPrices.prices);
  }

  update(name: string,
         resource: Resource,
         status: string,
         amountMatched: number,
         bestAvailableToBackPrices: BestAvailableToBackPrices,
         bestAvailableToLayPrices: BestAvailableToLayPrices,
         id: number,mStatus="") {
           if(mStatus!='ACTIVE'){

             this.betslip=null;
           }
    this.id = id;
    // this.resource.Update(resource.href, resource.title, resource.responseType);
    this.status = status;
    this.amountMatched = amountMatched;
    this.name = name.replace(/\s/g, "").toLowerCase();
    // debugger
    this.bestAvailableToBackPrices.update(bestAvailableToBackPrices.prices);
    this.bestAvailableToLayPrices.update(bestAvailableToLayPrices.prices);
  }

}

export class Selections {
  selections: Selection[];
  type: string;

  constructor(selections: Selection[], type: string) {
    this.selections = Array<Selection>();
    if (selections) {
      selections.forEach(e => {
        this.selections.push(new Selection(e.name.replace(/\s/g, "").toLowerCase(), e.resource, e.status, e.amountMatched, e.bestAvailableToBackPrices, e.bestAvailableToLayPrices, e.id));
      });
    }
    //this.type = type.replace(/([a-z])([A-Z])/g, '$1 $2');

    this.type = type;
    //console.warn('from constructor :'+ this.type);
  }

  update(selections: Selection[], type: string,status:string) {
    if (selections === undefined || selections === null) {
      this.selections = Array<Selection>();
    } else {
      if (this.selections.length > 0) {
        selections.forEach(element => {
          let b = this.selections.filter(x => x.id === element.id)[0];
          if (b) {
            b.update(element.name.replace(/ /g, '').toLowerCase(), element.resource, element.status, element.amountMatched, element.bestAvailableToBackPrices, element.bestAvailableToLayPrices, element.id,status);
          }
        });
      } else {
        selections.forEach(e => {
          this.selections.push(new Selection(e.name.replace(/ /g, '').toLowerCase(), e.resource, e.status, e.amountMatched, e.bestAvailableToBackPrices, e.bestAvailableToLayPrices, e.id));
        });
      }
    }
   // this.type = type.replace(/([a-z])([A-Z])/g, '$1 $2');
  // this.type = type;
   if(this.type != type){
    //console.warn('from update :'+ this.type);
   }
  }

}

export class BestAvailableToLayPrices {
  prices: Price[]

  constructor(prices: Price[]) {
    this.prices = Array<Price>();
    if (prices !== undefined) {
      if (prices.length > 2) {
        this.prices.push(new Price(prices[0].value, prices[0].amountUnmatched));
        this.prices.push(new Price(prices[1].value, prices[1].amountUnmatched));
        this.prices.push(new Price(prices[2].value, prices[2].amountUnmatched));
      } else if (prices.length > 1) {
        this.prices.push(new Price(prices[0].value, prices[0].amountUnmatched));
        this.prices.push(new Price(prices[1].value, prices[1].amountUnmatched));
        this.prices.push(new Price(0, 0));
      } else if (prices.length > 0) {
        this.prices.push(new Price(prices[0].value, prices[0].amountUnmatched));
        this.prices.push(new Price(0, 0));
        this.prices.push(new Price(0, 0));
      }
    } else {
      this.prices.push(new Price(0, 0));
      this.prices.push(new Price(0, 0));
      this.prices.push(new Price(0, 0));
    }
  }

  update(prices: Price[]) {
    if (prices !== undefined) {
      if (prices.length > 2) {
        this.prices[0].update(prices[0].value, prices[0].amountUnmatched);
        this.prices[1].update(prices[1].value, prices[1].amountUnmatched);
        this.prices[2].update(prices[2].value, prices[2].amountUnmatched);
      } else if (prices.length > 1) {
        this.prices[0].update(prices[0].value, prices[0].amountUnmatched);
        this.prices[1].update(prices[1].value, prices[1].amountUnmatched);
        this.prices[2].update(0, 0);
      } else if (prices.length > 0) {
        this.prices[0].update(prices[0].value, prices[0].amountUnmatched);
        this.prices[1].update(0, 0);
        this.prices[2].update(0, 0);
      }
    } else {
      this.prices[0].update(0, 0);
      this.prices[1].update(0, 0);
      this.prices[2].update(0, 0);
    }
  }
}

export class BestAvailableToBackPrices {
  prices: Price[]

  constructor(prices: Price[]) {
    this.prices = Array<Price>();
    if (prices !== undefined) {
      if (prices.length > 2) {
        this.prices.push(new Price(prices[0].value, prices[0].amountUnmatched));
        this.prices.push(new Price(prices[1].value, prices[1].amountUnmatched));
        this.prices.push(new Price(prices[2].value, prices[2].amountUnmatched));
      } else if (prices.length > 1) {
        this.prices.push(new Price(prices[0].value, prices[0].amountUnmatched));
        this.prices.push(new Price(prices[1].value, prices[1].amountUnmatched));
        this.prices.push(new Price(0, 0));
      } else if (prices.length > 0) {
        this.prices.push(new Price(prices[0].value, prices[0].amountUnmatched));
        this.prices.push(new Price(0, 0));
        this.prices.push(new Price(0, 0));
      }
    } else {
      this.prices.push(new Price(0, 0));
      this.prices.push(new Price(0, 0));
      this.prices.push(new Price(0, 0));
    }
  }

  update(prices: Price[]) {
    if (prices !== undefined) {
      if (prices.length > 2) {
        this.prices[0].update(prices[0].value, prices[0].amountUnmatched);
        this.prices[1].update(prices[1].value, prices[1].amountUnmatched);
        this.prices[2].update(prices[2].value, prices[2].amountUnmatched);
      } else if (prices.length > 1) {
        this.prices[0].update(prices[0].value, prices[0].amountUnmatched);
        this.prices[1].update(prices[1].value, prices[1].amountUnmatched);
        this.prices[2].update(0, 0);
      } else if (prices.length > 0) {
        this.prices[0].update(prices[0].value, prices[0].amountUnmatched);
        this.prices[1].update(0, 0);
        this.prices[2].update(0, 0);
      }
    } else {
      this.prices[0].update(0, 0);
      this.prices[1].update(0, 0);
      this.prices[2].update(0, 0);
    }
  }
}

export class Price {
  isChanged: boolean;
  value: number;
  amountUnmatched: number;

  odd: string;
  stake: string;

  constructor(value: number, amountUnmatched: number) {
    this.value = value;
    this.amountUnmatched = amountUnmatched;
    this.isChanged = true;
    this.odd = this.value === 0 ? "" : this.value.toString();
    this.stake =   shortenLargeNumber(SetAmountXG1(amountUnmatched));
  }

  update(value: number, amountUnmatched: number) {
    if (this.value !== value) {
      this.value = value;
      this.isChanged = true;
    } else {
      this.isChanged = false;
    }
    if (this.amountUnmatched !== amountUnmatched) {
      this.amountUnmatched = amountUnmatched;
      this.isChanged = true;
    } else {
      this.isChanged = false;
    }
    this.odd = this.value === 0 ? "" : this.value.toString();
    this.stake =   shortenLargeNumber(SetAmountXG1(amountUnmatched))
  }
}

export class Resource {
  constructor(public href: string, public title: string, public responseType: string) {
  }

  Update(href: string, title: string, responseType: string) {
    this.responseType = responseType;
    this.title = title;
    this.href = href;
  }
}
