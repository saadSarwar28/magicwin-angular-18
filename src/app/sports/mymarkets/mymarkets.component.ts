import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { CheckAuthService } from '../../services/check-auth.service';
import { _window } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
import { SportsIdMapperService } from "../../services/sportsIdMapper.service";
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-mymarkets',
  templateUrl: './mymarkets.component.html',
  styleUrls: []
})
export class MymarketsComponent implements OnInit {

  marketData: any[] = [];
  loadingData: any = false;
  siteLoader: string = ""
  constructor(private sportsIdMappser: SportsIdMapperService,
    private storageService: StorageService,
    private router: Router,
    private backendService: BackendService,
    private checkauthservice: CheckAuthService,
    private dialogRef: MatDialogRef<MymarketsComponent>
  ) {
  }

  toggleMarketData: boolean = false

  closeModal() {
    this.dialogRef.close(); // Close the dialog
  }

  rotate: boolean = false
  ngOnInit(): void {
    this.LoadData();
    if (_window().siteLoader) {
      this.siteLoader = _window().siteLoader;
    }
  }

  LoadData() {
    if (this.checkauthservice.IsLogin()) {
      this.rotate = true
      this.loadingData = true
      setTimeout(() => {
        this.rotate = false
      }, 500)
      this.backendService.MyMarkets().subscribe(
        {
          next: (res) => {
            this.loadingData = false;
            if (res && res.length > 0) {
              this.marketData = res
              this.marketData.forEach(element => {
                if (element.marketID.includes('10.')) {
                  element.marketID.replace('10.', '1.')
                }
              });
            }
          },
          error: (err) => {
            {
              this.loadingData = false;
              if (err.status == 401) {
                // this.router.navigate(['signin']);
                this.storageService.secureStorage.removeItem('token');
                window.location.href = window.location.origin

              } else {
                console.log(err)
              }
            }
          },
        }
      )
    }
  }
  bookmaker = [4, 6, 18, 19]
  tennisAndSccor = [1, 2]
  routeToMarket(m: any) {
    // console.log(m, ' <<<<<<<<<<<<<<<<<<<<<< ')
    if (m.eventID == '30186572') {
      this.router.navigate(['/sports/politics/usa-1.176878927/presidential-elections-1.176878927'])
      return
    }
    if (m.menuPath.includes('ICC World Cup T20 2024')) {
      this.router.navigate(['sports/marketdetail/1.206460179']);
    } else if (m.marketID.startsWith("10.")) {
      this.router.navigate([
        'sports/racemarket/' + m.marketID.replace('10.', '1.'),
      ]);
    } else if (this.bookmaker.includes(m.exchangeID)) {
      let tournamentName = m.menuPath.split('\\')[0].trim().toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
      let marketName = m.menuPath.split('\\')[1].trim().toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '').replace('-v-', '-vs-')
      this.router.navigate(['sports/bookmaker/' + tournamentName + '-' + m.eventID + '/' + marketName + '-' + m.eventID]);
    } else if (m.eventTypeID == 7) {
      this.router.navigate(['sports/horse-racing/all/' + m.marketID]);
    } else if (m.eventTypeID == 4339) {
      this.router.navigate(['sports/grey-hound-racing/all/' + m.marketID]);
    } else if (this.tennisAndSccor.includes(m.exchangeID)) {
      let menuPathSplit = m.menuPath.split('\\')
      let marketName = menuPathSplit[menuPathSplit.length - 1].toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
      marketName = marketName.replace('-v-', '-vs-')
      if (m.eventTypeID == 4) {
        if (m.menuPath.includes('ICC Champions Trophy') || m.menuPath.includes('Caribbean Premier League')) {
          this.router.navigate(['sports/' + this.sportsIdMappser.getSportById(m.eventTypeID) + '/' + marketName + '-' + m.marketID])
        } else {
          this.router.navigate(['sports/' + this.sportsIdMappser.getSportById(m.eventTypeID) + '/' + marketName + '-' + m.eventID])
        }
      } else {
        let eventName = menuPathSplit[0].toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
        this.router.navigate(['sports/' + this.sportsIdMappser.getSportById(m.eventTypeID) + '/' + marketName + '-' + m.eventID])
      }
    } else if (m.eventTypeID == 4) {
      let marketName = m.menuPath.split('\\')[m.menuPath.split('\\').length - 1].toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
      marketName = marketName.replace('-v-', '-vs-')
      this.router.navigate(['sports/cricket/' + marketName + '-' + m.eventID]);
    }
    this.closeModal()
  }



}
