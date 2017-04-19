import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if(this.authService.isLoggedIn()){
      if(this.jwtHelper.isTokenExpired(this.authService.getToken())){
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }else{
        return true;
      }
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
