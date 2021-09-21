import axios from "axios"
import { API_URL } from 'configs'

const baseURL = API_URL

const axiosInstance = axios.create({
    baseURL: baseURL
})

export default axiosInstance