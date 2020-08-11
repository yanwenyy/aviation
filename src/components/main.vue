<template>
   <div class="container main">
     <router-view></router-view>
   </div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>
  .main{
    min-height: 80vh;
  }
</style>
