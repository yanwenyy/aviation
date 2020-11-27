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
            <div>{{item.preface}}</div>
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
    font-size:0.875rem;
    color:#2A5AAC;
    margin-top:0.625rem;
  }
  .it-label>div{
    margin-right:1rem;
  }
  .it-msg{
    font-size:0.94rem;
    line-height:1.69rem;
    margin-top:1.25rem;
    color:#343434;
    /*max-height:4.375rem;*/
    /*height: auto;*/
    /*overflow: hidden;*/
  }
  .it-date{
    font-size:0.94rem;
    color:#999;
  }
  .it-source{
    display: flex;
    justify-content: space-between;
    font-size:0.875rem;
    color:#9A9A9A;
  }
  .it-title{
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom:0.625rem;
    line-height:1.81rem;
    color:#333;
  }
  .it-list-img{
    width:19.5rem;
    height: auto;
    vertical-align: top;
    margin-right:1.44rem;
  }
  .it-list{
    border: 1px solid #eee;
    padding:2.44rem 2.56rem;
    display: flex;
    justify-content: space-between;
    margin-bottom:1rem;
  }
  @media screen and (max-width:900px) {
    .it-list{
      display: block;
    }
    .it-list-img{
      width: 100%;
      height: auto;
      display: block;
    }
    .it-msg-show{
      display: block;
      width: 100%;
    }
    .it-source{
      display: block;
    }
    .it-date{
      display: block;
      margin-bottom:0.5rem;
    }
  }
</style>
