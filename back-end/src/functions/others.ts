import { sha256 } from 'js-sha256';
import { User } from '../models/user';

interface json_schemaa {
  id: string;
  firstName: string;
  lastName: string;
}

export const hashVal = (valHash: string): string => {
  return sha256(valHash);
};

export const json_schema = (user: User): json_schemaa => {
  return {
    id: user._id,
    lastName: user.lastName,
    firstName: user.firstName,
  };
};
