import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.2.24:8081/api/estoque"
})

export default Api;