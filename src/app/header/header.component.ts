import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean = false;
  user?:User;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getIsLoggedIn().subscribe((value => {
      this.isLoggedIn = value;
    }))
    this.loginService.getUser().subscribe((value => {
      this.user = value;
    }))
  }

  logout() { 
    this.loginService.logout();
  }

  userHasRole(role: String) {
    if(this.user?.role === role) {
      return true;
    }
    return false;
  }

}
