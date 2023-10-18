export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publisher?: string;
  publishedDate?: string;
  coverUrl?: string;
  finished?: boolean;
  finishedDate?: string;
}

export interface ReadingListItem extends Omit<Book, 'id'> {
  bookId: string;
}
