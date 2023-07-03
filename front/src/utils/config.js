/**
 * 环境
 */

 let environment
 const { host } = window.location
 if (host.includes('dev') || host.includes('localhost') || host.includes('10.10')) {
   environment = 'dev'
 } else if (host.includes('test')) {
   environment = 'test'
 } else if (host.includes('res')) {
   environment = 'res'
 } else {
   environment = 'prod'
 }

 const configMap = {
   dev: {
     baseUrl: 'http://10.10.203.178:9776', // 开发服务器
   },
   test: {
     baseUrl: 'https://sitest.artmuse.cn/art/api',
   },
   res: {
     baseUrl: 'https://sires.artmuse.cn/art/api',
   },
   prod: {
     baseUrl: 'https://si.artmuse.cn/art/api',
   }
 }

 // 版本号
 const version = 'v1'

 export const baseUrl = configMap[environment].baseUrl + '/' + version
 export const baseEnv = environment
