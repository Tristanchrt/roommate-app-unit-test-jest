import { Document, model, Schema } from 'mongoose';

export class Filter {
  name: string;
  valFilter: never;
  type: string;
  createdAt: Date;

  constructor(data: { name: string; type: string; createdAt: Date; valFilter: never }) {
    this.name = data.name;
    this.type = data.type;
    this.createdAt = data.createdAt;
    this.valFilter = data.valFilter;
  }
}

export const filterShema = new Schema({
  name: { type: String, required: true },
  valFilter: { type: {}, trim: true, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface FilterDocument extends Filter, Document {}

export const Filters = model<FilterDocument>('Filter', filterShema);
