<template>
  <div>
    <div class="header-top">
      <div class="container">
        <img class="header-logo" src="../../static/img/logo-2.png" alt="">
        <div v-if="userName!=''" class="go-lt pointer" @click="$router.push({name:'ltList',query:{id:id,jobModelId:jobModelId} })">
          工作论坛 <img src="../../static/img/go-lt.png" alt="">
        </div>
        <div v-if="userName==''" class="go-lt pointer" @click="$router.push({name:'login'})">
          工作论坛 <img src="../../static/img/go-lt.png" alt="">
        </div>
      </div>
    </div>
    <div class="header-tab">
      <div class="container">
        <div  @click="$router.push({name:'home'})" class="tab-list pointer inline-block" :class="title=='首页'?'tab-list-act':''">首页 <span v-show="title=='首页'" class="tab-list-line inline-block"></span></div>
        <div  @click="$router.push({name:'aboutUs'})" class="tab-list pointer inline-block" :class="title=='关于我们'?'tab-list-act':''">关于我们 <span v-show="title=='关于我们'" class="tab-list-line inline-block"></span></div>
        <div  @click="$router.push({name:'information'})" class="tab-list pointer inline-block" :class="title=='信息资讯'?'tab-list-act':''">信息资讯 <span v-show="title=='信息资讯'" class="tab-list-line inline-block"></span></div>
        <div  @click="$router.push({name:'vipReply'})" class="tab-list pointer inline-block" :class="title=='入会申请'?'tab-list-act':''">入会申请 <span v-show="title=='入会申请'" class="tab-list-line inline-block"></span></div>
      </div>
    </div>
    <div class="header-img">
      <img class="header-img-bg" src="../../static/img/header-banner-bg.png" alt="">
      <div class="header-img-shadow">
        <div v-show="title=='关于我们'">
          <div class="his-name-en">ABOUT US</div>
          <div class="his-line"></div>
          <div class="his-name-zn">关于我们</div>
        </div>
        <div v-show="title=='信息资讯'">
          <div class="his-name-en">NEWS</div>
          <div class="his-line"></div>
          <div class="his-name-zn">信息资讯</div>
        </div>
        <div v-show="title=='入会申请'">
          <div class="his-name-en">MEMBER</div>
          <div class="his-line"></div>
          <div class="his-name-zn">入会申请</div>
        </div>
        <div v-show="title=='会员个人中心'">
          <div class="his-name-en">PERSONAL CENTER</div>
          <div class="his-line"></div>
          <div class="his-name-zn">会员个人中心</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Header",
      props:{
          'title':String,
        },
      data(){
        return{
          userName:'',
          id:'',
          jobModelId:''
        }
      },
      mounted(){
        this.userName=localStorage.getItem("userName")||sessionStorage.getItem("userName")||'';
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
    }
</script>

<style scoped>
  .his-name-zn{
    font-size:1.75rem;
  }
  .his-line{
    width:4.375rem;
    height:0.19rem;
    background: #FFFFFF;
    opacity: 0.46;
    margin:1.875rem auto;
  }
  .his-name-en{
    font-size:2.875rem;
    margin-top:10.56rem;
  }
  .header-img-shadow{
    color:#fff;
    text-align: center;
  }
  .header-img-bg{
    width: 100%;
    height:26rem;
  }
  .header-img-shadow{
    width: 100%;
    height: 100%;
    background: #05255B;
    opacity: 0.64;
    position: absolute;
    top:0;
    left: 0;
  }
  .header-img{
    margin-top: -4rem;
    z-index: 0;
    position: relative;
  }
  .tab-list-act{
    font-size: 1.125rem;
    font-weight: bold;
  }
  .tab-list-line{
    width: 50%;
    height:0.125rem;
    background: #fff;
    position: absolute;
    bottom:0;
    left:25%;
  }
  .tab-list{
    position: relative;
    /*margin-right: 2.6%;*/
    margin-right:3.19rem;
  }
  .header-tab{
    width: 100%;
    height:4rem;
    line-height:4rem;
    background: rgba(0,0,0,0.16);
    color:#fff;
    text-align: right;
    font-size: 1.125rem;
    z-index: 9999;
    position: relative;
  }
  .go-lt{
    font-size:0.875rem;
    color: #0E367A;
    width:9.06rem;
    height:2.06rem;
    line-height:2.06rem;
    text-align: center;
    border: 1px solid #0E367A;
    border-radius:1.06rem;
    float: right;
    margin-top:1.69rem;
  }
  .go-lt>img{
    width:1.06rem;
    height:0.875rem;
    vertical-align: middle;
  }
  .header-logo{
    width:20.19rem;
    height:4.375rem;
    margin-top:0.44rem;
  }
  .header-top{
    width: 100%;
    height:5.31rem;
  }
  @media screen and (max-width:900px) {
    .tab-list{
      margin-right: 1rem;
    }
    .header-logo{
      width: 16rem;
      height: auto;
    }
  }
</style>
