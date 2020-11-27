<template>
    <div class="detail-body">
      <div class="detail-body">
        <div class="dm-head">
          <div class="dmh-title">
            {{detail.title}}
          </div>
          <div class="dmh-date">
            <span>发表于：{{detail.createDate}}</span>
            <span class="white-space">空格</span>
            <span>发布人：{{detail.byUser}}</span>
          </div>
          <div class="dmh-foot">
            <div class="inline-block">
              <span class="inline-block lml-img-group">
                <img class="lml-img-group-ck" src="../../../static/img/list-ck.png" alt="">
                {{detail.lookNum}}
              </span>
              <span class="inline-block lml-img-group">
                <img class="lml-img-group-hf" src="../../../static/img/list-hf.png" alt="">
                {{detail.replyNum}}
              </span>
              <span class="inline-block lml-img-group">
                <img :src="detail.votesNum>0?'../../../static/img/list-zan-act.png':'../../../static/img/list-zan.png'" alt="">
                {{detail.supportNum}}
              </span>
              <span class="inline-block lml-img-group">
                <img src="../../../static/img/list-cai.png" alt="">
                {{detail.opposeNum}}
              </span>
            </div>
            <div class="inline-block">
              <span v-show="userMsg.userRole==1" @click="delStatus=true" class="inline-block dmh-foot-btn"><img src="../../../static/img/lt-detail-sc.png" alt="">删除</span>
              <span v-show="userMsg.id==detail.userId" @click="$router.push({name:'release',query:{id:id,jobModelId:jobModelId,edit:true}})" class="inline-block dmh-foot-btn"><img src="../../../static/img/lt-detail-xg.png" alt="">修改</span>
              <span @click="replyForm.id=detail.id,replyForm.status=1,scrollToSection()" class="inline-block dmh-foot-btn pointer"><img src="../../../static/img/lt-detail-hf.png" alt="">回复</span>
            </div>
          </div>
        </div>
        <div class="dm-msg box-sizing">
          <div class="detail-msg" v-html="detail.content"></div>
          <div v-for="item in detail.tbAnnexActions" class="detial-fj box-sizing">
            <img :src="path+getFileImg(item.fileOriginalName)" alt="" class="inline-block">
            <div class="inline-block">
              <div>{{item.fileOriginalName}}</div>
              <div @click="down(item.fileRealName,item.fileOriginalName)" class="down-fj pointer">立即下载</div>
            </div>
          </div>
          <div class="dm-zan-group">
            <!--<div class="inline-block dm-zan-group-btn">-->
              <!--<img src="../../../static/img/lt-detail-zt.png" alt="">-->
            <!--</div>-->
            <div class="inline-block dm-zan-group-btn">
              <img @click="goVote(1)" :src="detail.votesNum==0?'../../../static/img/lt-detail-zt-show.png':'../../../static/img/lt-detail-zt.png'" alt="">
              <div>支持 <span class="red">{{detail.supportNum}}票</span></div>
            </div>
            <div class="inline-block dm-zan-group-btn">
              <img @click="goVote(0)" src="../../../static/img/lt-detail-fd-show.png" alt="">
              <div>支持 <span class="blue">{{detail.opposeNum}}票</span></div>
            </div>
            <!--<div class="inline-block dm-zan-group-btn">-->
              <!--<img src="../../../static/img/lt-detail-fd.png" alt="">-->
            <!--</div>-->
          </div>
        </div>
      </div>
      <div class="detail-reply box-sizing">
        <div id="replyInput" class="reply-group">
          <textarea v-model="replyForm.content" class="reply-textarea box-sizing" name="" id="" cols="30" rows="10"></textarea>
          <div class="reply-foot">
            <div class="inline-block rf-fj">
              <span class="blue pointer inline-block">
                <span>上传附件</span>
                <input class="fileInput pointer" type="file"  ref="clearFile" @change="getFile($event)" multiple="multiplt" accept=".docx,.doc,.pdf">
              </span>
              <span class="white-space">空</span>
              <span class="blue pointer inline-block">
                <span>上传图片</span>
                <input :disabled="replyForm.imgList.length>2" class="fileInput pointer" type="file"  ref="clearImg" @change="getImg($event)" multiple="multiplt" accept="image/*">
              </span>
              <span class="white-space">1</span>
              <span class="reply-foot-notice"> 最多上传3张，单张不得超过100k</span>
            </div>
            <div class="inline-block">
              <span @click="replyForm.content=''" class="blue pointer">清空</span>
              <span @click="subReply()" class="sub-reply inline-block pointer">发布</span>
            </div>
          </div>
          <div class="reply-img">
            <div class="inline-block reply-img-list" v-for="item in replyForm.imgList">
              <img :src="imgUrlfront+item" alt="">
              <b @click="delImg(item)" class="del-reply-img pointer">X</b>
            </div>
          </div>
          <div v-for="item in replyForm.tbAnnexActions" class="detial-fj box-sizing">
            <img  :src="'../../../static/img/'+getFileImg(item.fileOriginalName)" alt="" class="inline-block">
            <div class="inline-block">
              <div>{{item.fileOriginalName}}</div>
              <div @click="delFj(item)" class="down-fj pointer">删除</div>
            </div>
          </div>
        </div>
        <div class="reply-msg">
          <div class="reply-msg-title">全部回复（{{replyList.length}}）</div>
          <div class="reply-msg-list" v-for="item in replyList">
            <div class="rml-name">
              <span>{{item.type=='2'?item.userName:'管理员'}}</span>
              <span class="white-space">1</span>
              <span v-show="item.author==1" class="blue">楼主</span>
            </div>
            <div class="rml-date">
              <div class="inline-block">{{showtime(item.careateDate)}}</div>
              <div class="inline-block">
                <span @click="replyForm.id=item.id,replyForm.status=2,scrollToSection()" class="pointer inline-block blue rml-date-btn">
                  <img src="../../../static/img/lt-detail-hf.png" alt="">
                  回复
                </span>
                <span @click="eidtReply(item)" v-show="item.ifSelf==1" class="inline-block blue rml-date-btn pointer">
                  <img src="../../../static/img/lt-detail-xg.png" alt="">
                  修改
                </span>
                <span v-show="userMsg.userRole==1" @click="delStatus=true,delId=item.id" class="inline-block red rml-date-btn pointer">
                  <img src="../../../static/img/lt-detail-sc-red.png" alt="">
                  删除
                </span>
              </div>
            </div>
            <div class="rml-msg">
              {{item.content}}
            </div>
            <div v-for="item in item.tbAnnexActions" class="detial-fj box-sizing">
              <img  :src="'../../../static/img/'+getFileImg(item.fileOriginalName)"  alt="" class="inline-block">
              <div class="inline-block">
                <div>{{item.fileOriginalName}}</div>
                <div @click="down(item.fileRealName,item.fileOriginalName)" class="down-fj pointer">立即下载</div>
              </div>
            </div>
            <div v-show="item.level==2" class="rml-reply box-sizing">
              <span class="rml-reply-name">@{{item.replyUserName}}：</span>
              <span class="rml-reply-msg inline-block" :style="item.replyMore?'height:auto':'height:64px'">
                {{item.pcontent}}
              </span>
              <div v-show="item.pcontent&&item.pcontent.length>150" class="blue pointer rml-reply-more" @click="item.replyMore=!item.replyMore">  {{item.replyMore?'收起':'查看全部'}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="delStatus" class="shadow">
        <div class="password-model box-sizing">
          <div class="reply-title pm-title" style="text-align: center">提示</div>
          <div>
            确定要删除此条内容吗
          </div>
          <div class="sub-footer">
            <div @click="delStatus=false" class="pointer inline-block">取消</div>
            <div @click="del()" class="sub-password pointer inline-block">确定</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {getFileImg} from "../../utils/public"
    export default {
      data(){
          return{
            path:window.path,
            delStatus:false,
            delId:'',
            imgUrlfront:this.$http.adornUrl('/jinding/showImg/'),
            replyList:[
              {
                name:'111',
                msg:'22222',
                replyMore:false
              },
              {
                name:'111',
                msg:'22222',
                replyMore:false
              }
            ],
            userMsg:{},
            id:'',
            jobModelId:'',
            detail:{},
            replyForm:{
              tbAnnexActions:[],
              imgList:[],
              content:'',
              id:'',
              status:'1'
            },
          }
      },
      mounted(){
        this.id=this.$route.query.id;
        this.jobModelId=this.$route.query.jobModelId;
        this.getDetail();
        this.getDiscuss();
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
        del(){
          if(this.delId!=''){
            this.delReply();
          }else{
            this.delTheme();
          }
        },
          //删除主题
        delTheme(){
          this.$http({
            url: this.$http.adornUrl('/front/jobmodel/theme/delete/'+this.detail.id),
            method: 'GET'
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.$Message.success({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.$router.go(-1)
                }
              })
            } else {
              this.$Message.error(data.msg)
            }
          })
        },
        //删除回复
        delReply(item){
          this.$http({
            url: this.$http.adornUrl('/front/discuss/vote/del/'+this.delId),
            method: 'GET'
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.$Message.success({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.delStatus=false;
                  this.delId='';
                  this.getDiscuss();
                }
              })
            } else {
              this.$Message.error(data.msg)
            }
          })
        },
        //下载附件
        down (name,realName){
          var url='/jinding/download/'+name+'?fileName='+realName;
          window.open(this.$http.adornUrl(url));
        },
        getDetail(){
          this.$http({
            url: this.$http.adornUrl(`/front/jobmodel/theme/info/${this.id}`),
            method: 'GET',
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.detail=data.data;
            }
          })
        },
        getDiscuss(){
          this.$http({
            url: this.$http.adornUrl(`/front/discuss/vote/discuss/list`),
            method: 'GET',
            params: this.$http.adornParams({
              'pageNum': 1,
              'pageSize': 100000,
              'id': this.id,
            })
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.replyList=data.data;
            }
          })
        },
        //时间格式转换
        showtime(time) {
          let date =
            typeof time === "number"
              ? new Date(time)
              : new Date((time || "").replace(/-/g, "/"));
          let diff = (new Date().getTime() - date.getTime()) / 1000;
          let dayDiff = Math.floor(diff / 86400);

          let isValidDate =
            Object.prototype.toString.call(date) === "[object Date]" &&
            !isNaN(date.getTime());

          if (!isValidDate) {
            // window.console.error("不是有效日期格式");
          }
          const formatDate = function(date) {
            let today = new Date(date);
            let year = today.getFullYear();
            let month = ("0" + (today.getMonth() + 1)).slice(-2);
            let day = ("0" + today.getDate()).slice(-2);
            let hour = today.getHours();
            let minute = today.getMinutes();
            let second = today.getSeconds();
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
          };
          //小于0或者大于等于31显示原时间
          if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
            return formatDate(date);
          }
          return (
            (dayDiff === 0 &&
              ((diff < 60 && "刚刚") ||
                (diff < 120 && "1分钟前") ||
                (diff < 3600 && Math.floor(diff / 60) + "分钟前") ||
                (diff < 7200 && "1小时前") ||
                (diff < 86400 && Math.floor(diff / 3600) + "小时前"))) ||
            (dayDiff === 1 && "昨天") ||
            (dayDiff < 7 && dayDiff + "天前") ||
            (dayDiff < 31 && Math.ceil(dayDiff / 7) + "周前")
          );
        },
        //锚点跳转
        scrollToSection() {
          let section = document.getElementById('replyInput');
          if (section) {
            section.scrollIntoView()
          }
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
                   this.replyForm.tbAnnexActions.push(i);
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
          this.replyForm.tbAnnexActions.remove(i)
        },
        // 上传图片
        getImg(event){
          var file = event.target.files;
          for(var i = 0;i<file.length;i++){
            //    上传类型判断
            var imgName = file[i].name;
            var idx = imgName.lastIndexOf(".");
            if (idx != -1){
              var ext = imgName.substr(idx+1).toUpperCase();
              ext = ext.toLowerCase( );
              console.log(ext)
              var _file=file[i];
              var formData = new FormData();
              formData.append("file", _file);
              this.$http({
                url: this.$http.adornUrl(`/jinding/file/upload`),
                method: 'POST',
                data: formData
              }).then(({data}) => {
                if (data && data.code === 10000) {
                  this.replyForm.imgList.push(data.data)
                } else {
                  this.$Message.error(data.msg)
                }
              });
            }else{

            }
          }
        },
        //删除图片
        delImg(i){
          this.replyForm.imgList.remove(i)
        },
        //提交评论
        subReply(){
          this.$http({
            url: this.$http.adornUrl(`/front/discuss/vote/save`),
            method: 'POST',
            data: this.$http.adornData({
              'content': this.replyForm.content,
              'id': this.replyForm.id||this.detail.id,
              'img': this.replyForm.imgList!=''?this.replyForm.imgList.join(','):'',
              'status': this.replyForm.status,
              'tbAnnexActions': this.replyForm.tbAnnexActions,
            })
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.replyForm={
                tbAnnexActions:[],
                imgList:[],
                content:'',
                id:'',
                status:'1'
              };
              this.getDiscuss();
            } else {
              this.$Message.error(data.msg)
            }
          })
        },
        //投票和反对
        goVote(type){
          this.$http({
            url: this.$http.adornUrl(`/front/discuss/vote/votes/save`),
            method: 'POST',
            data: this.$http.adornData({
              'id': this.detail.id,
              'modelId': this.id,
              'type': type,
              'userId': this.userMsg.userId,
            })
          }).then(({data}) => {
            if (data && data.code === 10000) {
              this.$Message.success({
                message: '投票成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDetail();
                }
              })
            } else {
              this.$Message.error(data.msg)
            }
          })
        },
        //修改回复
        eidtReply(val){
          // this.replyForm={
          //   tbAnnexActions:val.tbAnnexActions,
          //   imgList:val.img&&val.img!=''?val.img.split(','):[],
          //   content:val.content,
          //   id:val.id,
          //   status:'2'
          // };
          this.replyForm.id=val.id;
          this.replyForm.status=2;
          this.replyForm.content=val.content;
          this.scrollToSection();
        }
      }
    }
