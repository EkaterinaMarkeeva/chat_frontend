const createRequest = async (options) => {
  let xhr = new XMLHttpRequest();

  const {method, url, data, callback} = options;
  const servUrl = 'http://localhost:3000';
  
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
    console.log('load', xhr);
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
