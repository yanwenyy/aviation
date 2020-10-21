<template>
  <div>
    <div class="header-top">
      <div class="container">
        <img class="header-logo" src="../../static/img/logo.png" alt="">
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
    }
  }
</script>

<style scoped>
  .go-lt{
    font-size: 14px;
    color: #fff;
    width: 145px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    border: 1px solid #fff;
    border-radius: 17px;
    float: right;
    margin-top: 27px;
  }
  .go-lt>img{
    width: 17px;
    height: 14px;
    vertical-align: middle;
  }
  .header-logo{
    width: 365px;
    height: 70px;
    margin-top: 7px;
  }
  .header-top{
    width: 100%;
    height: 85px;
    background: #2A5AAC;
  }
</style>
