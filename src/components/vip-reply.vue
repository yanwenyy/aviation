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
    margin-top:0.625rem;
  }
  .reply-btn{
    width:11.25rem;
    height:3.125rem;
    line-height:3.125rem;
    background: #2A5AAC;
    color: #fff;
    text-align: center;
    margin:6.56rem auto 0 auto;
    font-size:1rem;
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
  .reply-textarea{
    width: 51.125rem;
    height:6.875rem;
    border: 1px solid #ddd;
    background: #F8F8F8!important;
    padding:1.06rem 1.75rem;
    font-size: 1.125rem;
  }
  .reply-list{
    margin-bottom:1.56rem;
  }
  .reply-input{
    width: 51.125rem;
    height:3.44rem;
    border: 1px solid #ddd;
    background: #F8F8F8!important;
    font-size: 1.125rem;
    padding-left:1.75rem;
  }
  .reply-radio{
    margin-right:3.25rem;
    font-size: 1.125rem;
  }
  .reply-input-name{
    width:11.25rem;
    color: #333;
    font-size: 1.125rem;
    font-weight: bold;
    text-align: right;
    margin-right:2.625rem;
    vertical-align: top;
    margin-top:0.94rem;
  }
  .reply-box{
    width: 100%;
    background: #FCFCFC;
    padding:4.56rem 4.75rem;
    margin-bottom:4.375rem;
    border: 1px solid #E5E5E5;
  }
  .reply-title{
    font-size: 1.625rem;
    font-weight: bold;
    color:#333;
    text-align: center;
  }
  .reply-notice{
    text-align: center;
    font-size:1rem;
    color: #999;
    margin-top:1.32rem;
    margin-bottom:2.75rem;
  }
  .content-line{
    width:0.125rem;
    height:43.06rem;
    background: #eee;
  }
  .right-msg{
    width:76%;
  }
  .main-msg-body{
    display: flex;
    justify-content: space-between;
    margin-bottom:5.31rem;
  }
  .left-tab-dot{
    width:0.31rem;
    height:0.31rem;
    background: #000;
    border-radius: 50%;
    vertical-align: middle;
    margin-right:0.625rem;
  }
  .left-tab{
    width:12.375rem;
    font-size:1rem;
  }
  .left-tab-act{
    background: #2A5AAC!important;
    color:#fff;
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
  @media screen and (max-width:900px) {
    .reply-box{
      padding: 2rem;
    }
    .reply-input-name{
     margin-bottom: 1rem;
      text-align: left;
    }
    .reply-list>div{
      display: block;
    }
    .reply-input{
      width: 100%;
    }
    .reply-textarea{
      width: 100%;
    }
  }
</style>
