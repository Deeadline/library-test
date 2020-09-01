import {UserInterface} from './user.interface';

export interface AuthRequestInterface {
  user: UserInterface;
  message?: string;
}
