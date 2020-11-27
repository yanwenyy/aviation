<template>
  <div class="notice-detail">
    <div class="right">
      <div class="detail-title box-sizing">
        <div class="detail-title-date">{{detail.insertTime}}</div>
        <div class="detail-title-name">{{detail.title}}</div>
        <div class="detail-title-label">
          <span v-for="i in (detail.tagEntities)">{{i.tagName}}</span>
        </div>
      </div>
      <div v-html="detail.content" class="detail-msg"></div>
      <div v-for="item in detail.tbAnnexActions" class="detial-fj box-sizing">
        <img :src="path+getFileImg(item.fileOriginalName)" alt="" class="inline-block">
        <div class="inline-block">
          <div>{{item.fileOriginalName}}</div>
          <div @click="down(item.fileRealName,item.fileOriginalName)" class="down-fj pointer">立即下载</div>
        </div>
      </div>
      <!--<div class="detail-pre detail-url pointer">上一篇：无人机适航审定首次审查会顺利召开</div>-->
      <!--<div class="detail-next detail-url pointer">下一篇：无人机适航审定首次审查会顺利召开</div>-->
    </div>
    <div v-if="false" class="left">
      <div class="notice-more-title">更多推荐</div>
      <div class="notice-more-list pointer" v-for="item in 4">
        <div class="notice-more-date">2020.02.12 <div class="nmd-line"></div></div>
        <div class="notice-more-msg">电动航空时代真的要来了？世界上第世界 一架机场完成了首次试飞。</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getFileImg} from "../../utils/public"
    export default {
      data(){
        return{
          path:window.path,
          id:'',
          detail:{}
        }
      },
      mounted(){
        this.id=this.$route.query.id;
        this.$http({
          url: this.$http.adornUrl(`/aviation/notice/${this.id}`),
          method: 'GET',
        }).then(({data}) => {
          if (data && data.code === 10000) {
            this.detail=data.data;
          }
        })
      },
      methods:{
        getFileImg(val){
          return getFileImg(val)
        },
        //下载附件
        down (name,realName){
          var url='/jinding/download/'+name+'?fileName='+realName;
          window.open(this.$http.adornUrl(url));
        },
      }
    }
</script>

<style scoped>
  .notice-more-msg{
    font-size:0.94rem;
    line-height:1.375rem;
    margin-top:0.44rem;
  }
  .notice-more-list{
    margin-bottom: 1.625rem;
  }
  .nmd-line{
    width:1.56rem;
    height: 1px;
    background:#B21219;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .notice-more-date{
    font-size:0.875rem;
    font-weight: bold;
    color:#2A5AAC;
    border-bottom: 1px solid #eee;
    padding-bottom:0.875rem;
    position: relative;
  }
  .notice-more-title{
    width: 100%;
    height:3.31rem;
    line-height:3.31rem;
    background: #EEEEEE;
    font-size: 1.125rem;
    font-weight: bold;
    text-align: center;
    margin-bottom:1.875rem;
  }
  .left{
    width: 29%;
  }
  .right{
    /*width: 64%;*/
    width: 100%;
  }
  .notice-detail{
    display: flex;
    justify-content: space-between;
  }
</style>
