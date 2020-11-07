<template>
  <div class="mainColor footer">
    <div class="container">
      <div class="inline-block">
        <div class="contract-us">联系我们</div>
        <div class="adress">
          <div class="inline-block">Tel：010-00000000</div>
          <div class="inline-block">Email：hk@hangkongxiehui.com</div>
          <div class="inline-block">地址：北京市朝阳区某区某楼128号</div>
        </div>
        <div class="copyright">©2018 电动航空适航标准专业委员会版权所有，并保留所有权利</div>
      </div>
      <img class="foot-logo" src="../../static/img/logo.png" alt="">
    </div>
  </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
  .foot-logo{
    width: 365px;
    height: 70px;
    margin-top: 62px;
    float: right;
  }
  .copyright{
    font-size: 12px;
    margin-top: 20px;
    color:#707682;
  }
  .contract-us{
    font-size: 18px;
    margin: 49px 0 26px 0;
  }
  .adress{
    font-size: 15px;
    opacity: 0.64;
    white-space: nowrap;
  }
  .adress>div{
    margin-right: 1.5%;
  }
  .footer{
    width: 100%;
    height: 216px;
    background: #010917;
    color:#fff;
  }
</style>
