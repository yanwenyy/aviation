<template>
  <div>
    <div class="list-head box-sizing">
      <div class="list-head-name">
        <div class="inline-block">
          <span class="lhn-name">{{modelMsg.childName}}</span>
        </div>

      </div>
      <div class="list-head-msg">
        <div class="inline-block" :style="headShowMore?'height:auto':'height:68px'">
          {{modelMsg.introduction}}
          <div v-show="modelMsg.introduction&&modelMsg.introduction.length>50" class="list-head-more pointer inline-block" @click="headShowMore=!headShowMore">查看全部</div>
        </div>
      </div>
      <div class="list-head-foot">
        <div class="inline-block">
          <span class="">帖子数:</span>
          <span class="">{{modelMsg.themeNum}}</span>
        </div>
        <span class="white-space">空格</span>
        <span v-show="modelMsg.purviewType=='0'" class="">全员开放</span>
        <div @click="vipShadow=true" v-show="modelMsg.purviewType=='1'" class="zd-vip inline-block pointer">
          <span>指定{{modelMsg.users&&modelMsg.users.length}}位会员开放：</span>
          <span v-for="(item,index) in modelMsg.users">{{item.userName}} <span v-show="index<modelMsg.users.length-1">、</span></span>
        </div>
      </div>
    </div>
    <div class="list-main">
      <div class="list-main-head box-sizing">
        <div @click="type=0" class="inline-block pointer" :class="lmhTab=='最新'?'list-main-head-act':''">最新</div>
        <div class="inline-block lmh-line"></div>
        <div @click="type=1" class="inline-block pointer" :class="lmhTab=='最热'?'list-main-head-act':''">最热</div>
        <div @click="$router.push({name:'release',query:{id:id,jobModelId:jobModelId}})" class="lmh-sub pointer">+ 发帖</div>
      </div>
      <div class="list-main-body box-sizing">
        <div @click="$router.push({name:'ltListDetail',query:{id:item.id,jobModelId:jobModelId}})" v-for="item in list" class="list-main-list pointer">
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
                <img class="lml-img-group-ck" src="../../../static/img/list-ck.png" alt="">
                {{item.lookNum}}
              </span>
              <span class="inline-block lml-img-group">
                <img class="lml-img-group-hf" src="../../../static/img/list-hf.png" alt="">
                {{item.replyNum}}
              </span>
              <span class="inline-block lml-img-group">
                <img :src="item.votesNum>0?'../../../static/img/list-zan-act.png':'../../../static/img/list-zan.png'" alt="">
                {{item.supportNum}}
              </span>
              <span class="inline-block lml-img-group">
                <img src="../../../static/img/list-cai.png" alt="">
                {{item.opposeNum}}
              </span>
            </div>
          </div>
        </div>
        <Page v-if="pageStatus" :total="totalPage" :pageSize="pageSize" @pageClik="pageNumClick"></Page>
      </div>
    </div>
    <div v-show="vipShadow" class="shadow">
      <div class="password-model box-sizing">
        <div class="reply-title pm-title">指定{{modelMsg.users&&modelMsg.users.length}}位会员开放：</div>
        <div @click="vipShadow=false" class="close-model pointer">X</div>
        <div>
          <span v-for="(item,index) in modelMsg.users">{{item.userName}} <span v-show="index<modelMsg.users.length-1">、</span></span>
        </div>
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
            jobModelId:'',
            modelMsg:{},
            headShowMore:false,
            lmhTab:'最新',
            type:0,
            pageIndex: 1,
            pageSize: 10,
            totalPage: 0,
            pageStatus:false,
            list:[],
            vipShadow:false,
          }
      },
      mounted(){
        this.id=this.$route.query.id;
        this.jobModelId=this.$route.query.jobModelId;
        this.getList();
        this.getModel();
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
        //版块信息
        getModel(){
          this.$http({
            url: this.$http.adornUrl('/front/jobmodel/info/'+this.id,),
            method: 'GET',
          }).then(({data}) => {
            this.modelMsg = data.data;
          });
        },
      },
      watch :{
        $route: {
          handler: function(route) {
            // console.log(route)
            this.id=route.query.id;
            this.getList();
            this.getModel();
          },
          immediate: true
        }
      }
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
  .pm-title{
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
    font-weight: bold;
  }
  .password-model{
    width: 515px;
    height:auto;
    background: #fff;
    margin: 8% auto;
    border-radius: 4px;
    position: relative;
    padding: 53px 47px;
    font-size: 15px;
    line-height: 24px;
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
  .list-head-foot{
    font-size: 15px;
    color:#999;
    margin-top: 22px;
  }
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
    width: 16px;
    height: 18px;
    vertical-align: middle;
    margin-top: -5px;
  }
  .lml-img-group-ck{
    width: 18px!important;
    height: 13px!important;
  }
  .lml-img-group-hf{
    width: 18px!important;
    height: 18px!important;
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
