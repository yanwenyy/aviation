<template>
    <div class="memorabilia-body box-sizing">
      <div @click="$router.push({name:'memorabiliaDetail',query:{id:item.id} })" class="memorabilia-list pointer" v-for="item in list">
        <span class="inline-block ml-dot"></span>
        <div class="ml-msg inline-block">
          <div class="ml-date-show">
            {{item.releaseDate.split(" ")[0]}}
          </div>
          <div class="ml-line"></div>
          <div class="ml-msg-show">{{item.title}}</div>
        </div>
      </div>
      <Page v-if="pageStatus" :total="totalPage" :pageSize="pageSize" @pageClik="pageNumClick"></Page>
    </div>
</template>

<script>
  import Page from '../page'
    export default {
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
            url: this.$http.adornUrl(`/aviation/big/list`),
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
  .ml-msg-show{
    font-size:1.19rem;
    line-height:2.125rem;
    color:#333;
  }
  .ml-line{
    width:1.75rem;
    height:0.19rem;
    background: #B2131A;
    margin:0.94rem 0 0.625rem 0;
  }
  .ml-date-show{
    font-size:1.19rem;
    color:#2A5AAC;
  }
  .ml-dot{
    width:0.375rem;
    height:0.375rem;
    background: #2A5AAC;
    border-radius: 50%;
    vertical-align: top;
    margin-right:0.75rem;
    margin-top:0.44rem;
  }
  .memorabilia-list{
    margin-bottom:3.44rem;
    border-bottom: 1px solid #ddd;
    padding-bottom:1.25rem;
  }
  .memorabilia-body{
    padding:0.69rem 0;
  }
</style>
