import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { NextRaceTimerService } from '../../services/timer.service';
import { _window } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
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
    this.sportsService.GetNextRace("NextRacesComponent").subscribe(((resp: any) => {
      if (resp && resp.length > 0) {
        this.nextRaces = resp;
      }
    }))
  }

  // splitOnSpace(trackName: any) {
  //   return trackName.split(" ")[0];
  // }
  showAbbr(trackName: any) {
    return trackName.substring(0, 5);
  }
}
