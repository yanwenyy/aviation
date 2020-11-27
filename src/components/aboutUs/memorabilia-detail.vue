<template>
    <div>
      <div class="detail-title box-sizing">
        <div class="detail-title-date">{{detail.releaseDate}}</div>
        <div class="detail-title-name">{{detail.title}}</div>
        <div class="detail-title-line"></div>
      </div>
      <div class="detail-msg" v-html="detail.content"></div>
      <div @click="goNextOrPre(pre)" v-if="pre" class="detail-pre detail-url pointer">上一篇：{{pre.title}}</div>
      <div @click="goNextOrPre(next)" v-if="next" class="detail-next detail-url pointer">下一篇：{{next.title}}</div>
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
        down (name,realName){
          var url='/jinding/download/'+name+'?fileName='+realName;
          window.open(this.$http.adornUrl(url));
        },
        getDetail(){
          this.$http({
            url: this.$http.adornUrl(`/aviation/big/info/${this.id}`),
            method: 'GET',
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.detail=data.data;
              this.nextOrPre()
            }
          })
        },
        nextOrPre(){
          this.$http({
            url: this.$http.adornUrl(`aviation/big/updown/notice`),
            method: 'GET',
            params: this.$http.adornParams({
              'id': this.detail.id,
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
  /*详情头部*/
  .detail-title-line{
    width:1.69rem;
    height:0.19rem;
    background: #B21219;
    margin-top:0.69rem;
  }
  .detail-title-name{
    font-size:1.375rem;
    font-weight: bold;
    line-height:2.25rem;
  }
  .detail-title-date{
    font-size: 1.125rem;
    font-weight: bold;
    color:#2A5AAC;
    margin-bottom:0.75rem;
  }
  .detail-title{
    padding-bottom:2.25rem;
    border-bottom: 1px dotted #eee;
    margin-bottom:2.06rem;
  }
  /*结束*/
  .detail-url{
    font-size:0.94rem;
    color:#2A5AAC;
    margin-bottom:1.25rem;
  }
</style>
