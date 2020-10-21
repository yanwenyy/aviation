<template>
  <div>
    <Header title="会员个人中心"></Header>
    <div class="about-body">
      <div class="container">
        <Crumbs></Crumbs>
        <div class="reply-title">基础信息</div>
        <div class="reply-box box-sizing">
          <div class="reply-list">
            <div class="reply-input-name inline-block">用户名</div>
            <div class="inline-block">
              <input class="reply-input box-sizing" type="text" placeholder="请输入用户名" name="replyName">
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-input-name inline-block">密码设置</div>
            <div class="inline-block">
              <input class="reply-input box-sizing" type="text" placeholder="请输入密码设置" name="replyName">
              <div @click="passWordShadow=true" class="blue input-msg pointer">修改密码</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shadow" v-show="passWordShadow==true">
      <div class="password-model box-sizing">
        <div class="reply-title pm-title">修改密码</div>
        <div @click="passWordShadow=false" class="close-model pointer">X</div>
        <div class="pm-input">
          <span class="inline-block">原密码</span>
          <span class="pmi-line inline-block"></span>
          <input type="password" class="box-sizing pmi-input">
        </div>
        <div class="pm-input">
          <span class="inline-block">新密码</span>
          <span class="pmi-line inline-block"></span>
          <input type="password" class="box-sizing pmi-input">
        </div>
        <div class="pm-input">
          <span class="inline-block">确认新密码</span>
          <span class="pmi-line inline-block"></span>
          <input type="password" class="box-sizing pmi-input">
        </div>
        <div @click="passWordShadow=false" class="sub-password pointer">保存</div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './header'
  import Footer from './footer'
  import Crumbs from './crumbs'
  export default {
    components:{
      Header,
      Footer,
      Crumbs
    },
    data(){
      return{
        passWordShadow:false,
      }
    },

  }
</script>

<style scoped>
  .sub-password{
    width: 180px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #2A5AAC;
    font-size: 16px;
    color:#fff;
    margin: 15px auto 0 auto;
  }
  .pmi-input{
    width: 68%;
    height: 100%;
    border: none;
    background: transparent;
    font-size: 18px;
  }
  .pm-title{
    margin-bottom: 44px;
  }
  .pmi-line{
    width: 2px;
    height: 16px;
    background: #DDDDDD;
    margin: 0 15px;
    vertical-align: middle;
  }
  .pm-input{
    width: 421px;
    height: 58px;
    line-height: 58px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    color: #999;
    font-size: 18px;
    padding-left: 22px;
    margin-bottom: 24px;
  }
  .password-model{
    width: 515px;
    height: 480px;
    background: #fff;
    margin: 8% auto;
    border-radius: 4px;
    position: relative;
    padding: 53px 47px;
  }
  .close-model{
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 30px;
    color:#fff;
    border: 3px solid #fff;
    border-radius: 50%;
    position: absolute;
    top:-64px;
    right: 0;
  }
  .shadow{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    top:0;
    left:0;
    z-index: 999999999;
  }
  .blue{
    color:#2A5AAC!important;
  }
  .input-msg>div{
    vertical-align: top;
  }
  .input-msg{
    font-size: 14px;
    color: #999;
    line-height: 24px;
    margin-top: 23px;
  }
  .reply-list{
    margin-bottom: 25px;
  }
  .reply-input{
    width: 818px;
    height: 55px;
    border: 1px solid #ddd;
    background: #F8F8F8!important;
    font-size: 18px;
    padding-left: 28px;
  }
  .reply-input-name{
    width: 180px;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    margin-right: 42px;
    vertical-align: top;
    margin-top: 20px;
  }
  .reply-box{
    width: 100%;
    background: #FCFCFC;
    padding: 73px 76px;
    margin-bottom: 70px;
  }
  .reply-title{
    font-size: 26px;
    font-weight: bold;
    color:#333;
    text-align: center;
  }
  .left-tab-act>.left-tab-dot{
    background: #fff;
  }
  .left-tab>div{
    height: 61px;
    line-height: 61px;
    text-align: center;
    background: #F2F2F2;
    margin-bottom: 13px;
  }
</style>
