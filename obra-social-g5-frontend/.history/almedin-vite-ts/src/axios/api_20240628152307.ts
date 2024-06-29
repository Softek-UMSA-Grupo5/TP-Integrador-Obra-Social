import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk1OTg5NjEsImV4cCI6MTcxOTYwMjU2MSwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI4OWQwZDUwYi1lOWNlLTQ4OWMtOGM1NC1kYWVkYzk5ZTEzZjUifQ.i5e7ldWvNBS4EIC8PuBynm7MJAPZIli9iOtfeRiJD1IwdLYvYitBhTq73STErLDcOZplahgvL6rbwtgDqL5jxIQb2ZLSkr8ZI1C93ZCChgMwTejC79eMCEI8Vv1o1NCpVODp4A9ZzFMQuOn9RwRC_dr_9fbt871GKJaH9HE24Y-1lvL-Lg9N2r14gEC493mWgZdU0K51VERr3hlGfpM2zBWQQQDAvfuOgdx696jpXOcewKX6Z-MSmJ0ZJXoH4GlTiJE2ggmCP1cOidtI5dPx7B5i744R2Z_3fmfHFdUID6syuMVhC45DYF05-o6WVoXKwqYKyw4LhdPFrCpJzq3XLg';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
