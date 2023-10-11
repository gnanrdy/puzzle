import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BookSearchComponent } from './book-search.component';
import { BooksFeatureModule } from '../books-feature.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { expect } from 'chai';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  const book = {
    id: "ptiYBAAAQBAJ",
    title: "JavaScript & jQuery: The Missing Manual",
    authors: [
       "David Sawyer McFarland"
    ],
    description: "JavaScript lets you supercharge your HTML with animation, interactivity, and visual effects—but many web designers find the language hard to learn.",
    publisher: "\"O'Reilly Media, Inc.\"",
    publishedDate: "2014-09-18T00:00:00.000Z",
    coverUrl: "http://books.google.com/books/content?id=ptiYBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    isAdded: false
 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  it('TrackBy function should return the book id', () => {
    expect(component.trackByBookFn(0, book)).to.be.a('string', book.id);
  });

  it('`getAriaLabelOfBook` method should return aria-label for already added book', () => {
    const addedBook = {...book, isAdded: true};
    expect(component.getAriaLabelOfBook(addedBook)).to.equal(`Book with title ${addedBook.title} is already added!`);
  });

  it('`getAriaLabelOfBook` method should return aria-label for Want to read button', () => {
    expect(component.getAriaLabelOfBook(book)).to.equal(`Want to Read ${book.title}?`);
  });
});