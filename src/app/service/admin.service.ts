import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  BASE_URL: string = 'http://localhost:8080/admin/';
  headers: any;
  options: any;

  constructor(private http: HttpClient) { }

  createNewMitarbeiter(username:string, password:string, forename:string, surname:string, role:string) {
    const body = {
      forename: forename,
      surname: surname,
      username: username,
      password: password,
      role: role
    };

    this.http.post<any>(this.BASE_URL + 'mitarbeiter', JSON.stringify(body), this.getHeaders())
    .pipe(retry(1), catchError(this.handleError)).subscribe();
  }

  getAllMitarbeiter() {
    return this.http.get<any>(this.BASE_URL + 'mitarbeiter', this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  getAllFirma() {
    return this.http.get<any>(this.BASE_URL + 'firma', this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  getHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return { headers: this.headers };
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
