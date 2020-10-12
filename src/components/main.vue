<template>

   <div class="main">
     <router-view></router-view>
   </div>
</template>

<script>
  import Header from '@/components/header'
  import Footer from '@/components/footer'
    export default {
        name: "Main",
    }
</script>

<style scoped>
  .main{
    min-height: 80vh;
  }
</style>
