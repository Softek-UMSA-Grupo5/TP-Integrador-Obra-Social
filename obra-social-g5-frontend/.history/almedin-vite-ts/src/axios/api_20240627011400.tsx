import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0NjE2MjYsImV4cCI6MTcxOTQ2NTIyNiwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI4OTRhMTE2OS1lOGZjLTQyZWYtYmU2Yy1lNWE1ODg0OGM4MjEifQ.De47PQHdEvXtzPBKBHQysCm4jcshkndcTOyMhjhiYpT4JrJAqJYGY70LSn56zuD11HxsuNyBCO9EUCcI4D8j59YPU9s8WXtI5DW6qEzt54vArLbs56ctyncLIi8IRfpJUrXL0OdkcWSe9AA5R8CJQ19MuYhBwVMPvWeYwHE4TD-u0emedvEcdSR1Ozwe7gsAEFz8Nu0l-chZPV3JjxILiH72XvTc-VU0JSld2iY9hqXQ6A45gYkzgjuCniLtsZxSvJ1gGILz9kYQUq07U52Ad01BZszNM3weLir3r7aLFmuCcXa8PfFAn7saTbnPTMJvmxmXulAOqUtx7OA7sRMOJA';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
