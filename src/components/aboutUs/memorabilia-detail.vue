<template>
    <div>
      <div class="detail-title box-sizing">
        <div class="detail-title-date">{{detail.releaseDate}}</div>
        <div class="detail-title-name">{{detail.title}}</div>
        <div class="detail-title-line"></div>
      </div>
      <div class="detail-msg" v-html="detail.content"></div>
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
            url: this.$http.adornUrl(`/aviation/big/info/${this.id}`),
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
