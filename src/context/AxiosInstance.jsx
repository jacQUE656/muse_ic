import axios from "axios";
import { API_BASE_URL } from "./AuthContext.jsx";

const instance = axios.create({
    baseURL: API_BASE_URL,
      headers: { 'Content-Type': 'application/json' }
});

   

instance.interceptors.request.use(
   
    (config)=>{
         const token = localStorage.getItem('token');
if (token) {
    config.headers.Authorization = `Bearer ${token}`;
}
return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);
export default instance;