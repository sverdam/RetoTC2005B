import axios, {type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/",//TODO: Agregar url de backend
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;