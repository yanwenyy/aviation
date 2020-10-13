<template>
    <div class="login">
      <div class="login-model">
        <div class="title">账户登陆</div>
        <div class="input-list">
          <input class="box-sizing" type="text" v-model="name" placeholder="请输入用户名">
        </div>
        <div class="input-list">
          <input class="box-sizing" type="password" v-model="password" placeholder="请输入密码">
        </div>
        <div class="notice">
          <div class="inline-block"><input type="checkbox" name="category" v-model="autoLogin" />下次自动登录</div>
          <div class="inline-block">如忘记密码请联系管理员</div>
        </div>
        <div class="login-btn pointer" @click="login">登录</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
          return{
            autoLogin:false,
            name:'',
            password:''
          }
        },
        methods:{
          login(){
            if(this.autoLogin){
              localStorage.setItem("userName",this.name);
            }
            this.$store.commit('changeLogin',this.name);
            sessionStorage.setItem("userName",this.name);
            this.$router.push({name:'home'});
          }
        }
    }
</script>

<style scoped>
  .login{
   padding-top: 100px;
  }
  .login-model{
    width: 400px;
    padding:20px;
    border:1px solid #000;
    border-radius: 3px;
    margin:auto;
  }
  .title{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .input-list{
    margin-top: 10px;
  }
  .input-list>input{
    height: 30px;
    font-size: 16px;
    width: 100%;
    padding-left: 10px;
  }
  .notice{
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .login-btn{
    height: 40px;
    line-height: 40px;
    background: #0079CD;
    color:#fff;
    border-radius: 5px;
    text-align: center;

  }
</style>
