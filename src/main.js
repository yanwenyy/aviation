// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import baseUrl from '@/assets/config/env'
import infiniteScroll from 'vue-infinite-scroll'
import Vuex from 'vuex'
import store from './store/store'
import paging from './utils/paging'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
// import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(VueCookie)
Vue.use(infiniteScroll)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.$baseUrl = baseUrl // ajax请求方法
Vue.prototype.$Paging=paging //分页插件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
