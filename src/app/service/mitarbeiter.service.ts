import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MitarbeiterService {
  BASE_URL: string = 'http://localhost:8080/mitarbeiter';
  headers: any;

  constructor(private http: HttpClient) { }

  getMe(username:string) {
    return this.http.get<any>(this.BASE_URL + '?username=' + username, this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  getAusleihungen(mitarbeiterId:string) {
    return this.http.get<any>(this.BASE_URL + '/' + mitarbeiterId, this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  arbeitszeitenEintragen(ausleihung: any) {
    const body = {
      startZeit: ausleihung.startZeit,
      endZeit: ausleihung.endZeit,
      arbeitstag: ausleihung.tag
    };
    return this.http.post<any>(this.BASE_URL + '/' + ausleihung.mitarbeiter.id + '/firma/' + ausleihung.auftraggeberFirma.id, JSON.stringify(body), this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  alsFeiertagMarkieren(mitarbeiter:any) {
    return this.http.put<any>(this.BASE_URL + '/' + mitarbeiter.mitarbeiter.id  + '/firma/' + mitarbeiter.auftraggeberFirma.id + '?tag=' + mitarbeiter.tag + '&isFeiertag=true', null, this.getHeaders())
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
