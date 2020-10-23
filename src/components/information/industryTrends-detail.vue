<template>
  <div>
    <div class="detail-title box-sizing">
      <div class="detail-title-name">{{detail.title}}</div>
      <div class="detail-title-source"><span class="dts-date inline-block">{{detail.insertTime}}</span> <span>来源：{{detail.source}}</span></div>
      <div class="detail-title-line"></div>
    </div>
    <div v-html="detail.content" class="detail-msg"></div>
    <div v-for="item in detail.tbAnnexActions" class="detial-fj box-sizing">
      <img src="" alt="" class="inline-block">
      <div class="inline-block">
        <div>{{item.fileOriginalName}}</div>
        <div @click="down(item.fileRealName)" class="down-fj pointer">立即下载</div>
      </div>
    </div>
    <div class="detail-pre detail-url pointer">上一篇：无人机适航审定首次审查会顺利召开</div>
    <div class="detail-next detail-url pointer">下一篇：无人机适航审定首次审查会顺利召开</div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        id:'',
        detail:{},
        pre:{},
        next:{},
      }
    },
    mounted(){
      this.id=this.$route.query.id;
      this.getDetail()
    },
    methods:{
      //下载附件
      down (name){
        var url='/jinding/download/'+name;
        window.open(this.$http.adornUrl(url));
      },
      getDetail(){
        this.$http({
          url: this.$http.adornUrl(`/aviation/trend/${this.id}`),
          method: 'GET',
        }).then(({data}) => {
          if (data && data.code === 10000) {
            this.detail=data.data;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .detail-title-line{
    margin-top: 27px;
  }
</style>
