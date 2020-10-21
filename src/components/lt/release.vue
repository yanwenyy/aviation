<template>
    <div>
      <div class="release-body">
        <div class='release-title'>发布主题</div>
        <div class="release-msg">
          <div class="release-title-two">请输入标题</div>
          <input class="release-input box-sizing" type="text" placeholder="请输入标题">
          <div class="release-title-two">请输入内容</div>
          <UEditor  class="editor" :contentUrl='"/biz/trpolicyoriginal/info/"'  :id='"editor_tr_original"' :index="0" :econtent="dataForm.content" :modelname="'tr_original'" @func="editorContent" ></UEditor>
          <div class="release-title-two">请上传附件</div>
          <div class="release-fj-btn">
            <div class="rfb-plus">+</div>
            <div>上传附件</div>
          </div>
        </div>
      </div>
      <div class="release-btn">
        <div class="inline-block pointer" @click="$router.push({name:'lt'})">返回</div>
        <div class="inline-block pointer sub-release">保存</div>
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
            dataForm:{}
          }
      },
      methods:{
        //获取富文本内容
        editorContent(modelname,index,content){
          console.log(modelname)
          this.dataForm.content=content
        },
      }
    }
</script>

<style scoped>
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
