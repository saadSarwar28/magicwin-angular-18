import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ClientPosition, FancyMarketLiabilty } from '../../models/models';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-bookposition',
  templateUrl: './bookposition.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,


  ]
})
export class BookpositionComponent implements OnInit {
  @Input() marketId: string | undefined;
  @Input() marketName: string | undefined;
  positions: any[] = [];
  constructor(private sportservice: BackendService,
    public dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private platformService: PlatformService

  ) { }

  ngOnInit(): void {
    if (this.platformService.isBrowser()) {

      if (this.data.marketId?.startsWith('4.')) {
        this.sportservice.ClientPositionFancy(this.data.marketId).subscribe((x: any) => {
          x.forEach((a: FancyMarketLiabilty) => {
            this.positions.push({ position: parseInt(a.position), position2: parseInt(a.position2) });
          });
        })
      } else {
        this.sportservice
          .clientpositionsports(this.data.marketId)
          .subscribe((resp: ClientPosition[]) => {
            resp.forEach((a: any) => {
              this.positions.push({ position: parseInt(a.handicap), position2: parseInt(a.position) });
            });
          })

      }
    }
  }

  closeModal() {
    this.dialogRef.closeAll();
  }

}
