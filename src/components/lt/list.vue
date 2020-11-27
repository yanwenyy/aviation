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
    width:11.25rem;
    height:3.125rem;
    line-height:3.125rem;
    text-align: center;
    background: #2A5AAC;
    font-size:1rem;
    color:#fff;
    margin:0.94rem auto 0 auto;
  }
  .pm-title{
    margin-bottom:1.25rem;
    font-size: 1.125rem;
    color: #333;
    font-weight: bold;
  }
  .password-model{
    width:32.19rem;
    height:auto;
    background: #fff;
    margin: 8% auto;
    border-radius:0.25rem;
    position: relative;
    padding:3.31rem 2.94rem;
    font-size:0.94rem;
    line-height:1.5rem;
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
  .list-head-foot{
    font-size:0.94rem;
    color:#999;
    margin-top:1.375rem;
  }
  .lmh-sub{
    width:7.75rem;
    height:2.81rem;
    line-height:2.81rem;
    text-align: center;
    color:#fff;
    font-size:1rem;
    font-weight: bold;
    background: #2A5AAC;
    border-radius:0.125rem;
    float: right;
    margin:1rem 2.625rem 0 0;
  }
  .list-main-list{
    margin-bottom:1.69rem;
    border-bottom: 1px solid #eee;
    padding-bottom:1.75rem;
  }
  .lml-img-group{
    font-size:1.06rem;
  }
  .lml-img-group>img{
    width:1rem;
    height: 1.125rem;
    vertical-align: middle;
    margin-top: -5px;
  }
  .lml-img-group-ck{
    width: 1.125rem!important;
    height:0.82rem!important;
  }
  .lml-img-group-hf{
    width: 1.125rem!important;
    height: 1.125rem!important;
  }
  .lml-foot{
    display: flex;
    justify-content: space-between;
    font-size:1rem;
    color:#999999
  }
  .lml-zd{
    width:2.875rem;
    height:1.5rem;
    line-height:1.5rem;
    text-align: center;
    font-size:0.94rem;
    color:#fff;
    background: #B2131A;
    border-right:0.125rem;
  }
  .lml-sd{
    width:2.875rem;
    height:1.5rem;
    line-height:1.5rem;
    text-align: center;
    font-size:0.94rem;
    color:#fff;
    background: #AAAAAA;
    border-right:0.125rem;
  }
  .lml-name{
    width: 93%;
    vertical-align: top;
  }
  .lml-title{
    font-size:1.25rem;
    color:#333;
    margin-bottom:1.375rem;
  }
  .list-main-body{
    padding:34px 2.94rem
  }
  .list-main-head-act{
    font-weight: bold;
    color: #355696;
  }
  .list-main{
    background: #fff;
  }
  .lmh-line{
    width:0.125rem;
    height:0.875rem;
    background: #DCDCDC;
    vertical-align: middle;
    margin: 0 21px;
  }
  .list-main-head{
    width: 100%;
    height:4.75rem;
    line-height:4.75rem;
    border-bottom: 1px solid #eee;
    padding-left:3rem;
    font-size:1.25rem;
    color:#333;
  }
  .list-head-more{
    text-align: center;
    font-size:0.875rem;
    color:#2A5AAC;
    margin:0.625rem auto 0 auto;
  }
  .list-head-msg{
    font-size:1rem;
    line-height: 1.625rem;
    color: #666;
    overflow: hidden;
  }
  .lhn-tz-num{
    color:#2A5AAC;
  }
  .lhn-tz-name{
    color: #333;
    margin-right:1.32rem;
  }
  .lhn-type{
    color: #B2131A;
  }
  .lhn-name{
    font-size:1.5rem;
    font-weight: bold;
    color:#333;
    margin-right:0.82rem;
  }
  .list-head-name{
    font-size:1rem;
    display: flex;
    justify-content: space-between;
    margin-bottom:0.94rem;
  }
  .list-head{
    width: 100%;
    padding:2rem 2.75rem;
    background: #fff;
    margin-bottom:0.94rem;
  }
  @media screen and (max-width:900px) {
    .lmh-sub{
      margin: 1rem 0.5rem 0 0;
      width: 5rem;
    }
  }
</style>
