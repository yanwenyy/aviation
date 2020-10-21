<template>
    <div class="detail-body">
      <div class="detail-msg">
        <div class="dm-head">
          <div class="dmh-title">
            电动航空时代真的要来了？当地时间10日10点22分，世界上第一架全电动商用 机场完成了首次试飞。
          </div>
          <div class="dmh-date">
            <span>发表于：2020.10.23 10:00:00</span>
            <span class="white-space">空格</span>
            <span>发布人：刘德华</span>
          </div>
          <div class="dmh-foot">
            <div class="inline-block">
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                121
              </span>
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                121
              </span>
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                121
              </span>
              <span class="inline-block lml-img-group">
                <img src="" alt="">
                121
              </span>
            </div>
            <div class="inline-block">
              <span class="inline-block dmh-foot-btn"><img src="" alt="">删除</span>
              <span class="inline-block dmh-foot-btn"><img src="" alt="">修改</span>
              <span class="inline-block dmh-foot-btn"><img src="" alt="">回复</span>
            </div>
          </div>
        </div>
        <div class="dm-msg box-sizing">
          <div class="dm-html"></div>
          <div class="detial-fj box-sizing">
            <img src="" alt="" class="inline-block">
            <div class="inline-block">
              <div>调整城镇土地使用税和申报表单.pdf</div>
             <div class="down-fj pointer">立即下载</div>
            </div>
          </div>
          <div class="dm-zan-group">
            <div class="inline-block dm-zan-group-btn">
              <img src="" alt="">
              <div>支持 <span class="red">113票</span></div>
            </div>
            <div class="inline-block dm-zan-group-btn">
              <img src="" alt="">
              <div>支持 <span class="blue">113票</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-reply box-sizing">
        <div class="reply-group">
          <textarea class="reply-textarea box-sizing" name="" id="" cols="30" rows="10"></textarea>
          <div class="reply-foot">
            <div class="inline-block rf-fj">
              <span class="blue">上传附件</span>
              <span class="white-space">空</span>
              <span class="blue">上传图片</span>
              <span class="white-space">1</span>
              <span class="reply-foot-notice"> 最多上传3张，单张不得超过100k</span>
            </div>
            <div class="inline-block">
              <span class="blue">清空</span>
              <span class="sub-reply inline-block">发布</span>
            </div>
          </div>
          <div class="reply-img">
            <div class="inline-block reply-img-list">
              <img src="" alt="">
              <b class="del-reply-img">X</b>
            </div>
          </div>
          <div class="detial-fj box-sizing">
            <img src="" alt="" class="inline-block">
            <div class="inline-block">
              <div>调整城镇土地使用税和申报表单.pdf</div>
             <div class="down-fj pointer">立即下载</div>
            </div>
          </div>
        </div>
        <div class="reply-msg">
          <div class="reply-msg-title">全部回复（4）</div>
          <div class="reply-msg-list" v-for="item in replyList">
            <div class="rml-name">
              <span>王佳佳</span>
              <span class="white-space">1</span>
              <span class="blue">楼主</span>
            </div>
            <div class="rml-date">
              <div class="inline-block">8小时前</div>
              <div class="inline-block">
                <span class="inline-block blue rml-date-btn">
                  <img src="" alt="">
                  回复
                </span>
                <span class="inline-block blue rml-date-btn">
                  <img src="" alt="">
                  修改
                </span>
                <span class="inline-block red rml-date-btn">
                  <img src="" alt="">
                  删除
                </span>
              </div>
            </div>
            <div class="rml-msg">
              回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复
              的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容
            </div>
            <div class="detial-fj box-sizing">
              <img src="" alt="" class="inline-block">
              <div class="inline-block">
                <div>调整城镇土地使用税和申报表单.pdf</div>
               <div class="down-fj pointer">立即下载</div>
              </div>
            </div>
            <div class="rml-reply box-sizing">
              <span class="rml-reply-name">@挖基甲烷：</span>
              <span class="rml-reply-msg inline-block" :style="item.replyMore?'height:auto':'height:64px'">
                回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的容回复的回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容容
                回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的内容回复的容回复的
              </span>
              <div class="blue pointer rml-reply-more" @click="item.replyMore=!item.replyMore">  {{item.replyMore?'收起':'查看全部'}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "list-detail",
      data(){
          return{
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
            ]
          }
      }
    }
