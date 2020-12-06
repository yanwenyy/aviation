<template>
    <div>
      <div class="detail-msg"></div>
      <div>
        <img class="vip-logo" :src="imgUrlfront+detail.logo" alt="">
      </div>
      <div class="vip-title">
        <div>{{detail.nameDes}}</div>
        <div class="inline-block vip-title-line"></div>
      </div>
      <div class="detail-msg" v-html="detail.introduction"></div>
      <div v-show="detail.interUrl" class="detail-url"><a :href="detail.interUrl" target="_blank">网址: {{detail.interUrl}}</a></div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          id:'',
          detail:{},
          imgUrlfront:this.$http.adornUrl('/jinding/showImg/'),
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
  .vip-title{
    font-size: 1.625rem;
    font-weight: bold;
    color: #2A5AAC;
    text-align: center;
    margin-top: 1.625rem;
    margin-bottom: 2.25rem;
  }
  .vip-title-line{
    width: 3.125rem;
    height:0.25rem;
    background:#2A5AAC;
    margin-top: 1rem;
  }
  .vip-logo{
    width: 11.635rem;
    height: 3.32rem;
  }
  .detail-url{
    text-align: center;
    font-size:0.875rem;
    margin-top:3.94rem;
  }
  .detail-url>a{
    color:#2A5AAC;
  }
</style>
