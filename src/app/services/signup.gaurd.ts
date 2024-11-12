import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckAuthService } from './check-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanActivate {
  constructor(private checkAuthService: CheckAuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.checkAuthService.IsLogin()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true
  }
}
