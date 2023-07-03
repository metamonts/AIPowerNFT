import axios from 'axios'
import { useUserStore } from '@/store/user.js'
import { ElMessage, ElMessageBox } from 'element-plus'


// create an axios instance
const service = axios.create({
    timeout: 30 * 1000 // 30s 延迟
})
// request interceptor
service.interceptors.request.use(
    config => {
        const token = useUserStore().getToken
        if (token) {
            // 设置请求头 Authorization
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)
// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */

    async response => {
      const res = response.data
      const userStore = useUserStore()

      // 全局错误提示
      if (res.code === '1') {
        ElMessage({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      }

      return res
    },
    error => {
      console.log('请求错误：', error) // for debug
      let message = '网络请求失败，请稍后重试！'

      // 网络超时
      if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.includes('timeout')) {
        message = '当前访问用户较多，请刷新重试！'
      }
      alert(message)
      return Promise.reject(error)
    }
  )

  export default service
