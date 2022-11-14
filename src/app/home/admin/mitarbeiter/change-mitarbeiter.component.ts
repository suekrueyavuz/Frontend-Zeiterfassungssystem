import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-change-mitarbeiter',
  templateUrl: './change-mitarbeiter.component.html',
  styleUrls: ['./change-mitarbeiter.component.css']
})
export class ChangeMitarbeiterComponent implements OnInit {
  @Input() selectedMitarbeiter?: User;
  @Output() selectedMitarbeiterChange = new EventEmitter<any>();
  changedMitarbeiter?: User;

  roles:any = [];
  items: MenuItem[] = [];

  clickedEdit:boolean = false;

  public form:FormGroup;

  constructor(fb:FormBuilder, private adminService: AdminService) {
    this.form = fb.group({
      username:[null , Validators.required],
      forename:[null, Validators.required],
      surname:[null, Validators.required],
      role:[null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.roles = [
      'ROLE_ADMIN',
      'ROLE_MITARBEITER',
      'ROLE_SCHICHTLEITER'
    ];
    this.items = [{
      items: [
          {label: 'Bearbeiten', icon: 'pi pi-fw pi-pencil', command: () => this.clickedEdit = !this.clickedEdit},
          {label: 'Löschen', icon: 'pi pi-fw pi-times'}
      ]
    }];
  }

  changeMitarbeiter() {
    console.log(this.selectedMitarbeiter?.forename);
    
  }

  closeSelectedMitarbeiter() {
    this.selectedMitarbeiterChange.emit(undefined);
  }

}
