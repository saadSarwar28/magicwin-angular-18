import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { ClientPosition, FancyMarketLiabilty } from '../../models/models';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bookposition',
  templateUrl: './bookposition.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BookpositionComponent implements OnInit {
  @Input() marketId: string | undefined;
  @Input() marketName: string | undefined;
  positions: any[] = [];
  constructor(private sportservice: BackendService,
    public dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    if (this.data.marketId?.startsWith('4.')) {
      this.sportservice.ClientPositionFancy(this.data.marketId, "BookpositionComponent").then((x: FancyMarketLiabilty[]) => {
        x.forEach((a: FancyMarketLiabilty) => {
          this.positions.push({ position: parseInt(a.position), position2: parseInt(a.position2) });
        });
      }).catch(err => {
        console.error(err);
      });
    } else {
      this.sportservice
        .clientpositionsports(this.data.marketId, "BookpositionComponent")
        .then((resp: ClientPosition[]) => {
          resp.forEach((a: any) => {
            this.positions.push({ position: parseInt(a.handicap), position2: parseInt(a.position) });
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  closeModal() {
    this.dialogRef.closeAll();
  }

}
