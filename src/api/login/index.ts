import { request } from '@/utils/http'
import type { loginResult, loginType } from '@/type/login'
export const login = (data: loginType) => {
  return request<loginResult>({
    url: '/wx/user/login',
    method: 'POST',
    data,
  })
}
export const bindApi = (data: loginType) => {
  return request<loginResult>({
    url: '/wx/user/bind',
    method: 'POST',
    data,
  })
}
