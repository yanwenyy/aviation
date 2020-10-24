<template>
  <div>
    <Header></Header>
    <div class="lt-body">
      <div class="container">
        <div class="lt-left box-sizing">
          <ul class="lt-left-ul">
            <li v-for="item in classList">
              <div class="left-list-one pointer" :class="leftMsg==item.name?'left-list-one-act':''" @click="leftMsg=item.name,getTwo(item.id)">
                <span v-show="leftMsg!=item.name" class="inline-block right-triangle"></span>
                <span v-show="leftMsg==item.name" class="inline-block bottom-triangle"></span>
                {{item.name}}
              </div>
              <div v-show="leftMsg==item.name" class="left-list-two pointer">
                <div v-for="i in twoClassList" @click="twoMsg=i.childName,$router.push({name:'ltList',query:{id:i.id,jobModelId:item.id} })" class="left-list-two-list"  :class="twoMsg==i.childName?'blue':''">{{i.childName}}</div>
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
          leftMsg:'',
          twoMsg:'',
          classList:[],
          twoClassList:[],
        }
      },
      mounted(){
        //板块下拉列表
        this.$http({
          url: this.$http.adornUrl('/biz/jobmodel/select/list'),
          method: 'GET',
        }).then(({data}) => {
          this.classList = data.data;
          if(data.msg=='invalid token'||data.code==401){
            this.$router.push({name:'login',query:{from:'lt'}});
          }
        });
      },
      methods:{
        getTwo(id){
          this.$http({
            url: this.$http.adornUrl('/biz/jobchildmodel/select/list'),
            method: 'GET',
            params: this.$http.adornParams({
              'id': id,
            })
          }).then(({data}) => {
            this.twoClassList = data.data
          });
        }
      },
    }
</script>

<style scoped>
  .blue{
    color:#2A5AAC!important;
  }
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
