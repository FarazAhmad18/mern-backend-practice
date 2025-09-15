import axios from 'axios'
export const api=axios.create({
     baseURL:"http://localhost:3000",
  withCredentials: false,
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err?.response?.data?.error || err.message || "Request failed";
    return Promise.reject(new Error(msg));
  }
);