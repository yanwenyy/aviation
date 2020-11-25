<template>
  <div class="memorabilia-body box-sizing">
    <div v-show="tagId" class="notice-label-group box-sizing">
      #{{tagName}}
    </div>
    <div @click="$router.push({name:'noticeDetail',query:{id:item.id} })"  class="memorabilia-list pointer" v-for="item in list">
      <span class="inline-block ml-dot"></span>
      <div class="ml-msg inline-block">
        <div class="ml-date-show">
          {{item.insertTime.split(" ")[0]}}
        </div>
        <div class="ml-msg-show">{{item.title}}</div>
        <div class="notice-label"><span v-for="i in item.tagEntities"  @click.stop="tagName=i.tagName,getTagList(i.tagId)">#{{i.tagName}}</span></div>
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
        tagId:'',
        tagName:'',
      }
    },
    mounted(){
      this.tagId=this.$route.query.tagId||'';
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
          url: this.$http.adornUrl(`/aviation/notice/list`),
          method: 'GET',
          params: this.$http.adornParams({
            'pageNum': this.pageIndex,
            'pageSize': this.pageSize,
            'tagId': this.tagId,
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
      //获取标签集合列表
      getTagList(val){
        this.tagId=val;
        this.getList();
      }
    }
  }
</script>

<style scoped>
  .notice-label{
    font-size: 14px;
    color:#2A5AAC;
    margin-top: 16px;
  }
  .notice-label>span{
    margin-right: 20px;
  }
  .ml-msg-show{
    font-size: 18px;
    line-height: 34px;
    color:#333;
    margin-top: 5px;
  }
  .ml-line{
    width: 28px;
    height: 3px;
    background: #B2131A;
    margin: 15px 0 10px 0;
  }
  .ml-date-show{
    font-size: 19px;
    color:#333;
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
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  .memorabilia-body{
    padding: 11px 0;
  }
</style>
