import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.2.24:8081/api/v1"
})
export default Api;