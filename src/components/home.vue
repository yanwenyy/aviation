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
          <div  @click="$router.push({name:'login'})" class="pointer inline-block go-login">会员登录 <img src="../../static/img/go-login.png" alt=""></div>
        </div>
      </div>
      <div class="banner-shadow"></div>
      <div class="banner">
        <swiper ref="mySwiper"  :options="swiperOption">
          <swiper-slide v-for="(item,index) in bannerImage" :key="index">
            <img class="swiper-img" :src="item" alt="">
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
            <div class="dynamic-more">查看更多内容+</div>
            <div class="home-title-en">INDUSTRY TRENDS</div>
            <div class="home-title">行业动态</div>
          </div>
          <div class="hd-more hd-more-left pointer">
            <img src="../../static/img/home-left.png" alt="">
          </div>
          <div class="dynamic-msg">
            <div class="inline-block box-sizing dm-img">
              <img src="../../static/img/test1.jpg" alt="">
            </div>
            <div class="inline-block box-sizing dm-right">
              <div class="dm-right-date">2020.08.09</div>
              <div class="dm-right-msg">电动航空时代来了？全球首架商用电动飞机完成首飞！据外媒报道，当地时间10日，世界上第一架全电动商用飞机从加拿大温哥华起飞，完成了首次试飞。</div>
              <div class="dm-right-goDetail">查看详情 ></div>
            </div>
          </div>
          <div class="hd-more hd-more-right pointer">
            <img src="../../static/img/home-right.png" alt="">
          </div>
          <div class="dynamic-list">
            <div v-for="item in 4" class="inline-block box-sizing pointer">
              <div class="dynamic-list-date">2020.08.09</div>
              <div class="dynamic-list-msg">这一段时间以来航空业巨头 布局电动飞机研发的脚步不 断在加快</div>
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
            <div class="inline-block pointer home-notice-act">通知公告 <span class="home-notice-act-line"></span></div>
            <div class="inline-block pointer"> 资料中心</div>
          </div>
        </div>
        <div class="home-notice-list">
          <div v-for="item in 6" class="inline-block box-sizing">
            <div>民航西北局完成MA60系气再完60系气 飞机空气再循过滤器</div>
            <div class="hn-date">2020.08.09</div>
            <div class="hn-go"> > </div>
          </div>
        </div>
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
          bannerImage: [path+"/img/banner1.jpg",path+"/img/banner2.jpg"],
          swiperOption: {
            // speed:5000,
            roundLengths: true,
            pagination: '.swiper-pagination',
            type: 'bullets',
            paginationClickable: true,
            loop: true, //循环播放
            autoplay: 3000,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true ,//修改swiper的父元素时，自动初始化swiper
            // autoplayStopOnLast:false,
            nextButton: '.swiper-button-next2',
            prevButton: '.swiper-button-prev2',
          },
        }
      },
      mounted(){
        console.log(process.env.NODE_ENV)
      },
      methods:{
        pageNumClick(val){
          console.log("我是父组件的方法"+val)
        }
      }
    }
</script>

