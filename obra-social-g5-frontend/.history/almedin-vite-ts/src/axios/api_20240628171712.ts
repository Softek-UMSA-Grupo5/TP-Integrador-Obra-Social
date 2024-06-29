import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk2MDU4MTQsImV4cCI6MTcxOTYwOTQxNCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJkNmM5MDA1NS0zYzg2LTQ4Y2QtYTZhOS00MmNlYmZjMTdiZjgifQ.eo8-PS5GsTI9Z9RxWWCTATXk3IW-WjTD1Iuo5WiMwhd6BiSghWtHfs3nW-YVsc-Xi6aFFZvfGiSe0Mes5WeIuMChmYWeGMslS0eCWF2S7PLcm3tuNTsBJsTsiE9j0iyBew-HXnJvQEl8MVj-j0j4FN0ksRdVuQwjHeA9w6AGeuNF6KGSVe9QfylcyPtO_dx88D_BH_FjqrICcJ7qc1awSW_GuGmwSrGeA948ZtdnGqXYJgDPO9GFkKZFoW1keZj5BFeLXVK8qOilFavrvqQbyKlk37FVxA0RJ5WXlHWPSkgEfOAstbMDpY5gFH25aF-qevm3VOFAGiRbBlexmaK-Xg';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
