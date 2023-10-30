import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.0.12:8181/api/v1"
})
export default Api;