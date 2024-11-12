import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate , CanActivateChild{
  constructor(public auth: AuthService, public router: Router) {}
  canActivateChild(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['user']);
       return false;
     }
     return true;
  }
  canActivate(): boolean {

    if (!this.auth.isAuthenticated()) {
        this.router.navigate(['user']);
      return false;
    }
    return true;
  }
}
