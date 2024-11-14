import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { BackendService } from '../../services/backend.service';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-racetodayscard',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './racetodayscard.component.html',
  styleUrl: './racetodayscard.component.scss'
})
export class RacetodayscardComponent {
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
    private platformService: PlatformService
  ) { }

  active: number | null = null;
  selectedData: any = {};
  isOpen(index: number, data: any) {
    this.selectedData = data;
    this.racingSchedule[this.selectedIndex].childs.forEach((element, ind) => {
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
      if (this.platformService.isBrowser()) {
        this.LoadRaceData();
      }
    }

  }
  activeTab
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
      .subscribe(
        (resp) => {
        if (resp.length > 0) {
          this.racingSchedule = resp;
          //
        }
      })
      // .catch((err) => {
      //   if (err.status == 401) {
      //     // this.router.navigate(['signin']);
      //     this.storageService.secureStorage.removeItem('token');
      //     window.location.href = window.location.origin;

      //   } else {
      //     console.log(err);
      //   }
      // });
  }
}
