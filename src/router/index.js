import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import home from  '@/components/home'
import login from  '@/components/login'
import aboutUs from '@/components/aboutUs/aboutUs'
import vip from '@/components/aboutUs/vip'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: { name: 'home' },
      children:[
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/login',
          name: 'login',
          component: login
        },
        {
          path: '/aboutUs',
          name: 'aboutUs',
          component: aboutUs,
          meta: { title: '关于我们/专委会介绍' },
          children:[
            {
              path: '/vip',
              name: 'vip',
              component: vip,
              meta: { title: '关于我们 / 会员展示' },
            },
          ]
        }
      ]
    }
  ]
})
