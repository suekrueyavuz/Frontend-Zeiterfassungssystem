import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean = false;

  constructor(private loginService: LoginService) {
   }

  ngOnInit(): void {
    this.loginService.getIsLoggedIn().subscribe((value => {
      this.isLoggedIn = value;
    }))
  }

  logout() { 
    this.loginService.logout();
  }

}
