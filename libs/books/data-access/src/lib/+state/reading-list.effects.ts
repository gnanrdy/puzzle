import * as ReadingListActions from './reading-list.actions';

import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReadingListItem } from '@tmo/shared/models';
import { map } from 'rxjs/operators';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.loadReadingList),
      fetch({
        run: () => {
          return this.http
            .get<ReadingListItem[]>('/api/reading-list')
            .pipe(
              map(data =>
                ReadingListActions.loadReadingListSuccess({ list: data })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ReadingListActions.loadReadingListError({ error });
        }
      })
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      optimisticUpdate({
        run: ({ book }) => {
          return this.http.post('/api/reading-list', book).pipe(
            map(() =>
              ReadingListActions.confirmedAddToReadingList({
                book
              })
            )
          );
        },
        undoAction: ({ book }) => {
          return ReadingListActions.failedAddToReadingList({
            book
          });
        }
      })
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
            map(() =>
              ReadingListActions.confirmedRemoveFromReadingList({
                item
              })
            )
          );
        },
        undoAction: ({ item }) => {
          return ReadingListActions.failedRemoveFromReadingList({
            item
          });
        }
      })
    )
  );

  finishBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.finishBookFromReadingList),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http.put(`/api/reading-list/${item.bookId}/finished`, item).pipe(
            map(() =>
              ReadingListActions.confirmedFinishBookFromReadingList({
                item
              })
            )
          );
        },
        undoAction: ({ item }) => {
          return ReadingListActions.failedFinishBookFromReadingList({
            item
          });
        }
      })
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.loadReadingList();
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}