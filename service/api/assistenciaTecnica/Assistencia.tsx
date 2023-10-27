import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.2.38:8181/api/v1"
})
export default Api;