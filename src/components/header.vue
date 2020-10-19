<template>
  <div>
    <div class="header-top">
      <div class="container">
        <img class="header-logo" src="../../static/img/logo-2.png" alt="">
        <div class="go-lt">
          工作论坛 <img src="../../static/img/go-lt.png" alt="">
        </div>
      </div>
    </div>
    <div class="header-tab">
      <div class="container">
        <div  @click="$router.push({name:'home'})" class="tab-list pointer inline-block" :class="title=='首页'?'tab-list-act':''">首页 <span v-show="title=='首页'" class="tab-list-line inline-block"></span></div>
        <div  @click="$router.push({name:'aboutUs'})" class="tab-list pointer inline-block" :class="title=='关于我们'?'tab-list-act':''">关于我们 <span v-show="title=='关于我们'" class="tab-list-line inline-block"></span></div>
        <div  @click="$router.push({name:'information'})" class="tab-list pointer inline-block" :class="title=='信息资讯'?'tab-list-act':''">信息资讯 <span v-show="title=='信息资讯'" class="tab-list-line inline-block"></span></div>
        <div  @click="$router.push({name:'vipReply'})" class="tab-list pointer inline-block" :class="title=='入会申请'?'tab-list-act':''">入会申请 <span v-show="title=='入会申请'" class="tab-list-line inline-block"></span></div>
      </div>
    </div>
    <div class="header-img">
      <img class="header-img-bg" src="../../static/img/header-banner-bg.png" alt="">
      <div class="header-img-shadow">
        <div v-show="title=='关于我们'">
          <div class="his-name-en">ABOUT US</div>
          <div class="his-line"></div>
          <div class="his-name-zn">关于我们</div>
        </div>
        <div v-show="title=='信息资讯'">
          <div class="his-name-en">NEWS</div>
          <div class="his-line"></div>
          <div class="his-name-zn">信息资讯</div>
        </div>
        <div v-show="title=='入会申请'">
          <div class="his-name-en">MEMBER</div>
          <div class="his-line"></div>
          <div class="his-name-zn">入会申请</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Header",
      props:{
          'title':String,
        }
    }
</script>

<style scoped>
  .his-name-zn{
    font-size: 28px;
  }
  .his-line{
    width: 70px;
    height: 3px;
    background: #FFFFFF;
    opacity: 0.46;
    margin: 30px auto;
  }
  .his-name-en{
    font-size: 46px;
    margin-top: 169px;
  }
  .header-img-shadow{
    color:#fff;
    text-align: center;
  }
  .header-img-bg{
    width: 100%;
    height: 416px;
  }
  .header-img-shadow{
    width: 100%;
    height: 100%;
    background: #05255B;
    opacity: 0.64;
    position: absolute;
    top:0;
    left: 0;
  }
  .header-img{
    margin-top: -64px;
    z-index: 0;
    position: relative;
  }
  .tab-list-act{
    font-size: 18px;
    font-weight: bold;
  }
  .tab-list-line{
    width: 50%;
    height: 2px;
    background: #fff;
    position: absolute;
    bottom:0;
    left:25%;
  }
  .tab-list{
    position: relative;
    margin-right: 2.6%;
  }
  .header-tab{
    width: 100%;
    height: 64px;
    line-height: 64px;
    background: rgba(0,0,0,0.16);
    color:#fff;
    text-align: right;
    font-size: 18px;
    z-index: 9999;
    position: relative;
  }
  .go-lt{
    font-size: 14px;
    color: #0E367A;
    width: 145px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    border: 1px solid #0E367A;
    border-radius: 17px;
    float: right;
    margin-top: 27px;
  }
  .go-lt>img{
    width: 17px;
    height: 14px;
    vertical-align: middle;
  }
  .header-logo{
    width: 323px;
    height: 70px;
    margin-top: 7px;
  }
  .header-top{
    width: 100%;
    height: 85px;
  }
</style>
