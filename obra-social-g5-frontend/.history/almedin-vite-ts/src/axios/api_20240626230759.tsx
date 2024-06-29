import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0NTQwNjUsImV4cCI6MTcxOTQ1NzY2NSwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJiY2U1MGJkNi1lZDljLTRhZTAtODcxOS1mOGM2NDg5OTMyNDYifQ.hDcHYSIaRcJZyVTcrwPO-gRc0Q-NIvT08rLbNwx7zQOiLJfEvgQL7u0oOQy-Kt1pSjix4NThmf2-MrsXmyzweQgZucTM3gpw92A4HtZVXnnmGn2HfY31lWyHMp6QvG007YzSNi7IPICkPjTCZIFpBjkLvdcc6ylQRcDSLdK8JoKCFTiuITvGrqhxtAxuyr5DpZI9cHIatsbHBUHMpLqLH8BWzg9vn6FNtPMFnmYS2SG2o4vg1bdthYpQ8-gvemcUq1hj2qly27MbY3yXiUxTylJNakgn67zU-BwNOYbgB9HY82V1xDiwgZ0Z8yILLN21MubjvbN5r7l8tW4VrXOHpA';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
