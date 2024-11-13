import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { NextRaceTimerService } from '../../services/timer.service';
import { _window } from '../../services/backend.service';
import * as M from "materialize-css";
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-next-races',
  templateUrl: './next-races.component.html',
  styleUrls: ['./next-races.component.css']
})
export class NextRacesComponent implements OnInit {
  source: any;
  nextRaces: any;
  isLocal: boolean;
  today: Date = new Date();
  interval: any;
  constructor(
    private storageService: StorageService,
    private sportsService: BackendService,
    private router: Router,
    private nextRaceTimer: NextRaceTimerService
  ) {
    this.isLocal = false;
    if (_window().nextracetimer) {
      this.interval = _window().nextracetimer;
    }
  }

  ngOnInit(): void {
    this.LoadNextRaceData();
    if (_window().nextracetimer) {
      this.nextRaceTimer.SetTimer(setInterval(() => {
        this.LoadNextRaceData();
      }, this.interval));
    }
  }
  ngOnDestroy(): void {
    this.nextRaceTimer.clearTimer()
  }
  LoadNextRaceData() {
    this.sportsService.GetNextRace("NextRacesComponent").then((resp => {

      if (resp && resp.length > 0) {
        this.nextRaces = resp;
      }
    })).catch((err) => {

      if (err.status == 401) {
        this.nextRaceTimer.clearTimer();
        // this.router.navigate(['signin']);
        this.storageService.secureStorage.removeItem('token');
        window.location.href = window.location.origin

      } else {
        console.log(err)
        this.router.navigate([err.status]);
      }
    });
  }

  // splitOnSpace(trackName: any) {
  //   return trackName.split(" ")[0];
  // }
  showAbbr(trackName: any) {
    return trackName.substring(0, 5);
  }
}
