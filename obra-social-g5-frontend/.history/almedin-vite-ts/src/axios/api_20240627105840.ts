import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0OTY2OTgsImV4cCI6MTcxOTUwMDI5OCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJmMjllZjRjMi0zOGY1LTQ4OGQtODQxMC0wZTVhNTM0NGZhZmYifQ.DXubFb_d5UHDJFl29fxoYfbXQ5UTZz8S7Af0tIeeGIT379x38QOeSgQLpE66EvPXuIFRtrAnW_vC-TYFCvuyn_l6LJoutuy84YoAEgGl2wPOnxuM3jScUjI0MxVfzQy75uso9rsCLjlN2JEcXvqv92zhw_9lhzqz05E_5QqDKopLUFwjA9BbJqlVZkqS7O4f6sCf_qhvn5wqpsnFU09DfAzKGFLXWYx6_a32d0yoHJ0ogwSSKgOAvRdGoxiEo-cjnP1exXhh8iT1legBNPnew_X9YQNLQGV6Jq4SMIqof9M0K5rkmqUo1Uv6B6djgpLiFrOl_ueC-xKNFk7zIeGWkg';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
