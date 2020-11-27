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
    margin-top:5.69rem;
  }
  >>>.prePage,>>>.nextPage{
    width:5rem;
    height:2.5rem;
    line-height:2.5rem;
    text-align: center;
    border: 1px solid #eee;
    margin: 0 0.44rem;
    border-radius:0.19rem;
    font-size:1rem;
    color: #333;
  }
  >>>.pageButton{
    width:2.5rem;
    height:2.5rem;
    line-height:2.5rem;
    text-align: center;
    border: 1px solid #999;
    margin: 0 0.44rem;
    border-radius:0.19rem;
    font-size:1rem;
  }
  >>>.activity{
    background: #2A5AAC;
    border-color: #2A5AAC;
    color:#fff;
  }
  @media screen and (max-width:900px) {
    >>>.prePage,>>>.nextPage{
      display: block;
      margin: 1rem 0;
    }
    #page{
      text-align: left;
    }
  }
</style>
