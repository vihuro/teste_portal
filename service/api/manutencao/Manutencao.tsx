import axios from "axios";

const Api = axios.create({
    baseURL:"https://localhost:32770/api/v1/"
})
// const Api = axios.create({
//     baseURL:"http://localhost:5191/api/v1"
// })

export default Api;