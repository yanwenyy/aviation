<template>
  <div>
    <Header title="入会申请"></Header>
    <div class="about-body">
      <div class="container">
        <Crumbs></Crumbs>
        <div class="reply-title">申请会员</div>
        <div class="reply-notice">申请后，我们会7个工作日内联系您，请您耐心等待</div>
        <div class="reply-box box-sizing">
          <div class="reply-list">
            <div class="reply-input-name inline-block" style="margin-top: 0">会员类型</div>
            <div class="inline-block">
              <div class="reply-radio inline-block">
                <input type="radio" name="typeClass" value="1" v-model="type"> 个人申请
              </div>
              <div class="reply-radio inline-block">
                <input type="radio" name="typeClass" value="2" v-model="type"> 企业申请
              </div>
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-input-name inline-block">企业名称/个人姓名</div>
            <div class="inline-block">
              <input class="reply-input box-sizing" type="text" placeholder="请输入企业名称/个人姓名" name="nameDes" v-model="nameDes">
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-input-name inline-block">专业领域</div>
            <div class="inline-block">
              <input class="reply-input box-sizing" type="text" placeholder="请输入专业领域" name="professional" v-model="professional">
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-input-name inline-block">申请人姓名</div>
            <div class="inline-block">
              <input class="reply-input box-sizing" type="text" placeholder="请输入申请人姓名" name="applyName" v-model="applyName">
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-input-name inline-block">联系电话</div>
            <div class="inline-block">
              <input v-validate="'required|phone'" class="reply-input box-sizing" type="text" placeholder="请输入联系电话 " name="phone" v-model="phone">
              <div v-show="errors.has('phone')" class="text-style"> {{ errors.first('phone') }} </div>
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-input-name inline-block">联系邮箱</div>
            <div class="inline-block">
              <input v-validate="'required|email'" class="reply-input box-sizing" type="text" placeholder="请输入联系邮箱 " name="email" v-model="email">
              <div v-show="errors.has('email')" class="text-style"> {{ errors.first('email') }} </div>
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-input-name inline-block">基本情况介绍</div>
            <div class="inline-block">
              <textarea class="reply-textarea box-sizing" placeholder="请输入基本情况介绍 " name="introduction" v-model="introduction"></textarea>
              <div class="input-msg">
                <div class="inline-block">提示： </div>
                <div class="inline-block">
                  <div>【企业申请】请填写包括但不限于单位性质、主要业务方向、主要技术/产品情况等；</div>
                  <div>【个人申请】需提供个人简要介绍，包括但不限于简要经历、专业能力与特长等</div>
                </div>
              </div>
            </div>
          </div>
          <div class="reply-list">
            <div class="reply-input-name inline-block">入会后简要工作设想</div>
            <div class="inline-block">
              <textarea class="reply-textarea box-sizing" placeholder="请输入入会后简要工作设想 " name="workIdea" v-model="workIdea"></textarea>
            </div>
          </div>
          <div @click="subMsg()" class="reply-btn pointer">提交申请</div>
        </div>
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
        type:'',
        nameDes:'',
        professional:'',
        applyName:'',
        phone:'',
        email:'',
        introduction:'',
        workIdea:'',
      }
    },
    methods:{
      subMsg(){
        this.$http({
          url: this.$http.adornUrl(`/aviation/big/save`),
          method: 'post',
          data: this.$http.adornData({
            'type': this.type,
            'nameDes': this.nameDes,
            'professional': this.professional,
            'applyName': this.applyName,
            'phone': this.phone,
            'email': this.email,
            'introduction': this.introduction,
            'workIdea': this.workIdea
          })
        }).then(({data}) => {
          if (data && data.code == 10000) {
            this.$Message.success({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
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
  .text-style{
    color:red;
    margin-top: 10px;
  }
  .reply-btn{
    width: 180px;
    height: 50px;
    line-height: 50px;
    background: #2A5AAC;
    color: #fff;
    text-align: center;
    margin: 105px auto 0 auto;
    font-size: 16px;
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
  .reply-textarea{
    width: 818px;
    height: 110px;
    border: 1px solid #ddd;
    background: #F8F8F8!important;
    padding: 17px 28px;
    font-size: 18px;
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
  .reply-radio{
    margin-right: 52px;
    font-size: 18px;
  }
  .reply-input-name{
    width: 180px;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    margin-right: 42px;
    vertical-align: top;
    margin-top: 15px;
  }
  .reply-box{
    width: 100%;
    background: #FCFCFC;
    padding: 73px 76px;
    margin-bottom: 70px;
    border: 1px solid #E5E5E5;
  }
  .reply-title{
    font-size: 26px;
    font-weight: bold;
    color:#333;
    text-align: center;
  }
  .reply-notice{
    text-align: center;
    font-size: 16px;
    color: #999;
    margin-top: 21px;
    margin-bottom: 44px;
  }
  .content-line{
    width: 2px;
    height: 689px;
    background: #eee;
  }
  .right-msg{
    width:76%;
  }
  .main-msg-body{
    display: flex;
    justify-content: space-between;
    margin-bottom: 85px;
  }
  .left-tab-dot{
    width: 5px;
    height: 5px;
    background: #000;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }
  .left-tab{
    width: 198px;
    font-size: 16px;
  }
  .left-tab-act{
    background: #2A5AAC!important;
    color:#fff;
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
