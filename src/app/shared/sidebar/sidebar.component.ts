import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import {
  BackendService,
  CasinoRequest,
  PopularSports,
  TodayRacesASSS,
  _window,
} from 'src/app/services/backend.service';
import { StorageService } from 'src/app/services/storage.service';
import { Observable, Subscription } from 'rxjs';
import {
  CustomMenu,
  CustomTreeModel,
  IMenu,
  Menu,
  RaceEvents,
} from 'src/app/models/models';
import { FormControl } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastService } from 'src/app/services/toast.service';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { UtillsService } from 'src/app/services/utills.service';
import { SportsIdMapperService } from "../../services/sportsIdMapper.service";
import { GenericService } from 'src/app/services/generic.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  filter = true;
  showVS: any = false;
  showHidePopularSports: any;
  toggleSports: any;
  @Output() childButtonEvent = new EventEmitter();
  @Input() events!: Observable<void>;
  eventsSubscription: Subscription | undefined;
  showhidesidebar: string = '1';
  data: Menu[] = [];
  dataPopular: PopularSports[] = [];
  showLoader = false;
  routeChangefromtree = false;
  public isCollapsed = false;
  isLogin = false;
  avoidEventCall: any = false;
  typeahead: FormControl = new FormControl();
  // countries: string[] = countries;
  suggestions: any[] = [];
  deviceInfo: any;
  setTop: boolean = false;
  isShowSidebarLink: boolean = false;
  SidebarCasino: any = [];
  apkLink =
    _window().apkLink ||
    'https://drive.google.com/file/d/1zqP0opcg_lKEj60O-iURLLNHXERHfcjU/view?usp=drivesdk';
  isShowDownlaodApp: boolean = false;
  sidebartop: any = [];
  sitename: string = ''
  constructor(
    private storageService: StorageService,
    private backendService: BackendService,
    private router: Router,
    private toastService: ToastService,
    private deviceService: DeviceDetectorService,
    private checkauthservice: CheckAuthService,
    public utillsService: UtillsService,
    private sportsMapperService: SportsIdMapperService,
    private genericService: GenericService
  ) {
    //debugger
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isLogin = this.checkauthservice.IsLogin();
    this.router.events.subscribe((v) => {
      if (v instanceof NavigationStart) {
        let notLoadSideBar = ['games', 'reports', 'casino', 'user', 'deposit']
        if (
          notLoadSideBar.includes(v.url)
        ) {
          this.avoidEventCall = true;
        } else {
          this.avoidEventCall = false;
        }


        if (!this.routeChangefromtree) {
          let menus = ['', 'sports', 'all', 'inplay']
          if (
            v.url.split('/').length == 2 &&
            (menus.includes(v.url.split('/')[1]) || menus.includes(v.url.split('/')[2]))
          ) {
            this.LoadSports();
          } else
            if (
              v.url.split('/').length > 2 &&
              v.url.split('/')[1].toLocaleLowerCase() == 'sports' && (!menus.includes(v.url.split('/')[2]))
            ) {
              //debugger
              if (v.url.toLowerCase() == '/sports/soccer') {
                let S: Menu = new Menu({
                  childNode: 'getcompetition/1',
                  detail: 'sportsbyid/1',
                  id: '1',
                  inPlay: null,
                  isMarket: null,
                  name: 'Soccer',
                  url: 'soccer'
                });
                this.data = [];
                this.data[0] = S;
                this.loadCustom(S, 'a');
              } else {
                this.backendService
                  .customtree(new CustomTreeModel(v.url), 'SidebarComponent')
                  .then((resp: CustomMenu) => {
                    if (resp) {
                      this.data = [];
                      let m: IMenu = {
                        id: resp.id,
                        name: resp.name,
                        childNode: resp.childNode,
                        detail: resp.detail,
                        isMarket: resp.isMarket,
                        inPlay: resp.inPlay,
                        url: resp.url
                      };
                      let top = new Menu(m);
                      this.data.push(top);
                      if (resp.childs && resp.childs.length > 0) {
                        resp.childs.forEach((ch) => {
                          let a: Menu = new Menu({
                            id: ch.id,
                            name: ch.name,
                            childNode: ch.childNode,
                            detail: ch.detail,
                            isMarket: ch.isMarket,
                            inPlay: ch.inPlay,
                            url: ch.url
                          });
                          top.childs.push(a);
                          if (ch.childs && ch.childs.length > 0) {
                            ch.childs.forEach((aa) => {
                              let b: Menu = new Menu({
                                id: aa.id,
                                name: aa.name,
                                childNode: aa.childNode,
                                detail: aa.detail,
                                isMarket: aa.isMarket,
                                inPlay: aa.inPlay,
                                url: aa.url
                              });
                              a.childs.push(b);
                              if (aa.childs && aa.childs.length > 0) {
                                aa.childs.forEach((bb: CustomMenu) => {
                                  if (bb.startTime)
                                    bb.name =
                                      (
                                        '0' + new Date(bb.startTime).getHours()
                                      ).slice(-2) +
                                      ':' +
                                      (
                                        '0' + new Date(bb.startTime).getMinutes()
                                      ).slice(-2) +
                                      ' ' +
                                      bb.name;
                                  let c: Menu = new Menu({
                                    id: bb.id,
                                    name: bb.name,
                                    childNode: bb.childNode,
                                    detail: bb.detail,
                                    isMarket: bb.isMarket,
                                    inPlay: bb.inPlay,
                                    url: bb.url
                                  });
                                  b.childs.push(c);
                                  if (bb.childs && bb.childs.length > 0) {
                                    bb.childs.forEach((cc: CustomMenu) => {
                                      let d: IMenu = {
                                        id: cc.id,
                                        name: cc.name,
                                        childNode: cc.childNode,
                                        detail: cc.detail,
                                        isMarket: cc.isMarket,
                                        inPlay: cc.inPlay,
                                        url: cc.url
                                      };
                                      c.childs.push(d);
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                        // console.log(this.data);
                      }
                    }
                  })
                  .catch((err) => {
                    if (err.status == 401) {
                      // this.router.navigate(['signin']);
                      this.storageService.secureStorage.removeItem('token');
                      window.location.href = window.location.origin;
                    } else {
                      console.log(err);
                    }
                  });
              }
            }
            else {
              if (!this.avoidEventCall) {
                if (
                  !notLoadSideBar.includes(v.url.split('/')[1]) || menus.includes(v.url.split('/')[2])
                ) {
                  this.backendService
                    .eventtypes('SidebarComponent')
                    .then((resp: Menu[]) => {
                      this.data = resp;
                      this.showLoader = false;
                    })
                    .catch((er) => {
                      if (er.status == 401) {
                        // this.router.navigate(['signin']);
                        this.storageService.secureStorage.removeItem('token');
                        window.location.href = window.location.origin;

                      } else {
                        console.log(er);
                      }
                    })
                }
              }

            }

          // else if (
          //   v.url.split('/')[1].toLocaleLowerCase() == 'sports'
          // ) {
          //   this.showLoader = true;
          //   if (!this.avoidEventCall) {
          //     console.log("avoidEventCall")

          //     this.backendService
          //       .eventtypes('SidebarComponent')
          //       .then((resp: Menu[]) => {
          //         this.data = resp;
          //         this.showLoader = false;
          //       })
          //       .catch((er) => {
          //         if (er.status == 401) {
          //           // this.router.navigate(['signin']);
          //           this.storageService.secureStorage.removeItem('token');
          //           window.location.href = window.location.origin;

          //         } else {
          //           console.log(er);
          //         }
          //       });
          //   }
          // }
        }
      }
    });
  }
  getSidebarData() {
    this.utillsService.bannerData.subscribe((res => {
      if (res) {
        this.sidebartop = this.utillsService.returnFormatedData(res, 'Sidebartop')
        this.SidebarCasino = this.utillsService.returnFormatedData(res, 'SidebarCasino')
      }
    }))
  }
  cdnSportsLanding: string = '';
  isIframe: boolean = false;
  siteLogo: string = ''
  ngOnInit(): void {
    if (_window().sideBarLogo) {
      this.siteLogo = _window().sideBarLogo;
    }
    this.cdnSportsLanding = _window().bannercdnLanding;
    this.getSidebarData();
    if (_window().isShowSidebarLink) {
      this.isShowSidebarLink = _window().isShowSidebarLink;
    }
    if (_window().virtualSportOnOff) {
      this.showVS = _window().virtualSportOnOff;
    }
    if (_window().sitename) {
      this.sitename = _window().sitename;
    }
    if (_window().isShowDownlaodApp) {
      this.isShowDownlaodApp = _window().isShowDownlaodApp;
    }
    if (_window().isIframe) {
      this.isIframe = _window().isIframe
    }
    if (_window().isIframe) {
      this.isIframe = _window().isIframe
    }

  }



  clearField(data: any) {
    this.suggestions = [];
    (<HTMLInputElement>document.getElementById('list')).value = '';
    let eventName = data.eventName.trim().toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '').replace('-v-', '-vs-')
    let marketName = data.marketName.trim().toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '')
    this.router.navigate(['sports/' + this.sportsMapperService.getSportById(data.eventTypeID) + '/' + eventName + '/' + marketName + '-' + data.marketID])
  }

  LoadSports() {
    if (!this.avoidEventCall) {
      this.backendService
        .eventtypes('SidebarComponent')
        .then((resp: Menu[]) => {
          this.data = resp;
          this.showLoader = false;
        })
        .catch((err) => {
          if (err.status == 401) {
            this.storageService.secureStorage.removeItem('token');
            window.location.href = window.location.origin;
          } else {
            console.log(err);
          }
        });
    }
  }
  getPopularsports() {
    // this.backendService.GetPopularSports().then((resp: PopularSports[]) => {
    //   this.dataPopular = resp;
    // });
  }
  directLobby() {
    if (!this.isLogin) {
      this.genericService.openLoginModal();
    } else {
      // let elems = document.querySelector('#nav-mobile');
      // let instances = M.Sidenav.getInstance(elems);
      // if (instances) {
      //   instances.close();
      // }
      this.router.navigate(['/casino/detail/BR/lobby']);
    }
  }
  loadCasino(casino: string, type?: string | undefined) {
    let gameId = casino === 'AWC' ? 'MX-LIVE-009' : undefined;
    let isDemo = false;
    if (!this.isLogin && casino == 'QTC') {
      isDemo = true;
    }
    this.backendService.gameUrl = undefined;
    this.backendService
      .sSCasino_POST(
        new CasinoRequest(
          casino,
          type,
          gameId,
          isDemo,
          this.deviceInfo.deviceType,
          undefined,
          undefined
        )
      )
      .then((resp) => {
        if (resp && resp.url) {
          this.router.navigateByUrl('/casino/' + casino, {
            state: { iframeurl: resp.url },
          });
        } else {
          // this.toastService.show(resp.msg, {
          //   classname: 'bg-danger text-light',
          //   delay: 1000,
          // });
          this.genericService.openLoginModal();
        }
      })
      .catch((err) => {
        this.toastService.show(err, {
          classname: 'bg-danger text-light',
          delay: 1000,
        });
      });
  }
  FindLast(xs: any): any {
    return xs.reduce((acc: any, x: any) => {
      if (!Array.isArray(x)) {
        x.active = false;
      }
      if (Array.isArray(x.childs)) {
        var last = x.childs;

        if (last.length > 0) {
          return this.FindLast(last);
        }
        x.active = false;
        return xs;
      }

      return acc;
    }, []);
  }

  LoadChild(m: Menu, level: string) {
    // console.log(m, level, ' <<<<<<<<<<<<<<<<<<<<<<<< menu and level')
    if (m.id == '12306853' || m.id == '1721131733') {
      // in case of USA - Presidential Election 2024 politics do nothing
      return;
    }
    if (m.detail != null) {
      m.filter = true;
      this.filter = false;
      this.routeChangefromtree = true;
      let lsItem: any = this.storageService.secureStorage
        .getItem('classicTheme')
        ?.toString();
      if (lsItem == 'classic-theme') {
        // if (m.isMarket) {
        this.router
          .navigate(['/classic/' + m.detail])
          .then((x) => (this.routeChangefromtree = !x));
        // let elems = document.querySelector('#nav-mobile');
        // let instances = M.Sidenav.getInstance(elems);
        if (m.isMarket || m.detail.split('/')[0] == 'eventmarkets') {
          // instances.close();
        }
        // }
      } else {
        // if(m.isMarket || m.detail.split('/')[0] == 'eventmarkets') {
        if (m.url == '' && m.detail.includes('racemarket')) {
          let marketName = m.name.trim().toLowerCase().split(' ').join('-').replace(/[^a-z0-9-]/g, '').replace('-v-', '-vs-')
          this.router.navigate([
            this.router.url.split('/')[1] + '/' + this.router.url.split('/')[2] + '/' + this.router.url.split('/')[3] + '/' + marketName + '-' + m.id
          ]).then((x) => (this.routeChangefromtree = !x));
        } else {
          this.router.navigate(['/sports/' + m.url]).then((x) => (this.routeChangefromtree = !x));
        }
        // let elems = document.querySelector('#nav-mobile');
        // let instances = M.Sidenav.getInstance(elems);
        if (m.isMarket || m.detail.split('/')[0] == 'eventmarkets') {
          // instances.close();
        }
      }
    }
    if (m.childNode == null) {
      this.FindLast(this.data);

      m.active = true;
      return;
    }
    let did: any = undefined;
    if (m.childNode?.indexOf('@')) {
      did = m.childNode.split('@')[1];
      m.childNode = m.childNode.replace('@' + did, '');
    }
    // this.toastService.show('I am a success toast', {classname: 'bg-success text-light', delay: 1000});
    this.showLoader = true;
    switch (m.childNode?.split('/')[0]) {
      case 'todayraces':
        this.backendService
          .todayRacesOld(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp: RaceEvents[]) => {
            if (this.data.length > 0) {
              this.data = this.data.filter((x) => x.id == m.id);
            } else {
              if (this.data.length == 1) {
                this.data[0].childs = [];
              }
            }
            resp.forEach((x: RaceEvents, i: number) => {
              let d = Date.parse(x.startTime || '');
              let gName =
                ('0' + new Date(d).getHours()).slice(-2) +
                ':' +
                ('0' + new Date(d).getMinutes()).slice(-2) +
                ' ' +
                x.name;
              x.name = gName;

              this.data[0].childs.push(Menu.fromJS(x));
            });
            this.showLoader = false;
          });
        break;
      case 'getgroupmarkets':
        this.backendService
          .getgroupmarkets(
            parseInt(m.childNode.split('/')[1]), this.router.url,
            'SidebarComponent-LoadChild'
          )
          .then((resp: TodayRacesASSS[]) => {
            if (this.data[0].childs[0].childs.length > 1) {
              this.data[0].childs[0].childs =
                this.data[0].childs[0].childs.filter((x: Menu) => x.id == m.id);
              resp.forEach((x: RaceEvents, i: number) => {
                let d = Date.parse(x.startTime || '');
                let gName =
                  new Date(d).getHours() +
                  ':' +
                  new Date(d).getMinutes() +
                  ' ' +
                  x.name;
                x.name = gName;

                this.data[0].childs[0].childs[0].childs.push(Menu.fromJS(x));
              });
            } else {
              this.data[0].childs[0].childs[0].childs = resp;
            }

            this.showLoader = false;
          });
        break;

      case 'getcountries':
        let _url = m.url && m.url[0] == '/' ? m.url.substring(1, m.url.length) : m.url
        this.backendService
          .customtree(new CustomTreeModel('/sports/' + _url), 'SidebarComponent')
          .then((resp: CustomMenu) => {
            if (resp) {
              this.data = [];
              let m: IMenu = {
                id: resp.id,
                name: resp.name,
                childNode: resp.childNode,
                detail: resp.detail,
                isMarket: resp.isMarket,
                inPlay: resp.inPlay,
                url: resp.url
              };
              let top = new Menu(m);
              this.data.push(top);
              if (resp.childs && resp.childs.length > 0) {
                resp.childs.forEach((ch) => {
                  let a: Menu = new Menu({
                    id: ch.id,
                    name: ch.name,
                    childNode: ch.childNode,
                    detail: ch.detail,
                    isMarket: ch.isMarket,
                    inPlay: ch.inPlay,
                    url: ch.url
                  });
                  top.childs.push(a);
                  if (ch.childs && ch.childs.length > 0) {
                    ch.childs.forEach((aa) => {
                      let b: Menu = new Menu({
                        id: aa.id,
                        name: aa.name,
                        childNode: aa.childNode,
                        detail: aa.detail,
                        isMarket: aa.isMarket,
                        inPlay: aa.inPlay,
                        url: aa.url
                      });
                      a.childs.push(b);
                      if (aa.childs && aa.childs.length > 0) {
                        aa.childs.forEach((bb: CustomMenu) => {
                          if (bb.startTime)
                            bb.name =
                              (
                                '0' + new Date(bb.startTime).getHours()
                              ).slice(-2) +
                              ':' +
                              (
                                '0' + new Date(bb.startTime).getMinutes()
                              ).slice(-2) +
                              ' ' +
                              bb.name;
                          let c: Menu = new Menu({
                            id: bb.id,
                            name: bb.name,
                            childNode: bb.childNode,
                            detail: bb.detail,
                            isMarket: bb.isMarket,
                            inPlay: bb.inPlay,
                            url: bb.url
                          });
                          b.childs.push(c);
                          if (bb.childs && bb.childs.length > 0) {
                            bb.childs.forEach((cc: CustomMenu) => {
                              let d: IMenu = {
                                id: cc.id,
                                name: cc.name,
                                childNode: cc.childNode,
                                detail: cc.detail,
                                isMarket: cc.isMarket,
                                inPlay: cc.inPlay,
                                url: cc.url
                              };
                              c.childs.push(d);
                            });
                          }
                        });
                      }
                    });
                  }
                });
                // console.log(this.data);
              }
            }
          })
          .catch((err) => {
            if (err.status == 401) {
              // this.router.navigate(['signin']);
              this.storageService.secureStorage.removeItem('token');
              window.location.href = window.location.origin;
            } else {
              console.log(err);
            }
          });
        break;
      case 'getcompetition':
        this.backendService
          .getcompetition(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length > 1) {
              this.data = this.data.filter((x) => x.id == m.id);
              this.data[0].childs = resp;
              this.showLoader = false;
            } else {
              if (this.data.length == 1) {
                this.data[0].childs = [];
                this.data[0].childs = resp;
                this.showLoader = false;
              }
            }
          });
        break;
      case 'getfixtures':
        this.backendService
          .getfixtures(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length > 1) {
              this.data = this.data.filter((x) => x.id == m.id);
              this.data[0].childs = resp;
              this.showLoader = false;
            } else {
              if (this.data.length == 1) {
                this.data[0].childs = [];
                this.data[0].childs = resp;
                this.showLoader = false;
              }
            }
          });
        break;

      case 'getevents':
        this.backendService
          .getevents(
            parseInt(m.childNode.split('/')[1]), this.router.url,
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data[0].id == '1') {
              if (did) {
                if (level == 'c') {
                  let second = this.data[0].childs.filter((x) => x.id == did);
                  this.data[0].childs = second[0].childs;
                  let final = this.data[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs = final;
                  this.data[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else if (this.data[0].childs.map((x) => x.id).includes(did)) {
                  let second = this.data[0].childs.filter((x) => x.id == did);
                  this.data[0].childs = second[0].childs;
                  let final = this.data[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs = final;
                  this.data[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else if (this.data[0].childs[0].childs.length > 1) {
                  this.data[0].childs[0].childs = Array.from(
                    this.data[0].childs[0].childs.filter(
                      (x: any) => x.id == m.id
                    )
                  );
                  this.data[0].childs[0].childs[0].childs = resp;
                } else if (this.data[0].childs.length > 1) {
                  this.data[0].childs = Array.from(
                    this.data[0].childs.filter((x) => x.id == did)
                  );
                  // this.data[0].childs[0].childs = this.data[0].childs[0].childs.filter((x:any) => x.id == m.id);
                  // this.data[0].childs[0].childs[0].childs=resp;
                  this.data[0].childs = this.data[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs = resp;
                }
                //this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              } else {
                if (level == 'c') {
                  let final = this.data[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs = final;
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else {
                  this.data[0].childs[0].childs = resp = resp;
                  this.showLoader = false;
                }
              }
            } else {
              if (this.data.length == 1) {
                if (this.data[0].childs.length > 1) {
                  this.data[0].childs = this.data[0].childs.filter(
                    (x) => x.id == m.id
                  );
                }
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              }
            }
          });

        break;
      case 'geteventsbydate':
        this.backendService
          .geteventsbydate(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length == 1) {
              if (this.data[0].childs.length > 1) {
                this.data[0].childs = this.data[0].childs.filter(
                  (x) => x.id == m.id
                );
              }
              this.data[0].childs[0].childs = resp;
              this.showLoader = false;
            }
          });
        break;
      case 'geteventsbycountry':
        this.backendService
          .geteventsbycountry(
            m.childNode.split('/')[1],
            parseInt(m.childNode.split('/')[2]), this.router.url,
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (did) {
              if (this.data[0].id == '1') {
                if (this.data[0].childs) {
                  var second = this.data[0].childs.filter((x) => x.id == did);
                  this.data[0].childs = second;
                  let last = this.data[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs = last;
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              } else {
                if (this.data.length == 1) {
                  if (this.data[0].childs.length > 1) {
                    this.data[0].childs = this.data[0].childs.filter(
                      (x) => x.id == m.id
                    );
                  }
                  this.data[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              }
            } else {
              if (this.data.length == 1) {
                if (this.data[0].childs.length > 1) {
                  this.data[0].childs = this.data[0].childs.filter(
                    (x) => x.id == m.id
                  );
                }
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              }
            }
          });
        break;
      case 'getcompetitionsbycountry':
        // console.dir(m);
        this.backendService
          .getcompetitionsbycountry(
            m.childNode.split('/')[1],
            parseInt(m.childNode.split('/')[2]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            // console.log(resp);
            if (did) {
              if (this.data[0].id == '1') {
                if (this.data[0].childs) {
                  var second = this.data[0].childs.filter((x) => x.id == did);
                  this.data[0].childs = second[0].childs;
                  let last = this.data[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs = last;
                  this.data[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              } else {
                if (this.data.length == 1) {
                  if (this.data[0].childs.length > 1) {
                    this.data[0].childs = this.data[0].childs.filter(
                      (x) => x.id == m.id
                    );
                  }
                  this.data[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              }
            } else {
              if (this.data.length == 1) {
                if (this.data[0].childs.length > 1) {
                  this.data[0].childs = this.data[0].childs.filter(
                    (x) => x.id == m.id
                  );
                }
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              }
            }
          });
        break;
      case 'getevent1':
        this.backendService
          .getevent1(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length == 1) {
              if (this.data[0].childs.length != 1) {
                this.data[0].childs = this.data[0].childs.filter(
                  (x) => x.id == m.id
                );
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              } else {
                if (this.data[0].childs[0].childs.length != 1) {
                  let c: Menu[] = this.data[0].childs[0].childs;
                  this.data[0].childs[0].childs = c.filter((x) => x.id == m.id);
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else if (this.data[0].childs[0].childs[0].childs.length > 1) {
                  if (this.data[0].childs[0].childs[0].childs.length > 1) {
                    let c: Menu[] = this.data[0].childs[0].childs[0].childs;
                    this.data[0].childs[0].childs[0].childs = c.filter(
                      (x) => x.id == m.id
                    );
                    this.data[0].childs[0].childs[0].childs = resp;
                    this.showLoader = false;
                  }
                } else {
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              }
            }
          });
        break;
      case 'getmarkets':
        this.backendService
          .getmarkets(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild', m.url
          )
          .then((resp) => {
            if (this.data[0].id == '1') {
              if (did) {
                if (level == 'd') {
                  if (
                    this.data[0].childs[0].childs
                      .map((x: any) => x.id)
                      .includes(did)
                  ) {
                    let second = this.data[0].childs[0].childs.filter(
                      (x: any) => x.id == did
                    );
                    this.data[0].childs[0].childs = second[0].childs;
                    let final = this.data[0].childs[0].childs.filter(
                      (x: any) => x.id == m.id
                    );
                    this.data[0].childs[0].childs = final;
                    this.data[0].childs[0].childs[0].childs = resp;
                  }
                } else if (level == 'e') {
                  let second = this.data[0].childs[0].childs[0].childs.filter(
                    (x: any) => x.id == did
                  );
                  this.data[0].childs[0].childs[0].childs = second[0].childs;
                  let last = this.data[0].childs[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs[0].childs = last;
                  this.data[0].childs[0].childs[0].childs[0].childs = resp;
                } else if (this.data[0].childs[0].childs[0].childs) {
                  let second = this.data[0].childs[0].childs[0].childs.filter(
                    (x: any) => x.id == did
                  );
                  this.data[0].childs[0].childs[0].childs = second[0].childs;
                  let last = this.data[0].childs[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs[0].childs[0].childs = last;
                  this.data[0].childs[0].childs[0].childs[0].childs = resp;
                } else {
                  let last = this.data[0].childs[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs[0].childs = last;
                  this.data[0].childs[0].childs[0].childs[0].childs = resp;
                }
              } else {
                if (level == 'd' || level == 'c') {
                  if (did) {
                    let second = this.data[0].childs[0].childs.filter(
                      (x: any) => x.id == did
                    );
                    this.data[0].childs[0].childs = second[0].childs;
                  }
                  let final = this.data[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs = final;
                  this.data[0].childs[0].childs[0].childs = resp;
                }
              }
            } else {
              if (level == 'd' || level == 'c') {
                if (did) {
                  let second = this.data[0].childs[0].childs.filter(
                    (x: any) => x.id == did
                  );
                  this.data[0].childs[0].childs = second[0].childs;
                }
                let final = this.data[0].childs[0].childs.filter(
                  (x: any) => x.id == m.id
                );
                this.data[0].childs[0].childs = final;
                this.data[0].childs[0].childs[0].childs = resp;
              }
              // if (this.data.length == 1) {

              //   if (this.data[0].childs.length != 1) {
              //     this.data[0].childs = this.data[0].childs.filter(x => x.id == m.id);
              //     this.data[0].childs[0].childs = resp;

              //   } else {
              //     if (this.data[0].childs[0].childs.length != 1) {
              //       let last: Menu[] = Array.from(this.data[0].childs[0].childs);
              //       this.data[0].childs[0].childs = last.filter(x => x.id == m.id);
              //       this.data[0].childs[0].childs[0].childs = resp;

              //     } else {
              //       this.data[0].childs[0].childs[0].childs = resp;
              //     }
              //   }
              // } else {
              //   this.data = this.data.filter(x => x.id == m.id);
              //   this.data[0].childs = resp;

              // }
            }
            this.showLoader = false;
          });
        break;

      case 'getevent2':
        this.backendService
          .getevent2(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length == 1) {
              if (this.data[0].childs.length != 1) {
                this.data[0].childs = this.data[0].childs.filter(
                  (x) => x.id == m.id
                );
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              } else {
                if (this.data[0].childs[0].childs.length != 1) {
                  if (this.data[0].childs[0].childs[0].childs.length == 0) {
                    this.data[0].childs[0].childs[0].childs[0].childs = resp;
                    this.showLoader = false;
                  } else {
                    let c: Menu[] = this.data[0].childs[0].childs;
                    this.data[0].childs[0].childs = c.filter(
                      (x) => x.id == m.id
                    );
                    this.data[0].childs[0].childs[0].childs = resp;
                    this.showLoader = false;
                  }
                } else if (
                  this.data[0].childs[0].childs[0].childs.length != 1
                ) {
                  let c: Menu[] = this.data[0].childs[0].childs[0].childs;
                  this.data[0].childs[0].childs[0].childs = c.filter(
                    (x) => x.id == m.id
                  );
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else if (
                  this.data[0].childs[0].childs[0].childs[0].childs.length == 0
                ) {
                  this.data[0].childs[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else {
                  if (
                    this.data[0].childs[0].childs[0].childs[0].childs.length ==
                    1
                  ) {
                    if (
                      this.data[0].childs[0].childs[0].childs[0].childs[0]
                        .childs.length == 1
                    ) {
                      this.data[0].childs[0].childs[0].childs[0].childs[0].childs =
                        resp;
                      this.showLoader = false;
                    } else {
                      this.data[0].childs[0].childs[0].childs[0].childs[0].childs[0].childs =
                        resp;
                      this.showLoader = false;
                    }
                  } else {
                    this.data[0].childs[0].childs[0].childs[0].childs[0].childs =
                      resp;
                    this.showLoader = false;
                  }
                }
              }
            } else {
              this.data = this.data.filter((x) => x.id == m.id);
              this.data[0].childs = resp;
              this.showLoader = false;
            }
          });
        break;

      case 'getevent3':
        this.backendService
          .getevent3(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length == 1) {
              if (this.data[0].childs.length != 1) {
                this.data[0].childs = this.data[0].childs.filter(
                  (x) => x.id == m.id
                );
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              } else {
                if (this.data[0].childs[0].childs.length != 1) {
                  if (this.data[0].childs[0].childs[0].childs.length == 0) {
                    this.data[0].childs[0].childs[0].childs[0].childs = resp;
                    this.showLoader = false;
                  } else {
                    let c: Menu[] = this.data[0].childs[0].childs;
                    this.data[0].childs[0].childs = c.filter(
                      (x) => x.id == m.id
                    );
                    this.data[0].childs[0].childs[0].childs = resp;
                    this.showLoader = false;
                  }
                } else if (
                  this.data[0].childs[0].childs[0].childs.length != 1
                ) {
                  let c: Menu[] = this.data[0].childs[0].childs[0].childs;
                  this.data[0].childs[0].childs[0].childs = c.filter(
                    (x) => x.id == m.id
                  );
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else if (
                  this.data[0].childs[0].childs[0].childs[0].childs.length == 0
                ) {
                  this.data[0].childs[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else {
                  if (
                    this.data[0].childs[0].childs[0].childs[0].childs[0].childs
                      .length == 0
                  ) {
                    this.data[0].childs[0].childs[0].childs[0].childs[0].childs =
                      resp;
                    this.showLoader = false;
                  } else {
                    this.data[0].childs[0].childs[0].childs[0].childs[0].childs =
                      resp;
                    this.showLoader = false;
                  }
                }
              }
            } else {
              this.data = this.data.filter((x) => x.id == m.id);
              this.data[0].childs = resp;
              this.showLoader = false;
            }
          });
        break;
    }
  }

  loadCustom(m: Menu, level: string) {
    // console.log(m, level);
    if (m.detail != null) {
      // debugger
      m.filter = true;
      this.filter = false;
      this.routeChangefromtree = true;
      let lsItem: any = this.storageService.secureStorage
        .getItem('classicTheme')
        ?.toString();
      if (lsItem == 'classic-theme') {
        if (m.isMarket) {
          this.router
            .navigate(['/classic/' + m.detail])
            .then((x) => (this.routeChangefromtree = !x));
          // let elems = document.querySelector('#nav-mobile');
          // let instances = M.Sidenav.getInstance(elems);
          if (m.isMarket || m.detail.split('/')[0] == 'eventmarkets') {
            // instances.close();
          }
        }
      } else {
        // if(m.isMarket || m.detail.split('/')[0] == 'eventmarkets') {
        this.router.navigate(['/sports/' + m.url]).then((x) => {
          // debugger
          this.routeChangefromtree = false;
        });
        // let elems = document.querySelector('#nav-mobile');
        // let instances = M.Sidenav.getInstance(elems);
        if (m.isMarket || m.detail.split('/')[0] == 'eventmarkets') {
          // instances.close();
        }
      }
    }
    if (m.childNode == null) {
      this.FindLast(this.data);

      m.active = true;
      return;
    }
    let did: any = undefined;
    if (m.childNode?.indexOf('@')) {
      did = m.childNode.split('@')[1];
      m.childNode = m.childNode.replace('@' + did, '');
    }
    // this.toastService.show('I am a success toast', {classname: 'bg-success text-light', delay: 1000});
    this.showLoader = true;
    switch (m.childNode?.split('/')[0]) {
      case 'todayraces':
        this.backendService
          .todayRacesOld(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp: RaceEvents[]) => {
            if (this.data.length > 0) {
              this.data = this.data.filter((x) => x.id == m.id);
            } else {
              if (this.data.length == 1) {
                this.data[0].childs = [];
              }
            }
            resp.forEach((x: RaceEvents, i: number) => {
              let d = Date.parse(x.startTime || '');
              let gName =
                ('0' + new Date(d).getHours()).slice(-2) +
                ':' +
                ('0' + new Date(d).getMinutes()).slice(-2) +
                ' ' +
                x.name;
              x.name = gName;

              this.data[0].childs.push(Menu.fromJS(x));
            });
            this.showLoader = false;
          });
        break;
      case 'getgroupmarkets':
        this.backendService
          .getgroupmarkets(
            parseInt(m.childNode.split('/')[1]), this.router.url,
            'SidebarComponent-LoadChild'
          )
          .then((resp: TodayRacesASSS[]) => {
            if (this.data[0].childs[0].childs.length > 1) {
              this.data[0].childs[0].childs =
                this.data[0].childs[0].childs.filter((x: Menu) => x.id == m.id);
              resp.forEach((x: RaceEvents, i: number) => {
                let d = Date.parse(x.startTime || '');
                let gName =
                  new Date(d).getHours() +
                  ':' +
                  new Date(d).getMinutes() +
                  ' ' +
                  x.name;
                x.name = gName;

                this.data[0].childs[0].childs[0].childs.push(Menu.fromJS(x));
              });
            } else {
              this.data[0].childs[0].childs[0].childs = resp;
            }

            this.showLoader = false;
          });
        break;

      case 'getcountries':
        this.backendService
          .getcountries(
            parseInt(m.childNode.split('/')[1]),
            'all',
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length > 1) {
              this.data = this.data.filter((x) => x.id == m.id);
              this.data[0].childs = resp;
              this.showLoader = false;
            } else {
              if (this.data.length == 1) {
                this.data[0].childs = [];
                this.data[0].childs = resp;
                this.showLoader = false;
              }
            }
          });
        break;
      case 'getcompetition':
        this.backendService
          .getcompetition(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length > 1) {
              this.data = this.data.filter((x) => x.id == m.id);
              this.data[0].childs = resp;
              this.showLoader = false;
            } else {
              if (this.data.length == 1) {
                this.data[0].childs = [];
                this.data[0].childs = resp;
                this.showLoader = false;
              }
            }
          });
        break;
      case 'getfixtures':
        this.backendService
          .getfixtures(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length > 1) {
              this.data = this.data.filter((x) => x.id == m.id);
              this.data[0].childs = resp;
              this.showLoader = false;
            } else {
              if (this.data.length == 1) {
                this.data[0].childs = [];
                this.data[0].childs = resp;
                this.showLoader = false;
              }
            }
          });
        break;

      case 'getevents':
        this.backendService
          .getevents(
            parseInt(m.childNode.split('/')[1]), this.router.url,
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data[0].id == '1') {
              if (did) {
                if (level == 'c') {
                  let second = this.data[0].childs.filter((x) => x.id == did);
                  this.data[0].childs = second[0].childs;
                  let final = this.data[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs = final;
                  this.data[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else if (this.data[0].childs.map((x) => x.id).includes(did)) {
                  let second = this.data[0].childs.filter((x) => x.id == did);
                  this.data[0].childs = second[0].childs;
                  let final = this.data[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs = final;
                  this.data[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else if (this.data[0].childs[0].childs.length > 1) {
                  this.data[0].childs[0].childs = Array.from(
                    this.data[0].childs[0].childs.filter(
                      (x: any) => x.id == m.id
                    )
                  );
                  this.data[0].childs[0].childs[0].childs = resp;
                } else if (this.data[0].childs.length > 1) {
                  this.data[0].childs = Array.from(
                    this.data[0].childs.filter((x) => x.id == did)
                  );
                  // this.data[0].childs[0].childs = this.data[0].childs[0].childs.filter((x:any) => x.id == m.id);
                  // this.data[0].childs[0].childs[0].childs=resp;
                  this.data[0].childs = this.data[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs = resp;
                }
                //this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              } else {
                if (level == 'c') {
                  let final = this.data[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs = final;
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              }
            } else {
              if (this.data.length == 1) {
                if (this.data[0].childs.length > 1) {
                  this.data[0].childs = this.data[0].childs.filter(
                    (x) => x.id == m.id
                  );
                }
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              }
            }
          });

        break;
      case 'geteventsbydate':
        this.backendService
          .geteventsbydate(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length == 1) {
              if (this.data[0].childs.length > 1) {
                this.data[0].childs = this.data[0].childs.filter(
                  (x) => x.id == m.id
                );
              }
              this.data[0].childs[0].childs = resp;
              this.showLoader = false;
            }
          });
        break;
      case 'geteventsbycountry':
        this.backendService
          .geteventsbycountry(
            m.childNode.split('/')[1],
            parseInt(m.childNode.split('/')[2]),
            this.router.url,
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (did) {
              if (this.data[0].id == '1') {
                if (this.data[0].childs) {
                  var second = this.data[0].childs.filter((x) => x.id == did);
                  this.data[0].childs = second;
                  let last = this.data[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs = last;
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              } else {
                if (this.data.length == 1) {
                  if (this.data[0].childs.length > 1) {
                    this.data[0].childs = this.data[0].childs.filter(
                      (x) => x.id == m.id
                    );
                  }
                  this.data[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              }
            } else {
              if (this.data.length == 1) {
                if (this.data[0].childs.length > 1) {
                  this.data[0].childs = this.data[0].childs.filter(
                    (x) => x.id == m.id
                  );
                }
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              }
            }
          });
        break;
      case 'getcompetitionsbycountry':
        // console.dir(m);
        this.backendService
          .getcompetitionsbycountry(
            m.childNode.split('/')[1],
            parseInt(m.childNode.split('/')[2]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            // console.log(resp);
            if (did) {
              if (this.data[0].id == '1') {
                if (this.data[0].childs) {
                  var second = this.data[0].childs.filter((x) => x.id == did);
                  this.data[0].childs = second[0].childs;
                  let last = this.data[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs = last;
                  this.data[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              } else {
                if (this.data.length == 1) {
                  if (this.data[0].childs.length > 1) {
                    this.data[0].childs = this.data[0].childs.filter(
                      (x) => x.id == m.id
                    );
                  }
                  this.data[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              }
            } else {
              if (this.data.length == 1) {
                if (this.data[0].childs.length > 1) {
                  this.data[0].childs = this.data[0].childs.filter(
                    (x) => x.id == m.id
                  );
                }
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              }
            }
          });
        break;
      case 'getevent1':
        this.backendService
          .getevent1(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length == 1) {
              if (this.data[0].childs.length != 1) {
                this.data[0].childs = this.data[0].childs.filter(
                  (x) => x.id == m.id
                );
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              } else {
                if (this.data[0].childs[0].childs.length != 1) {
                  let c: Menu[] = this.data[0].childs[0].childs;
                  this.data[0].childs[0].childs = c.filter((x) => x.id == m.id);
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else if (this.data[0].childs[0].childs[0].childs.length > 1) {
                  if (this.data[0].childs[0].childs[0].childs.length > 1) {
                    let c: Menu[] = this.data[0].childs[0].childs[0].childs;
                    this.data[0].childs[0].childs[0].childs = c.filter(
                      (x) => x.id == m.id
                    );
                    this.data[0].childs[0].childs[0].childs = resp;
                    this.showLoader = false;
                  }
                } else {
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                }
              }
            }
          });
        break;
      case 'getmarkets':
        this.backendService.getmarkets(
          parseInt(m.childNode.split('/')[1]),
          'SidebarComponent-LoadChild', m.url
        )
          .then((resp) => {
            if (this.data[0].id == '1') {
              if (did) {
                if (level == 'd') {
                  if (
                    this.data[0].childs[0].childs
                      .map((x: any) => x.id)
                      .includes(did)
                  ) {
                    let second = this.data[0].childs[0].childs.filter(
                      (x: any) => x.id == did
                    );
                    this.data[0].childs[0].childs = second[0].childs;
                    let final = this.data[0].childs[0].childs.filter(
                      (x: any) => x.id == m.id
                    );
                    this.data[0].childs[0].childs = final;
                    this.data[0].childs[0].childs[0].childs = resp;
                  }
                } else if (level == 'e') {
                  let second = this.data[0].childs[0].childs[0].childs.filter(
                    (x: any) => x.id == did
                  );
                  this.data[0].childs[0].childs[0].childs = second[0].childs;
                  let last = this.data[0].childs[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs[0].childs = last;
                  this.data[0].childs[0].childs[0].childs[0].childs = resp;
                } else if (this.data[0].childs[0].childs[0].childs) {
                  let second = this.data[0].childs[0].childs[0].childs.filter(
                    (x: any) => x.id == did
                  );
                  this.data[0].childs[0].childs[0].childs = second[0].childs;
                  let last = this.data[0].childs[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs[0].childs[0].childs = last;
                  this.data[0].childs[0].childs[0].childs[0].childs = resp;
                } else {
                  let last = this.data[0].childs[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs[0].childs = last;
                  this.data[0].childs[0].childs[0].childs[0].childs = resp;
                }
              } else {
                if (level == 'd' || level == 'c') {
                  if (did) {
                    let second = this.data[0].childs[0].childs.filter(
                      (x: any) => x.id == did
                    );
                    this.data[0].childs[0].childs = second[0].childs;
                  }
                  let final = this.data[0].childs[0].childs.filter(
                    (x: any) => x.id == m.id
                  );
                  this.data[0].childs[0].childs = final;
                  this.data[0].childs[0].childs[0].childs = resp;
                }
              }
            } else {
              if (level == 'd' || level == 'c') {
                if (did) {
                  let second = this.data[0].childs[0].childs.filter(
                    (x: any) => x.id == did
                  );
                  this.data[0].childs[0].childs = second[0].childs;
                }
                let final = this.data[0].childs[0].childs.filter(
                  (x: any) => x.id == m.id
                );
                this.data[0].childs[0].childs = final;
                this.data[0].childs[0].childs[0].childs = resp;
              }
              // if (this.data.length == 1) {

              //   if (this.data[0].childs.length != 1) {
              //     this.data[0].childs = this.data[0].childs.filter(x => x.id == m.id);
              //     this.data[0].childs[0].childs = resp;

              //   } else {
              //     if (this.data[0].childs[0].childs.length != 1) {
              //       let last: Menu[] = Array.from(this.data[0].childs[0].childs);
              //       this.data[0].childs[0].childs = last.filter(x => x.id == m.id);
              //       this.data[0].childs[0].childs[0].childs = resp;

              //     } else {
              //       this.data[0].childs[0].childs[0].childs = resp;
              //     }
              //   }
              // } else {
              //   this.data = this.data.filter(x => x.id == m.id);
              //   this.data[0].childs = resp;

              // }
            }
            this.showLoader = false;
          });
        break;

      case 'getevent2':
        this.backendService
          .getevent2(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length == 1) {
              if (this.data[0].childs.length != 1) {
                this.data[0].childs = this.data[0].childs.filter(
                  (x) => x.id == m.id
                );
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              } else {
                if (this.data[0].childs[0].childs.length != 1) {
                  if (this.data[0].childs[0].childs[0].childs.length == 0) {
                    this.data[0].childs[0].childs[0].childs[0].childs = resp;
                    this.showLoader = false;
                  } else {
                    let c: Menu[] = this.data[0].childs[0].childs;
                    this.data[0].childs[0].childs = c.filter(
                      (x) => x.id == m.id
                    );
                    this.data[0].childs[0].childs[0].childs = resp;
                    this.showLoader = false;
                  }
                } else if (
                  this.data[0].childs[0].childs[0].childs.length != 1
                ) {
                  let c: Menu[] = this.data[0].childs[0].childs[0].childs;
                  this.data[0].childs[0].childs[0].childs = c.filter(
                    (x) => x.id == m.id
                  );
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else if (
                  this.data[0].childs[0].childs[0].childs[0].childs.length == 0
                ) {
                  this.data[0].childs[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else {
                  if (
                    this.data[0].childs[0].childs[0].childs[0].childs.length ==
                    1
                  ) {
                    if (
                      this.data[0].childs[0].childs[0].childs[0].childs[0]
                        .childs.length == 1
                    ) {
                      this.data[0].childs[0].childs[0].childs[0].childs[0].childs =
                        resp;
                      this.showLoader = false;
                    } else {
                      this.data[0].childs[0].childs[0].childs[0].childs[0].childs[0].childs =
                        resp;
                      this.showLoader = false;
                    }
                  } else {
                    this.data[0].childs[0].childs[0].childs[0].childs[0].childs =
                      resp;
                    this.showLoader = false;
                  }
                }
              }
            } else {
              this.data = this.data.filter((x) => x.id == m.id);
              this.data[0].childs = resp;
              this.showLoader = false;
            }
          });
        break;

      case 'getevent3':
        this.backendService
          .getevent3(
            parseInt(m.childNode.split('/')[1]),
            'SidebarComponent-LoadChild'
          )
          .then((resp) => {
            if (this.data.length == 1) {
              if (this.data[0].childs.length != 1) {
                this.data[0].childs = this.data[0].childs.filter(
                  (x) => x.id == m.id
                );
                this.data[0].childs[0].childs = resp;
                this.showLoader = false;
              } else {
                if (this.data[0].childs[0].childs.length != 1) {
                  if (this.data[0].childs[0].childs[0].childs.length == 0) {
                    this.data[0].childs[0].childs[0].childs[0].childs = resp;
                    this.showLoader = false;
                  } else {
                    let c: Menu[] = this.data[0].childs[0].childs;
                    this.data[0].childs[0].childs = c.filter(
                      (x) => x.id == m.id
                    );
                    this.data[0].childs[0].childs[0].childs = resp;
                    this.showLoader = false;
                  }
                } else if (
                  this.data[0].childs[0].childs[0].childs.length != 1
                ) {
                  let c: Menu[] = this.data[0].childs[0].childs[0].childs;
                  this.data[0].childs[0].childs[0].childs = c.filter(
                    (x) => x.id == m.id
                  );
                  this.data[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else if (
                  this.data[0].childs[0].childs[0].childs[0].childs.length == 0
                ) {
                  this.data[0].childs[0].childs[0].childs[0].childs = resp;
                  this.showLoader = false;
                } else {
                  if (
                    this.data[0].childs[0].childs[0].childs[0].childs[0].childs
                      .length == 0
                  ) {
                    this.data[0].childs[0].childs[0].childs[0].childs[0].childs =
                      resp;
                    this.showLoader = false;
                  } else {
                    this.data[0].childs[0].childs[0].childs[0].childs[0].childs =
                      resp;
                    this.showLoader = false;
                  }
                }
              }
            } else {
              this.data = this.data.filter((x) => x.id == m.id);
              this.data[0].childs = resp;
              this.showLoader = false;
            }
          });
        break;
    }
  }

  suggest(event: any) {
    if (event.target.value.length > 2) {
      // debugger
      this.backendService
        .searchMarkets_POST(event.target.value)
        .then((resp) => {
          if (resp && resp.length > 0) {
            this.suggestions = resp;
          }
        });
    } else {
      this.suggestions = [];
    }

    // this.suggestions = this.countries
    //   .filter(c => c.startsWith(this.typeahead.value))
    //   .slice(0, 5);
  }

  reload() {
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  some_text = 'Click Here';
  inside = false;
  @HostListener('click')
  clicked() {
    this.inside = true;
  }

  @HostListener('document:click')
  clickedOut() {
    this.some_text = this.inside
      ? 'Event Triggered'
      : 'Event Triggered Outside Component';
    this.inside = false;
    if (this.some_text == 'Event Triggered Outside Component') {
      let a = document.getElementsByClassName('sidenav');
    }
  }

  hidenUnhidePopularSports() {
    this.showHidePopularSports = !this.showHidePopularSports;
  }

  toggleSportsfunc() {
    this.toggleSports = !this.toggleSports;
  }
  loadSportsBook() {
    if (!this.checkauthservice.IsLogin()) {
      this.toastService.show('Login to view games', {
        classname: 'bg-danger text-light',
        delay: 1500,
      });
      this.genericService.openLoginModal();
    } else {
      let sportsBookNew = typeof (_window().sportsbookParameter) == 'string' ? JSON.parse(_window().sportsbookParameter) : _window().sportsbookParameter
      this.router.navigateByUrl(
        `/casino/detail/${sportsBookNew.provider}/${sportsBookNew.gameid
        }`,
        {}
      );
      return;
    }
  }
  closeSide() {
    // let s = document.querySelector('#nav-mobile');
    // let instances = M.Sidenav.getInstance(s);
    // instances.close();
  }
  forWhatsAppSupport() {
    if (this.checkauthservice.IsLogin()) {
      this.utillsService.whatsappForCutomerSupprtOrId('CA');
    } else {
      this.utillsService.whatsappForCutomerSupprtOrId('WAB4');
    }
    this.closeSide();
  }

  socialMediaLink(media: any) {
    this.utillsService.socialLink('Social', media);
    this.closeSide();
  }

  navigateToVirtualSports() {
    if (this.checkauthservice.IsLogin()) {
      this.router.navigate(['/casino/detail/BR/lobby']);
      // let s = document.querySelector('#nav-mobile');
      // let instances = M.Sidenav.getInstance(s);
      // instances.close();
    } else {
      this.toastService.show('Please Login to play.', {
        classname: 'bg-danger text-light',
        delay: 2000,
      });
      this.genericService.openLoginModal();
    }
  }
}
