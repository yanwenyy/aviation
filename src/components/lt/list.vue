<template>
  <div>
    <div class="list-head box-sizing">
      <div class="list-head-name">
        <div class="inline-block">
          <span class="lhn-name">板块板块类型</span>
          <span class="lhn-type">全员开放</span>
        </div>
        <div class="inline-block">
          <span class="lhn-tz-name">帖子数:</span>
          <span class="lhn-tz-num">1090909</span>
        </div>
      </div>
      <div class="list-head-msg" :style="headShowMore?'height:auto':'height:68px'">
        板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块
        介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板块介绍板板板板...
      </div>
      <div class="list-head-more pointer" @click="headShowMore=!headShowMore">查看全部</div>
    </div>
    <div class="list-main">
      <div class="list-main-head box-sizing">
        <div @click="lmhTab='最新'" class="inline-block pointer" :class="lmhTab=='最新'?'list-main-head-act':''">最新</div>
        <div class="inline-block lmh-line"></div>
        <div @click="lmhTab='最热'" class="inline-block pointer" :class="lmhTab=='最热'?'list-main-head-act':''">最热</div>
        <div @click="$router.push({name:'release'})" class="lmh-sub pointer">+ 发帖</div>
      </div>
      <div class="list-main-body box-sizing">
        <div @click="$router.push({name:'ltListDetail'})" v-for="item in 5" class="list-main-list pointer">
          <div class="lml-title">
            <span v-show="false" class="inline-block lml-zd">置顶</span>
            <span class="inline-block lml-sd">锁定</span>
            <div class="inline-block lml-name">民航西北局A60系列飞机空气再循环系统加装高效空气过滤器适航审定工作装高效空</div>
          </div>
          <div class="lml-foot">
            <div class="inline-block">
              <span class="inline-block">2020.10.19 10:00:00</span>
              <span class="inline-block"><span class="white-space">空格</span>作者名字</span>
            </div>
            <div class="inline-block">
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                121
              </span>
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                121
              </span>
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                121
              </span>
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                121
              </span>
            </div>
          </div>
        </div>
        <Page :total="100" :pageSize="10" @pageClik="pageNumClick"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import Page from '../page'
    export default {
      components:{
        Page
      },
      data(){
          return{
            headShowMore:false,
            lmhTab:'最新'
          }
      },
      methods:{
        pageNumClick(val){
          console.log("我是父组件的方法"+val)
        }
      }
    }
</script>

<style scoped>
  .lmh-sub{
    width: 124px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color:#fff;
    font-size: 16px;
    font-weight: bold;
    background: #2A5AAC;
    border-radius: 2px;
    float: right;
    margin: 16px 42px 0 0;
  }
  .list-main-list{
    margin-bottom: 27px;
    border-bottom: 1px solid #eee;
    padding-bottom: 28px;
  }
  .lml-img-group{
    font-size: 17px;
  }
  .lml-img-group>img{
    min-width: 18px;
    min-height: 18px;
    width: 18px;
    height: 18px;
    background: #eee;
    vertical-align: middle;
  }
  .lml-foot{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color:#999999
  }
  .lml-zd{
    width: 46px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 15px;
    color:#fff;
    background: #B2131A;
    border-right: 2px;
  }
  .lml-sd{
    width: 46px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 15px;
    color:#fff;
    background: #AAAAAA;
    border-right: 2px;
  }
  .lml-name{
    width: 93%;
    vertical-align: top;
  }
  .lml-title{
    font-size: 20px;
    color:#333;
    margin-bottom: 22px;
  }
  .list-main-body{
    padding:34px 47px
  }
  .list-main-head-act{
    font-weight: bold;
    color: #355696;
  }
  .list-main{
    background: #fff;
  }
  .lmh-line{
    width: 2px;
    height: 14px;
    background: #DCDCDC;
    vertical-align: middle;
    margin: 0 21px;
  }
  .list-main-head{
    width: 100%;
    height: 76px;
    line-height: 76px;
    border-bottom: 1px solid #eee;
    padding-left: 48px;
    font-size: 20px;
    color:#333;
  }
  .list-head-more{
    text-align: center;
    font-size: 14px;
    color:#2A5AAC;
    margin: 10px auto 0 auto;
  }
  .list-head-msg{
    font-size: 16px;
    line-height: 26px;
    color: #666;
    overflow: hidden;
  }
  .lhn-tz-num{
    color:#2A5AAC;
  }
  .lhn-tz-name{
    color: #333;
    margin-right: 21px;
  }
  .lhn-type{
    color: #B2131A;
  }
  .lhn-name{
    font-size: 24px;
    font-weight: bold;
    color:#333;
    margin-right: 13px;
  }
  .list-head-name{
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .list-head{
    width: 100%;
    padding: 32px 44px;
    background: #fff;
    margin-bottom: 15px;
  }
</style>
