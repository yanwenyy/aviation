<template>
    <div>
      <div v-show="tagId" class="notice-label-group box-sizing">
        #{{tagName}}
      </div>
      <div v-for="item in list" class="it-list box-sizing pointer" @click="$router.push({name:'industryTrendsDetail',query:{id:item.id,type:2} })">
        <img v-if="item.coverImg" class="it-list-img"  :src="imgUrlfront+item.coverImg">
        <div class="inline-block" :class="item.coverImg?'it-msg-show':''">
          <div class="it-title">{{item.title}}</div>
          <div class="it-source">
            <div class="inline-block it-date">{{item.insertTime}}</div>
            <div class="inline-block">来源：{{item.source}}</div>
          </div>
          <div class="it-msg">
            <div>{{preface}}</div>
          </div>
          <div class="it-label">
            <div v-for="i in item.tagEntities" class="inline-block" @click.stop="tagName=i.tagName,getTagList(i.tagId)">#{{i.tagName}}</div>
          </div>
        </div>
      </div>
      <Page v-if="pageStatus" :total="totalPage" :pageSize="pageSize" @pageClik="pageNumClick"></Page>
    </div>
</template>

<script>
  import Page from '../page'
    export default {
      name: "industry-trends",
      components:{
        Page
      },
      data(){
        return{
          imgUrlfront:'',
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
        this.imgUrlfront=this.$http.adornUrl('/jinding/showImg/');
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
            url: this.$http.adornUrl(`/aviation/trend/list`),
            method: 'GET',
            params: this.$http.adornParams({
              'pageNum': this.pageIndex,
              'pageSize': this.pageSize,
              'type': 2,
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
  .it-msg-show{
    width: 60%;
  }
  .it-label{
    font-size: 14px;
    color:#2A5AAC;
    margin-top: 10px;
  }
  .it-label>div{
    margin-right: 16px;
  }
  .it-msg{
    font-size: 15px;
    line-height: 27px;
    margin-top: 20px;
    color:#343434;
    max-height: 70px;
    height: auto;
    overflow: hidden;
  }
  .it-date{
    font-size: 15px;
    color:#999;
  }
  .it-source{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color:#9A9A9A;
  }
  .it-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    line-height: 29px;
    color:#333;
  }
  .it-list-img{
    width: 312px;
    height: 218px;
    vertical-align: top;
    margin-right: 23px;
  }
  .it-list{
    border: 1px solid #eee;
    padding:39px 41px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
</style>
