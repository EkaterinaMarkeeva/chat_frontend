import createRequest from "./createRequest";

export default class Entity {
  URL = '';

  list(callback) {
    createRequest({
      method: 'GET',
      url: this.URL,
      callback
    });
  }

  get(data, callback) {
    createRequest({
      method: 'GET',
      url: this.URL + data.id,
      data, 
      callback
    });
  }

  create(data, callback) {
    createRequest({
      method: 'POST',
      url: this.URL,
      data, 
      callback
    });
  }

  update(data, callback) {
    createRequest({
      method: 'POST',
      url: this.URL + data.id,
      data, 
      callback
    });
  }

  delete(data, callback) {
    createRequest({
      method: 'GET',
      url: this.URL + data.id,
      data, 
      callback
    });
  }
}
