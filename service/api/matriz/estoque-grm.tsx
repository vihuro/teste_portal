import axios from "axios";
import { parseCookies } from "nookies";

// const Api = axios.create({
//     baseURL:"http://localhost:5022/api/v1/estoque",
    
// })
const Api = axios.create({
    baseURL:"http://localhost:8080/api/v1/estoque/matriz/grm",
    
})
Api.interceptors.request.use((request)=>{
    const token = parseCookies().ACCESS_TOKEN;
    if(token){
        request.headers.Authorization = `Bearer ${token}`
    }return request;
})

export default Api;