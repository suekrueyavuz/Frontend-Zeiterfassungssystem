import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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

  items: MenuItem[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getIsLoggedIn().subscribe((value => {
      this.isLoggedIn = value;
      this.updateItems();
    }))
    this.loginService.getUser().subscribe((value => {
      this.user = value;      
      this.updateItems();
    }));
  }

  updateItems() {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'], visible: this.isLoggedIn},
      {label: 'Mitarbeiter', routerLink: '/admin/mitarbeiter', visible: this.userHasRole('ROLE_ADMIN') && this.isLoggedIn},
      {label: 'Firma', routerLink: '/admin/firma', visible: this.userHasRole('ROLE_ADMIN') && this.isLoggedIn},
      {label: 'Ausleihungen', routerLink: '/zeiterfassung', visible: this.userHasRole('ROLE_MITARBEITER') && this.isLoggedIn},
      {label: 'Logout', command: () => this.logout(), routerLink: '/', visible: this.isLoggedIn}
    ];
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
