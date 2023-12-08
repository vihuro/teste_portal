import axios from "axios";

const Api = axios.create({
    baseURL:"http://localhost:5757/api/v1"
})
export default Api;