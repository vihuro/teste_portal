import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.2.24:8585/api/v1/"
})
// const Api = axios.create({
//     baseURL:"http://localhost:5191/api/v1"
// })

export default Api;