import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { FirmaService } from 'src/app/service/firma.service';

@Component({
  selector: 'app-passwort-aendern',
  templateUrl: './passwort-aendern.component.html',
  styleUrls: ['./passwort-aendern.component.css']
})
export class PasswortAendernComponent implements OnInit {
  public form:FormGroup;
  me?: User;

  constructor(fb:FormBuilder, private firmaService: FirmaService) { 
    this.form = fb.group({
      altesPasswort:[null , Validators.required],
      neuesPasswort:[null, Validators.required],
      neuesPasswort2:[null, Validators.required]
    })
    this.me = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
  }

  passwortAendern() {
    if(this.form.value.neuesPasswort === this.form.value.neuesPasswort2) {
      this.firmaService.passwortAendern(this.me?.id || null!, this.form.value.altesPasswort, this.form.value.neuesPasswort)
      .subscribe(() => {
        window.location.reload();
      });
    }
  }

}
