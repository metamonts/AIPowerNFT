import request from '@/utils/request'
import { baseUrl } from '@/utils/config'

export function post(url, data, config) {
    return new Promise((resolve, reject) => {
      request({
        url: baseUrl + url,
        method: 'post',
        data,
        ...config
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  
  export function get(url, params, config) {
    return new Promise((resolve, reject) => {
      request({
        url: baseUrl + url,
        method: 'get',
        params,
        ...config
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }