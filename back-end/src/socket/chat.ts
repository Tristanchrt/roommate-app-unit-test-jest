import * as http from 'http';
import { Message, TypeMessage } from '../models/message';
import ioserver, { Socket } from 'socket.io';
import { IChatServer, usersDB } from './chat.int';
import * as chatFunction from './chat.function';
import { Conversation } from '../models/conversation';
import { SocketEvent } from './chat.constants';
import { json } from 'express';

export default class ChatServer implements IChatServer {
  public server: http.Server;
  public io: SocketIO.Server;
  public usersDB: usersDB; // attribute for store all users

  constructor(server: http.Server) {
    this.io = ioserver(server);
    this.io.origins('*:*');

    this.usersDB = {};
  }
  // method for listen all exchange of information in the socket
  public listen(): void {
    /**
     * @Connection function for connecting users to the socket
     * @params socket of user
     */
    this.io.on('connect', (socket: Socket) => {
      socket.on(SocketEvent.CONNECTION, (userId: string) => {
        console.log(`SOCKET ${socket.id} CONNECTED WITH ID => `, userId);
        if (userId == null) return;

        socket.id = userId;
        this.usersDB[userId] = socket;
        this.setup(userId);
      });
    });
  }

  private async setup(idUser: string): Promise<void> {
    const conversationsUser: Array<Conversation> = await chatFunction.getAllConvUser(idUser).catch((err) => {
      console.log(new Error(err));
      return null;
    });

    if (conversationsUser == null) {
      this.usersDB[idUser].disconnect();
      delete this.usersDB[idUser];
    }
    conversationsUser.forEach((conv) => {
      this.usersDB[idUser].join(conv._id);
    });

    this.usersDB[idUser].on(SocketEvent.MESSAGE, async (message: Message) => {
      if (message.type == TypeMessage.message) {
        this.sendMessage(message);
      } else {
        this.sendFile(message);
      }
    });

    this.usersDB[idUser].on(SocketEvent.DISCONNECT, () => {
      delete this.usersDB[idUser];
    });
    this.usersDB[idUser].on(SocketEvent.CONNECT_FAILED, () => {
      throw 'Connection Failed';
    });
    this.usersDB[idUser].on(SocketEvent.MESSAGE_ERROR, () => {
      throw 'Message send Failed';
    });
  }

  private async sendMessage(message: Message): Promise<void> {
    const messageConversation: Conversation = message.conversationID;

    const newMessage: Message = await chatFunction.createMessage(message).catch((err) => {
      console.log(new Error(err));
      return null;
    });
    if (newMessage == null) return;

    const conversation: Conversation = await chatFunction.getConversation(messageConversation).catch((err) => {
      console.log(new Error(err));
      return null;
    });
    if (conversation == null) return;

    conversation.messages.push(newMessage);
    await chatFunction.updateConv(conversation);

    conversation.receivers.forEach((receiver) => {
      if (this.usersDB[receiver._id]) this.usersDB[receiver._id].emit('MESSAGE', JSON.stringify(newMessage));
    });
  }
  private async sendFile(message: Message): Promise<void> {
    const messageConversation: Conversation = message.conversationID;

    const conversation: Conversation = await chatFunction.getConversation(messageConversation).catch((err) => {
      console.log(new Error(err));
      return null;
    });
    if (conversation == null) return;

    conversation.receivers.forEach((receiver) => {
      if (this.usersDB[receiver._id]) this.usersDB[receiver._id].emit('MESSAGE', JSON.stringify(message));
    });
  }

  public start(): void {
    this.listen();
  }
}
