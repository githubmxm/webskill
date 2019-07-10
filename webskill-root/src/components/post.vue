<!--
文章详情
-->
<template>
  <div class="conDetails">
    <section>
      <article class="conPost">
        <h1 class="title">{{arTitle}}</h1>
        <div class="meta"><span class="creatAuthor">{{arAuthor}}</span><span class="creatTime">{{arTime}}</span><span class="pageViewNum">{{arViewNum}}</span> 次浏览<span class="commentNum">{{arComeNum}}</span> 次评论<span class="commentLabel">技能类型: <i class="labelName">{{arType}}</i> </span></div>
        <div class="details">
          <!--文章内容-->
          <div class="detcom">
            <div class="detCon" v-html="arCons"></div>
            <div class="nextPrev">
              <a class="prevAD left" :class="{disableP:prevArticle=='javascript:void(0)'}" :href="prevArticle"><i class="fa fa-angle-double-left"></i> 上一篇</a>
              <a class="nextAD right" :class="{disableN:nextArticle=='javascript:void(0)'}" :href="nextArticle">下一篇 <i class="fa fa-angle-double-right"></i></a>
            </div>
            <p class="showIcon">
                <ul>
                    <li @click="shareType(0)" title="微信分享">
                        <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#icon-weixinfenxiang"></use>
                        </svg>
                    </li>
                    <li @click="shareType(1)" title="qq空间分享" >
                         <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#icon-qqkongjianfenxiang"></use>
                        </svg>  
                    </li>
                    <li @click="shareType(2)" title="微博分享" >
                         <svg class="icon svg-icon" aria-hidden="true">
                            <use xlink:href="#icon-weixinfenxiang1"></use>
                        </svg>
                    </li>
                </ul>
            </p>
            <div class="commentHandle clear">
              <p class="commentHandleType right" v-if="false">
                <span class="comLike">{{arLikeNum}}</span>
                <span class="comTread">{{arDownNum}}</span>
                <!-- <span class="replay">回复</span> -->
              </p>
            </div>
          </div>
          <div class="surePostPublish" v-if="surePostPublishButton" @click="postPublishAjax()">
            确认发布{{postAjaxError}}
          </div>
          <div class="surePostPublish" v-if="surePostPublishButton" @click="postDeletcAjax()">
              删除{{deletePostAjaxError}}
            </div>
          <!--评论内容-->
          <div class="comments">
            <div id="comment_form" v-if="!loginStatue">
              <div id="commentsbmitarear">
                <div class="guest_link">
                  <span class="log_ico">
                    <i class="icon iconfont icon-yonghu"></i>
                  </span>
                  <span class="txt">
                    您还未登录， <a href="/login">登录</a> 后可进行评论
                   <!-- 评论专区&nbsp;&nbsp;<a>【点我去评论 】</a> -->
                  </span>
                  </div>
                </div>
            </div>
            <ul class="commentList">
              <li class="commentD" v-for="(comment,index) in commentList" :key="index">
                <p class="commentInfo clear">
                  <span class="commentUser left">{{comment.commentAuthor}}<i style="display:none;">.[F{{index+1}}]</i></span>
                  <span class="commentTime right">评论于 <i class="time">{{comment.commentTime}}</i></span>
                </p>
                <div class="comcon" v-html="comment.commentCon"></div>
                <ul class="replayCommentList">
                    <li class="commentD" v-for="replayComment in comment.replayComment" :key="replayComment.replayCommentId">
                      <p class="commentInfo clear">
                        <span class="commentUser left">@{{replayComment.replayCommentAuthor}}</span>
                        <span class="commentTime right">评论于 <i class="time">{{replayComment.replayCommentTime}}</i></span>
                      </p>
                      <div class="comcon" v-html="replayComment.replayCommentCon"></div>
                    </li>
                </ul>
              
                <p class="clear">
                  <span v-if="comment.commentAuthor!=loginUser" class="replayComment right commentCz" @click="replayComment(comment.commentAuthor,comment.commentId)">回复楼主</span>
                  <span v-if="comment.commentAuthor==loginUser" class="replayComment right commentCz" @click="delComment(comment.commentId)">删除</span>
                  <!-- <span class="replayComment right commentCz">举报</span> -->
                </p>
                <div class="clear" v-if="comment.commentId==replayUeId">
                  <UE  :config=config2 :id="'replay'+comment.commentId" :ref="'uec'+comment.commentId"></UE>
                  <p class="errUeLi">{{errUeLi}}</p>
                  <span class="right replayCommentSure" @click="replayCommentSure('uec'+comment.commentId,comment.commentAuthor,index)">确认</span>
                </div>
              </li>
            </ul>
          </div>
          <p v-if="vcodeShow">
            <input type="text" v-model="inCode" id="vcode" placeholder="请输入验证码" maxlength="6" />
              <span class="imgCode" @click="refreshVcode()" v-html="vcode"></span>
          </p>
          <div class="editor-container" id="editor-container">
            <UE  :config=config :id=ue1 ref="ue"></UE>
          </div>
          <div class="clear errorMsg">
              {{error}}
          </div>
          <div class="clear">
            <span data-v-7ddd7f1e="" class="leaveWordSubmit" @click="postComment()">发表</span>
          </div>
          <p class="firstSofa" v-show="commentList.length==0">还没有评论哦，来抢个沙发吧！</p>
        </div>
      </article>
    </section>
    <div class="qrCode" v-show="qrCode">
        <div class="codeConent">
            <span class="qcColse"  @click="closeQc()">
                <svg class="icon svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
            </span>
            <p class="text-center codeTitle">扫描二维码分享</p>
            <div id="qrCode" ref="qrCodeDiv"></div>
        </div>
    </div>
    
  </div>
