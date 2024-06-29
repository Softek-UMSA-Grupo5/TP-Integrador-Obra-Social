import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk0NjEzNzUsImV4cCI6MTcxOTQ2NDk3NSwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiI1YzYyOTA2Mi05NzVhLTQyMDktOGRkMC01NGY1ZTcyYWZjMzYifQ.WpX-jmVpVxcEu_0ilXAUemvw5iiMvcOdVIYhdg9xL_VBDNDlpUlak4KEwGAo-McNso9HEam5HC4UgONLN9h13-zoVjm3Bgk09YUEeLqBsTZMKzrLqT5ce8FmbGHTonctlCpfmVUJeBct7UvxkQ6Dx9TvNjpHnl4Y8VV_JX9vQQjTrVViCb6n5Ub4AG-QfEy0WmXh4rqvQoZQkTTFt5eVjW2_-ODdTgSsWD-aT5I6eeTCUovvtCHkoR_F2oZ0qn1Sl3C3xNX9wzT_N076bn-p9vknjXXWt-soYMapWx_7GUdXh95p6h5PirRorgNmQ2MNEeSUgG-otP0TjrXa0Vqhpw';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
