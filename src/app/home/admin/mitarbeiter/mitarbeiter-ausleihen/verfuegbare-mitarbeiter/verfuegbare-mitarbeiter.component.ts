import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-verfuegbare-mitarbeiter',
  templateUrl: './verfuegbare-mitarbeiter.component.html',
  styleUrls: ['./verfuegbare-mitarbeiter.component.css']
})
export class VerfuegbareMitarbeiterComponent implements OnInit {
  verfuegbareMitarbeiter: User[] = [];
  selectedMitarbeiter?: User;
  cols: any[] = [];

  constructor(private adminService: AdminService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.getVerfuegbareMitarbeiter();
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'username', header: 'Username' },
      { field: 'forename', header: 'Vorname' },
      { field: 'surname', header: 'Nachname' },
      { field: 'role', header: 'Rolle' }
    ];
  }

  selectMitarbeiter() {
    this.ref.close(this.selectedMitarbeiter);
  }

  getVerfuegbareMitarbeiter() {
    this.adminService.getVerfuegbareMitarbeiter().subscribe(value => {
      this.verfuegbareMitarbeiter = value;
    })
  }

}
