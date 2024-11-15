import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientOnlyGuard implements CanLoad {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    const isBrowser = isPlatformBrowser(this.platformId);
    // Block loading on the server side
    if (!isBrowser) {
      console.warn('Module load prevented: This route is client-only.');
    }
    return isBrowser;
  }
}
