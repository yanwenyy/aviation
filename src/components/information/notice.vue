<template>
  <div class="memorabilia-body box-sizing">
    <div class="notice-label-group box-sizing">
      #机型标签
    </div>
    <div @click="$router.push({name:'noticeDetail'})" class="memorabilia-list pointer" v-for="item in 5">
      <span class="inline-block ml-dot"></span>
      <div class="ml-msg inline-block">
        <div class="ml-date-show">
          2020.10.23
        </div>
        <div class="ml-msg-show">电动航空时代来了？当地时间10日，世界上第一架全电动商用飞机完成了首次试飞。</div>
        <div class="notice-label">#机型标签</div>
      </div>
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
    methods:{
      pageNumClick(val){
        console.log("我是父组件的方法"+val)
      }
    }
  }
</script>

<style scoped>
  .notice-label{
    font-size: 14px;
    color:#2A5AAC;
    margin-top: 16px;
  }
  .ml-msg-show{
    font-size: 19px;
    line-height: 34px;
  }
  .ml-line{
    width: 28px;
    height: 3px;
    background: #B2131A;
    margin: 15px 0 10px 0;
  }
  .ml-date-show{
    font-size: 19px;
    color:#333;
  }
  .ml-dot{
    width: 6px;
    height: 6px;
    background: #2A5AAC;
    border-radius: 50%;
    vertical-align: top;
    margin-right: 12px;
    margin-top: 7px;
  }
  .memorabilia-list{
    margin-bottom: 55px;
  }
  .memorabilia-body{
    padding: 11px 0;
  }
</style>
