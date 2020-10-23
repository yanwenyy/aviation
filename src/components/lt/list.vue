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
        <div @click="type=0" class="inline-block pointer" :class="lmhTab=='最新'?'list-main-head-act':''">最新</div>
        <div class="inline-block lmh-line"></div>
        <div @click="type=1" class="inline-block pointer" :class="lmhTab=='最热'?'list-main-head-act':''">最热</div>
        <div @click="$router.push({name:'release'})" class="lmh-sub pointer">+ 发帖</div>
      </div>
      <div class="list-main-body box-sizing">
        <div @click="$router.push({name:'ltListDetail',query:{id:item.id}})" v-for="item in list" class="list-main-list pointer">
          <div class="lml-title">
            <span v-show="item.ifTop==1" class="inline-block lml-zd">置顶</span>
            <span v-show="item.ifLocking==1" class="inline-block lml-sd">锁定</span>
            <div class="inline-block lml-name">{{item.title}}</div>
          </div>
          <div class="lml-foot">
            <div class="inline-block">
              <span class="inline-block">{{item.createDate}}</span>
              <span class="inline-block"><span class="white-space">空格</span>{{item.byUser}}</span>
            </div>
            <div class="inline-block">
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                {{item.lookNum}}
              </span>
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                {{item.replyNum}}
              </span>
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                {{item.supportNum}}
              </span>
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                {{item.opposeNum}}
              </span>
            </div>
          </div>
        </div>
        <Page v-if="pageStatus" :total="totalPage" :pageSize="pageSize" @pageClik="pageNumClick"></Page>
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
            id:'',
            headShowMore:false,
            lmhTab:'最新',
            type:0,
            pageIndex: 1,
            pageSize: 10,
            totalPage: 0,
            pageStatus:false,
            list:[],
          }
      },
      mounted(){
        this.id=this.$route.query.id;
        this.getList();
      },
      methods:{
        pageNumClick(val){
          // console.log("我是父组件的方法"+val)
          this.pageIndex=val;
          this.getList();
        },
        getList(){
          this.$http({
            url: this.$http.adornUrl(`/front/jobmodel/theme/list`),
            method: 'GET',
            params: this.$http.adornParams({
              'pageNum': this.pageIndex,
              'pageSize': this.pageSize,
              'type': this.type,
              'modelId': this.id,
            })
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.list = data.data;
              this.totalPage = data.total;
              this.pageStatus=true;
            } else {
              this.list = [];
              this.totalPage = 0
            }
          })
        },
      },
      watch :{
        $route: {
          handler: function(route) {
            // console.log(route)
            this.id=route.query.id;
            this.getList();
          },
          immediate: true
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
