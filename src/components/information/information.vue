<template>
  <div>
    <Header title="信息资讯"></Header>
    <div class="about-body">
      <div class="container">
        <Crumbs></Crumbs>
        <div class="main-msg-body">
          <div class="left-tab">
            <div @click="tabMsg='notice',$router.push({path:'notice',query:{time:Date.now()}})" class="pointer" :class="tabMsg=='notice'||tabMsg=='noticeDetail'?'left-tab-act':''">
              <span class="inline-block left-tab-dot"></span>通知公告
            </div>
            <div @click="tabMsg='industryTrends',$router.push({name:'industryTrends',query:{time:Date.now()}})" class="pointer" :class="tabMsg=='industryTrends'||tabMsg=='industryTrendsDetail'?'left-tab-act':''">
              <span class="inline-block left-tab-dot"></span>行业动态
            </div>
            <div @click="tabMsg='data',$router.push({name:'data',query:{time:Date.now()}})" class="pointer" :class="tabMsg=='data'||tabMsg=='dataDetail'?'left-tab-act':''">
              <span class="inline-block left-tab-dot"></span>资料中心
            </div>
          </div>
          <!--<div class="content-line"></div>-->
          <div class="right-msg">
            <router-view :key="$route.query.time"></router-view>
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
        tabMsg:"notice"
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.tabMsg=route.name
        },
        immediate: true
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
    /*width:76%;*/
    width:80%;
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
