import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.0.187:8080/api/v1/estoque/matriz/grm"
})

export default Api;