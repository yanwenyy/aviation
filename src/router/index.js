import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import home from  '@/components/home'
import login from  '@/components/login'
import aboutUs from '@/components/aboutUs/aboutUs'
import aboutUsDetail from '@/components/aboutUs/aboutUs-detail'
import vip from '@/components/aboutUs/vip'
import vipDetail from '@/components/aboutUs/vip-detail'
import memorabilia from '@/components/aboutUs/memorabilia'
import memorabiliaDetail from '@/components/aboutUs/memorabilia-detail'
import information from '@/components/information/information'
import industryTrends from '@/components/information/industryTrends'

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
          redirect:'/aboutUsDetail',
          meta: { title: '关于我们/专委会介绍' },
          children:[
            {
              path: '/aboutUsDetail',
              name: 'aboutUsDetail',
              component: aboutUsDetail,
              meta: { title: '关于我们 / 专委会介绍' },
            },
            {
              path: '/vip',
              name: 'vip',
              component: vip,
              meta: { title: '关于我们 / 会员展示' },
            },
            {
              path: '/vipDetail',
              name: 'vipDetail',
              component: vipDetail,
              meta: { title: '关于我们 / 会员展示 / 会员详情' },
            },
            {
              path: '/memorabilia',
              name: 'memorabilia',
              component: memorabilia,
              meta: { title: '关于我们 / 大事记' },
            },
            {
              path: '/memorabiliaDetail',
              name: 'memorabiliaDetail',
              component: memorabiliaDetail,
              meta: { title: '关于我们 / 大事记 / 大事记详情' },
            },

          ]
        },
        {
          path: '/information',
          name: 'information',
          component: information,
          meta: { title: '信息资讯 / 行业动态' },
          children:[
            {
              path: '/industryTrends',
              name: 'industryTrends',
              component: industryTrends,
              meta: { title: '信息资讯 / 行业动态' },
            },

          ]
        }
      ]
    }
  ]
})
