import { Component, OnInit } from '@angular/core';
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

  cols: any[] = [];

  constructor(private mitarbeiterService: MitarbeiterService, private loginService: LoginService) {
    this.me = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
    this.getAusleihungen();

    this.cols = [
      { field: 'auftraggeberFirma', header: 'AuftraggeberFirma' },
      { field: 'tag', header: 'Tag' },
      { field: 'startZeit', header: 'Startzeit' },
      { field: 'endZeit', header: 'Endzeit' },
      { field: 'schicht', header: 'Schicht' },
      { field: 'zeitStatus', header: 'Zeitstatus' },
      { field: 'ueberStunde', header: 'Überstunden' },
    ];
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

}
