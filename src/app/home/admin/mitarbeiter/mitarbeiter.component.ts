import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-mitarbeiter',
  templateUrl: './mitarbeiter.component.html',
  styleUrls: ['./mitarbeiter.component.css']
})
export class MitarbeiterComponent implements OnInit {
  allMitarbeiter: User[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllMitarbeiter();
  }

  getAllMitarbeiter() {
    this.adminService.getAllMitarbeiter().subscribe(data => {
      this.allMitarbeiter = data;
    })
  }

}
