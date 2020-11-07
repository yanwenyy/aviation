<template>
    <div>
      <div class="vip-title">
        <div class="vip-title-one">会员展示</div>
        <div class="vip-title-two">MEMBER SHOW </div>
      </div>
      <div class="vip-list">
        <div v-for="item in list" class="inline-block box-sizing pointer" @click="$router.push({name:'vipDetail',query:{id:item.id} })">{{item.nameDes}}</div>
      </div>
      <Page v-if="pageStatus" :total="totalPage" :pageSize="pageSize" @pageClik="pageNumClick"></Page>
    </div>
</template>

<script>
  import Page from '../page'
    export default {
        name: "vip",
      components:{
        Page
      },
      data(){
        return{
          pageIndex: 1,
          pageSize: 10,
          totalPage: 0,
          pageStatus:false,
          list:[],
        }
      },
      mounted(){
        this.getList();
      },
      methods:{
        pageNumClick(val){
          // console.log("我是父组件的方法"+val)
          this.pageIndex=val;
          this.getList();
        },
        getList(){
          this.$http({
            url: this.$http.adornUrl(`/aviation/big/user/list`),
            method: 'GET',
            params: this.$http.adornParams({
              'pageNum': this.pageIndex,
              'pageSize': this.pageSize,
            })
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.list = data.data;
              this.totalPage = data.total;
              this.pageStatus=true;
            } else {
              this.list = [];
              this.totalPage = 0
            }
          })
        },
      }
    }
</script>

<style scoped>
  .vip-list{
    /*column-count: 3;*/
    /*column-width: 287px;*/
    /*column-gap: 20px;*/
    margin-top: 40px;
    margin-bottom: 91px;
  }
  .vip-list::after{
    display: table;
    content: '';
    clear: both;
  }
  .vip-list>div{
    width: 287px;
    height: 92px;
    text-align: center;
    background: #2A5AAC;
    color:#fff;
    font-size: 18px;
    margin-bottom: 27px;
    padding: 30px;
    float: left;
    margin-right: 17px;
    /*-webkit-column-break-inside: avoid;*/
    /*page-break-inside: avoid;*/
    /*break-inside: avoid;*/
  }
  .vip-title{
    text-align: center;
  }
  .vip-title-one{
    font-size: 22px;
    font-weight: bold;
    color: #343434;
    margin-bottom: 16px;
    margin-top: 25px;
  }
  .vip-title-two{
    font-size: 18px;
    color:#2A5AAC;
    opacity: 0.34;
  }
</style>
