import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.0.220:8080/api/v1/auth"
})
// const Api = axios.create({
//     baseURL:"http://192.168.1.87:8080/api/v1/auth"
// })

export default Api;