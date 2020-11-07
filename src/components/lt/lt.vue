<template>
  <div>
    <Header></Header>
    <div class="lt-body">
      <div class="container">
        <div class="lt-left box-sizing">
          <ul class="lt-left-ul">
            <li v-for="item in classList">
              <div class="left-list-one pointer" :class="leftMsg==item.name?'left-list-one-act':''" @click="leftMsg=item.name,getTwo(item.id)">
                <span v-show="leftMsg!=item.name" class="inline-block right-triangle"></span>
                <span v-show="leftMsg==item.name" class="inline-block bottom-triangle"></span>
                {{item.name}}
              </div>
              <div v-show="leftMsg==item.name" class="left-list-two pointer">
                <div v-for="i in twoClassList" @click="twoMsg=i.childName,$router.push({name:'ltList',query:{id:i.id,jobModelId:item.id} })" class="left-list-two-list"  :class="twoMsg==i.childName?'blue':''">{{i.childName}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="lt-right">
          <router-view></router-view>
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
        <div @click="$router.go(-1)" class="sub-password pointer">确定</div>
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
        }).then(({data}) => {
          this.classList = data.data;
          if(data.msg=='invalid token'||data.code==401){
            // this.$router.push({name:'login',query:{from:'lt'}});
            this.notVip=true;
          }
        });
      },
      methods:{
        getTwo(id){
          this.$http({
            url: this.$http.adornUrl('/biz/jobchildmodel/select/list'),
            method: 'GET',
            params: this.$http.adornParams({
              'id': id,
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
  .blue{
    color:#2A5AAC!important;
  }
  .lt-right{
    width: 74%;
  }
  .left-list-two-list{
    margin-bottom: 35px;
  }
  .left-list-two{
    padding:26px 0 0 56px;
    font-size: 18px;
    color: #666;
    background: #fff;
  }
  .left-list-one{
    padding: 23px 16px;
    border-radius: 4px;
  }
  .left-list-one-act{
    background: #2A5AAC;
    color:#fff;
  }
  .right-triangle{
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-left: 6px solid #000;
    border-bottom: 6px solid transparent;
    vertical-align: middle;
    margin-top: -3px;
    margin-right: 15px;
  }
  .bottom-triangle{
    width: 0;
    height: 0;
    border-top: 6px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    vertical-align: middle;
    margin-top: -3px;
    margin-right: 15px;
  }
  .lt-left{
    width:23%;
    /*background: #fff;*/
    font-size: 19px;
    color:#666;
    height: auto!important;
  }
  .lt-left-ul{
    background: #fff;
    padding: 26px 20px;
  }
  .lt-body .container{
    display: flex;
    justify-content: space-between;
  }
  .lt-body{
    background: #F6F6F6;
    padding-bottom: 49px;
    padding-top:22px;
  }
</style>
