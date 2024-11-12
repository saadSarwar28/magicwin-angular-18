import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Meta} from '@angular/platform-browser';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {_window} from "./backend.service";

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  // Define the URL mappings
  private urlMappings = [
    {
      url: '/',
      title: _window().titleHomePage,
      description: _window().descriptionHomePage,
      canonical: _window().canonicalHomePage
    },
    // {
    //   url: '/home',
    //   title: _window().titleHomePage,
    //   description: _window().descriptionHomePage,
    //   canonical: _window().canonicalHomePage
    // },
    {
      url: '/sports/all',
      title: _window().titleSportsPage,
      description: _window().descriptionSportsPage,
      canonical: _window().canonicalSportsPage
    },
    {
      url: '/sports/inplay',
      title: _window().titleInplayPage,
      description: _window().descriptionInplayPage,
      canonical: _window().canonicalInplayPage
    },
    {
      url: '/sports/cricket',
      title: _window().titleCricketPage,
      description: _window().descriptionCricketPage,
      canonical: _window().canonicalCricketPage
    },
    {
      url: '/sports/soccer',
      title: _window().titleSoccerPage,
      description: _window().descriptionSoccerPage,
      canonical: _window().canonicalSoccerPage
    },
    {
      url: '/sports/tennis',
      title: _window().titleTennisPage,
      description: _window().descriptionTennisPage,
      canonical: _window().canonicalTennisPage
    },
    {
      url: '/sports/basketball',
      title: _window().titleBasketballPage,
      description: _window().descriptionBasketballPage,
      canonical: _window().canonicalBasketballPage
    },
    {
      url: '/sports/baseball',
      title: _window().titleBaseballPage,
      description: _window().descriptionBaseballPage,
      canonical: _window().canonicalBaseballPage
    },
    {
      url: '/sports/american-football',
      title: _window().titleAmericanFootballPage,
      description: _window().descriptionAmericanFootballPage,
      canonical: _window().canonicalAmericanFootballPage
    },
    {
      url: '/sports/horse-racing/today',
      title: _window().titleHorseRacingPage,
      description: _window().descriptionHorseRacingPage,
      canonical: _window().canonicalHorseRacingPage
    },
    {
      url: '/sports/horse-racing/all',
      title: _window().titleHorseRacingAllPage,
      description: _window().descriptionHorseRacingAllPage,
      canonical: _window().canonicalHorseRacingAllPage
    },
    {
      url: '/sports/grey-hound-racing/all',
      title: _window().titleGreyHoundRacingAllPage,
      description: _window().descriptionGreyHoundRacingAllPage,
      canonical: _window().canonicalGreyHoundRacingAllPage
    },
    {
      url: '/sports/grey-hound-racing/today',
      title: _window().titleGreyHoundRacingPage,
      description: _window().descriptionGreyHoundRacingPage,
      canonical: _window().canonicalGreyHoundRacingPage
    },
    {
      url: '/about',
      title: _window().titleAboutPage,
      description: _window().descriptionAboutPage,
      canonical: _window().canonicalAboutPage
    },
    {
      url: '/contact',
      title: _window().titleContactPage,
      description: _window().descriptionContactPage,
      canonical: _window().canonicalContactPage
    }
    // Add more mappings as needed
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {
  }

  init(): void {
    // Listen to navigation events to detect URL changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateMetaTags();
      });
  }

  // Function to update the meta tags based on the current URL
  private updateMetaTags(): void {
    const currentUrl: any = this.router.url;
    console.log(currentUrl, currentUrl.split('/').length, ' <<<<<<<<< current url')

    // for sports/tournament/<matchName>
    if (currentUrl.includes('tournament') && currentUrl.split('/').length > 3) {
      let title = _window().cricketMatchTitle ?
        _window().tournamentMatchTitle + currentUrl.split('/')[3].split('-').join(' ') :
        _window().sitename + ' | Tournament | ' + currentUrl.split('/')[3].split('-').join(' ')
      this.titleService.setTitle(title);
      return
    }

    // for sports/cricket/<matchName>
    if (currentUrl.includes('cricket') && currentUrl.split('/').length > 3) {
      let title = _window().cricketMatchTitle ?
        _window().cricketMatchTitle + currentUrl.split('/')[3].split('-').join(' ') :
        _window().sitename + ' | Cricket | ' + currentUrl.split('/')[3].split('-').join(' ')
      this.titleService.setTitle(title);
      return
    }

    // for sports/soccer/<matchName>
    if (currentUrl.includes('soccer') && currentUrl.split('/').length > 3) {
      let title = _window().cricketMatchTitle ?
        _window().soccerMatchTitle + currentUrl.split('/')[3].split('-').join(' ') :
        _window().sitename + ' | Soccer | ' + currentUrl.split('/')[3].split('-').join(' ')
      this.titleService.setTitle(title);
      return
    }

    // for sports/soccer/<matchName>
    if (currentUrl.includes('tennis') && currentUrl.split('/').length > 3) {
      let title = _window().cricketMatchTitle ?
        _window().tennisMatchTitle + currentUrl.split('/')[3].split('-').join(' ') :
        _window().sitename + ' | Tennis | ' + currentUrl.split('/')[3].split('-').join(' ')
      this.titleService.setTitle(title);
      return
    }

    // Find the matching URL mapping
    const mapping = this.urlMappings.find(item => currentUrl == item.url);

    if (mapping) {
      console.log(mapping, ' <<<<<< mapping found')
      this.titleService.setTitle(mapping.title);
      // Update the description meta tag
      this.metaService.updateTag({name: 'description', content: mapping.description});
      // Update or set the canonical link
      this.updateCanonicalTag(mapping.canonical);
    } else {
      console.log('no mapping found')
    }
  }

  // Helper function to update the canonical link
  private updateCanonicalTag(canonicalUrl: string): void {
    // @ts-ignore
    let link: HTMLLinkElement = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.href = canonicalUrl;
    } else {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalUrl);
      document.head.appendChild(link);
    }
  }
}
