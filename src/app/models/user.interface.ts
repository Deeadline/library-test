import {BookInterface} from './book.interface';

export interface UserInterface {
  id?: number;
  username: string;
  password: string;
  role?: string;
  favouriteAuthor?: string;
  favouriteBook?: string;
  loanedBooks: BookInterface[];
}
