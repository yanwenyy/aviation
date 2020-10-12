<template>
  <div>
    <div class="home-top-body">
      <div class="home-head">
        <div class="container">
          <img class="home-logo" src="../../static/img/logo.png" alt="">
          <div class="home-tab inline-block">
            <div class="inline-block home-tab-act">首页</div>
            <div class="inline-block">关于我们</div>
            <div class="inline-block">信息资讯</div>
            <div class="inline-block">入会申请</div>
          </div>
          <div class="inline-block go-login">会员登录 <img src="../../static/img/go-login.png" alt=""></div>
        </div>
      </div>
      <div class="banner">
        <swiper ref="mySwiper"  :options="swiperOption">
          <swiper-slide v-for="(item,index) in bannerImage" :key="index">
            <img class="swiper-img" :src="item" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="container">
      <Page :total="100" :pageSize="10" @pageClik="pageNumClick"></Page>
    </div>
  </div>
</template>

<script>
  import Page from './page'
    export default {
      name: "home",
      components:{
        Page,
      },
      data () {
        return {
          bannerImage: ["1","2"],
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

      },
      methods:{
        pageNumClick(val){
          console.log("我是父组件的方法"+val)
        }
      }
    }
</script>

<style scoped>
  /*@import "../../static/css/swiper.min.css";*/
  >>>.swiper-img{
    min-width: 100%;
    min-height: 200px;
    width: 100%;
    height: 200px;
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
  }
  .home-logo{
    width: 398px;
    height: 76px;
    margin-top: 35px;
  }
  .home-tab{
    color:#fff;
    font-size: 18px;
    margin-top: 63px;
  }
  .home-tab>div{
    margin-right: 65px;
    padding-bottom: 21px;
  }
  .home-tab-act{
    border-bottom: 2px solid #fff;
  }
  .banner{
    height: 760px;
    background: #007aff;
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
  }
  .go-login>img{
    vertical-align: middle;
  }
</style>
