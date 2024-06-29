import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0MzY5OTUsImV4cCI6MTcxOTQ0MDU5NSwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI1ZDU0MWJlMi01OWY0LTRhNWQtYTBlYi1kOWE0YTQ1ODY5YzAifQ.AtN06u72YyECcsp8p2PDaA14PSePsHx9Uo_9vImfNR2df2Jph-5drwyYU_WP8SJUoWlhW1DsosGEVqns3IF2t2WNO2ZGSs33Rx0nBik0NhrDYeKZ7L8y2VGvEy9kZJ-JsdMRzknVsGGzBKhT5KRtNlzmSupm7V1Feb7QS7iMPGRYdQgOpZY9fDBPbaXXzQMMAUoCyMVOJDOcTxH-yl48pBq1DuVCmJOaqrVjM8jRuuu3CJYr4t4erBHpC64VFDiHFQ5TzpRHK1f_UQd_N2zv5y7JN0aYagJ1IsFpdxYaGz6a3sPCeZpEvCeTMQKiUzkQM23zClr9ovhsVPRAxNmE_Q';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
