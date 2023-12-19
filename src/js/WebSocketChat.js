export default class WebSocketChat {
  constructor(target) {
    this.target = target;
    this.websocket = null;
    
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeOnEvents = this.subscribeOnEvents.bind(this);
  }

  createWebSocket() {
    this.websocket = new WebSocket('ws://chat-backend-neda.onrender.com');
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

  sendMessage(data) {
    this.websocket.send(JSON.stringify(data));
  }

  renderMessage(e) {
    const data = JSON.parse(e.data);
    
    if (Array.isArray(data)) {
      this.target.displayUsers(data);
    } else {
      this.target.displayMessage(data);
    }
  }
}