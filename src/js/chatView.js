export default class View{
  constructor(target) {
    this.target = target;
  }

  createStartModal() {
    const modal = document.createElement('div');
    const title = document.createElement('h2');
    const input = document.createElement('input');
    const button = document.createElement('button');

    modal.classList.add('modal');
    modal.classList.add('form');
    title.classList.add('modal-title');
    input.classList.add('input');
    button.classList.add('btn');
    button.classList.add('modal-btn');
    button.classList.add('btn-next');

    title.textContent = 'Выберите псевдоним';
    button.textContent = 'Продолжить';

    input.name = 'name';
    input.type = 'text';

    button.addEventListener('click', this.target.onClick);

    modal.appendChild(title);
    modal.appendChild(input);
    modal.appendChild(button);

    this.target.container.appendChild(modal);
  }

  createError(message) {
    const modal = document.createElement('div');
    const title = document.createElement('h2');
    const button = document.createElement('button');

    modal.classList.add('modal');
    title.classList.add('modal-title');
    button.classList.add('btn');
    button.classList.add('modal-btn');
    button.classList.add('btn-ok');

    title.textContent = message;
    button.textContent = 'Ok';
    
    button.addEventListener('click', this.target.onClick);

    modal.appendChild(title);
    modal.appendChild(button);

    this.target.container.appendChild(modal);
  }

  createChat() {
    const chat = document.createElement('div');
    const messages = document.createElement('div');
    const input = document.createElement('input');

    chat.classList.add('chat__container');
    messages.classList.add('chat__messages-container');
    input.classList.add('input');
    input.classList.add('chat__messages-input');

    input.type = 'text';

    input.addEventListener("keypress", this.target.onEnterChatHandler);

    messages.appendChild(input);
    chat.appendChild(messages);

    this.target.container.appendChild(chat);
  }

  createUserList(data) {
    const chat = document.querySelector('.chat__container');
    const userList = document.createElement('div');

    userList.classList.add('chat__userlist');
    
    if (data) {
      data.forEach(elem => {
        const user = document.createElement('div');
        const circle = document.createElement('div');
        const userName = document.createElement('div');
        
        user.classList.add('chat__user');
        circle.classList.add('chat__user-circle');
        userName.classList.add('chat__user-name');
    
        user.id = elem.id;
        userName.textContent = elem.name;
    
        user.appendChild(circle);
        user.appendChild(userName);
        userList.appendChild(user);
      });
    }
    
    chat.prepend(userList);
  }

  createCorrespondence(data) {
    const messages = document.querySelector('.chat__messages-container');
    const input = document.querySelector('.chat__messages-input');

    if (data) {
      const message = document.createElement('div');
      const userName = document.createElement('p');
      const header = document.createElement('div');
      const date = document.createElement('time');
      const text = document.createElement('p');

      message.classList.add('message__container');
      header.classList.add('message__header');
      userName.classList.add('message__header_user-name');
      date.classList.add('message__header_date');
      text.classList.add('message__text-content');

      userName.textContent = data.name;
      date.textContent = new Date(Number(data.date)).toLocaleTimeString('ru-RU', {hour: '2-digit',  minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'});
      text.textContent = data.message;
      
      message.setAttribute('data-name', data.name);

      header.appendChild(userName);
      header.appendChild(date);
      message.appendChild(header);
      message.appendChild(text);

      messages.insertBefore(message, input);
    }
  }
}