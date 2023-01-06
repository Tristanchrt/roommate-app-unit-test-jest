import { Document, Schema, model } from 'mongoose';
import { User } from './user';
import { Conversation } from './conversation';

export interface seeMessage {
  [index: string]: boolean;
}

export enum TypeMessage {
  message = 'text',
  file = 'file',
  image = 'image',
  gif = 'gif',
}

export class Message {
  conversationID: Conversation;
  sender: User;
  message: string;
  date: Date;
  type: TypeMessage;
  seeOrNot?: boolean;

  constructor(data: {
    conversationID: Conversation;
    sender: User;
    message: string;
    type: TypeMessage;
    seeOrNot: boolean;
  }) {
    this.conversationID = data.conversationID;
    this.sender = data.sender;
    this.message = data.message;
    this.type = data.type;
    this.seeOrNot = data.seeOrNot;
  }
}

const schema = new Schema({
  sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  conversationID: { type: Schema.Types.ObjectId, required: true, ref: 'Conversation' },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  type: { required: true, type: String },
  seeOrNot: { required: false, type: Boolean },
});

export interface MessageDocument extends Message, Document {}

export const Messages = model<MessageDocument>('Message', schema);
