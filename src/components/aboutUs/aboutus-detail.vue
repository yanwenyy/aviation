<template>
  <div v-html="detail.content" class="detail-msg"></div>
</template>

<script>
    export default {
      data(){
        return{
          detail:{}
        }
      },
      mounted(){
        this.$http({
          url: this.$http.adornUrl(`/aviation/big/introduction/info`),
          method: 'GET',
        }).then(({data}) => {
          if (data && data.code === 10000) {
            this.detail=data.data;
          }
        })
      },
    }
</script>

<style scoped>

</style>
