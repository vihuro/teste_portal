import axios from "axios";
import { parseCookies } from "nookies";

const Api = axios.create({
    baseURL:"http://192.168.0.187:8080/api/v1/estoque/matriz/grm",
    
})
Api.interceptors.request.use((request)=>{
    const token = parseCookies().ACCESS_TOKEN;
    console.log(token)
    if(token){
        request.headers.Authorization = `Bearer ${token}`
    }return request;
})

export default Api;