<template>
  <div id="app">
    <!--<Header ref="head"></Header>-->
    <div :style="'margin-top:'+headerHeight+'px'">
      <router-view/>
    </div>
    <!--<Footer></Footer>-->
  </div>
</template>

<script>
  import Header from '@/components/header'
  import Footer from '@/components/footer'
export default {
  name: 'App',
  data(){
    return{
      headerHeight:0
    }
  },
  components:{
    Header,
    Footer
  },
  // mounted(){
  //   this.headerHeight=this.$refs.head.$el.offsetHeight;
  //   // console.log(this.headerHeight)
  // }
}
</script>

<style>

</style>
