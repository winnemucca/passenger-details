import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccountDetails } from './account-model';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  // replace endpoint with route
  private SERVER_URL = 'https://frontiercodingtests.azurewebsites.net/api/accounts/getall';

  // declarative pattern for retrieving data preferred over creating method to house rest call
  // TODO identify if refactoring makes sense to allow async pipe for scenario in filtering for 3 different results.
  // $ signifies stream
  accountLists$ = this.http.get<AccountDetails[]>(this.SERVER_URL).pipe(
    tap(data => console.log(data)),
    catchError(this.handleError)
  );
  //  **** ^^^^not currently being used

  constructor(private http: HttpClient) { }
    // TODO write unit tests.  Time boxed to under 2 hours
  public getList(): Observable<AccountDetails[]> {
    return this.http.get<AccountDetails[]>(this.SERVER_URL).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  // generic error handler identify with team if more in depth error handling ex: stack strac
  // asp.net core application insights strong tool for error handling

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `url is ${error.url} `,
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Status;');
  }
}
