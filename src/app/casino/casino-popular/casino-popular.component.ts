import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CasinoFilterMenusComponent } from '../casino-filter-menus/casino-filter-menus.component';
import { ModalService } from '../../shared/services/modal.service';
import { CasinoSearchComponent } from '../casino-search/casino-search.component';
import { UtillsService } from '../../services/utills.service';
import { _window } from '../../services/backend.service';

@Component({
  selector: 'app-casino-popular',
  templateUrl: './casino-popular.component.html',
  styleUrls: ['./casino-popular.component.scss']
})
export class CasinoPopularComponent implements OnInit, AfterViewInit {
  display: boolean = false;
  cdnSportsLanding: any
  clickSearchModal = false;
  clickFilterModal = false;
  casinosArr: any[] = [];

  constructor(
    private modalSer: ModalService,
    private utillsService: UtillsService,
    private el: ElementRef,
  ) {
  }

  ngOnInit(): void {
    //this.scrollToTheItem()
    this.cdnSportsLanding = _window().bannercdnLanding;
    this.utillsService.bannerData.subscribe((resp: any) => {
      if (resp) {
        this.casinosArr = this.utillsService.returnFormatedData(resp, "CasinoNav")
      }
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollToActive();
    }, 1000)
  }

  scrollToActive() {
    const activeLi = this.el.nativeElement.querySelector('li.active');
    if (activeLi) {
      activeLi.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }


  openFilterModal() {
    if (this.clickFilterModal) {
      return false;
    }
    this.modalSer.openFilterModal(CasinoFilterMenusComponent);
    this.clickFilterModal = true;
    setTimeout(() => {
      this.clickFilterModal = false;
    }, 1000);
    return true;
  }


  openSearchModal() {
    if (this.clickSearchModal) {
      return false;
    }
    this.modalSer.openFilterModal(CasinoSearchComponent);
    this.clickSearchModal = true;
    setTimeout(() => {
      this.clickSearchModal = false;
    }, 1000);
    return true;
  }
}
