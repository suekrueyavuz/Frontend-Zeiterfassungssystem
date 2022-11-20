import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-new-firma',
  templateUrl: './new-firma.component.html',
  styleUrls: ['./new-firma.component.css']
})
export class NewFirmaComponent implements OnInit {
  public form:FormGroup;

  constructor(fb:FormBuilder, private adminService: AdminService, private router: Router) { 
    this.form = fb.group({
      name:[null , Validators.required],
      username:[null , Validators.required],
      password:[null, Validators.required],
      ersteSchicht:[null, Validators.required],
      zweiteSchicht:[null, Validators.required],
      dritteSchicht:[null, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  createNewFirma() {
    this.adminService.createNewFirma(this.form.value.name, this.form.value.username, this.form.value.password,
      this.form.value.ersteSchicht, this.form.value.dritteSchicht, this.form.value.dritteSchicht)
      .subscribe(() => {
        this.router.navigate(['/admin/firma'])
      })
  }

}
