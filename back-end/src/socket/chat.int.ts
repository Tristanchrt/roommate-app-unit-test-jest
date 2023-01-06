import http from 'http';
import { Socket } from 'socket.io';

export interface usersDB {
  [index: string]: Socket;
}

export interface IChatServer {
  server: http.Server;
  io: SocketIO.Server;
  usersDB: usersDB;
  listen(): void;
  start(): void;
}
