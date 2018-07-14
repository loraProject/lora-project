import request from '@/utils/request'
import qs from 'qs'
import {getToken} from "../utils/auth";
export function loginByUsername(username, password) {

  let param = new URLSearchParams()

  param.append('userid',username)
  param.append('password', password)
  return request.post('/weblogin',param)
}

export function logout() {

  return request.post('/user/logout',
    {headers: {token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoxNTMxNDgwOTEyLCJ1c2VyaWQiOiJseXgifQ.d70BSBm-ftSSR90uq_CZELpwkseoYpBy6ZKh_EcDkmU"}})
/*  return request({
    url: '/user/logout',
    method: 'post',
    headers:{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoxNTMxNDgwOTEyLCJ1c2VyaWQiOiJseXgifQ.d70BSBm-ftSSR90uq_CZELpwkseoYpBy6ZKh_EcDkmU"}
  })*/
}

export function getUserInfo(token) {

  return request.post( '/userInfo', qs.stringify({token:token}),
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
  )
}

