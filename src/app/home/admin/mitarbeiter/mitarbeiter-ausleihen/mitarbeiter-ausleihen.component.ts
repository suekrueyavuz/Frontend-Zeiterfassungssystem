import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';
import { FirmaComponent } from '../../firma/firma.component';
import { VerfuegbareFirmenComponent } from './verfuegbare-firmen/verfuegbare-firmen.component';
import { VerfuegbareMitarbeiterComponent } from './verfuegbare-mitarbeiter/verfuegbare-mitarbeiter.component';

@Component({
  selector: 'app-mitarbeiter-ausleihen',
  templateUrl: './mitarbeiter-ausleihen.component.html',
  styleUrls: ['./mitarbeiter-ausleihen.component.css'],
  providers: [DialogService]
})
export class MitarbeiterAusleihenComponent implements OnInit {
  public form:FormGroup;
  schichten:string[] = [];
  
  mitarbeiterList:User[] = [];
  firmaList:any[] = [];

  selectedMitarbeiter?: User;
  selectedFirma?: any;

  constructor(fb:FormBuilder, private adminService: AdminService, public dialogService: DialogService) { 
    this.form = fb.group({
      mitarbeiter:[null , Validators.required],
      firma:[null, Validators.required],
      schicht:[null, Validators.required]
    });
    this.schichten = [
      'ERSTE_SCHICHT',
      'ZWEITE_SCHICHT',
      'DRITTE_SCHICHT'
    ]
  }

  ngOnInit(): void {
  }

  mitarbeiterAusleihen() {
    if(this.selectedFirma.id && this.selectedMitarbeiter?.id) {
      this.adminService.mitarbeiterAusleihen(this.selectedFirma.id, this.selectedMitarbeiter?.id, this.form.value.schicht)
      .subscribe(value => {
        console.log(value);
      })
    }
  }

  showVerfuegbareMitarbeiter() {
    const ref = this.dialogService.open(VerfuegbareMitarbeiterComponent, {
      header: 'Mitarbeiter auswählen',
      width: '70%'
    });

    ref.onClose.subscribe((mitarbeiter: User) => {
      if (mitarbeiter) {
        this.selectedMitarbeiter = mitarbeiter;
        this.form.get('mitarbeiter')?.setValue(this.selectedMitarbeiter);
      }
    });
  }

  showVerfuegbareFirma() {
    const ref = this.dialogService.open(VerfuegbareFirmenComponent, {
      header: 'Firma auswählen',
      width: '70%'
    });

    ref.onClose.subscribe((firma: any) => {
      if (firma) {
        this.selectedFirma = firma;
        this.form.get('firma')?.setValue(this.selectedFirma);
      }
    });
  }

  resetMitarbeiter() {
    this.selectedMitarbeiter = undefined;
    this.form.get('mitarbeiter')?.setValue(this.selectedMitarbeiter);
  }

  resetFirma() {
    this.selectedFirma = undefined;
    this.form.get('firma')?.setValue(this.selectedFirma);
  }

}
