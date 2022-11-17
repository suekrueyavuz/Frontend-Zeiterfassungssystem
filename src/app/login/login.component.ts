import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { User } from '../model/user';
import { MitarbeiterService } from '../service/mitarbeiter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form:FormGroup;

  constructor(fb:FormBuilder, private loginService: LoginService, private mitarbeiterService: MitarbeiterService, private router: Router) {
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

  login() {
    this.loginService.login(this.form.value.username, this.form.value.password).subscribe(data => {
      const user = new User(data.username, data.role, data.id);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', data.token);
      this.loginService.setUser(user);
      this.loginService.setIsLoggedIn(true);
      this.router.navigate(['/home']);
    });;
  }

}
