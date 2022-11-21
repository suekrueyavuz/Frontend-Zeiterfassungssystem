import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { MitarbeiterService } from 'src/app/service/mitarbeiter.service';

@Component({
  selector: 'app-alle-ausgeliehene-mitarbeiter',
  templateUrl: './alle-ausgeliehene-mitarbeiter.component.html',
  styleUrls: ['./alle-ausgeliehene-mitarbeiter.component.css']
})
export class AlleAusgelieheneMitarbeiterComponent implements OnInit {
  ausgelieheneMitarbeiter:any[] = [];
  clonedAusgelieheneMitarbeiter: { [s: string]: any; } = {};
  zeitStatus:string[] = [];

  constructor(private adminService: AdminService, private mitarbeiterService: MitarbeiterService) { }

  ngOnInit(): void {
    this.getAusgelieheneMitarbeiter();
    this.zeitStatus = [
      'AKZEPTIERT',
      'ABGELEHNT',
      'INBEARBEITUNG'
    ]
  }

  getAusgelieheneMitarbeiter() {
    this.adminService.getAlleAusgelieheneMitarbeiter().subscribe((response) => {
      for(let i=0; i<response.length; i++) {
        if(response[i].startZeit && response[i].endZeit) {
          response[i].startZeit = this.convertStringToDate(response[i].tag, response[i].startZeit);
          response[i].endZeit = this.convertStringToDate(response[i].tag, response[i].endZeit);
        }
      }
      this.ausgelieheneMitarbeiter = response;
    })
  }

  convertStringToDate(tag:string, uhrzeit:string) {
    let date = tag + 'T' + uhrzeit;
    return new Date(date);
  }

  onRowEditInit(ausgeliehenerMitarbeiter:any) {
    this.clonedAusgelieheneMitarbeiter[ausgeliehenerMitarbeiter.id] = {...ausgeliehenerMitarbeiter};   
  }

  onRowEditSave(ausgeliehenerMitarbeiter:any) {
    const startZeit = ausgeliehenerMitarbeiter.startZeit.toLocaleTimeString();
    ausgeliehenerMitarbeiter.startZeit = startZeit;
    const endZeit = ausgeliehenerMitarbeiter.endZeit.toLocaleTimeString();
    ausgeliehenerMitarbeiter.endZeit = endZeit;
    this.adminService.updateAusgeliehenenMitarbeiter(ausgeliehenerMitarbeiter).subscribe(() => {
      window.location.reload();
    })
  }

  onRowEditCancel(ausgeliehenerMitarbeiter:any, index: number) {
    this.ausgelieheneMitarbeiter[index] = this.clonedAusgelieheneMitarbeiter[ausgeliehenerMitarbeiter.id];
    delete this.clonedAusgelieheneMitarbeiter[ausgeliehenerMitarbeiter.id];
  }

}
