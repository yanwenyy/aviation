<template>
  <div class="crumbs">
    当前位置：{{msg}}
  </div>
</template>

<script>
    export default {
      name: "Crumbs",
      props:{
        'title':String,
      },
      data(){
        return{
          msg:''
        }
      },
      watch: {
        $route: {
          handler: function(route) {
            // console.log(route)
            this.msg=route.meta.title
          },
          immediate: true
        }
      },
    }
</script>

<style scoped>
  .crumbs{
    height:3.94rem;
    line-height:3.94rem;
    font-size:0.94rem;
    color: #999;
    border-bottom: 1px solid #DCDCDC;
    margin-bottom:1.5rem;
  }
</style>
