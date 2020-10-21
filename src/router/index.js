import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import home from  '@/components/home'
import login from  '@/components/login'
import aboutUs from '@/components/aboutUs/aboutUs'
import vipReply from '@/components/vip-reply'
import personalCenter from '@/components/personalCenter'
import aboutUsDetail from '@/components/aboutUs/aboutUs-detail'
import vip from '@/components/aboutUs/vip'
import vipDetail from '@/components/aboutUs/vip-detail'
import memorabilia from '@/components/aboutUs/memorabilia'
import memorabiliaDetail from '@/components/aboutUs/memorabilia-detail'
import information from '@/components/information/information'
import industryTrends from '@/components/information/industryTrends'
import industryTrendsDetail from '@/components/information/industryTrends-detail'
import notice from '@/components/information/notice'
import noticeDetail from '@/components/information/notice-detail'
import data from '@/components/information/data'
import dataDetail from '@/components/information/data-detail'
import lt from '@/components/lt/lt'
import ltList from '@/components/lt/list'
import ltListDetail from '@/components/lt/list-detail'
import release from '@/components/lt/release'

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
            {
              path: '/industryTrendsDetail',
              name: 'industryTrendsDetail',
              component: industryTrendsDetail,
              meta: { title: '信息资讯 / 行业动态 / 详情' },
            },
            {
              path: '/notice',
              component:notice,
              name: 'notice',
              meta: { title: '信息资讯 / 通知公告' },
            },
            {
              path: '/noticeDetail',
              name: 'noticeDetail',
              component: noticeDetail,
              meta: { title: '信息资讯 / 行业动态 / 详情' },
            },
            {
              path: '/data',
              component:data,
              name: 'data',
              meta: { title: '信息资讯 / 资料中心 ' },
            },
            {
              path: '/dataDetail',
              name: 'dataDetail',
              component: dataDetail,
              meta: { title: '信息资讯 / 行业动态 / 详情' },
            },
          ]
        },
        {
          path: '/vipReply',
          name: 'vipReply',
          component: vipReply,
          meta: { title: '申请会员' },
        },
        {
          path: '/personalCenter',
          name: 'personalCenter',
          component: personalCenter,
          meta: { title: '会员个人中心' },
        },
        {
          path: '/lt',
          name: 'lt',
          component: lt,
          redirect:'/ltList',
          children:[
            {
              path: '/ltList',
              name: 'ltList',
              component: ltList
            },
            {
              path: '/ltListDetail',
              name: 'ltListDetail',
              component: ltListDetail
            },
            {
              path: '/release',
              name: 'release',
              component: release
            }
          ]
        },
      ]
    }
  ]
})
