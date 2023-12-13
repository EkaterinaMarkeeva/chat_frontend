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

  createChat(response) {
    const chat = document.createElement('div');

    chat.classList.add('chat__container');

    chat.appendChild(this.createUserList(response.user));
    chat.appendChild(this.createCorrespondence());

    this.target.container.appendChild(chat);
  }

  createUserList(data) {
    const userList = document.createElement('div');
    const user = document.createElement('div');
    const circle = document.createElement('div');
    const userName = document.createElement('div');

    userList.classList.add('chat__userlist');
    user.classList.add('chat__user');
    circle.classList.add('chat__user-circle');
    userName.classList.add('chat__user-name');

    user.id = data.id;
    userName.textContent = data.name;

    user.appendChild(circle);
    user.appendChild(userName);
    userList.appendChild(user);

    return userList;
  }

  createCorrespondence() {
    const messages = document.createElement('div');
    const message = document.createElement('div');
    const userName = document.createElement('p');
    const date = document.createElement('time');
    const text = document.createElement('p');
    const input = document.createElement('input');

    messages.classList.add('chat__messages-container');
    message.classList.add('message__container');
    userName.classList.add('userName');
    date.classList.add('message-date');
    text.classList.add('message-text');
    input.classList.add('input');
    input.classList.add('chat__messages-input');

    userName.textContent = null;
    date.textContent = null;
    text.textContent = null;

    input.type = 'text';

    message.appendChild(userName);
    message.appendChild(date);
    message.appendChild(text);
    message.appendChild(input);
    messages.appendChild(message);
    
    return messages;
  }
}