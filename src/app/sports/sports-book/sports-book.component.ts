import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckAuthService } from "../../services/check-auth.service";
import { GenericService } from "../../services/generic.service";

@Component({
  selector: 'app-sports-book',
  styles: [
    `
      .main-market {
        padding: 5px;
        background: #1B1B28;
        margin: 10px 5px;
        border-radius: 5px;
      }

      .bf-runners-box-header {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: auto;
        color: black;
        font-weight: 700;
        font-style: normal;
        font-size: 13px;
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #13ff6f;
        box-shadow: 0 0 2px #00000047;
        border-radius: 3px 3px 0 0;
        opacity: 1;
        cursor: pointer;
      }

      .bf-runners-box-header :first-letter {
         text-transform: uppercase;
       }

      .bf-runners-box-odds-column {
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: auto;
        color: white;
        font-weight: 700;
        font-style: normal;
        position: relative;
        font-size: 13px;
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #272735;
        box-shadow: 0 0 2px #00000047;
        border-radius: 0 0 3px 3px;
        opacity: 1;
      }

      .bf-runners-container {
        gap: 10px;
        margin: 5px 0px;
        display: flex;
        justify-content: center;
        padding: 0px 3px;
        flex-wrap: wrap;
      }

      .bf-runners-box {
        flex-grow: 1;
        width: 195px;
      }

      .market-name {
        color: white;
      }

      .fancy-menu {
        padding: 8px 29px 6px 8px !important;
        font-size: 14px !important;
        background: var(--premium-heading-clr);
        border-top-right-radius: 50px;
        width: fit-content;
        color: white;
        font-weight: 500;
      }

      .runner-position-sportsbook {
        position: absolute;
        left: 85%;
      }

      @media (max-width: 600px) {
        .market-name {
          font-size: 12px;
        }
      }
    `
  ],
  template: `
    <div style="margin-top: 1px">
      <div class="details_box_sec col s12">
        <div class="matches_box_area" style="position: relative">
          <div class="sixteen_title" style="padding: 0px 12px 0px 0px">
            <div class="disp-flex">
              <div class="fancy-menu">Premium Odds</div>
            </div>
          </div>
          <div>
            <ng-container *ngFor="let sportsMarket of sportsBook | sortBy : 'sortingOrder';let i = index">
              <div class="main-market" *ngIf="sportsMarket.status == 'ACTIVE'">
                <div [attr.data-sort]="sportsMarket.sortingOrder">
                  <div class="sixteen_title_sports-book">
                    <div class="disp-flex" style="padding-left: 0px">
                      <div class="market-name">
                        {{ sportsMarket?.marketName }}
                        <span class="matched-amt">
                        <span *ngIf="sportsMarket?.liability"
                              style="color: red !important">(Liability: {{ sportsMarket?.liability }})</span>
                      </span>
                      </div>
                    </div>
                  </div>
                  <div class="collapse show d-flex flex-column splitToNextRowForBigRecords" style="position: relative; width: 100%">
                    <div class="bf-runners-container d-flex justify-content-between align-items-center flex-wrap w-100">
                      <ng-container *ngFor="let runner of sportsMarket.runners">
                        <div class="bf-runners-box" *ngIf="runner.runnerName">
                          <div class="bf-runners-box-header">
                            {{ runner.runnerName }}
                          </div>
                          <div class="bf-runners-box-odds-column" (click)="openBetSlipSportsBook(sportsMarket, runner)">
                            <span></span>
                            <span>{{ runner.rate }}</span>
                            <span class="runner-position-sportsbook"
                                  [ngStyle]="{'color': runner.position > 0 ? 'green' : 'red'}">
                            {{ runner.position }}
                          </span>
                          </div>
                        </div>
                      </ng-container>
                    </div>
                    <div *ngIf="selectedMarket && sportsMarket.marketId == selectedMarket.marketId">
                      <app-partial-betslip [r]="this.runner" (valueChange)="betPlaced($event)">
                      </app-partial-betslip>
                    </div>
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SportsBookComponent implements OnInit {

  @Input() sportsBook!: any
  @Input() matchId!: any
  @Output() betPlacedEvent = new EventEmitter<any>()
  runner!: any
  selectedMarket!: any

  constructor(private checkauthservice: CheckAuthService,) {
  }

  ngOnInit(): void {
  }

  openBetSlipSportsBook(market: any, runner: any) {
    if (this.checkauthservice.IsLogin()) {
      this.selectedMarket = market
      let _runner = {
        marketId: market.marketId,
        selectionid: runner.selectionId,
        name: runner.runnerName,
        handicap: 0,
        price: runner.rate,
        size: 100,
        bType: 'back',
        stakeButtons: this.checkauthservice.getstaks(),
        bettingOn: 'sb',
        bettingType: 'ODDS',
        marketType: 'MATCH_ODDS',
        linerange: null,
        eventId: this.matchId,
        minBet: 50,
        maxBet: 20000,
        isSportsBook: true
      };
      this.runner = _runner
    }
  }

  betPlaced(event: any) {
    if (event.success) {
      this.selectedMarket = undefined
      this.runner = undefined
      this.betPlacedEvent.emit(event)
    }
  }
}
