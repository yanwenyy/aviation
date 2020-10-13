<template>
    <div>
      <div class="vip-title">
        <div class="vip-title-one">会员展示</div>
        <div class="vip-title-two">MEMBER SHOW </div>
      </div>
      <div class="vip-list">
        <div v-for="item in 12" class="inline-block box-sizing pointer" @click="$router.push({name:'vipDetail'})">中国东方航空股份有限公司 有限公司</div>
      </div>
      <Page :total="100" :pageSize="10" @pageClik="pageNumClick"></Page>
    </div>
</template>

<script>
  import Page from '../page'
    export default {
        name: "vip",
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
  .vip-list{
    column-count: 3;
    column-width: 287px;
    column-gap: 20px;
    margin-top: 40px;
    margin-bottom: 91px;
  }
  .vip-list>div{
    height: 92px;
    text-align: center;
    background: #F6F6F6;
    font-size: 18px;
    margin-bottom: 27px;
    padding: 30px;
  }
  .vip-title{
    text-align: center;
  }
  .vip-title-one{
    font-size: 22px;
    font-weight: bold;
    color: #343434;
    margin-bottom: 16px;
    margin-top: 25px;
  }
  .vip-title-two{
    font-size: 18px;
    color:#2A5AAC;
    opacity: 0.34;
  }
</style>
