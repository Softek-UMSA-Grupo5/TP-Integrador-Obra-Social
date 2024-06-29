import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0NjMxMDMsImV4cCI6MTcxOTQ2NjcwMywiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJkMDQ2NWFlOC01NzA0LTQwMTgtYmY1Ny1lOGIzMmMwMzIxMjUifQ.BW7i8fQ-8bHqKT32fuyyXDcWisKr9D9Uo13k_cwuTGODcgPvALOQNP1tjmtfBKxFVnZrtP7IQzitZ_VGmGsjZ7_U2QhHvlhjsA1iDy45yjdJP0Pg0yIkFO9Vvvl4VUOQBGtQqLJZnbmIyRXIr_LANAZ63Bma9-7srr12yIc-ldH3m0_lcbjlBlxJZJY8t7kKqsDkSEvwObpYIU8mK38NqIFKeCJfX2sgA1LPgG5zO6tY9g5ugZDyGZZ1CQIDiIeKttCBNgU5PL2FBEy47GY8wb8s7VuU-A4oB6Yj1CVRxryGcU6LbO7a3mRrO3OGjmFdjJ1JR7tYF3N8ytiBZ1Kqrg';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
