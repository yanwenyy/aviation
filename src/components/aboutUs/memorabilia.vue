<template>
    <div class="memorabilia-body box-sizing">
      <div @click="$router.push({name:'memorabiliaDetail',query:{id:item.id} })" class="memorabilia-list pointer" v-for="item in list">
        <span class="inline-block ml-dot"></span>
        <div class="ml-msg inline-block">
          <div class="ml-date-show">
            {{item.releaseDate}}
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
    font-size: 19px;
    line-height: 34px;
  }
  .ml-line{
    width: 28px;
    height: 3px;
    background: #B2131A;
    margin: 15px 0 10px 0;
  }
  .ml-date-show{
    font-size: 19px;
    color:#2A5AAC;
  }
  .ml-dot{
    width: 6px;
    height: 6px;
    background: #2A5AAC;
    border-radius: 50%;
    vertical-align: top;
    margin-right: 12px;
    margin-top: 7px;
  }
  .memorabilia-list{
    margin-bottom: 55px;
  }
  .memorabilia-body{
    padding: 11px 0;
  }
</style>
