import axios from 'axios'
import {Message} from 'element-ui'

// 创建axios实例
const service = axios.create({
    baseURL: "/api",
    timeout: 30 * 1000,
    headers: {'Content-Type': 'application/json; charset=UTF-8'}
})

// request拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return error
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        if ('code' in response.data && response.data.code !== 200) {
            console.error("接口请求错误", response.data.msg)
            Message({
                message: "接口请求错误，请联系管理员......",
                type: "error",
                duration: 1500,
            });
        }
        return {response: response.data, data: response.data.data}
    },
    error => {
        return error
    }
)

export default service
