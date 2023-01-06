import axios, { AxiosInstance } from 'axios';
import io from 'socket.io-client';
import Vue from 'vue';

import App from './primary/app/App.vue';
import ModalController from './primary/utils/ModalController';
import RoutesController from './primary/utils/RoutesController';
import router from './routes';
import RestAccountRepository from './secondary/restAccount/RestAccountRepository';
import RestChatRepository from './secondary/restChat/RestChatRepository';
import RestSocketRepository from './secondary/restSocket/RestSocketRepository';
import RestStoreRepository from './secondary/store/RestStoreRepository';

Vue.config.productionTip = false;

const BACKEND_URL: string = window.location.protocol + '//' + window.location.hostname + ':4000';
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URL + '/api',
});

const socket: SocketIOClient.Socket = io(BACKEND_URL, {
  transports: ['websocket'],
  upgrade: false,
  autoConnect: false,
  forceNew: true,
});

const store = new RestStoreRepository();
const accountRepository = new RestAccountRepository(store, axiosInstance);
const chatRepository = new RestChatRepository(store, axiosInstance);
const socketRepository = new RestSocketRepository(socket, axiosInstance, store);
const modalController = new ModalController();
const routesController = new RoutesController(store);

new Vue({
  router,
  render: h => h(App),
  provide: {
    accountRepository: () => accountRepository,
    chatRepository: () => chatRepository,
    socketRepository: () => socketRepository,
    storeRepository: () => store,
    modalController: () => modalController,
    routesController: () => routesController,
  },
}).$mount('#app');
