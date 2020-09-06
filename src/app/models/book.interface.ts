import {UserCommentInterface} from './user-comment.interface';
import {UserNoteInterface} from './user-note.interface';
import {UserInterface} from './user.interface';

export interface BookInterface {
  id?: number;
  title: string;
  releasedYear: number;
  averageNote?: number;
  description?: string;
  imageUrl?: string;
  isLoaned?: boolean;
  loanedBy?: UserInterface;
  author: string;
  publishingHouse: string;
  comments?: UserCommentInterface[];
  notes?: UserNoteInterface[];
}
