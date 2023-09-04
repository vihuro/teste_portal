import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.0.187:8081/api/v1"
})
export default Api;