import axios from "axios";


export const axiosInstance = axios.create({
    baseURL : "https://socail-server.onrender.com/api"
})