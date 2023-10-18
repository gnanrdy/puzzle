import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ReadingListBook,
  addToReadingList,
  clearSearch,
  getAllBooks,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';

import { Book } from '@tmo/shared/models';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  private destroyed$: Subject<boolean> = new Subject();

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });

    this.searchForm.controls.term.valueChanges
      .pipe(takeUntil(this.destroyed$)).subscribe(value => {
        if (!value) {
          this.store.dispatch(clearSearch());
        }
      });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));

    const snackBarRef = this._snackBar.open('Added book to the reading list!', 'Undo', {
      duration: 5000,
      // horizontalPosition: 'right',
      // verticalPosition: 'top',
    });

    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(removeFromReadingList({ item: { ...book, bookId: book.id } }));
    });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  trackByBookFn(index: number, book: ReadingListBook): (number | string) {
    return book.id;
  }

  getAriaLabelOfBook(book: ReadingListBook): string {
    if (book.isAdded) {
      return `Book with title ${book.title} is already added!`;
    }
    else {
      return `Want to Read ${book.title}?`;
    }
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}