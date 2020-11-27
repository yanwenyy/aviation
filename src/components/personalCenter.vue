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
              <input disabled v-model="userMsg.userName" class="reply-input box-sizing" type="text" placeholder="用户名" name="replyName">
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-input-name inline-block">密码设置</div>
            <div class="inline-block">
              <input disabled v-model="userMsg.password" class="reply-input box-sizing" type="password" placeholder="密码" name="replyName">
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
          <input type="password" class="box-sizing pmi-input" v-model="password">
        </div>
        <div class="pm-input">
          <span class="inline-block">新密码</span>
          <span class="pmi-line inline-block"></span>
          <input type="password" class="box-sizing pmi-input" v-model="passwordConfrim">
        </div>
        <div class="pm-input">
          <span class="inline-block">确认新密码</span>
          <span class="pmi-line inline-block"></span>
          <input type="password" class="box-sizing pmi-input" v-model="passwordAgin">
        </div>
        <div @click="edit()" class="sub-password pointer">保存</div>
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
        userMsg:{},
        password:'',
        passwordConfrim:'',
        passwordAgin:''
      }
    },
    mounted(){
      //获取用户信息
      this.$http({
        url: this.$http.adornUrl('/front/user/get/user'),
        method: 'POST',
      }).then(({data}) => {
        if (data && data.code === 10000) {
          this.userMsg=data.data;
        }
      });
    },
    methods:{
      edit(){
        if(this.password!=this.passwordConfrim||this.password!=this.passwordAgin||this.passwordConfrim!=this.passwordAgin){
          this.$Message.error({
            message: '密码不一致',
            zIndex:999999999999999
          })
        }else{
          this.$http({
            url: this.$http.adornUrl(`/front/user/update/pwd`),
            method: 'POST',
            data: this.$http.adornData({
              'password': this.password,
              'username': this.userMsg.userName,
            })
          }).then(({data}) => {
            if (data && data.code ==10000) {
              this.$Message.success({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.passWordShadow=false
                }
              })
            } else {
              this.$Message.error({
                message: data.msg,
                zIndex:999999999999999
              })
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .sub-password{
    width:11.25rem;
    height:3.125rem;
    line-height:3.125rem;
    text-align: center;
    background: #2A5AAC;
    font-size:1rem;
    color:#fff;
    margin:0.94rem auto 0 auto;
  }
  .pmi-input{
    width: 68%;
    height: 100%;
    border: none;
    background: transparent;
    font-size: 1.125rem;
  }
  .pm-title{
    margin-bottom:2.75rem;
  }
  .pmi-line{
    width:0.125rem;
    height:1rem;
    background: #DDDDDD;
    margin: 0 0.94rem;
    vertical-align: middle;
  }
  .pm-input{
    width:26.32rem;
    height:3.625rem;
    line-height:3.625rem;
    border: 1px solid #DDDDDD;
    border-radius:0.25rem;
    color: #999;
    font-size: 1.125rem;
    padding-left:1.375rem;
    margin-bottom:1.5rem;
  }
  .password-model{
    width:32.19rem;
    height:30rem;
    background: #fff;
    margin: 8% auto;
    border-radius:0.25rem;
    position: relative;
    padding:3.31rem 2.94rem;
  }
  .close-model{
    width:2.5rem;
    height:2.5rem;
    line-height:2.5rem;
    text-align: center;
    font-size:1.875rem;
    color:#fff;
    border:0.19rem solid #fff;
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
    font-size:0.875rem;
    color: #999;
    line-height:1.5rem;
    margin-top:1.44rem;
  }
  .reply-list{
    margin-bottom:1.56rem;
  }
  .reply-input{
    width: 81.125rem;
    height:3.44rem;
    border: 1px solid #ddd;
    background: #F8F8F8!important;
    font-size: 1.125rem;
    padding-left:1.75rem;
  }
  .reply-input-name{
    width:11.25rem;
    color: #333;
    font-size: 1.125rem;
    font-weight: bold;
    text-align: right;
    margin-right:2.625rem;
    vertical-align: top;
    margin-top:1.25rem;
  }
  .reply-box{
    width: 100%;
    background: #FCFCFC;
    padding:4.56rem 4.75rem;
    margin-bottom:4.375rem;
  }
  .reply-title{
    font-size: 1.625rem;
    font-weight: bold;
    color:#333;
    text-align: center;
  }
  .left-tab-act>.left-tab-dot{
    background: #fff;
  }
  .left-tab>div{
    height:3.81rem;
    line-height:3.81rem;
    text-align: center;
    background: #F2F2F2;
    margin-bottom:0.82rem;
  }
</style>
