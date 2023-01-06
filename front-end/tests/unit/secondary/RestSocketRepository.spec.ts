import io from 'socket.io-client';

import { franck } from '../fixtures/account/Account.fixture';
import {
  messageFranckTristan,
  messageTristanFranck,
  restMessageTristanFranck,
  restSocketMessageTristanFranck,
} from '../fixtures/chat/Message.fixture';
import { resolveStoreRepository, stubStoreRepository } from '../fixtures/store/StoreRepository.fixture';
import { customError, stubAxiosInstance } from '../Utils';

import { Message, NewMessage, TypeMessage } from '@/domain/chat/Message';
import { fromSocketMessagetoMessage, RestSocketMessage, toTypeMessage } from '@/secondary/restSocket/RestSocketMessage';
import RestSocketRepository from '@/secondary/restSocket/RestSocketRepository';

const stubSocket = (): SocketIOClient.Socket => {
  const socket: SocketIOClient.Socket = io('http://localhost:9999', {
    transports: ['websocket'],
    upgrade: false,
    autoConnect: false,
    forceNew: true,
  });

  socket.connect = jest.fn();
  socket.emit = jest.fn();
  socket.disconnect = jest.fn();
  socket.on = jest.fn();

  return socket;
};
describe('SocketRepository', () => {
  beforeEach(() => {});
  it('Should not init socket connect if no user is connected', () => {
    const storeRepository = stubStoreRepository();
    const socket = stubSocket();
    const axiosInstance = stubAxiosInstance();

    const socketRepository = new RestSocketRepository(socket, axiosInstance, storeRepository);

    storeRepository.user().getUser.returns(null);
    socketRepository.init();

    expect(socket.connect).not.toBeCalled();
  });
  it('Should correctly init socketIO if a user is connected', () => {
    const storeRepository = stubStoreRepository();
    const socket = stubSocket();
    const axiosInstance = stubAxiosInstance();
    const socketRepository = new RestSocketRepository(socket, axiosInstance, storeRepository);

    storeRepository.user().getUser.returns(franck);
    socketRepository.init();

    expect(socket.connect).toBeCalled();
    expect(socket.on).toBeCalledWith('connect', expect.any(Function));

    // expect(socket.emit).toBeCalledWith('CONNECTION', franck.id);
    // expect(socket.on).toBeCalledWith('MESSAGE', expect.any(Function));
  });
  it('Should correctly destroy socketIO on destroy', () => {
    const storeRepository = stubStoreRepository();
    const socket = stubSocket();
    const axiosInstance = stubAxiosInstance();

    const socketRepository = new RestSocketRepository(socket, axiosInstance, storeRepository);

    socketRepository.destroy();

    expect(socket.disconnect).toBeCalled();
  });
  it('Should send a REST message', () => {
    const message: NewMessage = { ...messageFranckTristan, senderID: franck.id };
    const storeRepository = stubStoreRepository();
    const socket = stubSocket();
    const axiosInstance = stubAxiosInstance();
    const socketRepository = new RestSocketRepository(socket, axiosInstance, storeRepository);
    socketRepository.sendMessage(message);
    const restMessage = {
      conversationID: message.conversationID,
      sender: message.senderID,
      message: message.content,
      type: 'text',
    };

    expect(socket.emit).toBeCalledWith('SEND_MESSAGE', restMessage);
  });
  it('Should correclty convert a RESTSocketMessage to a message', () => {
    const restSocketMessage = restSocketMessageTristanFranck;
    const message = fromSocketMessagetoMessage(restSocketMessage);

    expect(message).toEqual(messageTristanFranck);
  });
  it('Should fail to create file if some error in back-end', async () => {
    const axiosInstance = stubAxiosInstance();
    const socket = stubSocket();
    const storeRepository = stubStoreRepository();
    axiosInstance.post.rejects(customError(500, "Can't create file: Network Error"));
    const restChatRepository = new RestSocketRepository(socket, axiosInstance, storeRepository);

    const file: Blob = new Blob();
    const message: NewMessage = {
      conversationID: 'someConversationId',
      senderID: franck.id,
      content: '',
      type: TypeMessage.file,
    };

    await restChatRepository.uploadFile(message, file).catch(error => {
      expect(error).toEqual(Error("Can't create file: Network Error"));
    });
  });
  it('Should correctly to create file', async () => {
    const axiosInstance = stubAxiosInstance();
    const socket = stubSocket();
    const storeRepository = resolveStoreRepository();
    axiosInstance.post.resolves({ data: restMessageTristanFranck });
    const restChatRepository = new RestSocketRepository(socket, axiosInstance, storeRepository);
    const axiosPost = jest.spyOn(axiosInstance, 'post');
    const socketEmit = jest.spyOn(socket, 'emit');

    const file: Blob = new Blob();
    const message: NewMessage = {
      conversationID: 'someConversationId',
      senderID: franck.id,
      content: '',
      type: TypeMessage.file,
    };

    const testForm: FormData = new FormData();
    testForm.set('file', file);
    testForm.set('message', JSON.stringify(message));

    const fileMessage = await restChatRepository.uploadFile(message, file);
    expect(axiosPost).toBeCalled();
    expect(axiosPost.mock.calls[0][0]).toBe('/user/message/uploadFile');
    expect(JSON.stringify(axiosPost.mock.calls[0][1])).toEqual(JSON.stringify(testForm));
    expect(axiosPost.mock.calls[0][2]).toEqual({
      headers: {
        Authorization: storeRepository.user().getToken(),
      },
    });
    expect(socketEmit).toBeCalledWith('SEND_MESSAGE', restMessageTristanFranck);
    expect(fileMessage).toEqual(messageTristanFranck);
  });
  it('Should correctly convert a socketMessage to a message', () => {
    const socketMessage1: RestSocketMessage = { ...restMessageTristanFranck, type: 'unknown' };
    const message1: Message = { ...messageTristanFranck, type: TypeMessage.message };
    expect(fromSocketMessagetoMessage(socketMessage1)).toEqual(message1);

    const socketMessage2: RestSocketMessage = { ...restMessageTristanFranck, type: 'image' };
    const message2: Message = { ...messageTristanFranck, type: TypeMessage.image };
    expect(fromSocketMessagetoMessage(socketMessage2)).toEqual(message2);

    const socketMessage3: RestSocketMessage = { ...restMessageTristanFranck, type: 'gif' };
    const message3: Message = { ...messageTristanFranck, type: TypeMessage.gif };
    expect(fromSocketMessagetoMessage(socketMessage3)).toEqual(message3);

    const socketMessage4: RestSocketMessage = { ...restMessageTristanFranck, type: 'file' };
    const message4: Message = { ...messageTristanFranck, type: TypeMessage.file };
    expect(fromSocketMessagetoMessage(socketMessage4)).toEqual(message4);
  });
});
