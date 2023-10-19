import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';

import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  readingList$ = this.store.select(getReadingList);

  private destroyed$: Subject<boolean> = new Subject();

  constructor(private readonly store: Store, private _snackBar: MatSnackBar) { }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const config = new MatSnackBarConfig();
    config.panelClass = ['tmo-snack-bar'];
    config.duration = 5000;
    const snackBarRef = this._snackBar.open('Removed book from the reading list!', 'Undo', config);

    snackBarRef.onAction().pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.store.dispatch(addToReadingList({ book: { ...item, id: item.bookId } }));
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
