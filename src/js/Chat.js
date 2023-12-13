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

    this.chatSend = document.querySelector('.message-input');

    this.onClick = this.onClick.bind(this);
  }

  init() {
    this.view.createStartModal();
  }

  bindToDOM() {}

  registerEvents() {
    // this.websocket = new WebSocket('ws://http://localhost:3000/ws');
    
    this.chatSend.addEventListener('click', this.sendMessage);
    // this.websocket.addEventListener('open', this.open);
    // this.websocket.addEventListener('close', this.close);
    // this.websocket.addEventListener('error', this.error);
    // this.websocket.addEventListener('message', callbeck);
  }

  onClick(e) {
    e.preventDefault();

    const elem = e.target;

    if (elem.className.includes('next')) {
      const modal = elem.closest('.modal');
      const input = modal.querySelector('.input');

      const data = { name: input.value };

      const createChat = (response) => {
        if (response && response.status === 'ok') {
          modal.remove();
          this.view.createChat(response);

          return;
        } 

        if (response && response.status === 'error') {
          modal.remove();
          this.view.createError(response.message);
        
          return;
        }
      }

      // this.chat.registerEvents();
      this.api.create(data, createChat);
      this.websocket = new WebSocket('ws://http://localhost:3000/ws');

      return;
    }

    if (elem.className.includes('ok')) {
      const modal = elem.closest('.modal');

      modal.remove();
      this.view.createStartModal();
      
      return;
    }
  }

  subscribeOnEvents() {}

  onEnterChatHandler() {}

  sendMessage() {
    const message = this.chatSend.value;
    
    if (!message) return;
    
    ws.send(message);
    
    chatMessage.value = '';
  }

  renderMessage() {
  //   const data = JSON.parse(e.data);
  //   const { chat: messages } = data;
  
  //   messages.forEach(message => {
  //   chat.appendChild(document.createTextNode(message) + '\n');
  // });
  }
}
