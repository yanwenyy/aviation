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
    width:22.81rem;
    height:4.375rem;
    margin-top:3.875rem;
    float: right;
  }
  .copyright{
    font-size:0.75rem;
    margin-top:1.25rem;
    color:#707682;
  }
  .contract-us{
    font-size: 1.125rem;
    margin:3.06rem 0 1.625rem 0;
  }
  .adress{
    font-size:0.94rem;
    opacity: 0.64;
    white-space: nowrap;
  }
  .adress>div{
    margin-right: 1.5%;
  }
  .footer{
    width: 100%;
    height:13.5rem;
    background: #010917;
    color:#fff;
  }
  @media screen and (max-width:900px) {
    .footer{
      height:20rem;
      text-align: center;
    }
    .adress{
      white-space: pre-wrap;
      line-height: 1.4rem;
    }
    .foot-logo{
      float: none;
      margin-top: 2rem;
    }
  }
</style>
