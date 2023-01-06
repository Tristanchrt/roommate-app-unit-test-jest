import { Document, model, Schema } from 'mongoose';
import { User } from './user';

export class Review {
  user: User;
  text: string;
  mark: string;

  constructor(data: { user: User; text: string; mark: string }) {
    this.user = data.user;
    this.text = data.text;
    this.mark = data.mark;
  }
}

export const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    text: { type: String, trim: true, required: true },
    mark: { type: Number, min: 0, max: 5, required: true },
  },
  { timestamps: true },
);

export interface ReviewDocument extends Review, Document {}

export const Reviews = model<ReviewDocument>('Review', reviewSchema);
