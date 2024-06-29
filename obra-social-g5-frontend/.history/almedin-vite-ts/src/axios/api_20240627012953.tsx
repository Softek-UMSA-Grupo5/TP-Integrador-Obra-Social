import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0NjI1NzgsImV4cCI6MTcxOTQ2NjE3OCwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJmZmM3NzEwNC05M2U2LTQxMDUtYmIxYi1jZDZhZmZmOWQ1Y2EifQ.gAe0fNqbzbfZgmExlKSN4BsC7x0fkpxkpY0kaRXP1tDs18151WtWpiqc70B6Fb4DcN_1cjgpAwIzWSkBYtBa-AvpO6K93MpA0bNLbhKwlDQfkQgC8KsjdncyGJCzUyPJn0qh_5R-tUhEBw7MkhsFvyByzcLgGekKWz_wsQ4L_cVaHD046sRXGGONQokuxf_lQCgvUTWb_Rna-voAihSVVwJj9vTAZ-8J0TVunHbEKDzUWwtTe8TA4s1hO_I9YOR6ysnXJ2Hyqhfm1qT4qXnDAkm4Iz-hZ4BQ31k6QhgrHcGyFpJufnfT-PkTtpMKnzv3h05KXNpSQnxQRofinij3jA';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
