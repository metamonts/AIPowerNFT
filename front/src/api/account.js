import { post } from './index'

export const _login = (data) => post('/accounts/login', data) // 登录
export const _getCode = (data) => post('/accounts/request_code', data) // 获取邮箱/手机验证码
export const _setAccountInfo = (data) => post('/accounts/change_account_info', data) // 修改账号信息
export const _setEmail = (data) => post('/accounts/change_email', data) // 修改邮箱信息