</script>

<style scoped>
  .sub-footer{
    text-align: center;
    margin:0.94rem auto 0 auto;
  }
  .sub-footer>div{
    width:6.25rem;
    height:3.125rem;
    line-height:3.125rem;
    text-align: center;
    background: #999999;
    font-size:1rem;
    color:#fff;
  }
  .sub-password{
    background: #2A5AAC!important;
    margin-left:1.875rem;
  }
  .pm-title{
    margin-bottom:1.25rem;
    font-size: 1.125rem;
    color: #333;
    font-weight: bold;
  }
  .password-model{
    width:32.19rem;
    height:auto;
    background: #fff;
    margin: 8% auto;
    border-radius:0.25rem;
    position: relative;
    padding:3.31rem 2.94rem;
    font-size:0.94rem;
    line-height:1.5rem;
  }
  .fileInput{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
    z-index: 999;
  }
  .rml-reply-more{
   text-align: right;
  }
  .rml-reply-msg{
    overflow: hidden;
  }
  .rml-reply-name{
    font-weight: bold;
    vertical-align: top;
  }
  .rml-reply{
    width: 100%;
    background: #F6F6F6;
    border: 1px solid #E5E5E5;
    font-size:1rem;
    color:#666;
    line-height:1.5rem;
    padding: 1.625rem;
  }
  .rml-msg{
    font-size:1rem;
    line-height:1.5rem;
    margin-bottom: 1.625rem;
  }
  .rml-date-btn{
    margin-left:1.94rem;
  }
  .rml-date-btn>img{
    width:1.06rem;
    height:1.06rem;
    min-width:1.06rem;
    min-height:1.06rem;
    vertical-align: middle;
    margin-top: -0.19rem;
  }
  .rml-date{
    font-size:0.94rem;
    color: #999;
    display: flex;
    justify-content: space-between;
    margin-bottom:1.32rem;
  }
  .rml-name>.blue{
    font-size:0.94rem;
    font-weight: normal;
  }
  .rml-name{
    font-size: 1.125rem;
    color:#333;
    font-weight: bold;
    margin-bottom:0.875rem;
  }
  .reply-msg-list{
    margin-top:2.31rem;
    padding-bottom:2.75rem;
    border-bottom: 1px solid #eee;
  }
  .reply-msg-title{
    font-size:1.25rem;
    font-weight: bold;
    color: #333;
    margin-top: 69px;
  }
  .del-reply-img{
    width:1.875rem;
    height:1.875rem;
    border-radius: 50%;
    line-height:1.875rem;
    text-align: center;
    font-size:1.25rem;
    color: #fff;
    background: #A11727;
    position: absolute;
    top:0;
    right:0.375rem;
  }
  .reply-img-list{
    width:12.69rem;
    height:10.06rem;
    position: relative;
    margin-right:0.875rem;
    background: #eee;
  }
  .reply-img-list{
    margin-bottom:2.125rem;
    margin-top:1.25rem;
  }
  .reply-img-list>img{
    width: 100%;
    height: 100%;
  }
  .rf-fj{
    margin-top:0.69rem;
  }
  .rf-fj>span{
    position: relative;
  }
  .sub-reply{
    width:6.69rem;
    height:2.44rem;
    line-height:2.44rem;
    color:#fff;
    text-align: center;
    background: #2A5AAC;
    margin-left:0.69rem;
  }
  .reply-foot-notice{
    font-size:0.875rem!important;
    color:#999;
  }
  .reply-foot{
    display: flex;
    justify-content: space-between;
    font-size:1rem;
    vertical-align: middle;
  }
  .reply-textarea{
    width: 100%;
    height:8.5rem;
    background: #F4F4F4;
    border:1px solid #DDDDDD;
    border-radius:0.25rem;
    font-size:1rem;
    padding:1.5rem 1.375rem;
    margin-bottom:1rem;
  }
  .detail-reply{
    background: #fff;
    padding:3.125rem 2.69rem;
  }
  .dm-zan-group-btn>img{
    width:4.06rem;
    height:4.06rem;
    min-width:4.06rem;
    min-height:4.06rem;
    margin-bottom:1.19rem;
    vertical-align: top;
  }
  .dm-zan-group-btn{
    margin-right:3.56rem;
    vertical-align: top;
  }
  .dm-zan-group{
    text-align: center;
    font-size:0.94rem;
  }
  .red{
    color:#C41313;
  }
  .blue{
    color:#2A5AAC;
  }
  .dm-msg{
    padding:2.44rem 2.31rem;
  }
  .dmh-foot-btn>img{
    /*min-width:1.06rem;*/
    /*min-height:1.06rem;*/
    width:1.06rem!important;
    height:1.06rem;
    vertical-align: middle;
    margin-right:0.44rem;
    margin-top: -2px;
  }
  .dmh-foot-btn{
    width:6.125rem;
    height:2rem;
    line-height:2rem;
    text-align: center;
    font-size:0.94rem;
    color:#2A5AAC;
    background: #E7F1FB;
    border: 1px solid #A9C0E8;
    border-radius:0.125rem;
    margin-right:0.75rem;
  }
  .dmh-foot{
    display: flex;
    justify-content: space-between;
  }
  .dmh-date{
    font-size: 1.125rem;
    color: #666;
    margin-bottom:2.44rem;
  }
  .dmh-title{
    font-size:1.44rem;
    color:#343434;
    font-weight: bold;
    line-height:2.25rem;
    margin-bottom:0.82rem;
  }
  .lml-img-group{
    font-size:1.06rem;
    margin-right:1.25rem;
  }
  .lml-img-group>img{
    width:1rem;
    height: 1.125rem;
    vertical-align: middle;
    margin-top: -0.31rem;
  }
  .lml-img-group-ck{
    width: 1.125rem!important;
    height:0.82rem!important;
  }
  .lml-img-group-hf{
    width: 1.125rem!important;
    height: 1.125rem!important;
  }
  .detail-body{
    background: #fff;
    margin-bottom:1.06rem;
    padding-bottom:4.19rem;
  }
  .dm-head{
    padding:2.19rem 2.5rem;
    border-bottom: 1px solid #eee;
  }
</style>
