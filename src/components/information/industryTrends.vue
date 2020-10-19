<template>
    <div>
      <div class="notice-label-group box-sizing">
        #机型标签
      </div>
      <div v-for="item in 3" class="it-list box-sizing pointer" @click="$router.push({name:'industryTrendsDetail'})">
        <img v-show="item==1" class="it-list-img" src="../../../static/img/test1.jpg" alt="">
        <div class="inline-block" :class="item==1?'it-msg-show':''">
          <div class="it-title">电动航空时代来了？当地时间10日，世界上第一架全电动商用飞机完成了首次试飞。</div>
          <div class="it-source">
            <div class="inline-block it-date">2020.10.12</div>
            <div class="inline-block">来源：百度</div>
          </div>
          <div class="it-msg">
            为迎接电动航空时代的到来，充分发挥电动航空产业链各环节中专家的作用，更好地开展电动航空领域适航相关技术标准的研究、制定和推进落实工作，特成立电动航空适航标准专业委员会，
            “ 专委会”或“专委会”，英文简称“CEAAS”）（英文名称为“Committee of Electric Aircraft Airworthiness Standards”。
          </div>
          <div class="it-label">
            <div class="inline-block">#标签</div>
            <div class="inline-block">#机型标签</div>
          </div>
        </div>
      </div>
      <Page :total="100" :pageSize="10" @pageClik="pageNumClick"></Page>
    </div>
</template>

<script>
  import Page from '../page'
    export default {
      name: "industry-trends",
      components:{
        Page
      },
      methods:{
        pageNumClick(val){
          console.log("我是父组件的方法"+val)
        }
      }
    }
</script>

<style scoped>
  .it-msg-show{
    width: 70%;
  }
  .it-label{
    font-size: 14px;
    color:#2A5AAC;
    margin-top: 10px;
  }
  .it-label>div{
    margin-right: 16px;
  }
  .it-msg{
    font-size: 15px;
    line-height: 27px;
    margin-top: 20px;
    color:#343434;
  }
  .it-date{
    font-size: 16px;
    color:#B2121A;
  }
  .it-source{
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    color:#9A9A9A;
  }
  .it-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    line-height: 29px;
  }
  .it-list-img{
    width: 312px;
    height: 218px;
    vertical-align: top;
    margin-right: 23px;
  }
  .it-list{
    border: 1px solid #eee;
    padding:39px 41px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
</style>
