import axios from "axios"

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return error
    }
)

const localUrl = "http://localhost:3111/v1/"
const fakeUrl = "https://fakestoreapi.com"

const axiosInstance = axios.create({
    baseURL: localUrl,
})

export default axiosInstance