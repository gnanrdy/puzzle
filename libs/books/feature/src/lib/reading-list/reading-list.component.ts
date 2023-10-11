import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private _snackBar: MatSnackBar) { }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const config = new MatSnackBarConfig();
    config.panelClass = ['tmo-snack-bar'];
    config.duration = 5000;
    // config.horizontalPosition = 'right'; // Positioning the snackbar in the default position as top-right position is blocking the deletion of other 'My reading list' items
    // config.verticalPosition = 'top';
    const snackBarRef = this._snackBar.open('Removed book from the reading list!', 'Undo', config);

    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book: { ...item, id: item.bookId } }));
    });
  }
}
