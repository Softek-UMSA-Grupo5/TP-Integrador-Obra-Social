import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0NDMwMjcsImV4cCI6MTcxOTQ0NjYyNywiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJlNTAwNDBiOS05OGM5LTQwY2UtODc0Ni05YzhlNzU5ZTI3NzIifQ.Fh1B7NFBiQsAdGZ8M1xFZci1VQbGSYNwptKGNjsINdETUDJ7onDT4v_4DrM-2vS9tQMw-RWIMUGPCR3zNblkKjmIu8NkNSbQlS8NVhDDenqfxpFtjXlB6UtmXnFzwvLKH6z6h8fZ5EPSnDaxvInXswhTHJPE1GVo6SNhwoO9CcmIvkU8EJNGjmxxY3n9c1LyCqkYjAlrspE6qsxC2HyCqueAwtaTTEWD5OElPT8xWjLyAkRwOQd9EljFRPHGNc3z6RZDwDxvihoqpy1faraFX3vIEjLjufE8lAiOn2pSorQeusKo5UIrxrf2VqnSqECSHhU2SkCYFLfuEDTQH3nY3g';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
