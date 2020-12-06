<template>
  <div>
    <Header></Header>
    <div class="lt-body">
      <div class="container">
        <div class="lt-left box-sizing">
          <ul class="lt-left-ul">
            <li v-for="item in classList">
              <div class="left-list-one pointer" :class="leftMsg==item.name?'left-list-one-act':''" @click="getTwo(item.id,item.name)">
                <span v-show="leftMsg!=item.name" class="inline-block right-triangle"></span>
                <span v-show="leftMsg==item.name" class="inline-block bottom-triangle"></span>
                {{item.name}}
              </div>
              <div v-show="leftMsg==item.name" class="left-list-two pointer">
                <div v-for="i in twoClassList" @click="twoMsg=i.childName,$router.push({name:'ltList',query:{id:i.id,jobModelId:item.id,time:Date.now()} })" class="left-list-two-list"  :class="twoMsg==i.childName?'blue':''">{{i.childName}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="lt-right">
          <router-view :key="$route.query.time"></router-view>
        </div>
      </div>
    </div>
    <div v-show="notVip" class="shadow">
      <div class="password-model box-sizing">
        <div class="reply-title pm-title" style="text-align: center">提示</div>
        <div @click="$router.go(-1)" class="close-model pointer">X</div>
        <div>
          您还不是会员用户或没登录，暂时无法访问论坛,快去看看其他内容或者申请入会吧！
        </div>
        <!--<div @click="$router.go(-1)" class="sub-password pointer">确定</div>-->
        <div @click="$router.push({name:'login',query:{from:'lt'}})" class="sub-password pointer">确定</div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../lt-header'
  import Footer from '../footer'
    export default {
      components:{
        Header,
        Footer
      },
      data(){
        return{
          leftMsg:'',
          twoMsg:'',
          classList:[],
          twoClassList:[],
          id:'',
          jobModelId:'',
          notVip:false,
        }
      },
      mounted(){
        //板块下拉列表
        this.$http({
          url: this.$http.adornUrl('/biz/jobmodel/select/list'),
          method: 'GET',
          params: this.$http.adornParams({
            'status': 0,
          })
        }).then(({data}) => {
          this.classList = data.data;
          if(data.msg=='invalid token'||data.code==401){
            // this.$router.push({name:'login',query:{from:'lt'}});
            this.notVip=true;
          }
        });
      },
      methods:{
        getTwo(id,name){
         if(this.leftMsg==name){
           this.leftMsg='';
         }else{
           this.leftMsg=name
         }
          this.$http({
            url: this.$http.adornUrl('/biz/jobchildmodel/select/list'),
            method: 'GET',
            params: this.$http.adornParams({
              'id': id,
              'status': 0,
            })
          }).then(({data}) => {
            this.twoClassList = data.data
          });
        }
      },
      watch :{
        $route: {
          handler: function(route) {
            // console.log(route)
            this.id=route.query.id;
            this.jobModelId=route.query.jobModelId;
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
    top:-4rem;
    right: 0;
  }
  .blue{
    color:#2A5AAC!important;
  }
  .lt-right{
    width: 74%;
  }
  .left-list-two-list{
    margin-bottom:2.19rem;
  }
  .left-list-two{
    padding:1.625rem 0 0 3.5rem;
    font-size: 1.125rem;
    color: #666;
    background: #fff;
  }
  .left-list-one{
    padding:1.44rem 1rem;
    border-radius:0.25rem;
  }
  .left-list-one-act{
    background: #2A5AAC;
    color:#fff;
  }
  .right-triangle{
    width: 0;
    height: 0;
    border-top:0.375rem solid transparent;
    border-left:0.375rem solid #000;
    border-bottom:0.375rem solid transparent;
    vertical-align: middle;
    margin-top: -0.19rem;
    margin-right:0.94rem;
  }
  .bottom-triangle{
    width: 0;
    height: 0;
    border-top:0.375rem solid #fff;
    border-left:0.375rem solid transparent;
    border-right:0.375rem solid transparent;
    vertical-align: middle;
    margin-top: -0.19rem;
    margin-right:0.94rem;
  }
  .lt-left{
    width:23%;
    /*background: #fff;*/
    font-size:1.19rem;
    color:#666;
    height: auto!important;
  }
  .lt-left-ul{
    background: #fff;
    padding: 1.625rem 1.25rem;
  }
  .lt-body .container{
    display: flex;
    justify-content: space-between;
  }
  .lt-body{
    background: #F6F6F6;
    padding-bottom:3.06rem;
    padding-top:1.375rem;
  }
  @media screen and (max-width:900px) {
    .lt-left{
      width:30%;
    }
    .lt-right{
      width: 68%;
    }
    .left-list-one{
      padding: 0.5rem;
    }
    .left-list-two{
      padding: 0.5rem;
    }
    .left-list-two-list{
      margin-bottom: 0.5rem;
    }
  }
</style>
