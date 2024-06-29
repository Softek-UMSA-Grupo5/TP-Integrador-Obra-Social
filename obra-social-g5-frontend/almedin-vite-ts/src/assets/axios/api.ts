import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk2MTc0ODAsImV4cCI6MTcxOTYyMTA4MCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI4OGIzNDM5OC0yODRjLTQ1ODMtYmUxOC00NDQ2N2FkYWEyODYifQ.gwns-4L-IhgSGJiBkRZYmtyRPyGAoe1otO0gF0CjlHTpC33z7yBWfTvOi8WozGDovTLlekVLpqQFDk7jTezX-_yUc2DXtoJUNTHN-pNN3xDugyGrMjlpXj_wj7xFqZkz0c--bMm6MzvaAorcZmNJO6gZ1DbvQKrPeX3-TG9BbKunibRWoao05IOHb7VlVl9Imt63kiburLd46Hebn9ph3_GmDoQLDpDWw5DfcI2Q1DHOXc86YYLYm9rQEy9qeIQPMi-B6rRNnAeyzbNI8jtCfkz5VwC8TmDderbQJ138WACBICMkBoS52Tf-DM9L9gWsmayspx3vZfuqUKXXwPjRCw';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
