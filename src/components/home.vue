<template>
  <div>
    <div class="home-top-body">
      <div class="home-head">
        <div class="container">
          <img class="home-logo" src="../../static/img/logo.png" alt="">
          <div class="home-tab inline-block">
            <div class="pointer inline-block home-tab-act">首页</div>
            <div class="pointer inline-block" @click="$router.push({name:'aboutUs'})">关于我们</div>
            <div class="pointer inline-block" @click="$router.push({name:'information'})">信息资讯</div>
            <div class="pointer inline-block" @click="$router.push({name:'vipReply'})">入会申请</div>
          </div>
          <div v-if="userName==''"  @click="$router.push({name:'login'})" class="pointer inline-block go-login">会员登录 <img src="../../static/img/go-login.png" alt=""></div>
          <!--<div v-if="userName!=''"  @click="$router.push({name:'personalCenter'})" class="pointer inline-block go-login">{{userName}} <img src="../../static/img/go-login.png" alt=""></div>-->
          <div v-if="userName!=''"  @click="goLogin" class="pointer inline-block go-login2">退出登录</div>
          <div v-if="userName!=''"  @click="$router.push({name:'ltList',query:{id:id,jobModelId:jobModelId} })" class="pointer inline-block go-login">工作论坛<img src="../../static/img/go-login.png" alt=""></div>

        </div>
      </div>
      <!--<div class="banner-shadow"></div>-->
      <div class="banner">
        <swiper ref="mySwiper"  :options="swiperOption">
          <swiper-slide class="swiper-imgBox" v-for="(item,index) in bannerImage" :key="index">
            <img class="swiper-img" :src="imgUrlfront+item.imgUrl" @click="bannerClick(item.jumpUrl)" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="home-dynamic">
      <div class="dynamic-left"></div>
      <div class="dynamic-right">
        <div class="dynamic-right-shadow"></div>
      </div>
      <div class="dynamic-main">

        <div class="container">
          <div class="home-title">
            <div class="dynamic-more pointer" @click="$router.push({name:'industryTrends'})">查看更多内容+</div>
            <div class="home-title-en">INDUSTRY TRENDS</div>
            <div class="home-title">行业动态</div>
          </div>
          <div class="hd-more hd-more-left pointer swiper-button-prev2">
            <img src="../../static/img/home-left.png" alt="">
          </div>
          <swiper ref="mySwiper2"  :options="swiperOption" style="width: 100%">
            <swiper-slide v-for="(item,index) in trendListTJ" :key="index">
              <div @click="$router.push({name:'industryTrendsDetail',query:{id:item.id,type:0} })" :data-item="item.id" class="dynamic-msg pointer">
                <div class="inline-block box-sizing dm-img">
                  <img :src="imgUrlfront+item.coverImg" alt="">
                </div>
                <div class="inline-block box-sizing dm-right">
                  <div class="dm-right-date"> {{item.insertTime.split(" ")[0]}}</div>
                  <div class="dm-right-msg">{{item.title}}</div>
                  <div @click="$router.push({name:'industryTrendsDetail',query:{id:item.id,type:0} })" class="dm-right-goDetail">查看详情 ></div>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="hd-more hd-more-right pointer swiper-button-next2">
            <img src="../../static/img/home-right.png" alt="">
          </div>
          <div class="dynamic-list">
            <div v-for="item in trendList" @click="$router.push({name:'industryTrendsDetail',query:{id:item.id,type:1} })" class="inline-block box-sizing pointer">
              <div class="dynamic-list-date"> {{item.insertTime.split(" ")[0]}}</div>
              <div class="dynamic-list-msg">{{getTitle(item.title,30)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-notice">
      <div class="container">
        <div class="home-title">
          <div class="home-title-en">ANNOUNCEMENT</div>
          <div class="home-title-notice">
            <div @click="noticeType='通知公告',getNotice()" class="inline-block pointer" :class="noticeType=='通知公告'?'home-notice-act':''">通知公告 <span v-show="noticeType=='通知公告'" class="home-notice-act-line"></span></div>
            <div @click="noticeType='资料中心',getNotice()" class="inline-block pointer" :class="noticeType=='资料中心'?'home-notice-act':''"> 资料中心 <span v-show="noticeType=='资料中心'" class="home-notice-act-line"></span></div>
          </div>
        </div>
        <div class="home-notice-list">
          <div  v-for="item in noticeList"  @click="noticeType=='通知公告'?$router.push({name:'noticeDetail',query:{id:item.id} }):$router.push({name:'dataDetail',query:{id:item.id,type:1} })" class="inline-block box-sizing pointer">
            <div>{{item.title}}</div>
            <div class="hn-date">{{item.insertTime}}</div>
            <div class="hn-go"> > </div>
          </div>
        </div>
        <div @click="noticeType=='通知公告'?$router.push({name:'notice'}):$router.push({name:'data'})"  class="hnl-more pointer">查看更多内容+</div>
      </div>
    </div>
    <!--<div class="container">-->
      <!--<Page :total="100" :pageSize="10" @pageClik="pageNumClick"></Page>-->
    <!--</div>-->
    <Footer></Footer>
  </div>
</template>

<script>
  const path=process.env.NODE_ENV=='development'?'../../static':'./static';
  import Page from './page'
  import Footer from './footer'
    export default {
      name: "home",
      components:{
        Page,
        Footer
      },
      data () {
        return {
          userName:'',
          imgUrlfront:'',
          bannerImage: [],
          swiperOption: {
            // speed:5000,
            roundLengths: true,
            pagination: '.swiper-pagination',
            type: 'bullets',
            paginationClickable: true,
            // loop: true, //循环播放
            autoplay: 3000,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true ,//修改swiper的父元素时，自动初始化swiper
            // autoplayStopOnLast:false,
            nextButton: '.swiper-button-next2',
            prevButton: '.swiper-button-prev2',
            onClick: function(swiper,event) {
              console.log(event)
            },
          },
          trendList:[],
          trendListTJ:[],
          noticeType:'通知公告',
          noticeList:[],
        }
      },
      mounted(){
        this.userName=localStorage.getItem("userName")||sessionStorage.getItem("userName")||'';
        console.log(this.userName)
        this.imgUrlfront=this.$http.adornUrl('/jinding/showImg/');
        //banner
        this.$http({
          url: this.$http.adornUrl('/aviation/banner/list'),
          method: 'GET',
        }).then(({data}) => {
          if (data && data.code === 10000) {
            this.bannerImage=data.data;
          }
        });
        //行业动态首页推荐
        this.$http({
          url: this.$http.adornUrl('/aviation/trend/list'),
          method: 'GET',
          params: this.$http.adornParams({
            'type': 0,
          })
        }).then(({data}) => {
          if (data && data.code === 10000) {
            this.trendListTJ=data.data;
          }
        });
        //行业动态
        this.$http({
          url: this.$http.adornUrl('/aviation/trend/list'),
          method: 'GET',
          params: this.$http.adornParams({
            'pageNum': 1,
            'pageSize': 4,
            'type': 1,
          })
        }).then(({data}) => {
          if (data && data.code === 10000) {
            this.trendList=data.data;
          }
        });
        this.getNotice();
        //板块下拉列表
        this.$http({
          url: this.$http.adornUrl('/biz/jobmodel/select/list'),
          method: 'GET',
          params: this.$http.adornParams({
            'status': 0,
          })
        }).then(({data}) => {
          this.jobModelId = data.data[0].id;
          this.$http({
            url: this.$http.adornUrl('/biz/jobchildmodel/select/list'),
            method: 'GET',
            params: this.$http.adornParams({
              'id': this.jobModelId,
              'status': 0,
            })
          }).then(({data}) => {
            this.id = data.data[0].id;
          });
        });
      },
      methods:{
        //退出登录
        goLogin(){
          localStorage.removeItem('userName');
          localStorage.removeItem('token');
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('token');
          this.$router.push({name:'login'});
        },
        getTitle (val,num) {
          return val.length>num?val.slice(0,num)+"...":val;
        },
        //通知公告和资料中心
        getNotice(){
          console.log(this.noticeType)
          this.$http({
            url: this.$http.adornUrl(`/aviation/${this.noticeType=='通知公告'?'notice':'material'}/list`),
            method: 'GET',
            params: this.$http.adornParams({
              'pageNum': 1,
              'pageSize': 6,
            })
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.noticeList=data.data;
            }
          })
        },
        pageNumClick(val){
          console.log("我是父组件的方法"+val)
        },
        bannerClick(url){
          window.open(url)
        },
      },
      computed: {
        myValue() {
          return this.$store.state.loginName
        }
      },
      watch: {
        myValue: function(newVal, oldVal) {
          //其他业务代码
          this.userName=this.$store.state.loginName;
        }
      },
    }
</script>

<style scoped>
  .home-notice-list::after{
    display: table;
    content: '';
    clear: both;
  }
  .hnl-more{
    width:11.25rem;
    height:3.125rem;
    line-height:3.125rem;
    text-align: center;
    background: #fff!important;
    color:#2A5AAC;
    font-size:0.94rem;
    margin:5.375rem auto;
    border-radius: 1px;
  }
  .dynamic-main>.container{
    position: relative;
  }
  .hd-more{
    width:3.375rem;
    height:3.375rem;
    line-height:3.375rem;
    text-align: center;
    position: absolute;
    top:23.625rem;
    background: #fff;
    opacity: 0.79;
  }
  .hd-more>img{
    width:1.875rem;
    height:1.875rem;
    vertical-align: middle;
  }
  .hd-more-left{
    left: -6%;
  }
  .hd-more-right{
    right: -6%;
  }
  .hn-go{
    width:1.32rem;
    height:1.32rem;
    line-height:1.32rem;
    text-align: center;
    color:#3C60A8;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    opacity: 0.52;
    margin-top:1.25rem  ;
  }
  .home-notice-list>div{
    width:23.75rem;
    height:12.94rem;
    background: #2A5AAC;
    color:#fff;
    padding:2.75rem 2.31rem;
    font-size: 1.125rem;
    line-height:1.75rem;
    margin-bottom:1.375rem;
    float: left;
    margin-right:1.25rem;
  }
  .hn-date{
    font-size:0.875rem;
    margin-top:0.56rem ;
    opacity: 0.7;
  }
  .home-notice-list{
    /*column-count: 3;*/
    /*column-width: 385px;*/
    /*column-gap:1.25rem;*/
    margin-top:3.375rem;
  }
  .home-title-notice{
    font-size:2.06rem;
    color:#fff;
  }
  .home-title-notice>div{
    margin-right: 3%;
    position: relative;
    padding-bottom:1.875rem;
  }
  .home-notice-act{
    font-weight: bold;
  }
  .home-notice-act-line{
    width: 50%;
    height:0.19rem;
    background: #FFFFFF;
    display: inline-block;
    position: absolute;
    bottom: 0;
    left:25%;
  }
  .home-notice{
    width: 100%;
    height:56.125rem;
    background: url("../../static/img/home-notice-bg.png") 100% 100%;
  }
  .dynamic-list-date{
    color:#2A5AAC;
    font-weight: bold;
    margin-bottom:0.44rem;
  }
  .dynamic-list{
    display: flex;
    justify-content: space-between;
    margin-top:3.875rem;
  }
  .dynamic-list>div{
    width: 25%;
    height:12.44rem;
    background: rgba(255,255,255,0.95);
    padding:2.69rem 2.31rem;
    font-size: 1.125rem;
    line-height:1.94rem;
    color:#343434;
  }
  .dynamic-list>div:hover{
    height:13.56rem;
    background: #2A5AAC;
    color:#fff!important;
    margin-top:-0.56rem;
  }
  .dynamic-list>div:hover .dynamic-list-date{
    color: #fff;
  }
  .dm-right-goDetail{
    width:11.25rem;
    height:3.125rem;
    line-height:3.125rem;
    text-align: center;
    font-size: 1rem;
    color: #2A5AAC;
    border: 1px solid rgba(42,90,172,0.4);
    border-radius: 1px;
  }
  .dm-right-date{
    font-size:1.25rem;
    color:#2A5AAC;
    font-weight: bold;
    margin:4.19rem 0 1.125rem 0;
  }
  .dm-right-msg{
    font-size:1.25rem;
    color:#333;
    font-weight: bold;
    line-height:1.69rem;
    margin-bottom:3.125rem;
  }
  .dm-right{
    padding: 0 1.75rem;
  }
  .dm-img{
    padding:2.5rem;
  }
  .dm-img>img{
    width: 100%;
    height: 100%;
  }
  .dynamic-msg>div{
    width: 50%;
    height:23.25rem;
    background: rgba(255,255,255,0.95);
  }
  .dynamic-msg{
    margin-top:4rem;
    display: flex;
    justify-content: space-between;
  }
  .dynamic-more{
    width:11.25rem;
    font-size:0.94rem;
    height:3.125rem;
    line-height:3.125rem;
    text-align: center;
    color:#fff;
    background: #2A5AAC;
    border-radius: 1px;
    float: right;
    margin-top:6.56rem;
  }
  .home-title::before{
    display: table;
    content: '';
  }
  .home-dynamic>.container{
    z-index: 999;
  }
  .home-title-en{
    font-size:1.81rem;
    color:#2A5AAC;
    font-weight: bold;
    opacity: 0.31;
    margin:4.94rem 0 1.25rem 0;
  }
  .home-title{
    color:#2A5AAC;
    font-size:2rem;
    font-weight: bold;
  }
  /*@import "../../static/css/swiper.min.css";*/
  >>> .swiper-imgBox{
    width: 100%;
    overflow: hidden;
    /*background-size: cover;*/
  }
  >>>.swiper-img{
    width: 100%;
    height:47.5rem;
    object-fit: cover;
  }
  .home-head{
    width: 100%;
    height:8.06rem;
    position: absolute;
    top:0;
    left:0;
    background: transparent;
    display: flex;
    justify-content: space-between;
    z-index: 99999;
  }
  .home-logo{
    width: 24.875rem;
    height: 4.75rem;
    margin-top: 2.18rem;
    margin-right:10%;
  }
  .home-tab{
    color:#fff;
    font-size: 1.125rem;
    margin-top:3.94rem;
    white-space: nowrap;
  }
  .home-tab>div{
    margin-right: 3%;
    padding-bottom:1.32rem;
  }
  .home-tab-act{
    border-bottom:0.125rem solid #fff;
  }
  .banner{
    height:47.5rem;
    background: #007aff;
  }
  .banner-shadow{
    width: 100%;
    height:47.5rem;
    position: absolute;
    top:0;
    left: 0;
    background: rgba(0,0,0,.3);
    z-index: 999;
  }
  .go-login2{
    height:2.06rem;
    line-height:2.06rem;
    color:#fff;
    text-align: center;
    vertical-align: middle;
    float: right;
    margin-top:3.5rem;
    font-size:0.94rem;
    margin-left: 1rem;
  }
  .go-login{
    width:9.06rem;
    height:2.06rem;
    line-height:2.06rem;
    border: 1px solid #fff;
    border-radius:1.06rem;
    color:#fff;
    text-align: center;
    vertical-align: middle;
    float: right;
    margin-top:3.5rem;
    font-size:0.94rem;
  }
  .go-login>img{
    vertical-align: middle;
  }
  .home-dynamic{
    width: 100%;
    height: 62.5rem;
    position: relative;
  }
  .dynamic-left,.dynamic-right{
    height: 100%;
    width: 50%;
    z-index: 0;
    position: absolute;
    top:0;
  }
  .dynamic-main{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
  }
  .dynamic-left{
    left: 0;
    background: #F5F5F5;
  }
  .dynamic-right{
    right: 0;
    background: url("../../static/img/dynamic-right-bg.png") 100% 100%;
  }
  .dynamic-right-shadow{
    width: 100%;
    height:100%;
    background: #124D7A;
    opacity: 0.21;
  }
  @media screen and (max-width:900px) {
    .dynamic-list>div{
      width: 80%;
      margin: 1rem auto;
      display: block;
      height: auto;
    }
    .dynamic-list{
      display: block;
    }
    .hd-more-left{
      left: 0;
      z-index: 99999999999999;
    }
    .hd-more-right{
      right: 0;
      z-index: 99999999999999;
    }
    .dynamic-msg>div{
      height: 12rem;
    }
    .dm-right-msg{
      margin-bottom: 1rem;
    }
    .hd-more{
      top:15rem;
    }
    >>>.swiper-pagination-bullets{
      bottom:3rem
    }
    .dm-right-goDetail{
      margin-bottom: 1rem;
    }
    .dynamic-list{
      margin-top: 2rem;
    }
    .home-title-en{
      margin-top: 2rem;
    }
    .dynamic-more{
      margin-top: 3rem;
    }
    .home-notice{
      width: 100%;
      height:auto;
      background: url("../../static/img/home-notice-bg.png") 100% 100% repeat;
      padding-bottom: 3rem;
    }
    .hnl-more{
      margin-bottom: 0;
      margin-top: 3rem;
    }
    .home-notice-list>div{
      width: 100%;
    }
    .home-dynamic{
      height: 70rem;
    }
    .go-login>img{
      width: 1rem;
      height: auto;
    }
  }
</style>
