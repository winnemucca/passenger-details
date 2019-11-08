import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './DataService';
import { AccountDetails } from './account-model';
import { catchError, filter, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // accountListsOverdue$ = this.dataService.accountLists$
  // .pipe(
  //   catchError(error => {
  //     this.errorMessage = error;
  //     return of(null);
  //   }),
  //   filter()
  // );

  // TODO review async method is better approach for handling multiple arrays
  errorMessage: string;
  unsubscribe$: Subject<void> = new Subject<void>();
  newAccountsActive: AccountDetails[];  // AccountDetails;
  newAccountsOverdue: AccountDetails[];
  newAccountsInactive: AccountDetails[];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getList().pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe( (data: AccountDetails[]) => {
      this.newAccountsOverdue = data.filter( account => account.AccountStatusId === 2);
      this.newAccountsInactive = data.filter( account => account.AccountStatusId === 1);
      this.newAccountsActive = data.filter(account => account.AccountStatusId === 0  );
    });
  }

  ngOnDestroy() {
    // TODO Write unit test for destroy method
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
