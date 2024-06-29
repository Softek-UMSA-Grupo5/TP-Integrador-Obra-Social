import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTkzNjM1ODgsImV4cCI6MTcxOTM2NzE4OCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJlMDJkNTFmMy1kYTNmLTQzNjctYmQwYS0wNmNhM2VhZDIwMTYifQ.FIAXIbU1Rcf2fqXX9Aqz8eXhP-SFLAu-ueamm8_7l0Alf5vjJdoso0pR5dpsyP4qbfBrJ8GsUvY0lJNqojrONYd6mpq5606gUwTpf-Fc1dn5BqisfuU68i9xzOPjaegf32dC77e0Q_lEfHlq1668S4SWgn1-7eEh5sdUbTuVii0uCcDl6EHHHq9iKYYIhaK_1n6VVrYSly4U4qNdU_q0LvBlDIWLoGCgA2O1g-qHG2kknKWaqI2IZj9ecVZs_dziCUxGppSdcRocaaaROlqGrYr9a43890nI6kErJeblSoSxSuoYM7VQl_G0EHIxrR1FjFuivyg6KWFx2yjyIKtrbg';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
