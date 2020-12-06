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
          password:'',
          from:''
        }
      },
      mounted(){
        this.from=this.$route.query.from;
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
                  this.$router.push({name:'lt'});
                  // if(this.from=='lt'){
                  //   this.$router.push({name:'lt'});
                  // }else{
                  //   this.$router.push({name:'home'});
                  // }
                }
              })
            } else {
              this.$Message.error(data.msg)
            }
          })

        }
      },
    }
</script>

<style scoped>
  .go-login{
    width:9.06rem;
    height:2.06rem;
    line-height:2.06rem;
    border: 1px solid #fff;
    border-radius:1.06rem;
    color:#fff;
    text-align: center;
    vertical-align: middle;
    float: right;
    margin-top:3.5rem;
    font-size:0.94rem;
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
    height:8.06rem;
    position: absolute;
    top:0;
    left:0;
    background: transparent;
    display: flex;
    justify-content: space-between;
    z-index: 99999;
  }
  .home-logo{
    width:24.875rem;
    height:4.75rem;
    margin-top:2.19rem;
    margin-right:10%;
  }
  .login{
    width:32.19rem;
    background: #fff;
    border-radius:0.25rem;
    margin: 9% auto;
    padding:3.875rem 3.375rem;
  }
  .title{
    text-align: center;
    font-size: 1.625rem;
    font-weight: bold;
    color:#333;
    margin-bottom:2.75rem;
  }
  .input-list{
    margin-bottom:1.32rem;
    border: 1px solid #DDDDDD;
    border-radius:0.25rem;
    padding-left:1.375rem ;
    height:3.625rem;
    line-height:3.625rem;
  }
  .input-list>img{
    width:1.56rem;
    height: auto;
    vertical-align: middle;
    margin-right:1.375rem;
  }
  .input-list>input{
    height: 100%;
    font-size: 1.125rem;
    width: 86%;
    border: none;
    background: transparent;
  }
  .notice{
    display: flex;
    justify-content: space-between;
    margin:0.82rem 0 1.94rem 0;
    font-size:1rem;
    color:#666;
  }
  .lx-manger{
    color:#999;
  }
  .login-btn{
    height:3.625rem;
    line-height:3.625rem;
    background: #2A5AAC;
    color:#fff;
    border-radius:0.25rem;
    text-align: center;
    font-size: 1.125rem;
  }
  @media screen and (max-width:900px) {
    .login{
      width: 80%;
      margin-top: 30%;
    }
    .home-logo{
      width: 14rem;
      height: auto;
    }
    .go-login{
      margin-top: 2.5rem;
    }
    .input-list>input{
      width: 80%;
    }
    .input-list>img{
      margin-right: 0.5rem;
    }
    .notice{
      display: block;
    }
    .lx-manger{
      display: block;
    }
  }
</style>
