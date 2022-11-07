import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {  }

  sendLoginRequest(username: string, password: string) {
    this.loginService.login(username, password);
  }

}
