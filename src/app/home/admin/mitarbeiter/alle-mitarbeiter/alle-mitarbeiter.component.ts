import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-alle-mitarbeiter',
  templateUrl: './alle-mitarbeiter.component.html',
  styleUrls: ['./alle-mitarbeiter.component.css']
})
export class AlleMitarbeiterComponent implements OnInit {
  allMitarbeiter: User[] = [];
  selectedMitarbeiter?: User;

  cols: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllMitarbeiter();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'username', header: 'Username' },
      { field: 'forename', header: 'Vorname' },
      { field: 'surname', header: 'Nachname' },
      { field: 'role', header: 'Rolle' }
    ];
  }

  getAllMitarbeiter() {
    this.adminService.getAllMitarbeiter().subscribe(data => {
      this.allMitarbeiter = data;
    })
  }
}
