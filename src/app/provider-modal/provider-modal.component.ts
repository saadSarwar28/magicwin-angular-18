import { Component, OnInit } from '@angular/core';
import { _window } from '../services/backend.service';
import { GenericService } from '../services/generic.service';
import { Router } from '@angular/router';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'app-provider-modal',
  templateUrl: './provider-modal.component.html',
  styleUrls: ['./provider-modal.component.css']
})
export class ProviderModalComponent implements OnInit {
  data:any={}
  qtcImage: any;
  constructor(
    private genericService:GenericService,
    private router:Router,
    private modalService: ModalService,

    ) { }

  ngOnInit(): void {
    if (_window().qtcPoints) {
      this.qtcImage = _window().qtcPoints;
      console.log("this.qtcImage",this.qtcImage)
    }
    if(this.data){
      console.log("data",this.data)
    }
  }

  close() {
      this.genericService.closeProviderModal()
  }

  accept() {
    this.navigateToGame()
  }

  navigateToGame() {

    // provider,
    // gameId,
    // isCheckUrl,
    // tableId,
    if (this.data.gameId && this.data.gameId) {
      const queryParams = {
        tableid: this.data.tableId
      };
      this.router.navigate(['/casino/detail/' + this.data.provider + '/' + this.data.gameId], { queryParams });
    }
    else if (this.data.gameId == 'QTC') {
      this.router.navigate(['/casino/detail/' + this.data.gameId + '/lobby']);
    }
    else if (this.data.provider == 'EZ') {
      this.router.navigate(['/casino/detail/' + this.data.provider + '/lobby'])
      return
    }
    else if (this.data.gameId) {
      this.router.navigate(['/casino/detail/' + this.data.provider + '/' + this.data.gameId]);
    } else {
      this.router.navigate(['/casino/casino-games/' + this.data.gameId]);
    }

    this.close()
    this.modalService.closeFilterModal()
  }
}
