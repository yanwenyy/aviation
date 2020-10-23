<template>
  <div>
    <div class="login-body">
      <div class="home-head">
        <div class="container">
          <img class="home-logo" src="../../static/img/logo.png" alt="">
          <div  @click="$router.push({name:'home'})" class="pointer inline-block go-login">返回官网 <img src="../../static/img/go-login.png" alt=""></div>
        </div>
      </div>
      <div class="login box-sizing">
        <div class="login-model">
          <div class="title">工作平台账户登录</div>
          <div class="input-list">
            <img src="../../static/img/user.png" alt="">
            <input class="box-sizing" type="text" v-model="username" placeholder="请输入用户名">
          </div>
          <div class="input-list">
            <img src="../../static/img/password.png" alt="">
            <input class="box-sizing" type="password" v-model="password" placeholder="请输入密码">
          </div>
          <div class="notice">
            <div class="inline-block"><input type="checkbox" name="category" v-model="autoLogin" />下次自动登录</div>
            <div class="inline-block lx-manger">如忘记密码请联系管理员</div>
          </div>
          <div class="login-btn pointer" @click="login">登录</div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from './footer'
    export default {
      name: "login",
      components:{
        Footer
      },
      data(){
        return{
          autoLogin:false,
          username:'',
          password:''
        }
      },
      methods:{
        login(){
          this.$http({
            url: this.$http.adornUrl(`/front/user/login`),
            method: 'post',
            data: this.$http.adornData({
              'password': this.password,
              'username': this.username,
            })
          }).then(({data}) => {
            if (data && data.code == 0) {
              this.$Message.success({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  if(this.autoLogin){
                    localStorage.setItem("userName",this.username);
                    localStorage.setItem('token',data.token)
                  }else{
                    localStorage.removeItem('userName')
                    localStorage.removeItem('token')
                  }
                  this.$store.commit('changeLogin',this.username);
                  sessionStorage.setItem("userName",this.username);
                  sessionStorage.setItem("token",data.token);
                  this.$router.push({name:'home'});
                }
              })
            } else {
              this.$Message.error(data.msg)
            }
          })

        }
      }
    }
</script>

<style scoped>
  .go-login{
    width: 145px;
    height:33px;
    line-height: 33px;
    border: 1px solid #fff;
    border-radius: 17px;
    color:#fff;
    text-align: center;
    vertical-align: middle;
    float: right;
    margin-top: 56px;
    font-size: 15px;
  }
  .go-login>img{
    vertical-align: middle;
  }
  .login-body{
    height: 100vh;
    background: url("../../static/img/login-bg.png") 100% 100% no-repeat;
    background-size: cover;
  }
  .login-body::before{
    display: table;
    content: '';
  }
  .home-head{
    width: 100%;
    height: 129px;
    position: absolute;
    top:0;
    left:0;
    background: transparent;
    display: flex;
    justify-content: space-between;
    z-index: 99999;
  }
  .home-logo{
    width: 398px;
    height: 76px;
    margin-top: 35px;
    margin-right:10%;
  }
  .login{
    width: 515px;
    background: #fff;
    border-radius: 4px;
    margin: 9% auto;
    padding: 62px 54px;
  }
  .title{
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    color:#333;
    margin-bottom: 44px;
  }
  .input-list{
    margin-bottom: 21px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    padding-left: 22px ;
    height: 58px;
    line-height: 58px;
  }
  .input-list>img{
    width: 25px;
    height: auto;
    vertical-align: middle;
    margin-right: 22px;
  }
  .input-list>input{
    height: 100%;
    font-size: 18px;
    width: 86%;
    border: none;
    background: transparent;
  }
  .notice{
    display: flex;
    justify-content: space-between;
    margin: 13px 0 31px 0;
    font-size: 16px;
    color:#666;
  }
  .lx-manger{
    color:#999;
  }
  .login-btn{
    height: 58px;
    line-height: 58px;
    background: #2A5AAC;
    color:#fff;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
  }
</style>
