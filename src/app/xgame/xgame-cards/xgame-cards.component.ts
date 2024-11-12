import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Results, XgameService } from '../../services/xgame.service';
import { ToastService } from '../../services/toaster.service';


@Component({
  selector: 'app-xgame-cards',
  templateUrl: './xgame-cards.component.html',
  styleUrls: ['./xgame-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class XgameCardsComponent implements OnInit {
  gameData: any
  @Input() set channelData(v: any) {
    this.gameData = v;
  }
  @Input() id: any
  @Input() type: string = '';
  cdnUrl: string = 'https://dqqdyv927mezc.cloudfront.net/kheloyar'
  gameResult: any
  constructor(
    private gameservice: XgameService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {

  }


  GetResult(result: any) {
    // if (navigator.onLine == true && document.hidden == false) {
    this.gameservice.result(new Results(parseInt(this.id || ""), 0, 5)).then(resp => {

      if (resp.channel) {
        this.gameResult = resp.channel;
        // this.modalService.open(result, { size: 'xl', backdropClass: 'light-blue-backdrop' });
      } else {
        this.toastService.show(JSON.stringify(resp));
      }
    }).catch((err) => {
      console.log(err)
    });
    // }
  }




  openScrollableContent(longContent: any) {
    // this.modalService.open(longContent, { size: 'xl', backdropClass: 'light-blue-backdrop' });
  }
}
