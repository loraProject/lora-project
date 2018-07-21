import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
/*
*/

//  顶端进度条 用来做安全验证，安全过滤
//permision judge function

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login', '/index', '/register']// no redirect whitelist


var  ok = true;
router.beforeEach((to, from, next)=> {

  NProgress.start() // 进度条start
  if (getToken()){
    //console.log("有token")
    if (to.path === '/login') { // 如果是指向登陆路径
      next({path:'/'})
      console.log("in login")
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) // 判断当前用户是否已经拉取了信息
      {
        console.log('in store.getters.role.length')
        store.dispatch('GetUserInfo').then((res)=>{// 根据roles权限生成可访问的路由表
          if (res !== null && res.data.roles!= null) {
            const  roles = res.data.roles
            store.dispatch('GenerateRoutes', {roles})
              .then(() => {
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                next({...to, replace: true}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              }).catch((err) => {
                store.dispatch('FedLogOut').then(()=>{
                  console.log("有err有err有err")
                  Message.error(err || 'Verification failed, please login again')
                  next({path: '/'})
                })
            })
          }else {
            next({path:'/index'}) // 如果获取用户身份失败，那么跳转到index界面
          }

        })
      }else{
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.routes)){
          console.log("有权限")
          next()//
        }else{
          console.log("没有权限")
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else{
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({path:'/index'}) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }

  })


router.afterEach(() => {
  NProgress.done() // finish progress bar
})