</script>

<style scoped>
  .rml-reply-more{
   text-align: right;
  }
  .rml-reply-msg{
    overflow: hidden;
  }
  .rml-reply-name{
    font-weight: bold;
  }
  .rml-reply{
    width: 100%;
    background: #F6F6F6;
    border: 1px solid #E5E5E5;
    font-size: 16px;
    color:#666;
    line-height: 24px;
    padding: 26px;
  }
  .rml-msg{
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 26px;
  }
  .rml-date-btn{
    margin-left: 31px;
  }
  .rml-date-btn>img{
    width: 17px;
    height: 17px;
    min-width: 17px;
    min-height: 17px;
    background: #eee;
    vertical-align: middle;
    margin-top: -3px;
  }
  .rml-date{
    font-size: 15px;
    color: #999;
    display: flex;
    justify-content: space-between;
    margin-bottom: 21px;
  }
  .rml-name>.blue{
    font-size: 15px;
    font-weight: normal;
  }
  .rml-name{
    font-size: 18px;
    color:#333;
    font-weight: bold;
    margin-bottom: 14px;
  }
  .reply-msg-list{
    margin-top: 37px;
    padding-bottom: 44px;
    border-bottom: 1px solid #eee;
  }
  .reply-msg-title{
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-top: 69px;
  }
  .del-reply-img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    background: #A11727;
    position: absolute;
    top:0;
    right: 6px;
  }
  .reply-img-list{
    width: 203px;
    height: 161px;
    position: relative;
    margin-right: 14px;
    background: #eee;
  }
  .reply-img-list{
    margin-bottom: 34px;
    margin-top: 20px;
  }
  .reply-img-list>img{
    width: 100%;
    height: 100%;
  }
  .rf-fj{
    margin-top: 11px;
  }
  .sub-reply{
    width: 107px;
    height: 39px;
    line-height: 39px;
    color:#fff;
    text-align: center;
    background: #2A5AAC;
    margin-left: 11px;
  }
  .reply-foot-notice{
    font-size: 14px!important;
    color:#999;
  }
  .reply-foot{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    vertical-align: middle;
  }
  .reply-textarea{
    width: 100%;
    height: 136px;
    background: #F4F4F4;
    border:1px solid #DDDDDD;
    border-radius: 4px;
    font-size: 16px;
    padding:24px 22px;
    margin-bottom: 16px;
  }
  .detail-reply{
    background: #fff;
    padding:50px 43px;
  }
  .dm-zan-group-btn>img{
    width: 65px;
    height: 65px;
    min-width: 65px;
    min-height: 65px;
    background: #E5E5E5;
    margin-bottom: 19px;
  }
  .dm-zan-group-btn:first-child{
    margin-right: 57px;
  }
  .dm-zan-group{
    text-align: center;
    font-size: 15px;
  }
  .red{
    color:#C41313;
  }
  .blue{
    color:#2A5AAC;
  }
  .dm-msg{
    padding: 39px 37px;
  }
  .dmh-foot-btn>img{
    min-width: 17px;
    min-height: 17px;
    width: 17px;
    height: 17px;
    vertical-align: middle;
    background: #2A5AAC;
    margin-right: 7px;
    margin-top: -2px;
  }
  .dmh-foot-btn{
    width: 98px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 15px;
    color:#2A5AAC;
    background: #E7F1FB;
    border: 1px solid #A9C0E8;
    border-radius: 2px;
    margin-right: 12px;
  }
  .dmh-foot{
    display: flex;
    justify-content: space-between;
  }
  .dmh-date{
    font-size: 18px;
    color: #666;
    margin-bottom: 39px;
  }
  .dmh-title{
    font-size: 23px;
    color:#343434;
    font-weight: bold;
    line-height: 36px;
    margin-bottom: 13px;
  }
  .lml-img-group{
    font-size: 17px;
  }
  .lml-img-group>img{
    min-width: 18px;
    min-height: 18px;
    width: 18px;
    height: 18px;
    background: #eee;
    vertical-align: middle;
  }
  .detail-msg{
    background: #fff;
    margin-bottom: 17px;
    padding-bottom: 67px;
  }
  .dm-head{
    padding: 35px 40px;
    border-bottom: 1px solid #eee;
  }
</style>
