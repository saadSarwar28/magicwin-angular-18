import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { _window, BackendService } from '../../services/backend.service';
import { NewsTimerService } from '../../services/timer.service';
import { StorageService } from '../../services/storage.service';
import { UtillsService } from '../../services/utills.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-newsticker',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './newsticker.component.html',
  styleUrl: './newsticker.component.scss'
})
export class NewstickerComponent implements OnInit{
  news: string = "";
  interval = 10000;

  constructor(
    private sportsService: BackendService,
    private newsTimerService: NewsTimerService,
    private storageService: StorageService,
    private utillsService: UtillsService) {
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
    })
    // .catch(err => {
    //   if (err.status == 401) {
    //     this.storageService.removeItem('token');
    //     window.location.href = window.location.origin
    //   } else {
    //     console.log(err);
    //   }
    // })
  }

  timer(timer: any) {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy() {
    this.newsTimerService.clearTimer()
  }

}
