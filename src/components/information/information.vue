<template>
  <div>
    <Header title="信息资讯"></Header>
    <div class="about-body">
      <div class="container">
        <Crumbs></Crumbs>
        <div class="main-msg-body">
          <div class="left-tab">
            <div @click="tabMsg='通知公告',$router.push({name:'aboutUsDetail'})" class="pointer" :class="tabMsg=='通知公告'?'left-tab-act':''">
              <span class="inline-block left-tab-dot"></span>通知公告
            </div>
            <div @click="tabMsg='行业动态',$router.push({name:'industryTrends'})" class="pointer" :class="tabMsg=='行业动态'?'left-tab-act':''">
              <span class="inline-block left-tab-dot"></span>行业动态
            </div>
            <div @click="tabMsg='资料中心',$router.push({name:'memorabilia'})" class="pointer" :class="tabMsg=='资料中心'?'left-tab-act':''">
              <span class="inline-block left-tab-dot"></span>资料中心
            </div>
          </div>
          <div class="content-line"></div>
          <div class="right-msg">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../header'
  import Footer from '../footer'
  import Crumbs from '../crumbs'
  export default {
    components:{
      Header,
      Footer,
      Crumbs
    },
    data(){
      return{
        tabMsg:"通知公告"
      }
    },

  }
</script>

<style scoped>
  .content-line{
    width: 2px;
    height: 689px;
    background: #eee;
  }
  .right-msg{
    width: 916px;
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
