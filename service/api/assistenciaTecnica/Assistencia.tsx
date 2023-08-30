import axios from "axios";

const Api = axios.create({
    baseURL:"http://localhost:5184/api/v1"
})
export default Api;