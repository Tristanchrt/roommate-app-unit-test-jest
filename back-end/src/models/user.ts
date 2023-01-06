import { Document, model, Schema } from 'mongoose';
import { Review } from './review';
import { Conversation } from './conversation';
import { Filter, filterShema } from './filter';

export class User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  localisation: string;
  description: string;
  avatar: string;
  mark: number;
  filters: Array<Filter>;
  sex: string;
  profilesSaved: Array<User>;
  reviews: Array<Review>;
  conversations: Array<Conversation>;
  createdAt: Date;

  constructor(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    localisation: string;
    description: string;
    avatar: string;
    mark: number;
    filters: Array<Filter>;
    sex: string;
    createdAt: Date;
  }) {
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.birthDate = data.birthDate;
    this.localisation = data.localisation ? data.localisation : null;
    this.description = data.description ? data.description : null;
    this.avatar = data.avatar ? data.avatar : null;
    this.mark = null;
    this.filters = data.filters;
    this.sex = data.sex ? data.sex : null;
    this.profilesSaved = [];
    this.reviews = [];
    this.conversations = [];
    this.createdAt = data.createdAt;
  }
  toCard(): Partial<User> {
    const user = {
      _id: this._id,
      avatar: this.avatar ? this.avatar : null,
      firstName: this.firstName,
      lastName: this.lastName,
    };
    return user;
  }
  update(user: User): void {
    this.description = user.description ? user.description : this.description;
    this.avatar = user.avatar ? user.avatar : this.avatar;
    this.profilesSaved = user.profilesSaved ? user.profilesSaved : this.profilesSaved;
    this.filters = user.filters ? user.filters : this.filters;
  }

  profilReview(): Partial<User> {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: this.birthDate,
      avatar: this.avatar,
      mark: this.mark,
    };
    return user;
  }

  profile(): Partial<User> {
    const user = {
      _id: this._id,
      avatar: this.avatar ? this.avatar : null,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      description: this.description,
      sex: this.sex ? this.sex : null,
      filters: this.filters,
      mark: this.mark,
      createdAt: this.createdAt,
      localisation: this.localisation,
    };
    return user;
  }

  profileConnect(): Partial<User> {
    const user = {
      _id: this._id,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      localisation: this.localisation,
      description: this.description,
      avatar: this.avatar ? this.avatar : null,
      mark: this.mark,
      filters: this.filters,
      sex: this.sex ? this.sex : null,
      profilesSaved: this.profilesSaved,
      reviews: this.reviews,
      conversations: this.conversations,
      createdAt: this.createdAt,
    };
    return user;
  }
}

export const schema = new Schema(
  {
    email: { type: String, trim: true, unique: true, lowercase: true, required: true },
    password: { type: String, trim: true, required: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    birthDate: { type: Date, required: true },
    localisation: { type: String, trim: true, required: false },
    description: { type: String, trim: true, required: false },
    avatar: { type: String, trim: true, required: false },
    mark: { type: Number, required: false },
    filters: [filterShema],
    sex: { type: String, trim: true, required: false },
    profilesSaved: [{ ref: 'User', type: Schema.Types.ObjectId, default: [], required: false }],
    reviews: [{ ref: 'Review', type: Schema.Types.ObjectId, default: [], required: false }],
    conversations: [{ ref: 'Conversation', type: Schema.Types.ObjectId, default: [], required: false }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

schema.method('toCard', User.prototype.toCard);
schema.method('update', User.prototype.update);
schema.method('profile', User.prototype.profile);
schema.method('profilReview', User.prototype.profilReview);
schema.method('profileConnect', User.prototype.profileConnect);

// export interface UserDocument extends User, Document {}

export type UserDocument = User & Document;

export const Users = model<UserDocument>('User', schema);
