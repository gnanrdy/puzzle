import { Component, OnInit } from '@angular/core';
import {
  ReadingListBook,
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks
} from '@tmo/books/data-access';

import { Book } from '@tmo/shared/models';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });

    this.searchForm.controls.term.valueChanges.subscribe(value => {
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
}