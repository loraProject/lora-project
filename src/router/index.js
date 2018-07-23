import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(Router)


/* 没有角色分别的路由*/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/Login'), hidden: true},
  {path: '/404', component: () => import('@/views/errorPage/404'), hidden: true},
  {path: '/401', component: () => import('@/views/errorPage/401'), hidden: true},
  {path: '/index', component: () => import('@/views/index/Index'), hidden: true},
  {path: '/register', component: () => import('@/views/regesiter/register'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/Index'),
      name: 'dashboard',
      meta: {title: '首页', icon: 'index', noCache: true}
    }]
  },
  {
    path: '/monitorCenter',
    meta: {title: '监测中心', icon: 'monitor', noCache: true},
    component: Layout,
    redirect: '/monitorCenter/deviceMap',
    alwaysShow: true, // will always show the root menu
    roles: ['admin', 'editor'], // you can set roles in root nav
    children: [{
      path: 'deviceMap',
      component: () => import('@/views/monitorCenter/DeviceMap'),
      name: 'DeviceMap',
      meta: {title: '设备地图'}
    },
      {
        path: 'instantData',
        component: () => import('@/views/monitorCenter/InstantData'),
        name: 'InstantData',
        meta: {title: '实时数据'}
      }]
  },
  {
    path: '/dataManage',
    meta: {title: '数据管理', icon: 'data', noCache: true},
    alwaysShow: true, // will always show the root menu
    roles: ['admin', 'editor'], // you can set roles in root nav
    component: Layout,
    redirect: '/dataManage/historyData',
    children: [{
      path: 'historyData',
      component: () => import('@/views/dataManage/HistoryData'),
      name: 'HistoryData',
      meta: {title: '历史数据'}
    },
      {
        path: 'echartsData',
        component: () => import('@/views/dataManage/EchartsData'),
        name: 'EchartsData',
        meta: {title: '图表'}
      }]
  },

  {
    path: '/deviceManage',
    meta: {title: '设备管理', icon: 'tab', noCache: true},
    alwaysShow: true, // will always show the root menu
    roles: ['admin', 'editor'],// you can set roles in root nav
    component: Layout,
    redirect: '/deviceManage/addDevice',
    children: [{
      path: 'addDevice',
      component: () => import('@/views/deviceManage/AddDevice'),
      name: 'AddDevice',
      meta: {title: '添加设备'}
    },
      {
        path: 'deviceList',
        component: () => import('@/views/deviceManage/DeviceList'),
        name: 'DeviceList',
        meta: {title: '设备列表'}
      }]
  },
  {
    path: '/triggerManage',
   /* alwaysShow: true, // will always show the root menu*/
    roles: ['admin', 'editor'],// you can set roles in root nav
    component: Layout,
    redirect: '/triggerManage/Trigger',
    children: [{
      path: 'Trigger',
      component: () => import('@/views/triggerManage/AddTrigger'),
      name: 'Trigger',
      meta: {title: '继电器管理', icon: 'documentation', noCache: true},
    }/*,
      {
        path: 'triggerList',
        component: () => import('@/views/triggerManage/Trigger'),
        name: 'TriggerList',
        meta: {title: '触发器列表'}
      }*/]
  },
  {
    path: '/userCenter',
    component: Layout,
    redirect: '/UserCenter/index',
    children: [{
      path: 'index',
      component: () => import('@/views/userCenter/UserCenter'),
      name: 'userCenter',
      meta: {title: '用户中心', icon: 'peoples', noCache: true}
    }]
  },

]
/* 有角色分别的权限路由*/
export const asyncRouterMap = [{
  path: '/admin',
  component: Layout,
  redirect: '/admin/page',
  alwaysShow: true, // will always show the root menu
  meta: {
    title: '权限管理',
    icon: 'lock',
    roles: ['admin'] // you can set roles in root nav
  },
  children: [{
    path: 'page',
    component: () => import('@/views/admin/RoleManage'),
    name: '设备管理',
    meta: {
      title: '设备管理',
      roles: ['admin'] // or you can only set roles in sub nav
    }
  }, {
    path: 'userManage',
    component: () => import('@/views/admin/UserManage'),
    name: '用户管理',
    meta: {
      title: '用户管理',
      roles: ['admin']
      // if do not set roles, means: this page does not require permission
    }
  }]
  },
  {path: '*', redirect: '/404', hidden: true}]
export default new Router({

  routes: constantRouterMap
})
