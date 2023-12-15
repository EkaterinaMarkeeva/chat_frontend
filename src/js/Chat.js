import ChatAPI from "./api/ChatAPI";
import View from "./chatView";

export default class Chat {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
    this.api = new ChatAPI();
    this.websocket = null;
    this.view = new View(this);
    this.user = null;

    this.onClick = this.onClick.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onEnterChatHandler = this.onEnterChatHandler.bind(this);
    this.subscribeOnEvents = this.subscribeOnEvents.bind(this);
  }

  init() {
    this.view.createStartModal();
  }

  bindToDOM() {}

  registerEvents() {
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

          this.websocket = new WebSocket('ws://localhost:3000/ws');

          this.subscribeOnEvents();

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

  subscribeOnEvents() {
    this.websocket.addEventListener('open', (e) => {
      console.log('open', e);
    });

    this.websocket.addEventListener('message', this.renderMessage.bind(this));

    this.websocket.addEventListener('error', (e) => {
      console.log('error', e);
    });

    this.websocket.addEventListener('close', (e) => {
      console.log('close', e);
    });

    window.onunload = () => {
      const user = this.user;

      this.websocket.send(JSON.stringify({type: 'exit', user}));
    }
  }

  onEnterChatHandler(e) {
    if (e.keyCode === 13) {
      this.sendMessage(e);
    }
  }

  sendMessage(e) {
    const elem = e.target;

    const message = elem.value;
    const date = Date.now();
    const name = this.user.name;
    
    if (!message) return;
    
    this.websocket.send(JSON.stringify({type: "send", name, date, message}));
    
    elem.value = '';
  }

  renderMessage(e) {
    const userList = document.querySelector('.chat__userlist');
    const messages = document.querySelector('.chat__messages-container');

    const data = JSON.parse(e.data);

    if (Array.isArray(data)) {
      if (userList) {
          userList.remove();
        }

      this.view.createUserList(data);

      const user = document.getElementById(this.user.id);
      const name = user.querySelector('.chat__user-name');

      name.classList.add('chat__yourself');

      name.textContent = "YOU";
    } else {
      this.view.createCorrespondence(data);
      
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

    this.registerEvents();
  }
}
