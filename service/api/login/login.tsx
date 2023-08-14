import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.2.24:8080/api/v1/auth/login"
})

export default Api;