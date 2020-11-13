<template>
  <div>
    <div class="detail-title box-sizing">
      <div class="detail-title-name">{{detail.title}}</div>
      <div class="detail-title-source"><span class="dts-date inline-block">{{detail.insertTime}}</span> <span>来源：{{detail.source}}</span></div>
      <div class="detail-title-line"></div>
    </div>
    <div v-html="detail.content" class="detail-msg"></div>
    <div v-for="item in detail.tbAnnexActions" class="detial-fj box-sizing">
      <img :src="path+getFileImg(item.fileOriginalName)"  alt="" class="inline-block">
      <div class="inline-block">
        <div>{{item.fileOriginalName}}</div>
        <div @click="down(item.fileRealName,item.fileOriginalName)" class="down-fj pointer">立即下载</div>
      </div>
    </div>
    <div @click="goNextOrPre(pre)" v-if="pre" class="detail-pre detail-url pointer">上一篇：{{pre.title}}</div>
    <div @click="goNextOrPre(next)" v-if="next" class="detail-next detail-url pointer">下一篇：{{next.title}}</div>
  </div>
</template>

<script>
  import {getFileImg} from "../../utils/public"
  export default {
    data(){
      return{
        path:window.path,
        id:'',
        type:'',
        detail:{},
        pre:{},
        next:{},
      }
    },
    mounted(){
      this.id=this.$route.query.id;
      this.type=this.$route.query.type;
      this.getDetail();
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
      getDetail(){
        this.$http({
          url: this.$http.adornUrl(`/aviation/trend/${this.id}`),
          method: 'GET',
        }).then(({data}) => {
          if (data && data.code === 10000) {
            this.detail=data.data;
            this.nextOrPre();
          }
        })
      },
      nextOrPre(){
        this.$http({
          url: this.$http.adornUrl(`/aviation/updown/list`),
          method: 'GET',
          params: this.$http.adornParams({
            'type': this.type,
            'id': this.detail.id,
            'trndType': 0,
          })
        }).then(({data}) => {
          if (data && data.code === 10000) {
            var datas=data.data;
            this.pre=datas[0];
            this.next=datas[1];
          }
        })
      },
      goNextOrPre(e){
        this.id=e.id;
        this.getDetail();
      }
    }
  }
</script>

<style scoped>
  .detail-title-line{
    margin-top: 27px;
  }
</style>
