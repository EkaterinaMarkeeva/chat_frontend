import ChatAPI from "./api/ChatAPI";
import View from "./chatView";
import WebSocketChat from "./WebSocketChat";

export default class Chat {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
    this.api = new ChatAPI();
    this.websocket = new WebSocketChat(this);
    this.view = new View(this);
    this.user = null;

    this.onClick = this.onClick.bind(this);
    this.displayUsers = this.displayUsers.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
    this.onEnterChatHandler = this.onEnterChatHandler.bind(this);
  }

  init() {
    this.view.createStartModal();
  }

  onClick(e) {
    e.preventDefault();

    const elem = e.target;

    if (elem.className.includes('next')) {
      const modal = elem.closest('.modal');
      const input = modal.querySelector('.input');

      const data = { name: input.value.trim() };

      const createChat = (response) => {
        if (response && response.status === 'ok') {
          this.user = response.user;

          modal.remove();

          this.view.createChat();
          this.websocket.createWebSocket();
          this.websocket.subscribeOnEvents();

          return;
        } 

        if (response && response.status === 'error') {
          modal.remove();
          this.view.createError(response.message);
        
          return;
        }
      }

      this.api.create(data, createChat);

      return;
    }

    if (elem.className.includes('ok')) {
      const modal = elem.closest('.modal');

      modal.remove();
      this.view.createStartModal();
      
      return;
    }
  }

  onEnterChatHandler(e) {
    if (e.keyCode === 13) {
      const elem = e.target;
      const message = elem.value;

      if (!message) return;

      const date = Date.now();
      const name = this.user.name;

      this.websocket.sendMessage({type: "send", name, date, message});

      elem.value = '';
    }
  }

  displayUsers(data) {
    const userList = document.querySelector('.chat__userlist');

    if (userList) {
      userList.remove();
    }

    this.view.createUserList(data);

    const user = document.getElementById(this.user.id);
    const name = user.querySelector('.chat__user-name');

    name.classList.add('chat__yourself');

    name.textContent = "YOU";
  }

  displayMessage(data) {
    this.view.createCorrespondence(data);

    const messages = document.querySelector('.chat__messages-container');
    const userMessages = messages.querySelectorAll(`[data-name=${this.user.name}]`);

    if (userMessages.length > 0) {
      userMessages.forEach(message => {
        const header = message.querySelector('.message__header');
        const userName = message.querySelector('.message__header_user-name');

        message.classList.add('message__container-yourself');
        header.classList.add('message__header-yourself');

        userName.textContent = "You";
      });
    }
  }
}
