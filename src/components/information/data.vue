<template>
  <div>
    <div v-show="tagId" class="notice-label-group box-sizing">
      #{{tagName}}
    </div>
    <div class="data-class">
        <div ref="dataHead" class="data-class-group" :class="moreMsg=='收起'?'data-class-group-show':'  '">
          <div class="data-class-list" v-for="item in relationList">
            <div class="inline-block data-class-name">{{item.name}}：</div>
            <div class="data-class-tab-group inline-block">
              <div class="inline-block data-class-tab pointer"  v-for="i in item.childClassLevel"  @click="sleRelation(i.id)" :class="relationCheck.indexOf(i.id)!=-1?'data-class-tab-act':''">{{i.name}}</div>
            </div>
          </div>
        </div>
        <div v-show="dataHeadHeight>216" class="data-class-more pointer" @click="moreMsg=='更多选项'?moreMsg='收起':moreMsg='更多选项'">
          {{moreMsg}} <img src="../../../static/img/more-down.png" alt="">
        </div>
    </div>
    <div v-for="item in list" class="data-list box-sizing pointer"  @click="$router.push({name:'dataDetail',query:{id:item.id,type:2} })">
      <div class="data-list-title">{{item.title}}</div>
      <div class="data-list-date">{{item.insertTime}}</div>
      <div class="data-list-line"></div>
      <div class="data-list-msg">
        <div v-html="item.content"></div>
      </div>
      <div class="data-list-label">
        <div v-for="i in item.tagEntities" class="inline-block" @click.stop="tagName=i.tagName,getTagList(i.tagId)">#{{i.tagName}}</div>
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
          moreMsg:'更多选项',
          relationList:'',
          relationCheck:[],
          dataHeadHeight:0,
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
        //关联列表
        this.$http({
          url: this.$http.adornUrl('/aviation/select/list'),
          method: 'GET',
        }).then(({data}) => {
          if (data && data.code === 10000) {
            this.relationList=data.data;
            this.dataHeadHeight=this.$refs.dataHead.offsetHeight;
          }
        })
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
            url: this.$http.adornUrl(`/aviation/material/list`),
            method: 'GET',
            params: this.$http.adornParams({
              'pageNum': this.pageIndex,
              'pageSize': this.pageSize,
              'tagId': this.tagId,
              'clssLevel': this.relationCheck.join(','),
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
        },
        //关联级别点击
        sleRelation(e){
          if(this.relationCheck.indexOf(e)!=-1){
            this.relationCheck.remove(e)
          }else{
            this.relationCheck.push(e)
          }
          this.getList();
        }
      }
    }
</script>

<style scoped>
  .data-list-label>div{
    margin-right: 10px;
  }
  .data-list-label{
    font-size: 13px;
    color:#2A5AAC;
    margin-top: 10px;
  }
  .data-list-msg{
    font-size: 15px;
    line-height: 27px;
    height: 70px;
    overflow: hidden;
  }
  .data-list-line{
    width: 27px;
    height: 2px;
    background: #eee;
    margin: 16px 0 10px;
  }
  .data-list-date{
    font-size: 15px;
    color:#999;
  }
  .data-list-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .data-list{
    border: 1px solid #EEEEEE;
    padding:39px 29px;
    margin-bottom: 16px;
  }
  .data-class-group{
    height: 180px;
    overflow: hidden;
  }
  .data-class-group-show{
    height: auto;
  }
  .data-class-more>img{
    width: 20px;
    height: auto;
    vertical-align: middle;
  }
  .data-class-more{
    text-align: center;
    font-size: 15px;
    color:#999;
    margin-top: 20px;
    margin-bottom: 36px;
  }
  .data-class{
    margin-top: 19px;
  }
  .data-class-tab-act{
    font-size: 17px!important;
    color:#2A5AAC!important;
  }
  .data-class-tab{
    color: #333;
    margin-right: 33px;
    margin-bottom: 21px;
  }
  .data-class-list{
    /*margin-bottom: 32px;*/
    font-size: 16px;
    color:#666;
  }
  .data-class-name{
    /*width: 15%;*/
    margin-right: 29px;
    vertical-align: top;
  }
  .data-class-tab-group{
    /*width: 80%;*/
  }
</style>
