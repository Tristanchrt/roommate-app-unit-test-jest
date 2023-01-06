import express from 'express';

export default interface IServer {
  readonly app: express.Application;
  readonly port: number;
  routes(): void;
  connectDB(): void;
  config(): void;
  start(): void;
  getApp(): express.Application;
}
