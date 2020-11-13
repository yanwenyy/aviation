<template>
    <div>
      <div  v-html="detail.introduction" class="detail-msg">会员详情</div>
      <div class="detail-msg" v-html="detail.introduction"></div>
      <div class="detail-url"><a :href="detail.interUrl" target="_blank">网址: {{detail.interUrl}}</a></div>
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
        getDetail(){
          this.$http({
            url: this.$http.adornUrl(`/aviation/big/user/details/${this.id}`),
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
  .detail-url{
    text-align: center;
    font-size: 14px;
    margin-top: 63px;
  }
  .detail-url>a{
    color:#2A5AAC;
  }
</style>
