import {Component, OnInit} from '@angular/core';
import { XGameList, XgameNow, XgameService } from '../../services/xgame.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gamenavbar',
  templateUrl: './gamenavbar.component.html',
  styleUrls: ['./gamenavbar.component.scss']
})
export class GamenavbarComponent implements OnInit {

  exchangeGames: XgameNow[] = [];
    //Games to remove
    // toRemove = ["baccarat", "cardracer", "hilo", "omaha"];

  constructor(private httpService: XgameService, private router: Router) {
  }

  ngOnInit(): void {
    this.getExchangeGames();
  }
  getCurrentRoute() {
    let route = this.router.url;
    return route
  }

  getExchangeGames() {
    this.httpService.games().then((response: XgameNow[]) => {
      this.exchangeGames = response;
              //Function for removing new games and double market game
              // this.exchangeGames = this.exchangeGames.filter((game) => !this.toRemove.includes(game.gameName))
      }).catch((err) => {
        console.log(err)
      });
  }

  routeToDefaultXG(){
    this.router.navigateByUrl('/games');
  }

  removewhitespaces(s: string) {
    return s.replace(/\s/g, "").toLocaleLowerCase();
  }
}
