<template>
    <div>
      <div id="page"></div>
    </div>
</template>

<script>
    export default {
      name: "page",
      props:{
        total:Number,
        pageSize:Number,
      },
      mounted(){
        var that=this;
        $("#page").paging({
            total: this.total,
            numberPage: this.pageSize
          },
          function(msg) {
            //回调函数 msg为选中页码
            console.log(msg);
            that.$emit('pageClik', 'hello');
          });
      }
    }
</script>

<style scoped>
  #page{
    text-align: center;
  }
  >>>.prePage,>>>.nextPage{
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #999;
    margin: 0 3px;
    border-radius: 3px;
  }
  >>>.pageButton{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #999;
    margin: 0 3px;
    border-radius: 3px;
  }
  >>>.activity{
    background: #0079cd;
    border-color: #0079cd;
    color:#fff;
  }
</style>
