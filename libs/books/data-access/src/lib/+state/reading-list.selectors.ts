import { Book, ReadingListItem } from '@tmo/shared/models';
import {
  READING_LIST_FEATURE_KEY,
  ReadingListPartialState,
  State,
  readingListAdapter
} from './reading-list.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BooksPartialState } from './books.reducer';
import { getBooks } from './books.selectors';

export const getReadingListState = createFeatureSelector<
  ReadingListPartialState,
  State
>(READING_LIST_FEATURE_KEY);

const {
  selectEntities,
  selectAll,
  selectTotal
} = readingListAdapter.getSelectors();

export const getReadingListEntities = createSelector(
  getReadingListState,
  selectEntities
);

export interface ReadingListBook extends Book, Omit<ReadingListItem, 'bookId'> {
  isAdded: boolean;
}

export const getAllBooks = createSelector<
  BooksPartialState & ReadingListPartialState,
  Book[],
  Record<string, ReadingListItem>,
  ReadingListBook[]
>(getBooks, getReadingListEntities, (books, entities) => {
  return books.map(b => ({ ...b, isAdded: Boolean(entities[b.id]), finished: entities[b.id] && entities[b.id].finished, finishedDate: entities[b.id] && entities[b.id].finishedDate }));
});

export const getReadingList = createSelector(getReadingListState, selectAll);

export const getTotalUnread = createSelector(getReadingListState, selectTotal);