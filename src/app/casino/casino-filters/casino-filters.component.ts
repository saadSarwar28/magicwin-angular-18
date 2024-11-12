import { Component, OnInit } from '@angular/core';
import { CasinoFilterMenusComponent } from '../casino-filter-menus/casino-filter-menus.component';
import { CasinoSearchComponent } from '../casino-search/casino-search.component';
import { UtillsService } from '../../services/utills.service';
import { _window } from '../../services/backend.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-casino-filters',
  templateUrl: './casino-filters.component.html',
  styleUrls: ['./casino-filters.component.scss']
})
export class CasinoFiltersComponent implements OnInit {
  display: boolean = false;
  cdnSportsLanding: any
  casinosArr: any[] = [
    {
      name: 'All Casino',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/All Casino.svg',
      link: "/casino/get/all"
    },
    {
      name: 'Popular Games',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Popular Games.svg',
      link: "/casino/catagory/popular"
    },
    {
      name: 'Crash Games',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Crash Games.svg',
      link: "/casino/catagory/instant-win"
    },
    {
      name: 'Multiplayer',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Multiplayer Games.svg',
      link: "/casino/catagory/multiplayer"
    },
    {
      name: 'Indian Casino',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Blackjack.svg',
      link: "/casino/indian-games"
    },
    {
      name: 'Lightning',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Lightning Games.svg',
      link: "/casino/catagory/lightning"
    },
    {
      name: 'roulette',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Roulette.svg',
      link: "/casino/catagory/roulette"
    },
    {
      name: 'teenpatti',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Teen Patti.svg',
      link: "/casino/catagory/teen-patti"
    },
    {
      name: 'livecasino',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Live Casino.svg',
      link: "/casino/catagory/live-casino"
    },
    {
      name: 'Andar Bahar',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Andar Bahar.svg',
      link: "/casino/catagory/andar-bahar"
    },
    // {
    //   name: 'Matka',
    //   imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/matka2.svg',
    //   link: "/casino/catagory/MATKA"
    // },
    {
      name: 'baccarat',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Baccarat.svg',
      link: "/casino/catagory/baccarat"
    },
    {
      name: 'black-jack',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Blackjack.svg',
      link: "/casino/catagory/blackjack"
    },
    {
      name: 'tablegames',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Table Games.svg',
      link: "/casino/catagory/table-game"
    },

    {
      name: 'poker',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Poker.svg',
      link: "/casino/catagory/poker"
    },
    // {
    //   name: 'betfairgames',
    //   imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/betfair2.svg',
    //   link: "/games"
    // },
    {
      name: 'slotgames',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Slot Games.svg',
      link: "/casino/catagory/slot"
    },
    {
      name: 'dragontiger',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Dragon Tiger.svg',
      link: "/casino/catagory/dragon-tiger"
    },
    {
      name: 'E-Sports',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/ESports.svg',
      link: "/casino/catagory/esports"
    },
    // {
    //   name: 'holdem',
    //   imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Holdem Games.svg',
    //   link: "/casino/catagory/HOLDEM"
    // },
    {
      name: 'providers',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/All Games.svg',
      link: "/casino/providers"
    },
    {
      name: 'Scratch Games',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Scratch Games.svg',
      link: "/casino/catagory/scratch"
    },

    {
      name: 'Shooting Games',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Shooting Games.svg',
      link: "/casino/catagory/shooting"
    },
    {
      name: 'Sicbo',
      imgSrc: 'https://iriscdn.b-cdn.net/kheloyar/clientweb/images/casino_icons/Sic Bo.svg',
      link: "/casino/catagory/sicbo"
    },
  ];
  constructor(private modalSer: ModalService, private utillsService: UtillsService,) { }

  ngOnInit(): void {
    //this.scrollToTheItem()
    this.cdnSportsLanding = _window().bannercdnLanding;
    this.utillsService.bannerData.subscribe((resp: any) => {
      if (resp) {
        let arr: any = Array.from(resp).filter((x: any) => x.type === "CasinoNav")
        if (arr && arr.length > 0 && arr[0].data && arr[0].data.length > 0) {
          this.casinosArr = arr[0].data
        }
      }
    })
  }

  routeToLink(link: any) {
    console.log(link)
    // this.router.navigate([link])
  }

  scrollToTheItem() {
    const links = document.querySelectorAll('.popular-tab .active');

    // Iterate through each link
    links.forEach(link => {
      // Add a click event listener
      link.addEventListener('click', () => {
        // Scroll to the selected item
        link.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }


  clickFilterModal = false;

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

  clickSearchModal = false;

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
