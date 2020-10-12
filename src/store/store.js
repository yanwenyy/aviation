import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    loginName: '',
  },
  mutations:{
    // 保存当前菜单栏的路径
    changeLogin(state,val){
      state.loginName = val;
    },
  }
})
