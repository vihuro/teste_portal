import axios from "axios";

// const Api = axios.create({
//     baseURL:"http://192.168.1.87:8081/api/v1/"
// })
const Api = axios.create({
    baseURL:"http://localhost:5757/api/v1/"
})
export default Api;