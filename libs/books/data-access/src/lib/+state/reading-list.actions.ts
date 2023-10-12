import { Book, ReadingListItem } from '@tmo/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadReadingList = createAction('[Reading List] Load list');

export const loadReadingListSuccess = createAction(
  '[Reading List] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Reading List] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Reading List] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const finishBookFromReadingList = createAction(
  '[Reading List] Finish Book from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedFinishBookFromReadingList = createAction(
  '[Reading List] Confirmed finish book from list',
  props<{ item: ReadingListItem }>()
);

export const failedFinishBookFromReadingList = createAction(
  '[Reading List] Failed finish book from list',
  props<{ item: ReadingListItem }>()
);