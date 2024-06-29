import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0NDEzNDgsImV4cCI6MTcxOTQ0NDk0OCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJiOWRkNDYxNS01YWIzLTQyNDEtYWQ1Ny1iM2RlNjI5ZWQwMDYifQ.lTeFgfGYzm8t3cPwVBF9xt8ZxPuttEy7y37XqeBv0uLCntN7Z8hlDXWwFel4PyOh8SyzYEvuE37pRDgZEcP6WuNYFML0N5uUlP_jcdDtBbSfV3ka0rbs2ILMON0hgZhvTcN-LCsvnk3-eqA3SlJxlZs9f5JPIq65vDox_DmcQeYhpHXyiFVskcZ1t_LyYoRJKLxM3DmfGH83aUFVc8_XJPQtD_wbnmz2MLmU22zHI-kr8XUCIH1qyFhBWqKkdLuxLN2AUkelPIS_UtKlt8aQBW483e0u7kTmhijGLmAldu1FQDIL9VofP3Bdl_SoO0w5S6F5K0v6fiuJ_zOmz5H16Q';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
