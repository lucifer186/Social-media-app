import axios from "axios";


export const axiosInstance = axios.create({
    baseURL : "https://backendappnodejs.herokuapp.com/api"
})