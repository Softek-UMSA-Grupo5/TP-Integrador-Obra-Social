import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); 
  const token = 'eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VqZW1wbG8uY29tIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MTk2MTM2NTYsImV4cCI6MTcxOTYxNzI1NiwiZ3JvdXBzIjpbIlJPTF9BRE1JTiJdLCJqdGkiOiJmMzMxZWFjNC1lZGRhLTQxOTUtODAyZC0wOGY3NTU4MzI5MGUifQ.XRBV-z7HRXBDMWuYLY8Iq5Y-42G6m3hsfqkOdRLvYlXru5-tOBySsfCodjR7Ge2PQ-Fg51iS--MTBpdtr5NJiSzdzj9ZRCdzYFU0SNFCygHshrdnh_W8xjP29JE0plcIsmX_chioQsPXkgR-1GNZ-co_NAA516h-LxCxxpRxBBZemU5DM2ZsoeWZvXuH_so8pImWaVl0Dpffmz-t97CIaZtrMWxLnl4vNEguMCg-c2RSjK0UWL0kx3frlpm-A0e4pzxE_ARzRbs8Bu1qyK4RfheQWYlyWMR3KW_Zl1gig8HoL2DVSP4oWs9p4g12MgnHjMAvA3BVwGOUVM838fiHIw';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
