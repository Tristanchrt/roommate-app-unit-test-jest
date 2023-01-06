import Server from './server/server';
import ChatServer from './socket/chat';

try {
  const server: Server = new Server(4000);
  const chatServer: ChatServer = new ChatServer(server.getServer());
  chatServer.start();
  server.start();
} catch (err) {
  throw 'Error start serveur';
}
