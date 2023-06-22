import axios from "axios";

export default axios.create({
    baseURL:"http://192.168.1.157/RadarWebWebServices/Areas/",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    }
})