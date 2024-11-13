import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RoutingStateService {
  private history: any = [];

  constructor(
    private router: Router
  ) {}

  public loadRouting(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(this.history?.length > 0) {
          const lastUrl = this.history[this.history.length - 1];
          if(lastUrl == event.urlAfterRedirects) {
            return;
          }
        }
          this.history = [...this.history, event.urlAfterRedirects];
        
      }
    });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2]?.replaceAll('%20', ' ') || '/';
  }
}

