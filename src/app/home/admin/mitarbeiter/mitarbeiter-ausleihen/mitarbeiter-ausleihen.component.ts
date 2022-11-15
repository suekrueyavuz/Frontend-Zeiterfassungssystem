import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';
import { FirmaComponent } from '../../firma/firma.component';
import { VerfuegbareMitarbeiterComponent } from './verfuegbare-mitarbeiter/verfuegbare-mitarbeiter.component';

@Component({
  selector: 'app-mitarbeiter-ausleihen',
  templateUrl: './mitarbeiter-ausleihen.component.html',
  styleUrls: ['./mitarbeiter-ausleihen.component.css'],
  providers: [DialogService]
})
export class MitarbeiterAusleihenComponent implements OnInit {
  public form:FormGroup;
  
  mitarbeiterList:User[] = [];
  firmaList:any[] = [];

  selectedMitarbeiter?: User;

  constructor(fb:FormBuilder, private adminService: AdminService, public dialogService: DialogService) { 
    this.form = fb.group({
      username:[null , Validators.required],
      password:[null, Validators.required],
      forename:[null, Validators.required],
      surname:[null, Validators.required],
      role:[null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  mitarbeiterAusleihen() {

  }

  showVerfuegbareMitarbeiter() {
    const ref = this.dialogService.open(VerfuegbareMitarbeiterComponent, {
      header: 'Mitarbeiter auswählen',
      width: '70%'
    });

    ref.onClose.subscribe((mitarbeiter: User) => {
      if (mitarbeiter) {
        this.selectedMitarbeiter = mitarbeiter;
      }
    });
  }

}
