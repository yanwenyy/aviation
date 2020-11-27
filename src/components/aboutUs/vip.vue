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
    /*column-width:17.94rem;*/
    /*column-gap:1.25rem;*/
    margin-top:2.5rem;
    margin-bottom:5.69rem;
  }
  .vip-list::after{
    display: table;
    content: '';
    clear: both;
  }
  .vip-list>div{
    width:17.94rem;
    height:5.75rem;
    text-align: center;
    background: #2A5AAC;
    color:#fff;
    font-size: 1.125rem;
    margin-bottom:1.69rem;
    padding:1.875rem;
    float: left;
    margin-right:1.06rem;
    /*-webkit-column-break-inside: avoid;*/
    /*page-break-inside: avoid;*/
    /*break-inside: avoid;*/
  }
  .vip-title{
    text-align: center;
  }
  .vip-title-one{
    font-size:1.375rem;
    font-weight: bold;
    color: #343434;
    margin-bottom:1rem;
    margin-top:1.56rem;
  }
  .vip-title-two{
    font-size: 1.125rem;
    color:#2A5AAC;
    opacity: 0.34;
  }
  @media screen and (max-width:900px) {
    .vip-list>div{
      width: 80%;
      margin: 0.5rem auto;
    }
  }
</style>
