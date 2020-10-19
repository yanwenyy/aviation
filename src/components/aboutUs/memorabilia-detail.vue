<template>
    <div>
      <div class="detail-title box-sizing">
        <div class="detail-title-date">2020.10.23</div>
        <div class="detail-title-name">电动航空时代真的要来了？当地时间10日10点22分，世界上第一架全电动商用飞机在俄罗斯 机场完成了首次试飞。</div>
        <div class="detail-title-line"></div>
      </div>
      <div class="detail-msg"></div>
      <div class="detail-pre detail-url pointer">上一篇：无人机适航审定首次审查会顺利召开</div>
      <div class="detail-next detail-url pointer">下一篇：无人机适航审定首次审查会顺利召开</div>
    </div>
</template>

<script>
    export default {
        name: "memorabilia-detail"
    }
</script>

<style scoped>
  /*详情头部*/
  .detail-title-line{
    width: 27px;
    height: 3px;
    background: #B21219;
    margin-top: 11px;
  }
  .detail-title-name{
    font-size: 22px;
    font-weight: bold;
    line-height: 36px;
  }
  .detail-title-date{
    font-size: 18px;
    font-weight: bold;
    color:#2A5AAC;
    margin-bottom: 12px;
  }
  .detail-title{
    padding-bottom: 36px;
    border-bottom: 1px dotted #eee;
    margin-bottom: 33px;
  }
  /*结束*/
  .detail-url{
    font-size: 15px;
    color:#2A5AAC;
    margin-bottom: 20px;
  }
</style>
