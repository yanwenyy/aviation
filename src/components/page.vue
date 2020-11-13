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
            that.$emit('pageClik', msg);
          });
      }
    }
</script>

<style scoped>
  #page{
    text-align: center;
    margin-top: 97px;
  }
  >>>.prePage,>>>.nextPage{
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #eee;
    margin: 0 7px;
    border-radius: 3px;
    font-size: 16px;
    color: #333;
  }
  >>>.pageButton{
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #999;
    margin: 0 7px;
    border-radius: 3px;
    font-size: 16px;
  }
  >>>.activity{
    background: #2A5AAC;
    border-color: #2A5AAC;
    color:#fff;
  }
</style>
