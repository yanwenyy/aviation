<template>
  <div>
    <script :id="id" type="text/plain" ></script>
  </div>
</template>

<script>
  import baseUrl from "@/assets/config/env";
  export default {
    name: "UEditor",
    props: {
      id: {
        type: String
      },
      index: {
        type: Number
      },
      econtent:{
        type: String
      },
      modelname:{
        type: String
      },
      val:{
        type: Number
      },
      url:{
        type: String
      },
      contentUrl:{
        type: String
      }
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      var token=localStorage.getItem("token")||sessionStorage.getItem("token");
      //初始化UE
      const _this = this;
      this.editor = UE.delEditor(this.id);
      this.editor = UE.getEditor(this.id,{
        serverUrl: baseUrl.httpUrl+"/ueditor/exec?token="+token
      });

      this.editor.ready(function() {
        if(_this.val!=null&&_this.val!=undefined){
          // _this.$emit('ready', _this.editor);
          _this.$http({
            url: _this.$http.adornUrl(_this.contentUrl+_this.val),
            method: 'get',
            params: _this.$http.adornParams()
          }).then(({data}) => {
            if((data.code==200||data.code==10000)&&data.data!=null){
              _this.editor.setContent( data.data.content);
            }
          });
        }
        if(_this.econtent!=null&&_this.econtent!=undefined&&_this.econtent!=""){_this.editor.setContent( _this.econtent)}

      });
      this.editor.addListener("contentChange",function(){
        var html=_this.editor.getContent()
        _this.$emit('func',_this.modelname,_this.index,html)
      })
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      getUEContent: function(){
        return this.editor.getContent();
      },
      getContentTxt: function(){
        return this.editor.getContentTxt();
      }
    }
  }
</script>
