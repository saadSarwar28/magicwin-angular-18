import { ChangeDetectionStrategy, Component, Input, OnInit, Pipe, PipeTransform, SimpleChanges } from '@angular/core';
import { Results, XgameService } from '../../services/xgame.service';
import { ToastService } from '../../services/toaster.service';


@Component({
  selector: 'app-xgame-other-cards',
  templateUrl: './xgame-other-cards.component.html',
  styleUrls: ['./xgame-other-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class XgameOtherCardsComponent implements OnInit {
  gameData: any
  @Input() set channelData(v: any) {
    this.gameData = v;
  }
  @Input() id: any
  @Input() type: string = '';
  cdnUrl: string = 'https://dqqdyv927mezc.cloudfront.net/kheloyar'
  gameIds: any[] = [{ id: "1444086", handicap: false }, { id: "1444089", handicap: false }, { id: "1444116", handicap: true }, { id: "1444126", handicap: true }, { id: "1444093", handicap: false }, , { id: "1444096", handicap: false }]

  gameResult: any
  constructor(
    private gameservice: XgameService,
    private toastService: ToastService,

  ) {

  }

  currentGame: any;


  ngOnInit(): void {


  }

  ngOnChanges(changes: SimpleChanges): void {

    let game = this.gameIds.filter((game) => this.gameData.id == game.id);
    if (game && game.length > 0) {
      this.currentGame = game
    }
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


