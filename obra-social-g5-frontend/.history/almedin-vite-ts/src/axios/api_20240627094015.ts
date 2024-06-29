import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0OTE5NzQsImV4cCI6MTcxOTQ5NTU3NCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJkNWE0MmYzZC00NjAwLTRhNWUtYjk3Zi0yMmMyM2MyNDBkOTMifQ.Xow5wi74xmnhxg4AbYlfCCafuak3NpZyMRv-TfMG4ZpK8YhR9oodsTrDEKP1R-3kGzgj97JhftUbd5MmuRgUX1Q05b6a8xocYsZ3LoBOBOWN0Vq94l_iL_hqi8NXV2l2mdNF-c_5ykp3AiAvafurp6iqfluOOo6df0uhzR-J91h5DzQhMua2U07NC8zS15TtWGAsqA6dAY2TpAEUtejGiyt3U6ZLo7GAD3TFQ5I7raE8NaMf257a9OvXI4GqVPUBBAMKhhMa5RXHjgiHeWewpMWj2OWiqxqCUZeBDFZXhe3CNgoezeT7h8rpaWD2Zfn9iP5zZM4mD49QT5yY_iq7Nw';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
