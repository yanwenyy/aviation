<template>
  <div class="header mainColor">
    <div class="container">
      <div class="logo">中国航空协会</div>
      <div class="tab-list">
        <div class="tab inline-block pointer" :class="tabMsg=='1'?'tabClick':''" @click="tabMsg=1"><router-link to="home">首页</router-link></div>
        <div class="tab inline-block pointer" :class="tabMsg=='2'?'tabClick':''" @click="tabMsg=2">关于我们</div>
        <div class="tab inline-block pointer" :class="tabMsg=='3'?'tabClick':''" @click="tabMsg=3"><a :href="ltUrl">信息咨讯</a></div>
        <div class="tab inline-block pointer" :class="tabMsg=='4'?'tabClick':''" @click="tabMsg=4">会员风采</div>
        <div class="tab inline-block pointer" :class="tabMsg=='5'?'tabClick':''" @click="tabMsg=5">入会申请</div>
      </div>
      <div class="login-list">
        <img class="login-img" src="../../static/img/cloud.png" alt="">
        <div class="inline-block login-msg" v-if="userName!=''">
          <div class="inline-block pointer" @click="login">{{userName}}</div>
          <span> & </span>
          <div class="inline-block pointer" @click="login">退出登录</div>
        </div>
        <div class="inline-block login-msg" v-if="userName==''">
          <div class="inline-block pointer" @click="login">登录</div>
          <!--<span> & </span>-->
          <!--<div class="inline-block pointer" @click="register">注册</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Header",
      data(){
        return{
          tabMsg:'1',
          ltUrl:'',
          userName:''
        }
      },
      mounted(){
        this.ltUrl=this.$baseUrl.ltUrl;
        this.userName=localStorage.getItem("userName")||sessionStorage.getItem("userName")||'';
      },
      computed: {
        myValue() {
          return this.$store.state.loginName
        }
      },
      watch: {
        myValue: function(newVal, oldVal) {
          //其他业务代码
          this.userName=this.$store.state.loginName;
        }
      },
      methods:{
          login:function () {
            this.$router.push({name:'login'});
            localStorage.removeItem("userName");
            this.userName='';
          },
          register:function () {

          }
        }
    }
</script>

<style scoped>
  .container{
    position: relative;
  }
  .header{
    width: 100%;
    color:#fff;
    border-bottom: 8px solid #0079CD;
    position: fixed;
    top:0;
    left: 0;
    z-index: 99;
  }
  .tab{
    width: 10%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    margin-right:-5px;
  }
  .tab>a{
    color: #fff;
  }
  .logo{
    padding: 10px 0 30px 0;
    font-size: 30px;
    font-weight: bold;
  }
  .login-list{
    position: absolute;
    top:10px;
    right:0;
  }
  .login-img{
    opacity: 0.5;
    width: 60px;
    height: auto;
    vertical-align: bottom;
  }
  .login-msg{
    border-bottom: 3px dotted rgba(95,171,223,.5);
    padding:0 30px 10px 10px;
    margin-left: -5px;
    font-size: 14px;
  }
  .login-msg>div:hover{
    font-weight: bold;
    color:#01C9FE;
  }
</style>
