import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { routerUser } from '../routers/user';
import { routerFilter } from '../routers/filter';
import { routerReview } from '../routers/review';
import { routerConversation } from '../routers/conversation';
import { routerMessage } from '../routers/message';
import * as dotenv from 'dotenv';
import IServer from './server.int';
import http from 'http';
import multer, { Multer } from 'multer';

/**
 * @Server Class for server ts express mongoose
 */
export default class Server implements IServer {
  readonly app: express.Application;
  readonly server: http.Server;
  readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);
  }

  // method create of routes in express server
  public routes(): void {
    this.app.use('/api/user/conversation', routerConversation);
    this.app.use('/api/user/message', routerMessage);
    this.app.use('/api/user/review', routerReview);
    this.app.use('/api/user/filter', routerFilter);
    this.app.use('/api/user/', routerUser);
  }
  // method connexion database
  public connectDB(): void {
    try {
      const url =
        'mongodb+srv://root:coloc-app-123456789@coloc-app.prixy.mongodb.net/coloc-app?retryWrites=true&w=majority';
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      mongoose.set('useCreateIndex', true);
      const connection = mongoose.connection;

      connection.once('open', () => {
        console.log(`Connected to Mongoose Server successfully`);
      });
    } catch (err) {
      console.log('Error connect db');
    }
  }

  // method config server
  public config(): void {
    try {
      dotenv.config({ path: __dirname + '/.env' });
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use((req: Request, res: Response, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
      });
    } catch (err) {
      console.log('Erreur start server');
    }
  }
  // method for start server
  public start(): void {
    this.connectDB();
    this.config();
    this.routes();

    this.server.listen(this.port, () => {
      console.log(`Server running on port : ${this.port}`);
    });
  }
  public getApp(): express.Application {
    return this.app;
  }
  public getServer(): http.Server {
    return this.server;
  }
}
