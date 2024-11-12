import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckAuthService } from './check-auth.service';
import { _window } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class IsB2CGuard implements CanActivate {
  constructor(private checkAuthService: CheckAuthService, private router: Router) { }

  canActivate(): boolean {
    if (!_window().isb2c) {
      this.router.navigate(['/home']);
      return false;
    }
    return true
  }
}
