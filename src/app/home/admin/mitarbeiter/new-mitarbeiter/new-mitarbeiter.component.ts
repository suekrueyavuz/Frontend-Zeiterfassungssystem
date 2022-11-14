import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-new-mitarbeiter',
  templateUrl: './new-mitarbeiter.component.html',
  styleUrls: ['./new-mitarbeiter.component.css']
})
export class NewMitarbeiterComponent implements OnInit {
  public form:FormGroup;
  roles:string[] = [];

  constructor(fb:FormBuilder, private adminService: AdminService, private router: Router) {
    this.roles = [
      'ROLE_ADMIN',
      'ROLE_SCHICHTLEITER',
      'ROLE_MITARBEITER'
    ]
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

  createNewMitarbeiter() {
    this.adminService.createNewMitarbeiter(this.form.value.username, this.form.value.password, this.form.value.forename,
      this.form.value.surname, this.form.value.role).subscribe();
    this.router.navigate(['/admin/mitarbeiter'])
  }

}
