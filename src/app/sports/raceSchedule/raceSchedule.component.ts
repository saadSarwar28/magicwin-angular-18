import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DaysFormatPipePipe } from '../../pipes/days-format-pipe.pipe';
import { PlatformService } from '../../services/platform.service';
@Component({
  selector: 'app-raceschedule',
  templateUrl: './raceSchedule.component.html',
  styleUrls: ['./raceSchedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule,
    DaysFormatPipePipe
  ]
})
export class RaceScheduleComponent implements OnInit {
  sportsId: string = "";
  active = 0;
  activeTab: number = 0;
  type: string = "";
  racingSchedule: any;
  selectedIndex = 0;
  sportsType: string = "";
  constructor(
    private storageService: StorageService,
    private route: ActivatedRoute, private router: Router,
    private backendService: BackendService,
    private platformService: PlatformService
  ) {

  }
  activeIndex: any;
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
    if (this.platformService.isBrowser()) {

      this.route.params.subscribe((p: any) => {
        this.type = p.id1;
        if (this.router.url.includes('horse-racing')) {
          this.sportsType = "Horse Racing";
          this.sportsId = '7';
        } else {
          this.sportsType = "Greyhound Racing";
          this.sportsId = '4339';
        }
        if (this.type.toUpperCase() == "TODAY") {
          this.sportsType += " Today's Card";
        }

        this.checkPathandLoaddata();

      });
    }
  }
  changeIndex(d: string) {
    this.selectedIndex = this.racingSchedule.findIndex((x: any) => x.date == d);
  }
  checkPathandLoaddata() {
    let arr = ["7", "4339"]
    let types = ["ALL", "TODAY"];
    if (arr.some(x => x === this.sportsId)) {
      if (types.some(x => x === this.type?.toUpperCase())) {
        this.LoadRaceData();
      } else {
        this.router.navigate(['/sports/notfound']);
      }
    } else {
      this.router.navigate(['/sports/notfound']);
    }
  }

  LoadRaceData() {
    this.backendService.raceschedule(this.type.toUpperCase(), parseInt(this.sportsId), "RaceScheduleComponent").subscribe((resp) => {
      if (resp && resp.length > 0) {
        this.racingSchedule = resp;
        this.isOpen(0, this.racingSchedule[this.selectedIndex]?.childs[0])
      }
      else {
        this.racingSchedule = undefined
      }
    })
  }

}

