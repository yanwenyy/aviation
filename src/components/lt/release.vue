<template>
    <div>
      <div class="release-body">
        <div class='release-title'>发布主题</div>
        <div class="release-msg">
          <div class="release-title-two">请输入标题</div>
          <input v-model="title" class="release-input box-sizing" type="text" placeholder="请输入标题">
          <div class="release-title-two">请输入内容</div>
          <UEditor  class="editor" :contentUrl='"/biz/trpolicyoriginal/info/"'  :id='"editor_tr_original"' :index="0" :econtent="content" :modelname="'tr_original'" @func="editorContent" ></UEditor>
          <div class="release-title-two">请上传附件</div>
          <div class="release-fj-btn">
            <div class="rfb-plus">+</div>
            <div>上传附件</div>
            <input class="fileInput pointer" type="file"  ref="clearFile" @change="getFile($event)" multiple="multiplt" accept=".docx,.doc,.pdf">
          </div>
          <div v-for="item in tbAnnexActions" class="detial-fj box-sizing">
            <img src="" alt="" class="inline-block">
            <div class="inline-block">
              <div>{{item.fileOriginalName}}</div>
              <div @click="delFj(item)" class="down-fj pointer">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="release-btn">
        <div class="inline-block pointer" @click="$router.push({name:'lt'})">返回</div>
        <div class="inline-block pointer sub-release" @click="sub">保存</div>
      </div>
    </div>
</template>

<script>
  import UEditor from '@/components/ueditor/ueditor.vue'
    export default {
        name: "release",
      components: {
        UEditor
      },
      data(){
          return{
            childModelId:'',
            jobModelId:'',
            dataForm:{},
            title:'',
            content:'',
            tbAnnexActions:[],
          }
      },
      mounted(){
        this.childModelId=this.$route.query.id;
        this.jobModelId=this.$route.query.jobModelId;
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
            url: this.$http.adornUrl(`/front/jobmodel/theme/save`),
            method: 'POST',
            data: this.$http.adornData({
              'childModelId':this.childModelId,
              'jobModelId':this.jobModelId,
              'title': this.title,
              'content': this.content,
              'tbAnnexActions': this.tbAnnexActions,
            })
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.$Message.success({
                message: '发布成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.$router.push({name:'lt'});
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
    width: 180px;
    height: 50px;
    line-height: 50px;
    background: #D2D2D2;
    color:#666666;
  }
  .sub-release{
    background: #2A5AAC!important;
    color:#fff!important;
    margin-left: 89px;
  }
  .release-btn{
    font-size: 16px;
    text-align: center;
    margin-top: 58px;
  }
  .rfb-plus{
    width: 36px;
    height: 36px;
    font-size: 26px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    border-radius: 50%;
    background: #2A5AAC;
    margin: 39px auto 15px auto;
  }
  .release-fj-btn{
    width: 268px;
    height: 143px;
    background: #F2F2F2;
    text-align: center;
    position: relative;
    margin-bottom: 20px;
  }
  .release-fj-btn::before{
    display: table;
    content: '';
  }
  .editor{
    width: 90%;
  }
  .release-input{
    height: 55px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    background: #fff;
    font-size: 18px;
    padding-left: 28px;
    width: 90%;
  }
  .release-title-two{
    font-size: 18px;
    color:#333;
    font-weight: bold;
    margin: 42px 0 29px 0;
  }
  .release-msg{
    padding-left: 40px;
    padding-bottom: 49px;
  }
  .release-msg::after{
    display: table;
    content: '';
  }
  .release-title{
    height: 81px;
    line-height: 81px;
    border-bottom: 1px solid #eee;
    padding-left: 37px;
    font-size: 24px;
    font-weight: bold;
    color:#333;
  }
  .release-body{
    background: #fff;
  }
</style>
