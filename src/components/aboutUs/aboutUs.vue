<template>
    <div>
      <Header title="关于我们"></Header>
      <div class="about-body">
        <div class="container">
          <Crumbs></Crumbs>
          <div class="main-msg-body">
            <div class="left-tab">
              <div @click="tabMsg='aboutUsDetail',$router.push({name:'aboutUsDetail',query:{time:Date.now()}})" class="pointer" :class="tabMsg=='aboutUsDetail'?'left-tab-act':''">
                <span class="inline-block left-tab-dot"></span>专委会介绍
              </div>
              <div @click="tabMsg='vip',$router.push({name:'vip',query:{time:Date.now()}})" class="pointer" :class="tabMsg=='vip'||tabMsg=='vipDetail'?'left-tab-act':''">
                <span class="inline-block left-tab-dot"></span>会员介绍
              </div>
              <div @click="tabMsg='memorabilia',$router.push({name:'memorabilia',query:{time:Date.now()}})" class="pointer" :class="tabMsg=='memorabilia'||tabMsg=='memorabiliaDetail'?'left-tab-act':''">
                <span class="inline-block left-tab-dot"></span>大事记
              </div>
            </div>
            <div class="content-line"></div>
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
            tabMsg:"aboutUsDetail"
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
    .left-tab{
      width: 30%;
    }
    .right-msg{
      margin-left: 1rem;
      width: 65%;
    }
  }
</style>
