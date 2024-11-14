import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService, _window } from '../../services/backend.service';
import { StorageService } from '../../services/storage.service';
import { UtillsService } from "../../services/utills.service";
import { NewsTimerService } from "../../services/timer.service";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-newsticker',
  templateUrl: './newsticker.component.html',
  styleUrls: ['./newsticker.component.css'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
  ]
})
export class NewstickerComponent implements OnInit, OnDestroy {
  news: string = "";
  interval = 10000;

  constructor(private sportsService: BackendService, private newsTimerService: NewsTimerService, private storageService: StorageService, private utillsService: UtillsService) {
  }

  ngOnInit(): void {
    // if (_window().newsTimer) {
    //   this.interval = _window().newsTimer
    // }
    // this.interval
    this.getNews();
    // this.utillsService.bannerData.subscribe((data: any) => {
    //   if (data) {
    //     let newsFound = false
    //     data.forEach((banner: any) => {
    //       if (banner.type == 'News') {
    //         if (banner.data[0].link !== '') {
    //           this.news = banner.data[0].link
    //           newsFound = true
    //         }
    //       }
    //     })
    //     if (!newsFound) {
    //       this.newsTimerService.SetTimer(setInterval(() => {
    //         this.getNews()
    //       }, this.interval))
    //     }
    //   }
    // })
  }


  getNews() {
    this.sportsService.GetNews().subscribe(_resp => {
      if (_resp) {
        this.news = _resp
      } else {
        this.news = _window().marquee_text;
      }
    }, err => {
      if (err.status == 401) {
        this.storageService.removeItem('token');
        window.location.href = window.location.origin
      } else {
        console.log(err);
      }
    }

    )
  }

  timer(timer: any) {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy() {
    this.newsTimerService.clearTimer()
  }

}
