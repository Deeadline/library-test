import {UserCommentInterface} from './user-comment.interface';
import {UserNoteInterface} from './user-note.interface';

export interface BookInterface {
  id?: number;
  title: string;
  releasedYear: number;
  averageNote?: number;
  description?: string;
  imageUrl?: string;
  isLoaned?: boolean;
  author: string;
  publishingHouse: string;
  comments?: UserCommentInterface[];
  notes?: UserNoteInterface[];
}
