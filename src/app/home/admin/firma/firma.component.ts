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

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllFirma();
  }

  getAllFirma() {
    this.adminService.getAllFirma().subscribe(data => {
      this.allFirma = data;
    })
  }

}
