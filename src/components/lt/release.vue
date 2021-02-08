<template>
    <div>
      <div class="release-body">
        <div class='release-title'>{{edit?'修改':'发布'}}主题</div>
        <div class="release-msg">
          <div class="release-title-two">请输入标题</div>
          <input v-model="title" class="release-input box-sizing" type="text" placeholder="请输入标题">
          <div class="release-title-two">请输入内容</div>
          <UEditor v-if="edit" :key="key" class="editor" :contentUrl='"/front/jobmodel/theme/info/"'  :id='"release"' :index="0"  :val="childModelId" :econtent="content" :modelname="'tr_original'" @func="editorContent" ></UEditor>
          <UEditor v-if="!edit" :key="key" class="editor" :id='"release2"' :index="0" :econtent="content" :modelname="'tr_original'" @func="editorContent" ></UEditor>
          <div class="release-title-two">请上传附件</div>
          <div class="release-fj-btn" v-show="userMsg.userRole==1||edit!='发布'" >
            <div class="rfb-plus">+</div>
            <div>上传附件</div>
            <input class="fileInput pointer" type="file"  ref="clearFile" @change="getFile($event)" multiple="multiplt" accept=".docx,.doc,.pdf">
          </div>
          <div v-for="item in tbAnnexActions" class="detial-fj box-sizing">
            <img :src="path+getFileImg(item.fileOriginalName)" alt="" class="inline-block">
            <div class="inline-block">
              <div>{{item.fileOriginalName}}</div>
              <div v-show="userMsg.userRole==1" @click="delFj(item)" class="down-fj pointer">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="release-btn">
        <div class="inline-block pointer" @click="$router.go(-1)">返回</div>
        <div class="inline-block pointer sub-release" @click="sub">保存</div>
      </div>
    </div>
</template>

<script>
  import {getFileImg} from "../../utils/public"
  import UEditor from '@/components/ueditor/ueditor.vue'
    export default {
        name: "release",
      components: {
        UEditor
      },
      data(){
          return{
            key: 0,
            path:window.path,
            childModelId:'',
            jobModelId:'',
            dataForm:{},
            title:'',
            content:'',
            tbAnnexActions:[],
            edit:false,
            userMsg:{}
          }
      },
      created(){
        this.childModelId=this.$route.query.id;
        this.jobModelId=this.$route.query.jobModelId;
        this.edit=this.$route.query.edit;
        if(this.edit){
          this.key=this.key+1;
          this.$http({
            url: this.$http.adornUrl(`/front/jobmodel/theme/info/${this.childModelId}`),
            method: 'GET',
          }).then(({data}) => {
            if (data && data.code === 10000) {
              var datas=data.data;
              this.title=datas.title;
              this.content=datas.content;
              var list=data.data.tbAnnexActions,i=0,len=list.length;
              this.fileList=[];
              if (len!= 0) {
                for (;i<len;i++) {
                  this.tbAnnexActions.push({
                    fileRealName: list[i].fileRealName,
                    fileOriginalName: list[i].fileOriginalName,
                    id: list[i].id
                  })
                }
              }
            }
          })
        }
        //获取用户信息
        this.$http({
          url: this.$http.adornUrl('/front/user/get/user'),
          method: 'POST',
        }).then(({data}) => {
          if (data && data.code === 10000) {
            this.userMsg=data.data;
          }
        });
      },
      methods:{
        getFileImg(val){
          return getFileImg(val)
        },
        //获取富文本内容
        editorContent(modelname,index,content){
          console.log(modelname)
          this.content=content
        },
        // 上传附件
        getFile(event){
          var file = event.target.files;
          for(var i = 0;i<file.length;i++){
            //    上传类型判断
            var imgName = file[i].name;
            var idx = imgName.lastIndexOf(".");
            if (idx != -1){
              var ext = imgName.substr(idx+1).toUpperCase();
              ext = ext.toLowerCase( );
              if (ext!='pdf' && ext!='doc' && ext!='docx'){
                this.$Message.error('请上传pdf、doc、docx格式的附件')
              }else{
                var _file=file[i];
                var formData = new FormData();
                formData.append("file", _file);
                this.$http({
                  url: this.$http.adornUrl(`/jinding/file/upload`),
                  method: 'POST',
                  data: formData
                }).then(({data}) => {
                  if (data && data.code === 10000) {
                    var i={
                      fileOriginalName: _file.name,
                      fileRealName:data.data
                    };
                    this.tbAnnexActions.push(i);
                  } else {
                    this.$Message.error(data.msg)
                  }
                });

              }
            }else{

            }
          }
        },
        //删除附件
        delFj(i){
          this.tbAnnexActions.remove(i)
        },
        sub(){
          this.$http({
            url: this.$http.adornUrl(`/front/jobmodel/theme/${this.edit?'update':'save'}`),
            method: 'POST',
            data: this.$http.adornData({
              'childModelId':this.childModelId,
              'jobModelId':this.jobModelId,
              'title': this.title,
              'content': this.content,
              'tbAnnexActions': this.tbAnnexActions,
              'id':this.edit?this.childModelId:''
            })
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.$Message.success({
                message: this.edit?'修改成功':'发布成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  if(this.edit){
                    this.$router.push({name:'ltListDetail',query:{id:this.childModelId,jobModelId:this.jobModelId} });
                  }else{
                    this.$router.push({name:'ltList',query:{id:this.childModelId,jobModelId:this.jobModelId} });
                  }

                }
              })
            } else {
              this.$Message.error(data.msg)
            }
          })
        },
      }
    }
</script>

<style scoped>
  .fileInput{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
    z-index: 999;
  }
  .release-btn>div{
    width:11.25rem;
    height:3.125rem;
    line-height:3.125rem;
    background: #D2D2D2;
    color:#666666;
  }
  .sub-release{
    background: #2A5AAC!important;
    color:#fff!important;
    margin-left:5.56rem;
  }
  .release-btn{
    font-size:1rem;
    text-align: center;
    margin-top:3.625rem;
  }
  .rfb-plus{
    width:2.25rem;
    height:2.25rem;
    font-size: 1.625rem;
    color: #fff;
    text-align: center;
    line-height:2.25rem;
    border-radius: 50%;
    background: #2A5AAC;
    margin:2.44rem auto 0.94rem auto;
  }
  .release-fj-btn{
    width:16.75rem;
    height:8.94rem;
    background: #F2F2F2;
    text-align: center;
    position: relative;
    margin-bottom:1.25rem;
  }
  .release-fj-btn::before{
    display: table;
    content: '';
  }
  .editor{
    width: 90%;
  }
  .release-input{
    height:3.44rem;
    border: 1px solid #DDDDDD;
    border-radius:0.25rem;
    background: #fff;
    font-size: 1.125rem;
    padding-left:1.75rem;
    width: 90%;
  }
  .release-title-two{
    font-size: 1.125rem;
    color:#333;
    font-weight: bold;
    margin:2.625rem 0 1.81rem 0;
  }
  .release-msg{
    padding-left:2.5rem;
    padding-bottom:3.06rem;
  }
  .release-msg::after{
    display: table;
    content: '';
  }
  .release-title{
    height:5.06rem;
    line-height:5.06rem;
    border-bottom: 1px solid #eee;
    padding-left:2.31rem;
    font-size:1.5rem;
    font-weight: bold;
    color:#333;
  }
  .release-body{
    background: #fff;
  }
</style>
