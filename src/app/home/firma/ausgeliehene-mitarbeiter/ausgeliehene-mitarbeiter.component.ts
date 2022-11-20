import { Component, OnInit } from '@angular/core';
import { FirmaService } from 'src/app/service/firma.service';
import { SchichtleiterService } from 'src/app/service/schichtleiter.service';

@Component({
  selector: 'app-ausgeliehene-mitarbeiter',
  templateUrl: './ausgeliehene-mitarbeiter.component.html',
  styleUrls: ['./ausgeliehene-mitarbeiter.component.css']
})
export class AusgelieheneMitarbeiterComponent implements OnInit {
  me:any;
  mitarbeiterId:any;
  ausgelieheneMitarbeiter:any[] = [];
  selectedMitarbeiter:any;

  constructor(private firmaService: FirmaService, private schichtleiterService: SchichtleiterService) { 
    this.me = JSON.parse(localStorage.getItem('user') || '{}');
    this.mitarbeiterId = this.me.id;    
  }

  ngOnInit(): void {
    if(this.me.role === 'ROLE_SCHICHTLEITER') {
      this.schichtleiterService.getMe(this.mitarbeiterId).subscribe((response) => {
        this.me = response;
        this.getAusgelieheneMitarbeiter();
      })
    } else {
      this.getAusgelieheneMitarbeiter();
    }
  }

  getAusgelieheneMitarbeiter() {
    if(this.me.role === 'ROLE_SCHICHTLEITER') {
      this.firmaService.getAusgelieheneMitarbeiter(this.me.firmaId).subscribe(value => {   
        this.ausgelieheneMitarbeiter = value;
      })
    } else {
      this.firmaService.getAusgelieheneMitarbeiter(this.me.id).subscribe(value => {   
        this.ausgelieheneMitarbeiter = value;
      })
    }
  }

  stundenBestaetigen() {
    this.schichtleiterService.zeitenStatusBearbeiter(this.selectedMitarbeiter, 'AKZEPTIERT').subscribe(() => {
      window.location.reload();
    })
  }

  stundenAblehnen() {
    this.schichtleiterService.zeitenStatusBearbeiter(this.selectedMitarbeiter, 'ABGELEHNT').subscribe(() => {
      window.location.reload();
    })
  }

  feiertagMarkieren() {
    this.schichtleiterService.alsFeiertagMarkieren(this.selectedMitarbeiter).subscribe(() => {
      window.location.reload();
    })
  }

}
