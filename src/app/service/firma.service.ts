import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {
  BASE_URL: string = 'http://localhost:8080/firma';
  headers: any;

  constructor(private http: HttpClient) { }

  passwortAendern(firmaId:string, altesPasswort:string, neuesPasswort:string) {
    const body = {
      altesPasswort: altesPasswort,
      neuesPasswort: neuesPasswort
    };
    return this.http.put<any>(this.BASE_URL + '/' + firmaId, JSON.stringify(body), this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  getAusgelieheneMitarbeiter(firmaId:string) {
    return this.http.get<any>(this.BASE_URL + '/' + firmaId + '/ausgelieheneMitarbeiter', this.getHeaders())
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
