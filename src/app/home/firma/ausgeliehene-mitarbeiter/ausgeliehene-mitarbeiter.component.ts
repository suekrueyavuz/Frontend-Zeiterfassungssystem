import { Component, OnInit } from '@angular/core';
import { FirmaService } from 'src/app/service/firma.service';

@Component({
  selector: 'app-ausgeliehene-mitarbeiter',
  templateUrl: './ausgeliehene-mitarbeiter.component.html',
  styleUrls: ['./ausgeliehene-mitarbeiter.component.css']
})
export class AusgelieheneMitarbeiterComponent implements OnInit {
  me:any;
  ausgelieheneMitarbeiter:any[] = [];
  selectedMitarbeiter:any;

  constructor(private firmaService: FirmaService) { 
    this.me = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
    this.getAusgelieheneMitarbeiter();
  }

  getAusgelieheneMitarbeiter() {
    this.firmaService.getAusgelieheneMitarbeiter(this.me.id).subscribe(value => {   
      this.ausgelieheneMitarbeiter = value;
    })
  }

}
