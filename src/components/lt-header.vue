<template>
  <div>
    <div class="header-top">
      <div class="container">
        <img class="header-logo" src="../../static/img/logo.png" alt="">
        <div v-if="userName!=''" class="inline-block username">{{userName}}</div>
        <div class="go-lt pointer"  @click="$router.push({name:'home'})">
          返回官网 <img src="../../static/img/go-login.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      'title':String,
    },
    data () {
      return {
        userName:''
      }
    },
    mounted(){
      this.userName=localStorage.getItem("userName")||sessionStorage.getItem("userName")||'';
    }
  }
</script>

<style scoped>
  .username{
    color: #fff;
    float: right;
    font-size: 1rem;
    line-height: 5.31rem;
    margin-left: 1rem;
  }
  .go-lt{
    font-size:0.875rem;
    color: #fff;
    width:9.06rem;
    height:2.06rem;
    line-height:2.06rem;
    text-align: center;
    border: 1px solid #fff;
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
    width:22.81rem;
    height:4.375rem;
    margin-top:0.44rem;
  }
  .header-top{
    width: 100%;
    height:5.31rem;
    background: #2A5AAC;
  }
  @media screen and (max-width:900px) {
    .header-logo{
      width: 16rem;
      height: auto;
    }
  }
</style>
