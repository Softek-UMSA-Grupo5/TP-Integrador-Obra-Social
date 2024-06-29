import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0NTk1NDQsImV4cCI6MTcxOTQ2MzE0NCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiIxNGNiYWJmOS1mMTVmLTQ0MDAtODFiZi0xODczN2M3MzI4ZTcifQ.Xl5kW9PzMEJoo-5Ow7zBfkFGQGrRAH51oMAdSmBjMwFOLIJv9TZrutij8avX37wirU7zB49RIWyWe2DIpRSDKpyAeJlPOfwORlC-qW1EkxFLRBhTtjPTyNX12X6l2dHNESj8oS916FByqOF1LV2aA4WjwzRNqchJFQrDOxCHBVEvxLttub9r8_NlYSr87_E1b_LGFq6_cBebHdbxxbyzpFCECEShd1bUvBbO0E3OeFIOrisfNrtQph678J2gfl9iGSMHT_bnFiVj0NBtmm_EtKjomCo251RsS7xVYSCp1C_chT_pMCCjVkcflXvmEVzEe6XfbuY1PAbJrVFAncnyTg';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
