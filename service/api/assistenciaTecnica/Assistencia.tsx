import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.1.87:8081/api/v1/"
})
export default Api;