</template>

<script>
import UE from './ue/ue';
import {
    tyApi
  } from "@/apis/api";
import wxshare from '@/assets/js/wxshare';
import QRCode from 'qrcodejs2';
import { mapGetters } from "vuex";
import FormatDataTime from '../tool/formatDataTime';
export default {
  data () {
    return {
        config: {
          initialFrameWidth: null,
          //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
          toolbars:[['test','emotion']],
          //focus时自动清空初始化时的内容
          autoClearinitialContent:true,
          maximumWords:300,
          pasteplain:true,
          initialContent:'<span style="color:#ccc; onlyRed">畅言一下吧...</span>',
          //关闭字数统计
          wordCount:true,
          enableAutoSave:false,
          //关闭elementPath
          elementPathEnabled:false,
          //默认的编辑区域高度
          initialFrameHeight:200
        },
        config2: {
          initialFrameWidth: null,
          //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
          toolbars:[['test','emotion']],
          //focus时自动清空初始化时的内容
          autoClearinitialContent:true,
          maximumWords:300,
          pasteplain:true,
          initialContent:'<span style="color:#ccc; onlyRed">回复:</span>',
          //关闭字数统计
          wordCount:true,
          enableAutoSave:false,
          //关闭elementPath
          elementPathEnabled:false,
          //默认的编辑区域高度
          initialFrameHeight:60
        },
        qrCode:false,
        surePostPublishButton:false,
        ue1: "ue1", // 不同编辑器必须不同的id,
        errUeLi:"",
        postAjaxError:"",//确认发布按钮错误提示
        deletePostAjaxError:"",
        arCons:"",
        vcodeShow:false,
        vcode:"",
        inCode:"",
        replayUeId:null,
        commentsList:[],
        firstSofaShow:true,
        postId:parseInt(this.$route.params.id),
        arTitle:"",
        arAuthor:"",
        arTime:"",
        arType:"内容详情",
        arDownNum:0,
        arLikeNum:0,
        arComeNum:0,
        arViewNum:0,
        error:"",
        commentList:[],
        prevArticle:"javascript:void(0)",
        nextArticle:"javascript:void(0)"
    }
  },
  components: {
    UE
  },
  methods: {
      getVcode:function(){
      let _this=this;
      _this.$axios.get(tyApi().vcode,{r:Math.random()}).then((res) => {
          if(res.data.status=="incorrect-authen"){
            _this.vcode='验证码'
            _this.errorMsg='操作异常';
          }else{
              _this.vcode=res.data;
          }
          
      })
    },
    refreshVcode:function(){
      this.getVcode();
    },
      formatmodel(str,model){
            for(var k in model){
                var re = new RegExp("{"+k+"}","g");
                str = str.replace(re,model[k]);
            }
            return str;
      },
      //获取编辑器内容
      getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
      },
      //获取文章详情
      getArticleDetail(){
         var _this=this;
         _this.$axios.get(tyApi().postShow,{
             id:_this.postId
         }).then((res) => {
            let postshow = res.data;
            if(postshow.status=="success"){
              if(postshow.data){
                  if(_this.$route.name=="previewpost"){
                    if(postshow.data.userGrade==1){
                      _this.surePostPublishButton=true;
                    }
                  }
                  
                let postShowDetailData=postshow.data.newNoteDetail;
                _this.arCons=postShowDetailData.newNoteCont;
                _this.arTitle=postShowDetailData.newNoteTitle;
                _this.arTime=postShowDetailData.newNoteTime;
                _this.arAuthor=postShowDetailData.newNoteAuthor;
                _this.arType=postShowDetailData.newNoteLabel!=""?postShowDetailData.newNoteLabel:'内容详情';
                _this.arDownNum=postShowDetailData.newNoteLikeNum;
                _this.arLikeNum=postShowDetailData.newNoteDownNum;
                _this.arComeNum=postShowDetailData.newNoteComeNum;
                _this.arViewNum=postShowDetailData.newNoteViewNum;
                _this.nextArticle=postShowDetailData.newNoteNext?"/post/"+(_this.postId+1):"javascript:void(0)";
                _this.prevArticle=postShowDetailData.newNotePrev?"/post/"+(_this.postId-1):"javascript:void(0)";
                let cclist=postshow.data.articleComment;
                for(let i=0;i<cclist.length;i++){
                    _this.$axios.get(tyApi().postReplayCommentFloor,{
                      articleId:_this.postId,
                      commentUserFloor:cclist[i].commentId
                    }).then((res) => {
                        let replayComData=res.data;
                        if(replayComData.status=="success"){
                        cclist[i].replayComment=replayComData.data;
                        if(i==cclist.length-1){
                            _this.commentList=cclist;
                        }
                        }
                  });
                }
              }else{
                //内容不存在
                let times=5;
                let noConInterval=setInterval(function(){
                  _this.arCons="<span class='noConRedirct' style='color:red'>内容未找到...("+times+")</span>";
                  times--;
                  if(times==0){
                    clearInterval(noConInterval);
                    location.href="/index";
                  }
                },1000)
                _this.arCons
              }
            }else{
              location.href="/index";
            }
          });
      },
      //提交评论内容
      postComment(){
        this.error="";
        let _this=this;
        let content = this.$refs.ue.getUEContent();
        if(!this.loginStatue){
          this.error="请先登录";
          return false;
        }
        if(content==""||content=='<p id="initContent"><span style="color:#ccc; onlyRed">畅言一下吧...</span></p>'){
          this.error="评论内容不能为空";
          return false;
        }
        this.error="";
        _this.$axios.post(tyApi().postComment,{
            commentId:_this.postId,
            commentCons:content,
            vcode:_this.inCode
        }).then((res) => {
          let commentdata = res.data;
          if(commentdata.status=="success"){
            //文章评论成功
            _this.refreshVcode();
            _this.inCode="";
            _this.commentList.push({"commentAuthor":_this.loginUser,"commentTime":FormatDataTime(new Date().getTime()),"commentCon":content,commentId:commentdata.data.commentId});
            _this.$refs.ue.clearContent();
            _this.replayUeId=10000000000;
          }else{
               _this.error=commentdata.message;
            if(commentdata.status=="code-error"){
                _this.vcodeShow=true;
                _this.inCode="";
                _this.refreshVcode();
            }
            
          }
        })
      },
      //回复评论
      replayComment(author,commentid){
        this.replayUeId=10000000;  //隐藏回复成功后的耳机回复确认按钮
        this.errUeLi="";
        this.replayUeId=commentid;
      },
      //删除评论
      delComment(commentid){
          let _this=this;
        _this.$axios.post(tyApi().delComment,{
             delCommentId:commentid
        }).then((res) => {
          let delCommentData = res.data;
          if(delCommentData.status=="success"){
            //删除评论成功
            _this.commentList.splice(_this.commentList.findIndex(item => item.commentId == commentid), 1);
          }else{
             _this.errUeLi=delCommentData.message;
          }
        })
      },
      //确认回复评论内容
      replayCommentSure(refcom,replayAuthor,index){
        let _this=this;
        this.errUeLi="";
        let refcomCon=this.$refs[refcom][0].getUEContent();
        if(!this.loginStatue){
          this.error="请先登录";
          return false;
        }
        if(refcomCon==""||refcomCon=='<p id="initContent"><span style="color:#ccc; onlyRed">回复:</span></p>'){
          this.errUeLi="回复评论内容不能为空";
          return false;
        }
        this.errUeLi="";
        _this.$axios.post(tyApi().postReplayComment,{
             replayCommentId:_this.postId,
            replayCommentFloor:_this.replayUeId,
            replayCommentAuthor:replayAuthor,
            replayCommentCons:refcomCon
        }).then((res) => {
          let replayCommentdata = res.data;
          if(replayCommentdata.status=="success"){
            //回复评论成功
            _this.commentList[index].replayComment.push({"replayCommentId":_this.replayUeId,"replayCommentAuthor":_this.loginUser,"replayCommentTime":FormatDataTime(new Date().getTime()),"replayCommentCon":refcomCon})
            _this.$refs[refcom][0].clearContent();
          }else{
             _this.errUeLi=replayCommentdata.message;
          }
        })
      },
      //确认文章发布
      postPublishAjax:function(){
        let _this=this;
        _this.$axios.post(tyApi().postSurePublish,{
            surePostId:_this.postId
        }).then((res) => {
          var result=res.data;
          if(result.status=="success"){
            location.href="/index";
          }else{
            _this.postAjaxError="-"+result.message;
          }
        })
      },
      //删除待发布文章
      postDeletcAjax:function(){
        let _this=this;
        _this.$axios.post(tyApi().postDeleteSurePublish,{
            delPostId:_this.postId
        }).then((res) => {
          var result=res.data;
          if(result.status=="success"){
            location.href="/index";
          }else{
            _this.deletePostAjaxError="-"+result.message;
          }
        })
      },
      shareType(type){
          let _this=this;
          if(type==0){
              this.qrCode=true;
              document.getElementsByClassName("maskZZ")[0].style.display="block";
          }
          if(type==1){
              window.open(this.formatmodel("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}",{title:_this.arTitle,url:location.href}))
          }
          if(type==2){
              window.open(this.formatmodel("http://service.weibo.com/share/share.php?title={title}&url={url}&source=bookmark&appkey=2171139250",{title:_this.arTitle,url:location.href}))
          }
      },
      //生成当前二维码
      bindQRCode: function () {
        new QRCode(this.$refs.qrCodeDiv, {
          text: location.href,
          width: 180,
          height: 180,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
        })
      },
      closeQc:function(){
          this.qrCode=false;
          document.getElementsByClassName("maskZZ")[0].style.display="none";
      }

  },
  computed: {
    ...mapGetters(['loginStatue','loginUser'])
  },
  mounted () {
    wxshare.do("",'http://www.zshom.com/webskill/images/photo.png',this.arTitle,'技百讯分享');
    this.getArticleDetail();
    this.$nextTick(function () {
        this.bindQRCode();
        
    })
  }
}
</script>

