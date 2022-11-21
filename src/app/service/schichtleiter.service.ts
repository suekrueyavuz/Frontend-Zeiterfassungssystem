import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchichtleiterService {
  BASE_URL: string = 'http://localhost:8080/schichtleiter';
  headers: any;

  constructor(private http: HttpClient) { }

  getMe(mitarbeiterId:string) {
    return this.http.get<any>(this.BASE_URL + '/' + mitarbeiterId, this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  alsFeiertagMarkieren(mitarbeiter:any) {
    return this.http.put<any>(this.BASE_URL + '/firma/' + mitarbeiter.auftraggeberFirma.id  + '/mitarbeiter/' + mitarbeiter.mitarbeiter.id + '?tag=' + mitarbeiter.tag + '&isFeiertag=true', null, this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  zeitenStatusBearbeiter(mitarbeiter:any, status:string) {
    const body = {
      firmaId: mitarbeiter.auftraggeberFirma.id,
      zeitStatus: status,
      arbeitstag: mitarbeiter.tag
    };
    return this.http.post<any>(this.BASE_URL + '/mitarbeiter/' + mitarbeiter.mitarbeiter.id, JSON.stringify(body), this.getHeaders())
    .pipe(retry(1), catchError(this.handleError));
  }

  alsUeberstundeMarkieren(mitarbeiter:any) {
    return this.http.post<any>(this.BASE_URL + '/firma/' + mitarbeiter.auftraggeberFirma.id + '/mitarbeiter/' + mitarbeiter.mitarbeiter.id + '?tag=' + mitarbeiter.tag, null, this.getHeaders())
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
