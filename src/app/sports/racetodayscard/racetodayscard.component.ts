import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-racetodayscard',
  templateUrl: './racetodayscard.component.html',
  styleUrls: ['./racetodayscard.component.scss'],
})
export class RacetodayscardComponent implements OnInit {
  @Input() sportsId: any;
  @Input() isDefault: boolean = true;

  type: string = '';
  racingSchedule: any;
  selectedIndex = 0;
  sportsType: string = '';
  activeIndex: any;
  iso: boolean = false;
  constructor(
    private storageService: StorageService,
    private backendService: BackendService,
  ) { }
  active: number | null = null;
  selectedData: any = {};
  isOpen(index: number, data: any) {
    this.selectedData = data;
    this.racingSchedule[this.selectedIndex].childs.forEach((element: any, ind: any) => {
      if (index == ind) {
        element.toggle = !element.toggle;
        this.activeIndex = element.toggle ? index : null;
      } else {
        element.toggle = false;
      }
    });
  }
  ngOnInit(): void {
    if (this.sportsId == '7') {
      this.sportsType =
        'https://iriscdn.b-cdn.net/kheloyar/new_icons/horse-racing.gif';
    } else {
      this.sportsType =
        'https://iriscdn.b-cdn.net/kheloyar/new_icons/Greyhound transparent.gif';
    }

    if (this.sportsId) {
      this.LoadRaceData();
    }

  }
  activeTab: any
  changeIndex(d: string) {
    this.selectedIndex = this.racingSchedule.findIndex((x: any) => x.date == d);
    this.activeTab = 0; // Reset the active tab to the first tab whenever the selected date changes
  }

  LoadRaceData() {
    this.backendService
      .raceschedule(
        'TODAY'.toUpperCase(),
        this.sportsId,
        'RaceScheduleComponent'
      )
      .then((resp) => {
        if (resp.length > 0) {
          this.racingSchedule = resp;
          //
        }
      })
      .catch((err) => {
        if (err.status == 401) {
          // this.router.navigate(['signin']);
          this.storageService.secureStorage.removeItem('token');
          window.location.href = window.location.origin;

        } else {
          console.log(err);
        }
      });
  }
}
