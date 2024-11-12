import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckAuthService } from './check-auth.service';
import { _window } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class IframeGuard implements CanActivate {
  constructor(private checkAuthService: CheckAuthService, private router: Router) { }

  canActivate(): boolean {
    if (_window().isIframe) {
      this.router.navigate(['/sports']);
      return false;
    }
    return true
  }
}
