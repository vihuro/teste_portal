import axios from "axios";

const Api = axios.create({
    baseURL:"http://192.168.1.87:8080/api/v1/auth"
})
// const Api = axios.create({
//     baseURL:"http://localhost:5191/api/v1"
// })

export default Api;