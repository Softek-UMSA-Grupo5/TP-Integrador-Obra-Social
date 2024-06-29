import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk1MDMwOTEsImV4cCI6MTcxOTUwNjY5MSwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI0NGVlODRhZS00ZTE1LTQzOWUtOTY3Yy02OGM0NjhiYmQzZmUifQ.Zrj3h_15l3NDFzdmgpAlvPt8DjCFeZuC-w_RB387_CWRaLvaEuoB3lAQFnTLdITRsMJNy50ypNFUG1D0yP-zNhYxoIo0ouqCTo1t69oAsjqFu2KVC0Q3d7kiYBNY-JHG8ra9mSr3Sugi8FweJGHu0o-prOTVifFVcR9rpgoJyOGbNlCTeX1occ8KDvjHaxRypRFFSGwmwB4Y_cz_ATR3-4BLGOSwD2elt95p30Snp4tCGFeT9nSr7nmxiQULeRh_qWkMpOlyullJzGuKFaxevzoNscvu-SFRvbslrghKiCdAyleG6eNEfHqOk3p15RoEENrjec09rXjkN6Bqj1RvCg';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
