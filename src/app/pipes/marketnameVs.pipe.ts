import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'marketName', standalone: true })
export class MarketNamePipe implements PipeTransform {
  transform(value: string, id?: string): string {
    let imgs = [
      {
        id: "1",
        img: "https://iriscdn.b-cdn.net/kheloyar/clientweb/images/teams-p/1.png"
      },
      {
        id: "2",
        img: "https://iriscdn.b-cdn.net/kheloyar/clientweb/images/teams-p/2.png"
      },
      {
        id: "4",
        img: "https://iriscdn.b-cdn.net/magicwin.games/icon/cricket.png"
      },

    ]
    if (value) {
      if (value.includes(' v ')) {
        const teams = value.split(" v ");
        let htmlString = `<span class="teamA">${teams[0]}</span><span class="vs"> vs </span> <span class="teamB">${teams[1]}</span>`
        const find = imgs.find((x) => x.id == id);
        if (find) {
          let htmlString = `<span class="teamA team-name">${teams[0]} </span><span class="vs d-flex align-items-center justify-content-between"><img class="before-icon" src=${find.img}> vs <img class="after-icon"  src=${find.img}></span> <span class="teamB team-name">${teams[1]}</span>`
          return htmlString;
        }
        else {
          return htmlString;
        }
      }
    }


    return value
  }
}
