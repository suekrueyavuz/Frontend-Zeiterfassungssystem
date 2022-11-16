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

  constructor(private http: HttpClient) { }

  createNewMitarbeiter(username:string, password:string, forename:string, surname:string, role:string) {
    const body = {
      forename: forename,
      surname: surname,
      username: username,
      password: password,
      role: role
    };

    return this.http.post<any>(this.BASE_URL + 'mitarbeiter', JSON.stringify(body), this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  getAllMitarbeiter() {
    return this.http.get<any>(this.BASE_URL + 'mitarbeiter', this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  getVerfuegbareMitarbeiter() {
    return this.http.get<any>(this.BASE_URL + 'mitarbeiter/verfuegbar', this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  getAllFirma() {
    return this.http.get<any>(this.BASE_URL + 'firma', this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  deleteMitarbeiter(mitarbeiterId: string) {
    return this.http.delete(this.BASE_URL + 'mitarbeiter/' + mitarbeiterId, this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  editMitarbeiter(mitarbeiter: User) {
    const body = {
      id: mitarbeiter.id,
      forename: mitarbeiter.forename,
      surname: mitarbeiter.surname,
      username: mitarbeiter.username,
      role: mitarbeiter.role
    };
    return this.http.put(this.BASE_URL + 'mitarbeiter/bearbeiten', JSON.stringify(body), this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  mitarbeiterAusleihen(firmaId:string, mitarbeiterId:string, schicht:string) {
    return this.http.post<any>(this.BASE_URL + 'firma/' + firmaId + '/mitarbeiter/' + mitarbeiterId + '?schicht=' + schicht, null, this.getHeaders())
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
