import request from '@/utils/request'
import qs from 'qs'
export function loginByUsername(username, password) {

  let param = new URLSearchParams()

  param.append('userid',username)
  param.append('password', password)
  return request.post('/weblogin',param)
}

export function logout() {
  return request.post('/user/logout')
}

export function getUserInfo(token) {

  return request.post( '/userInfo', qs.stringify({token:token}),
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
  )
}

