import {UserInterface} from './user.interface';

export interface UserCommentInterface {
  comment: string;
  createdAt: Date;
  createdBy: UserInterface;
}
