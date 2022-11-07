import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, retry, Subject, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = 'http://localhost:8080/login';
  user?: User;

  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
  }

  createLoginBody(username: string, password: string) {
    return {
      username: username,
      password: password
    }
  }

  login(username: string, password: string) {
    this.http.post<any>(this.url, JSON.stringify(this.createLoginBody(username, password)))
      .pipe(retry(1), catchError(this.handleError)).subscribe(data => {
        localStorage.setItem('token', data.token);
        this.user = new User(data.username, data.role);
        this.isLoggedIn.next(true);
        this.router.navigate(['/home']);
      });
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLoggedIn.next(false);
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  getUser() {
    return this.user;
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
