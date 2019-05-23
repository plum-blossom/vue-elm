import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Head from 'components/header/head'
import Loading from 'components/common/loading'
import AlertTip from 'components/common/alertTip'
import Svg from 'components/common/svg'
import Index from 'components/page/index/index'
import search from 'components/page/search/search'
import Home from 'components/page/home/home'
import Login from 'components/page/login/login'
import Profile from 'components/page/profile/profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      children: [ //二级路由。对应App.vue
         //首页城市列表页
        {
            path: '/index',
            component: Index
        },
         //搜索页
        {
            path: '/search/:geohash',
            component: search
        },
        //首页城市列表页
        {
            path: '/home',
            component: Home
        },
        // 登录
        {
        	path:'/login',
        	component:Login
        },
        // 个人信息
        {
        	path:'/profile',
        	component:Profile
        }
      ]
    }
  ]
})
