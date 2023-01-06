import { Document, Schema, model } from 'mongoose';
import { User } from './user';
import { Message } from './message';

export class Conversation {
  _id: string;
  messages: Array<Message>;
  receivers: Array<User>;
  createdAt: Date;

  constructor(data: { users: Array<User> }) {
    this.messages = [];
    this.receivers = data.users;
  }

  toConv(): Partial<Conversation> {
    const conversation = {
      _id: this._id,
      messages: this.messages,
      receivers: this.receivers,
      createdAt: this.createdAt,
    };
    return conversation;
  }
}

const schema = new Schema({
  messages: [{ type: Schema.Types.ObjectId, required: true, ref: 'Message', default: [] }],
  receivers: [{ type: Schema.Types.ObjectId, required: true, ref: 'User', default: [] }],
  createdAt: { type: Date, default: Date.now },
});

schema.method('toConv', Conversation.prototype.toConv);

export type ConversationDocument = Conversation & Document;

export const Conversations = model<ConversationDocument>('Conversation', schema);
