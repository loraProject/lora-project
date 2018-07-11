import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
/*
import { getToken } from '@/utils/auth' // getToken from cookie
*/

//  顶端进度条 用来做安全验证，安全过滤
//permision judge function

function hasPermission(roles, permissionRoles) {
/*  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)*/

    return true; //  默认全部具有访问权限，暂时不做权限处理， lyx
}

const whiteList = ['/login', '/authredirect', '/navBar','/mainIndex']// no redirect whitelist


var  ok = true;
router.beforeEach((to, from, next)=> {
  NProgress.start();
    if (ok){
      const roles = ['admin','editor','develop']
      store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
      ok = false;
    }
    next();
  })


router.afterEach(() => {
  NProgress.done() // finish progress bar
})
