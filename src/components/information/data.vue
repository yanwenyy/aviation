<template>
  <div>
    <div v-show="tagId" class="notice-label-group box-sizing">
      #{{tagName}}
    </div>
    <div class="data-class">
        <div ref="dataHead" class="data-class-group" :class="moreMsg=='收起'?'data-class-group-show':'  '">
          <div class="data-class-list" v-for="(item,index) in relationList">
            <div class="inline-block data-class-name">{{item.name}}：</div>
            <div class="data-class-tab-group inline-block">
              <!--<div class="inline-block data-class-tab pointer" @click="sleRelation('不限',item.childClassLevel),item.levelName='不限'" :class="item.levelName=='不限'||!item.levelName?'data-class-tab-act':''">不限</div>-->
              <!--<div class="inline-block data-class-tab pointer"  v-for="i in item.childClassLevel"  @click="sleRelation(i.id,index),item.levelName=item.name" :class="relationCheck.indexOf(i.id)!=-1?'data-class-tab-act':''">{{i.name}}</div>-->
              <div class="inline-block data-class-tab pointer" @click="sleRelation('不限',index),item.levelName='不限'" :class="item.checkBox==false?'data-class-tab-act':''">不限</div>
              <div class="inline-block data-class-tab pointer"  v-for="i in item.childClassLevel"  @click="sleRelation(i.id,index),item.levelName=item.name" :class="item.checkBox==i.id?'data-class-tab-act':''">{{i.name}}</div>
            </div>
          </div>
        </div>
        <div v-show="dataHeadHeight>216" class="data-class-more pointer" @click="moreMsg=='更多选项'?moreMsg='收起':moreMsg='更多选项'">
          {{moreMsg}} <img src="../../../static/img/more-down.png" alt="">
        </div>
    </div>
    <div v-for="item in list" class="data-list box-sizing pointer"  @click="$router.push({name:'dataDetail',query:{id:item.id,type:2} })">
      <div class="data-list-title">{{item.title}}</div>
      <div class="data-list-date">{{item.insertTime.split(" ")[0]}}</div>
      <div class="data-list-line"></div>
      <div class="data-list-msg">
        <div>{{item.preface}}</div>
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
          relationTab:[],
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
            var datas=data.data,i=0,len=datas.length;
            for(;i<len;i++){
              datas[i].checkBox=false;
            }
            this.relationList=datas;
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
          // var clssLevel=this.relationList.map(item => {
          //   if(item.checkBox!=false){
          //     return item.checkBox
          //   }
          // });
          var clssLevel=[];
          for(var i=0;i<this.relationList.length;i++){
            if(this.relationList[i].checkBox!=false){
              clssLevel.push(this.relationList[i].checkBox)
            }
          }
          this.$http({
            url: this.$http.adornUrl(`/aviation/material/list`),
            method: 'GET',
            params: this.$http.adornParams({
              'pageNum': this.pageIndex,
              'pageSize': this.pageSize,
              'tagId': this.tagId,
              'clssLevel': clssLevel.join(','),
              // 'clssLevel': this.relationCheck.join(','),
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
        sleRelation(e,list){
          if(e=='不限'){
            this.relationList[list].checkBox=false;
           var i=0,len=list.length;
           for(;i<len;i++){
             var _id=list[i].id;
             if(this.relationCheck.indexOf(_id)!=-1){
               this.relationCheck.remove(_id)
             }
           }
          }else{
            if(this.relationCheck.indexOf(e)!=-1){
              this.relationCheck.remove(e);
              this.relationList[list].checkBox=e
            }else{
              this.relationCheck.push(e);
              this.relationList[list].checkBox=e;
            }
          }
          this.getList();
        }
      }
    }
</script>

<style scoped>
  .data-list-label>div{
    margin-right:0.625rem;
  }
  .data-list-label{
    font-size:0.82rem;
    color:#2A5AAC;
    margin-top:0.625rem;
  }
  .data-list-msg{
    font-size:0.94rem;
    line-height:1.69rem;
    max-height:4.375rem;
    height: auto;
    overflow: hidden;
  }
  .data-list-line{
    width:1.69rem;
    height:0.125rem;
    background: #eee;
    margin:1rem 0 0.625rem;
  }
  .data-list-date{
    font-size:0.94rem;
    color:#999;
  }
  .data-list-title{
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom:0.94rem;
    color:#333;
  }
  .data-list{
    border: 1px solid #EEEEEE;
    padding:2.44rem 1.81rem;
    margin-bottom:1rem;
  }
  .data-class-group{
    height:11.25rem;
    overflow: hidden;
  }
  .data-class-group-show{
    height: auto;
  }
  .data-class-more>img{
    width:1.25rem;
    height: auto;
    vertical-align: middle;
  }
  .data-class-more{
    text-align: center;
    font-size:0.94rem;
    color:#999;
    margin-top:1.25rem;
    margin-bottom:2.25rem;
  }
  .data-class{
    margin-top:1.19rem;
  }
  .data-class-tab-act{
    font-size:1.06rem!important;
    color:#2A5AAC!important;
  }
  .data-class-tab{
    color: #333;
    margin-right:2.06rem;
    margin-bottom:1.32rem;
  }
  .data-class-list{
    /*margin-bottom:2rem;*/
    font-size:1rem;
    color:#666;
  }
  .data-class-name{
    /*width: 15%;*/
    margin-right:1.81rem;
    vertical-align: top;
    font-size:1rem;
    color:#333;
    font-weight: bold;
  }
  .data-class-tab-group{
    /*width: 80%;*/
  }
</style>
