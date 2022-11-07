import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  BASE_URL: string = 'http://localhost:8080/admin/';

  constructor(private http: HttpClient) { }

  createNewMitarbeiter(user: User) {
    const body = {
      forename: user.forename,
      surname: user.surname,
      username: user.username,
      password: user.password,
      role: user.role
    };

    this.http.post<any>(this.BASE_URL + 'mitarbeiter', JSON.stringify(body))
    .pipe(retry(1), catchError(this.handleError)).subscribe(data => { });
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
