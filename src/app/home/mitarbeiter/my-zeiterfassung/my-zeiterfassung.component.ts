import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/service/login.service';
import { MitarbeiterService } from 'src/app/service/mitarbeiter.service';

@Component({
  selector: 'app-my-zeiterfassung',
  templateUrl: './my-zeiterfassung.component.html',
  styleUrls: ['./my-zeiterfassung.component.css']
})
export class MyZeiterfassungComponent implements OnInit {
  me: User;
  ausleihungen:any[] = [];
  clonedAusleihungen: { [s: string]: any; } = {};

  constructor(private mitarbeiterService: MitarbeiterService, private loginService: LoginService) {
    this.me = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
    this.getAusleihungen();
  }

  getAusleihungen() {
    this.mitarbeiterService.getAusleihungen(this.me.id || '').subscribe(value => {
      for(let i=0; i<value.length; i++) {
        value[i].auftraggeberFirma = value[i].auftraggeberFirma.name;
        value[i].mitarbeiter = value[i].mitarbeiter.forename;
      }
      this.ausleihungen = value;
    })
  }

  onRowEditInit(ausleihung: any) {
    this.clonedAusleihungen[ausleihung.id] = {...ausleihung};   
  }

  onRowEditSave(ausleihung: any) {
    const startZeit = ausleihung.startZeit.toLocaleTimeString();
    ausleihung.startZeit = startZeit;
    const endZeit = ausleihung.endZeit.toLocaleTimeString();
    ausleihung.endZeit = endZeit;
  }

  onRowEditCancel(ausleihung: any, index: number) {
    this.ausleihungen[index] = this.clonedAusleihungen[ausleihung.id];
    delete this.clonedAusleihungen[ausleihung.id];
  }

}
