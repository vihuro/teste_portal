import axios from "axios";

const Api = axios.create({
    baseURL:"http://localhost:32769/api/v1"
})
export default Api;