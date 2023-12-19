const createRequest = async (options) => {
  const xhr = new XMLHttpRequest();

  const {method, url, data, callback} = options;
  const servUrl = 'https://chat-backend-neda.onrender.com';
  
  xhr.responseType = "text";
  
  try {
    if (method === 'GET') {
      xhr.open(method, servUrl + url);
      xhr.send();
    } else {
      xhr.open(method, servUrl + url);
      xhr.send(JSON.stringify(data));
    }
  } catch (err) {
    if (callback) callback(err);
  }

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText);
        callback(data);
      } catch (e) {
        console.error(e);
      }
    } else {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  });
};

export default createRequest;
