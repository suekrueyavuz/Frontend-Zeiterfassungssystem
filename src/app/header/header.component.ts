import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  headers: MenuItem[] = [];

  constructor(private loginService: LoginService, public router: Router) {}

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
    this.headers = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'], visible: this.isLoggedIn},
      {label: 'Mitarbeiter', visible: this.userHasRole('ROLE_ADMIN') && this.isLoggedIn,
        items: [
          {label: 'Alle Mitarbeiter', icon: 'pi pi-users', routerLink: ['/admin/mitarbeiter']},
          {label: 'Ausgeliehene Mitarbeiter', icon: 'pi pi-users', routerLink: ['/admin/mitarbeiter/ausgeliehen']},
          {label: 'Neu', icon: 'pi pi-fw pi-plus', routerLink: ['/admin/mitarbeiter/neu']},
          {label: 'Ausleihen', icon: 'pi pi-arrow-up-right', routerLink: ['/admin/mitarbeiter/ausleihen']}
      ]},
      {label: 'Firma', visible: this.userHasRole('ROLE_ADMIN') && this.isLoggedIn,
        items: [
          {label: 'Alle Firmen', icon: 'pi pi-building', routerLink: ['/admin/firma']},
          {label: 'Neu', icon: 'pi pi-fw pi-plus', routerLink: ['/admin/firma/neu']},
        ]  
      },
      {label: 'Reports', visible: this.userHasRole('ROLE_FIRMA') && this.isLoggedIn,
        items: [
          {label: 'Runterladen', routerLink: ['/firma/exportReport']}
        ]
      },
      {label: 'Mitarbeiter' , visible: (this.userHasRole('ROLE_FIRMA') || this.userHasRole('ROLE_SCHICHTLEITER')) && this.isLoggedIn,
        items: [
          {label: 'Ausgeliehene Mitarbeiter', icon: 'pi pi-users', routerLink: ['/firma/ausgelieheneMitarbeiter']}
        ]
      },
      {label: 'Ausleihungen', routerLink: '/zeiterfassung', visible: this.userHasRole('ROLE_MITARBEITER') && this.isLoggedIn},
      {label: 'Einstellungen', visible: (this.userHasRole('ROLE_FIRMA') || this.userHasRole('ROLE_SCHICHTLEITER')) && this.isLoggedIn,
        items: [
          {label: 'Passwort ??ndern', routerLink: ['/einstellungen/passwort']}
        ]},
      {label: 'Logout', icon: 'pi pi-power-off', command: () => this.logout(), visible: this.isLoggedIn}    
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