<style lang="scss" scoped>
.conDetails{
  section{
    background: #fcfcfa;
    box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
    .conPost{
      background: #fff;
      margin-bottom: 20px;
      padding: 30px;
      .title{
        margin-bottom: 5px;
        font-weight: bold;
        font-size: .22rem;
      }
      .details{
        .detcom{
          padding:20px 20px 5px 0;
           border-bottom:1px solid #ccc;
        }
        .detCon{
          font-size: .18rem;
          word-wrap: break-word;
        }
        .noConRedirct{
          color: red;
        }
        .showIcon{
            padding: 8px 0;
            li{
                font-size: 22px;
                float: left;
                margin-right: 5px;
                cursor: pointer;
                margin-right: 8px;
            }
        }
        .nextPrev{
          margin-top:30px;
          font-size: .14rem;
          overflow: hidden;
          .prevAD,.nextAD{
            color:#5d9fec;
          }
          .disableP,.disableN{
            color:#ccc;
            &:hover{
              color: #ccc;
              text-decoration: none;
              cursor:default;
            }
          }
        }
        .commentHandle{
                margin:13px 0 8px 0;
                .commentHandleType{
                  display:inline-block;
                  .comTread,.comLike,.replay{
                    display:inline-block;
                    padding-left: 22px;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    margin-left:8px;
                    color:#999;
                    background: url("/webskill/images/comIcon.png") no-repeat 0 0;
                    margin: 0 12px;
                    cursor: pointer;
                  }
                  .comLike{
                    background-position: 0 -80px;
                    &:hover{
                      color: #61abe2;
                      background-position: 0 -100px;
                    }
                  }
                  .comTread{
                    background-position: 0 -120px;
                    &:hover{
                      color: #61abe2;
                      background-position: 0 -140px;
                    }
                  }
                  .replay{
                    width: 47px;
                    background-position: left -200px; 
                    &:hover{
                      color: #61abe2;
                      background-position: left -220px; 
                    }
                  }
                }
              }
              #vcode{
                display: inline-block;
                width: 160px;
                border: 1px solid #cdc5c5;
                padding: 5px;
                position: relative;
                top: -10px;
              }
        .comments{
          padding:10px 10px 10px 0;
          margin:10px 0 15px 0;
          .conTitle{
            padding: 10px 0;
            text-align:center;
            font-size:.14rem;
          }
          #comment_form{
            #commentsbmitarear{
              .guest_link{
                margin-bottom: 20px;
                clear: both;
                overflow: hidden;
                height: 80px;
                font-family: MicrosoftYaHei;
                font-size: .14rem;
                color: #4f4f4f;
                text-align: center;
                background: #e7ecf0;
                .log_ico{
                  width: 40px;
                  height: 40px;
                  border-radius: 20px;
                  line-height: 40px;
                  margin-top: 20px;
                  margin-right: 20px;
                  text-align: center;
                  background: #afbac3;
                  display: inline-block;
                  vertical-align: top;
                  i{
                    color: #e2e9ef;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    font-style: normal;
                    font-size: .16rem;
                  }
                }
                .txt{
                  display: inline-block;
                  margin-top: 28px;
                  a{
                    color: #e73131;
                    text-decoration: underline;
                  }
                }
              }
            }
          }
          .commentList{
            .commentD{
              padding: 10px 0;
              border-bottom: 1px solid #ccc;
              margin-bottom:10px;
              .replayCommentList{
                padding-left:.2rem;
                .commentUser{
                  color:#b231b3 !important;
                }
              }
              .commentInfo{
                margin: 10px 0;
                font-size:.14rem;
                border-bottom: 1px dashed #ccc;
                padding-bottom: 8px;
                .commentUser{
                  color: #4093c6;
                  i{
                    color:#ed143d;
                  }
                }
                .commentTime,.time{
                  color: #ccc;
                }

              }
              .comcon{
                margin-top: 12px;
                font-size:.135rem;
              }
              .errUeLi{
                color: red;
               text-align: right;
               margin-top: 10px
              }
              .replayComment{
                display: inline-block;
                margin: 8px 0;
                color:#5d9fec;
                cursor: pointer;
                &:hover{
                    color: #b231b3;
                }
              }
              .commentCz{
                  margin-left: 10px;
              }
              .replayCommentSure{
                 display: inline-block;
                margin: 8px 0;
                color:#5d9fec;
                cursor: pointer;
                padding: 5px;
                background: aliceblue;
                &:hover{
                  color: #fff;
                  background: #000;
                }
              }
            }
          }
        }
        .surePostPublish{
            position: relative;
            margin-right: 10px;
            line-height: 23px;
            display: inline-block;
            text-align: center;
            background: #5d9fec;
            color: #fff;
            float: right;
            margin-top: 10px;
            cursor: pointer;
            padding: 3px 13px;
            border-radius: 3px;
            &:hover{
              background: blueviolet;
            }
        }
      .leaveWordSubmit{
        display: inline-block;
        text-align: center;
        background: #5d9fec;
        color: #fff;
        float: right;
        margin-top: 10px;
        cursor: pointer;
        padding: 3px 13px;
        border-radius: 3px;
        &:hover{
          background: #a876d6;
        }
       }
       .errorMsg{
         color: red;
         text-align: right;
         margin-top: 10px;
       }
        .firstSofa{
          background: #f0f0f0;
          color: #999;
          text-align: center;
          padding: 5px 0;
          font-size: .12rem;
          margin-top: 20px;
        }
      }
      .meta{
        margin-top: 10px;
        border-bottom: 1px dashed #ccc;
        padding-bottom: 18px;
        color: #777;
        font-size: .12rem;
        .creatTime{
          margin-bottom: 15px;
          color: #777;
          font-size: .12rem;
        }
        .creatAuthor{
          margin-bottom: 15px;
          color: #777;
          font-size: .12rem;
          margin-right: 20px;
        }
        .pageViewNum{
          margin-left: 20px;
        }
        .commentNum,.commentLabel{
          margin-left: 8px;
          .labelName{
            color: red;
          }
        }
      }
    }
  }
  .qrCode{
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -180px 0 0 -90px;
    width: 234px;
    height: 239px;
    z-index: 1000001;
    background: #fff;  
    .codeConent{
        position: relative;
        #qrCode{
          overflow: hidden;
          padding-left: 27px;
        }
        .qcColse{
            position: absolute;
            right: -10px;
            font-size: 20px;
            top: -14px;
            cursor: pointer;
            transition: transform .2s linear;
            -moz-transition: transform .2s linear;
            -webkit-transition: transform .2s linear;
            &:hover{
              transform:rotate(-180deg);
              -moz-transform:rotate(-180deg);
              -webkit-transform:rotate(-180deg);
            }
        }
        .codeTitle{
            padding: 5px 8px;
            font-size: 14px;
            color: #d3d4e0;
        }
    }
    
  }
}
</style>
