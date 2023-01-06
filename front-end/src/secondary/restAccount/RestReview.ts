import { RestUser } from './RestUser';

export interface RestReview {
  user: RestUser;
  text: string;
  mark: string;
}
