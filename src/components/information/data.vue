<template>
  <div>
    <div class="notice-label-group box-sizing">
      #机型标签
    </div>
    <div class="data-class">
        <div class="data-class-group" :class="moreMsg=='收起'?'data-class-group-show':'  '">
          <div class="data-class-list" v-for="item in 4">
            <div class="inline-block data-class-name">飞机类型：</div>
            <div class="data-class-tab-group inline-block">
              <div class="inline-block data-class-tab pointer" :class="item==1?'data-class-tab-act':''" v-for="item in 10">电动飞机{{item}}号</div>
            </div>
          </div>
        </div>
        <div class="data-class-more pointer" @click="moreMsg=='更多选项'?moreMsg='收起':moreMsg='更多选项'">
          {{moreMsg}} <img src="../../../static/img/more-down.png" alt="">
        </div>
    </div>
    <div class="data-list box-sizing pointer"  @click="$router.push({name:'dataDetail'})">
      <div class="data-list-title">电动航空时代来了？当地时间10日，世界上第一架全电动商用飞机完成了首次试飞。</div>
      <div class="data-list-date">2020.10.12</div>
      <div class="data-list-line"></div>
      <div class="data-list-msg">
        为迎接电动航空时代的到来，充分发挥电动航空产业链各环节中专家的作用，更好地开展电动航空领域适航相关技术标准的研究、制定和推进落实工作，特成立电动航空适航标准专业委员会，中文简称“电动适航专委会”或“专委会”，英文简称“CEAAS”）（英文名称为“Committee of Electric Aircraft Airworthiness Standards”。
      </div>
      <div class="data-list-label">#标签</div>
    </div>
    <Page :total="100" :pageSize="10" @pageClik="pageNumClick"></Page>
  </div>
</template>

<script>
  import Page from '../page'
    export default {
      components:{
        Page
      },
      data(){
        return{
          moreMsg:'更多选项'
        }
      },
      methods:{
        pageNumClick(val){
          console.log("我是父组件的方法"+val)
        }
      }
    }
</script>

<style scoped>
  .data-list-label{
    font-size: 13px;
    color:#2A5AAC;
    margin-top: 10px;
  }
  .data-list-msg{
    font-size: 15px;
    line-height: 27px;
  }
  .data-list-line{
    width: 27px;
    height: 2px;
    background: #eee;
    margin: 16px 0 10px;
  }
  .data-list-date{
    font-size: 15px;
    color:#999;
  }
  .data-list-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .data-list{
    border: 1px solid #EEEEEE;
    padding:39px 29px;
    margin-bottom: 16px;
  }
  .data-class-group{
    height: 180px;
    overflow: hidden;
  }
  .data-class-group-show{
    height: auto;
  }
  .data-class-more>img{
    width: 20px;
    height: auto;
    vertical-align: middle;
  }
  .data-class-more{
    text-align: center;
    font-size: 15px;
    color:#999;
    margin-top: 20px;
    margin-bottom: 36px;
  }
  .data-class{
    margin-top: 19px;
  }
  .data-class-tab-act{
    font-size: 17px!important;
    color:#2A5AAC!important;
  }
  .data-class-tab{
    color: #333;
    margin-right: 33px;
    margin-bottom: 21px;
  }
  .data-class-list{
    /*margin-bottom: 32px;*/
    font-size: 16px;
    color:#666;
  }
  .data-class-name{
    width: 10%;
    margin-right: 29px;
    vertical-align: top;
  }
  .data-class-tab-group{
    width: 85%;
  }
</style>
