import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-verfuegbare-firmen',
  templateUrl: './verfuegbare-firmen.component.html',
  styleUrls: ['./verfuegbare-firmen.component.css']
})
export class VerfuegbareFirmenComponent implements OnInit {
  verfuegbareFirmen: any[] = [];
  selectedFirma: any;
  cols: any[] = [];

  constructor(private adminService: AdminService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.getVerfuegbareFirmen();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'username', header: 'Username' },
      { field: 'name', header: 'Name' }
    ];
  }

  getVerfuegbareFirmen() {
    this.adminService.getAllFirma().subscribe(value => {
      this.verfuegbareFirmen = value;
    })
  }

  selectFirma() {
    this.ref.close(this.selectedFirma);
  }

}
