import { Component, OnInit } from '@angular/core';
import { _window } from 'src/app/services/backend.service';

@Component({
  selector: 'app-summary-content',
  template: `
    <style>
      details summary::-webkit-details-marker {
        display: none;
      }
    </style>
    <div style="margin-top:20px ;" *ngIf="showLandingPageContent">
      <div class="footer-content-section mb-1">
        <details class="content-detail">
          <summary
            class="rounded d-flex p-1 bg-tab align-items-center justify-content-between d-flex"
          >
            <p class="fs-15 summary-heading p-2 mb-0  sm-fs-13">
              Grab the best wins in {{ sitename }} The home of Casino, Cricket,
              Horse Racing, Football and many more.
            </p>
            <i class="bi bi-chevron-down fs-15 summary-dropdown-icon me-2"></i>
          </summary>
          <div class="content-body p-3">
            <p class="summary-content sm-fs-12">
              Waiting for a chance to frame up wins in online gaming?
              {{ sitename }} you covered, and we are bringing you a fun, fast,
              and fair online gaming and casino experience like no other. When
              it comes to sports, {{ sitename }} is always on the high, and we
              are here to help you create the most of your winning experiences.
            </p>
            <p class="summary-content sm-fs-12">
              Wait no more and win big in sports gaming at {{ sitename }}!
            </p>
          </div>
        </details>
      </div>
      <ng-container *ngIf="showMoreContent">
        <div class="footer-content-section mb-1">
          <details class="content-detail">
            <summary
              class="rounded d-flex p-1 bg-tab align-items-center justify-content-between"
            >
              <p class="fs-15 summary-heading p-2 mb-0  sm-fs-13">
                Enjoy the Best Sports Games at Various Sporting Events!
              </p>
              <i
                class="bi bi-chevron-down fs-15 summary-dropdown-icon me-2"
              ></i>
            </summary>
            <div class="content-body p-3">
              <p class="summary-content sm-fs-12">
                {{ sitename }} are home to some of the best sports and Online
                Casino in India that you can play. We cover a lot of different
                online gaming events in 24 hours, and you can enjoy each one of
                them. The more options you must play, the more winning
                experiences you can get at the end of the day!
              </p>
              <p class="summary-content sm-fs-12">
                Here are the top games you should try in {{ sitename }}
              </p>

              <p class="summary-content sm-fs-12">Cricket</p>
              <p class="summary-content sm-fs-12">
                {{ sitename }} have a lot of cricket matches for you to play in!
                Place your wagers on your favorite squads and enjoy the thrill
                of gaming on tight battles between the hottest rivals in the
                sport. Try to win big while your favorite player takes more
                wickets or score high, so what is what are you waiting for Sign
                Up now and start playing.
              </p>
            </div>
          </details>
        </div>
        <div class="footer-content-section mb-1">
          <details class="content-detail">
            <summary
              class="rounded d-flex p-1 bg-tab align-items-center justify-content-between"
            >
              <p class="fs-15 summary-heading p-2 mb-0  sm-fs-13">
                Why should you try Cricket gaming at {{ sitename }}?
              </p>
              <i
                class="bi bi-chevron-down fs-15 summary-dropdown-icon me-2"
              ></i>
            </summary>
            <div class="content-body p-3">
              <p class="summary-content sm-fs-12">
                {{ sitename }} is one of the best options for playing exciting
                online games such as Cricket, Football, Baseball, Tennis, Horse
                Racing, etc. We offer a platform for all users worldwide so that
                you can make the most of your online gaming experience without
                much hassle.
              </p>
              <p class="summary-content sm-fs-12">
                Our team is dedicated to delivering the best competitive odds
                and providing an interactive gaming experience. Embark on the
                thrilling gaming journey you've been seeking.
              </p>
              <p class="summary-content sm-fs-12">Football</p>
              <p class="summary-content sm-fs-12">
                The world is filled with a lot of great football players, and
                you should be able to know all of them to win in the biggest
                leagues and tournaments worldwide. Play association football and
                enjoy the prestigious experience of placing wagers on the most
                popular sport of all.
              </p>
              <p class="summary-content sm-fs-12">
                {{ sitename }} offers a wide range of online gaming options,
                such as casinos, football, horse racing, tennis, basketball, and
                many more. You can also play in different league matches.
              </p>
              <p class="summary-content sm-fs-12">
                In addition, {{ sitename }} have partnerships with the top clubs
                in India and Dubai, which means more attention is diverted to
                these markets.
              </p>
              <p class="summary-content sm-fs-12">Basketball</p>
              <p class="summary-content sm-fs-12">
                {{ sitename }} cover a wide array of basketball leagues and
                events, such as the following:<br />
                Euro League <br />
                FIBA World Cup <br />
                Asociación de Clubs de Baloncesto (ACB)<br /><br />
                Take your favorite game to the next level by playing basketball
                games here at {{ sitename }} !
              </p>
              <p class="summary-content sm-fs-12">Tennis</p>
              <p class="summary-content sm-fs-12">
                If you want to enjoy gaming on intense tennis matches on the
                tennis court, Magician have you covered! Bet on your favorite
                players as they compete against the top athletes to achieve
                ultimate glory in the sport. Tennis is a global sport with a
                long history, making it a popular choice for betting.<br />
                <br />

                {{ sitename }} cover the best tennis tournaments that you would
                love to watch. Place your tennis games hot as you volley big
                players in the top events such as the following:
              </p>

              <ul class="summary-content sm-fs-12">
                <li>Australian Open</li>
                <li>French Open</li>
                <li>Wimbledon</li>
                <li>US Open</li>
              </ul>
              <p class="summary-content sm-fs-12">Baseball</p>
              <p class="summary-content sm-fs-12">
                Swing your players across the field as you play the hottest
                baseball games from various leagues! {{ sitename }} ensures that
                you have the next-level experience of playing baseball games.
                Enjoy the hype and sweep your gaming way for a higher chance of
                winning with your players.<br />
                Play with your favorite team in popular leagues such as the:
              </p>
              <ul class="summary-content sm-fs-12">
                <li>Major League Baseball</li>
                <li>ABL</li>
                <li>Nippon Professional Baseball</li>
              </ul>
              <p class="summary-content sm-fs-12">
                Hit the home run with your players and get a chance to land big
                winnings!
              </p>
              <p class="summary-content sm-fs-12">Esports</p>
              <p class="summary-content sm-fs-12">
                {{ sitename }} Esports brings you a new experience as you can
                also players your way into a wide array of online tournaments
                that run around the clock, which you can enjoy anywhere
                worldwide. You can surely find the hype that makes online gaming
                one of the best sports you can bet on all the time!
                <br />
                Play on the biggest tournaments on different Esports titles,
                such as:
              </p>
              <ul class="summary-content sm-fs-12">
                <li>Dota 2</li>
                <li>Counterstrike: Global Offensive</li>
                <li>Soccer</li>
                <li>MBA tournaments</li>
              </ul>
              <p class="summary-content sm-fs-12">American Football</p>
              <p class="summary-content sm-fs-12">
                At {{ sitename }}, we also cover the top events in American
                Football. We offer odds for XFL and NFL, so gather around and
                explore the best markets on the site for a world-class gaming
                experience! <br /><br />
                Get ready to place your bets on thrilling football matches that
                will impress you! If you're eagerly anticipating your chance to
                win in football games, {{ sitename }} is here to ensure you have
                a great time during each match leading up to the prestigious
                Super Bowl.
              </p>
              <p class="summary-content sm-fs-12">Horse Racing</p>
              <p class="summary-content sm-fs-12">
                Get ready to gallop across the field! {{ sitename }} offers
                excellent horse racing experience. Place your bets on the top
                horses you believe can outrun the competition and showcase their
                abilities on the field.<br />
                {{ sitename }} cover the following major horse racing events:
              </p>
              <ul class="summary-content sm-fs-12">
                <li>Grand National</li>
                <li>Melbourne Cup</li>
                <li>Kentucky Derby</li>
                <li>The Preakness Stakes</li>
                <li>Belmont Stakes</li>
                <li>Prix de l'Arc de Triomphe</li>
                <li>Pegasus World Cup</li>
                <li>Dubai World Cup</li>
              </ul>
            </div>
          </details>
        </div>
        <div class="footer-content-section mb-1">
          <details class="content-detail">
            <summary
              class="rounded d-flex p-1 bg-tab align-items-center justify-content-between"
            >
              <p class="fs-15 summary-heading p-2 mb-0  sm-fs-13">
                Increase your chances of winning with popular wagering options
                on {{ sitename }}.
              </p>
              <i
                class="bi bi-chevron-down fs-15 summary-dropdown-icon me-2"
              ></i>
            </summary>
            <div class="content-body p-3">
              <p class="summary-content sm-fs-12">
                Playing different sports is made easy for you here at
                {{ sitename }}, and we have it all for you with our other game
                types that you would surely love to enjoy. We want to give you a
                great chance to navigate through the games and make a successful
                bet.
              </p>
            </div>
          </details>
        </div>
        <div class="footer-content-section mb-1">
          <details class="content-detail">
            <summary
              class="rounded d-flex p-1 bg-tab align-items-center justify-content-between"
            >
              <p class="fs-15 summary-heading p-2 mb-0  sm-fs-13">
                At {{ sitename }}, you can enjoy three different game types:
              </p>
              <i
                class="bi bi-chevron-down fs-15 summary-dropdown-icon me-2"
              ></i>
            </summary>
            <div class="content-body p-3">
              <p class="summary-content sm-fs-12">In-play Games</p>
              <p class="summary-content sm-fs-12">
                Play live and make the most of our competitive odds! Please
                trust your favorite team or player to bring a masterful
                performance to their games and watch it live and on-demand!<br />

                Watching live games can help you make more winning wagers
                because you can see which team has a better chance of winning.
                The advantage of in-play gaming is the ability to adjust your
                strategy based on the continuously shifting odds.
              </p>
              <p class="summary-content sm-fs-12">Outright Games</p>
              <p class="summary-content sm-fs-12">
                At {{ sitename }}, you can place your bets before the start of
                the game or season if you have confidence in your team or
                player. However, once the game or season begins, you won't be
                able to make this type of bet.<br />

                There are various ways to participate in outright markets. Sure,
                here is a clearer version of the text with corrected spelling,
                grammar, and punctuation:<br />

                For example, you can place bets on a team to win the league or
                to finish with the best record. You can also play with a team to
                win the championship during the playoffs or with your favorite
                player to win an individual award by the end of the season.
              </p>
              <p class="summary-content sm-fs-12">Future Gaming</p>
              <p class="summary-content sm-fs-12">
                You can play without much hassle here at {{ sitename }} and can
                save you a lot of time if you want to plan for your gaming
                session.<br />

                This is what makes online gaming easy. Also, you can immediately
                start the game; all you need to do is come up with different
                wagers that you like and play them right away. No time is wasted
                on this, so you can be sure that you will always want to play
                future games.
              </p>
            </div>
          </details>
        </div>
        <div class="footer-content-section mb-1">
          <details class="content-detail">
            <summary
              class="rounded d-flex p-1 bg-tab align-items-center justify-content-between"
            >
              <p class="fs-15 summary-heading p-2 mb-0  sm-fs-13">
                Enjoy a unique online gaming experience at {{ sitename }}
              </p>
              <i
                class="bi bi-chevron-down fs-15 summary-dropdown-icon me-2"
              ></i>
            </summary>
            <div class="content-body p-3">
              <p class="summary-content sm-fs-12">
                Gaming has always been challenging with {{ sitename }}. We
                ensure a top-notch online gaming experience for your favorite
                sports, including football, baseball, casino games, tennis, and
                horse racing. We leave no stone unturned to provide the best
                experience possible. There are many supported games on
                {{ sitename }} that ensure that you can enjoy your gaming
                experience here. This means bigger chances of winning, which can
                give you a much better time in your gaming sessions.
                <br /><br />

                What are you waiting for? If you are itching to get the best
                online gaming and casino experience, then {{ sitename }} is the
                right place for you to shine and get a lot of wins!
              </p>
            </div>
          </details>
        </div>
      </ng-container>
      <div class="text-center mt-2">
        <span (click)="showMoreContent = !showMoreContent">
          <i
            class="summary-show-more-icon blinking fs-20 pointer"
            [class]="
              showMoreContent
                ? 'bi bi bi-chevron-up summary-show-more-icon me-2'
                : 'bi bi-chevron-down summary-show-more-icon'
            "
          ></i>
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      .summary-heading {
        color: var(--summary-heading-clr);
      }
      .summary-content {
        color: var(--summary-content-clr);
      }
      .summary-dropdown-icon {
        color: var(--summary-dropdown-icon-clr);
      }
      .content-body {
        background: var(--summary-content-background-clr);
      }
    `,
  ],
})
export class SummaryContentComponent {
  sitename: string = '';
  showMoreContent: boolean = false;
  showLandingPageContent: boolean = false;

  constructor() {
    this.sitename = _window().sitename;
    if (_window().showLandingPageContent) {
      this.showLandingPageContent = _window().showLandingPageContent;
    }
    if (_window().showLandingPageContent) {
      this.showLandingPageContent = _window().showLandingPageContent;
    }
  }
}
