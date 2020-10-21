<template>
  <div>
    <Header></Header>
    <div class="lt-body">
      <div class="container">
        <div class="lt-left box-sizing">
          <ul class="lt-left-ul">
            <li v-for="item in 3">
              <div class="left-list-one pointer" :class="leftMsg==item?'left-list-one-act':''" @click="leftMsg=item">
                <span v-show="leftMsg!=item" class="inline-block right-triangle"></span>
                <span v-show="leftMsg==item" class="inline-block bottom-triangle"></span>
                {{item}}级模块
              </div>
              <div v-show="leftMsg==item" class="left-list-two pointer">
                <div class="left-list-two-list">二级模块</div>
                <div class="left-list-two-list">二级模块</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="lt-right">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../lt-header'
  import Footer from '../footer'
    export default {
      components:{
        Header,
        Footer
      },
      data(){
        return{
          leftMsg:''
        }
      }
    }
</script>

<style scoped>
  .lt-right{
    width: 74%;
  }
  .left-list-two-list{
    margin-bottom: 35px;
  }
  .left-list-two{
    padding:26px 0 0 56px;
    font-size: 18px;
    color: #666;
    background: #fff;
  }
  .left-list-one{
    padding: 23px 16px;
    border-radius: 4px;
  }
  .left-list-one-act{
    background: #2A5AAC;
    color:#fff;
  }
  .right-triangle{
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-left: 6px solid #000;
    border-bottom: 6px solid transparent;
    vertical-align: middle;
    margin-top: -3px;
    margin-right: 15px;
  }
  .bottom-triangle{
    width: 0;
    height: 0;
    border-top: 6px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    vertical-align: middle;
    margin-top: -3px;
    margin-right: 15px;
  }
  .lt-left{
    width:23%;
    /*background: #fff;*/
    font-size: 19px;
    color:#666;
    height: auto!important;
  }
  .lt-left-ul{
    background: #fff;
    padding: 26px 20px;
  }
  .lt-body .container{
    display: flex;
    justify-content: space-between;
  }
  .lt-body{
    background: #F6F6F6;
    padding-bottom: 49px;
    padding-top:22px;
  }
</style>
