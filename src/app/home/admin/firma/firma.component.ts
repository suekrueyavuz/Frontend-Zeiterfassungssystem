import { Component, OnInit } from '@angular/core';
import { Firma } from 'src/app/model/firma';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent implements OnInit {
  allFirma: Firma[] = [];
  selectedFirma?: Firma;

  cols: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllFirma();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'username', header: 'Username' },
      { field: 'name', header: 'Name' }
    ];
  }

  getAllFirma() {
    this.adminService.getAllFirma().subscribe(data => {
      this.allFirma = data;
    })
  }

}