<style scoped>
  .dynamic-main>.container{
    position: relative;
  }
  .hd-more{
    width: 54px;
    height: 54px;
    line-height: 54px;
    text-align: center;
    position: absolute;
    top:378px;
    background: #fff;
    opacity: 0.79;
  }
  .hd-more>img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .hd-more-left{
    left: -6%;
  }
  .hd-more-right{
    right: -6%;
  }
  .hn-go{
    width: 21px;
    height: 21px;
    line-height: 21px;
    text-align: center;
    color:#3C60A8;
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    opacity: 0.52;
    margin-top: 20px  ;
  }
  .home-notice-list>div{
    height: 207px;
    background: #2A5AAC;
    color:#fff;
    padding: 44px 37px;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 22px;
  }
  .hn-date{
    font-size: 14px;
    margin-top:9px ;
  }
  .home-notice-list{
    column-count: 3;
    column-width: 385px;
    column-gap: 20px;
    margin-top: 54px;
  }
  .home-title-notice{
    font-size: 33px;
    color:#fff;
  }
  .home-title-notice>div{
    margin-right: 3%;
    position: relative;
    padding-bottom: 30px;
  }
  .home-notice-act{
    font-weight: bold;
  }
  .home-notice-act-line{
    width: 50%;
    height: 3px;
    background: #FFFFFF;
    display: inline-block;
    position: absolute;
    bottom: 0;
    left:25%;
  }
  .home-notice{
    width: 100%;
    height: 898px;
    background: url("../../static/img/home-notice-bg.png") 100% 100%;
  }
  .dynamic-list-date{
    color:#2A5AAC;
    font-weight: bold;
    margin-bottom: 7px;
  }
  .dynamic-list{
    display: flex;
    justify-content: space-between;
    margin-top: 62px;
  }
  .dynamic-list>div{
    width: 25%;
    height: 199px;
    background: rgba(255,255,255,0.95);
    padding:43px 37px;
    font-size: 18px;
    line-height: 31px;
    color:#343434;
  }
  .dynamic-list>div:hover{
    height: 217px;
    background: #2A5AAC;
    color:#fff!important;
    margin-top: -9px;
  }
  .dynamic-list>div:hover .dynamic-list-date{
    color: #fff;
  }
  .dm-right-goDetail{
    width: 180px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #2A5AAC;
    border: 1px solid rgba(42,90,172,0.4);
    border-radius: 1px;
  }
  .dm-right-date{
    font-size: 20px;
    color:#2A5AAC;
    font-weight: bold;
    margin: 67px 0 18px 0;
  }
  .dm-right-msg{
    font-size: 20px;
    color:#333;
    font-weight: bold;
    line-height: 27px;
    margin-bottom: 50px;
  }
  .dm-right{
    padding: 0 28px;
  }
  .dm-img{
    padding:40px;
  }
  .dm-img>img{
    width: 100%;
    height: 100%;
  }
  .dynamic-msg>div{
    width: 50%;
    height: 372px;
    background: rgba(255,255,255,0.95);
  }
  .dynamic-msg{
    margin-top: 64px;
    display: flex;
    justify-content: space-between;
  }
  .dynamic-more{
    width: 180px;
    font-size: 15px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color:#fff;
    background: #2A5AAC;
    border-radius: 1px;
    float: right;
    margin-top: 105px;
  }
  .home-title::before{
    display: table;
    content: '';
  }
  .home-dynamic>.container{
    z-index: 999;
  }
  .home-title-en{
    font-size: 29px;
    color:#2A5AAC;
    font-weight: bold;
    opacity: 0.31;
    margin: 79px 0 20px 0;
  }
  .home-title{
    color:#2A5AAC;
    font-size: 32px;
    font-weight: bold;
  }
  /*@import "../../static/css/swiper.min.css";*/
  >>>.swiper-img{
    width: 100%;
    height: 760px;
  }
  .home-head{
    width: 100%;
    height: 129px;
    position: absolute;
    top:0;
    left:0;
    background: transparent;
    display: flex;
    justify-content: space-between;
    z-index: 99999;
  }
  .home-logo{
    width: 398px;
    height: 76px;
    margin-top: 35px;
    margin-right:10%;
  }
  .home-tab{
    color:#fff;
    font-size: 18px;
    margin-top: 63px;
    white-space: nowrap;
  }
  .home-tab>div{
    margin-right: 3%;
    padding-bottom: 21px;
  }
  .home-tab-act{
    border-bottom: 2px solid #fff;
  }
  .banner{
    height: 760px;
    background: #007aff;
  }
  .banner-shadow{
    width: 100%;
    height: 760px;
    position: absolute;
    top:0;
    left: 0;
    background: rgba(0,0,0,.3);
    z-index: 999;
  }
  .go-login{
    width: 145px;
    height:33px;
    line-height: 33px;
    border: 1px solid #fff;
    border-radius: 17px;
    color:#fff;
    text-align: center;
    vertical-align: middle;
    float: right;
    margin-top: 56px;
    font-size: 15px;
  }
  .go-login>img{
    vertical-align: middle;
  }
  .home-dynamic{
    width: 100%;
    height: 1000px;
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
</style>
