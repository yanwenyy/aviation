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
    font-size:0.875rem;
    color:#2A5AAC;
    margin-top:1rem;
  }
  .notice-label>span{
    margin-right:1.25rem;
  }
  .ml-msg-show{
    font-size: 1.125rem;
    line-height:2.125rem;
    color:#333;
    margin-top:0.31rem;
  }
  .ml-line{
    width:1.75rem;
    height:0.19rem;
    background: #B2131A;
    margin:0.94rem 0 0.625rem 0;
  }
  .ml-date-show{
    font-size:1.19rem;
    color:#333;
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
