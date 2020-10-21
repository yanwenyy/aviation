<template>
  <div class="notice-detail">
    <div class="right">
      <div class="detail-title box-sizing">
        <div class="detail-title-name">电动航空时代真的要来了？当地时间10日10点22分，世界上第一架全电动商用飞机在俄罗斯 机场完成了首次试飞。</div>
        <div class="detail-title-source"><span class="dts-date inline-block">2020.10.23</span> <span>来源：百度</span></div>
        <div class="detail-title-line"></div>
      </div>
      <div class="detail-msg"></div>
      <div class="detial-fj box-sizing">
        <img src="" alt="" class="inline-block">
        <div class="inline-block">
          <div>调整城镇土地使用税和申报表单.pdf</div>
         <div class="down-fj pointer">立即下载</div>
        </div>
      </div>
      <div class="detail-pre detail-url pointer">上一篇：无人机适航审定首次审查会顺利召开</div>
      <div class="detail-next detail-url pointer">下一篇：无人机适航审定首次审查会顺利召开</div>
    </div>
    <div class="left">
      <div class="notice-more-title">更多推荐</div>
      <div class="notice-more-list pointer" v-for="item in 4">
        <div class="notice-more-date">2020.02.12 <div class="nmd-line"></div></div>
        <div class="notice-more-msg">电动航空时代真的要来了？世界上第世界 一架机场完成了首次试飞。</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
  .notice-more-msg{
    font-size: 15px;
    line-height: 22px;
    margin-top: 7px;
  }
  .notice-more-list{
    margin-bottom: 26px;
  }
  .nmd-line{
    width: 25px;
    height: 1px;
    background:#B21219;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .notice-more-date{
    font-size: 14px;
    font-weight: bold;
    color:#2A5AAC;
    border-bottom: 1px solid #eee;
    padding-bottom: 14px;
    position: relative;
  }
  .notice-more-title{
    width: 100%;
    height: 53px;
    line-height: 53px;
    background: #EEEEEE;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
  }
  .left{
    width: 29%;
  }
  .right{
    width: 64%;
  }
  .notice-detail{
    display: flex;
    justify-content: space-between;
  }
</style>
