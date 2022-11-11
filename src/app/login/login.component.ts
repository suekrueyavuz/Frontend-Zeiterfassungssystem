import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form:FormGroup;

  constructor(fb:FormBuilder, private loginService: LoginService, private router: Router) {
    this.form = fb.group({
      username:[null , Validators.required],
      password:[null, Validators.required]
    })
    this.loginService.getIsLoggedIn().subscribe((value) => {
      if(value) {
        this.router.navigate(['/home']);
      }
    })
  }

  ngOnInit(): void {  }

  sendLoginRequest() {
    this.loginService.login(this.form.value.username, this.form.value.password);
  }

}
