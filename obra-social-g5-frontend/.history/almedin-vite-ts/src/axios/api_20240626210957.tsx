import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0NDY5ODAsImV4cCI6MTcxOTQ1MDU4MCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJlN2FlZTg5My1iMjY4LTQ5OGYtOWU0Ni0wZmEwZWJiYjdkNDQifQ.GO8D9P7SqrfdPX9iWsQLpvR0rCMKlXxbB-7IJpIuBipxFl5zFtviQq_SRO69UcM3gYQHsBCghuHTtQK1yu0xC8kU046BbAEO3B5el0A4rrElZc0BQlGjIq6kvR_sSc6esn1rZIoAoQzV6Zl_sX06HLF_gSNQySud7L-hJcip5siqP4Xt__FjTxRC3xZ3tLzwwp4Ja-0ePyNVQ7HpX3wyxJ2Dol4_ZY0z29q_iRXYKFoziCo822LyBy2AZyfixlH310dnfmlL_u_22U1RxVjoWLILtz15O0OBnLLfG3aK1kzZAzEV-kA3hLHd0Umpz54WNs_D1cfAMFqj7AzYy9bwtw';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
