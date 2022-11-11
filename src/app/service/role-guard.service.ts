import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  user?:User;

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const expectedRole = route.data['expectedRole'];
    this.loginService.getUser().subscribe((value) => this.user = value);
    if(!this.loginService.getIsLoggedIn() || this.user?.role !== expectedRole) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
