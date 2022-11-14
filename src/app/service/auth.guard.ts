import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn:boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.getIsLoggedIn().subscribe(value => {
      this.isLoggedIn = value;
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(route, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.isLoggedIn) {
      const role = JSON.parse(localStorage.getItem('user') || '{}').role;
      if(route.data['role'] && route.data['role'].indexOf(role) === -1) {
        this.router.navigate(['/home']);
        return false;
      } 
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
  
}
