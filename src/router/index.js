import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import home from  '@/components/HelloWorld'

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
        }
      ]
    }
  ]
})
