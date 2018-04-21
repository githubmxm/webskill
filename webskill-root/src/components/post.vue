<!--
文章详情
-->
<template>
  <div class="conDetails">
    <section>
      <article class="conPost">
        <h1 class="title">{{arTitle}}</h1>
        <div class="meta"><span class="creatTime">{{arTime}}</span><span class="pageViewNum">{{arViewNum}}</span> 次浏览<span class="commentNum">{{arComeNum}}</span> 次评论<span class="commentLabel">标签: <i class="labelName">{{arType}}</i> </span></div>
        <div class="details">
          <!--文章内容-->
          <div class="detcom">
            <div class="detCon" v-html="arCons"></div>
            <div class="nextPrev">
              <a class="prevAD left" :class="{disableP:prevArticle=='javascript:void(0)'}" :href="prevArticle"><i class="fa fa-angle-double-left"></i> 上一篇</a>
              <a class="nextAD right" :class="{disableN:nextArticle=='javascript:void(0)'}" :href="nextArticle">下一篇 <i class="fa fa-angle-double-right"></i></a>
            </div>
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
                  <span class="commentUser left">{{comment.commentAuthor}}.<i>[F{{index+1}}]</i></span>
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
                  <span class="replayComment right" @click="replayComment(comment.commentAuthor,comment.commentId)">回复楼主</span>
                </p>
                <div class="clear" v-if="comment.commentId==replayUeId">
                  <UE  :config=config2 :id="'replay'+comment.commentId" :ref="'uec'+comment.commentId"></UE>
                  <p class="errUeLi">{{errUeLi}}</p>
                  <span class="right replayCommentSure" @click="replayCommentSure('uec'+comment.commentId,comment.commentAuthor,index)">确认</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="editor-container" id="editor-container">
            <UE  :config=config :id=ue1 ref="ue"></UE>
          </div>
          <div class="clear errorMsg">
              {{error}}
          </div>
          <div class="clear">
            <span data-v-7ddd7f1e="" class="leaveWordSubmit" @click="postComment()">提交</span>
          </div>
          <p class="firstSofa" v-show="commentList.length==0">还没有评论哦，来抢个沙发吧！</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import UE from './ue/ue';
import axios from 'axios';
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
          maximumWords:200,
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
        surePostPublishButton:this.$route.name=="previewpost"? true : false,
        ue1: "ue1", // 不同编辑器必须不同的id,
        errUeLi:"",
        postAjaxError:"",//确认发布按钮错误提示
        deletePostAjaxError:"",
        arCons:"<span class='noConRedirct' style='color:red'>内容未找到...(5)</span>",
        replayUeId:null,
        commentsList:[],
        firstSofaShow:true,
        postId:parseInt(this.$route.params.id),
        arTitle:"",
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
      //获取编辑器内容
      getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
      },
      //获取文章详情
      getArticleDetail(){
         var _this=this;
          axios({
            method: 'get',
            url: '/webskill/post/show',
            params:{
              id:_this.postId
            }
          }).then((res) => {
            let postshow = res.data;
            if(postshow.status=="success"){
              if(postshow.data){
                let postShowDetailData=postshow.data.newNoteDetail;
                _this.arCons=postShowDetailData.newNoteCont;
                _this.arTitle=postShowDetailData.newNoteTitle;
                _this.arTime=postShowDetailData.newNoteTime;
                _this.arType=postShowDetailData.newNoteLabel!=""?postShowDetailData.newNoteLabel:'内容详情';
                _this.arDownNum=postShowDetailData.newNoteLikeNum;
                _this.arLikeNum=postShowDetailData.newNoteDownNum;
                _this.arComeNum=postShowDetailData.newNoteComeNum;
                _this.arViewNum=postShowDetailData.newNoteViewNum;
                _this.nextArticle=postShowDetailData.newNoteNext?"/post/"+(_this.postId+1):"javascript:void(0)";
                _this.prevArticle=postShowDetailData.newNotePrev?"/post/"+(_this.postId-1):"javascript:void(0)";
                let cclist=postshow.data.articleComment;
                for(let i=0;i<cclist.length;i++){
                  axios({
                    method: 'get',
                    url: '/webskill/post/replayCommentFloor',
                    params:{
                      articleId:_this.postId,
                      commentUserFloor:cclist[i].commentId
                    }
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
        axios({
          method: 'post',
          url: '/webskill/post/comment',
          data:{
            commentId:_this.postId,
            commentCons:content
          }
        }).then((res) => {
          let commentdata = res.data;
          if(commentdata.status=="success"){
            //文章评论成功
            _this.commentList.push({"commentAuthor":_this.loginUser,"commentTime":FormatDataTime(new Date().getTime()),"commentCon":content});
            _this.$refs.ue.clearContent();
            _this.replayUeId=10000000000;
          }else{
            _this.error=commentdata.message;
          }
        })
      },
      //回复评论
      replayComment(author,commentid){
        this.replayUeId=10000000;  //隐藏回复成功后的耳机回复确认按钮
        this.errUeLi="";
        this.replayUeId=commentid;
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
        axios({
          method: 'post',
          url: '/webskill/post/replayComment',
          data:{
            replayCommentId:_this.postId,
            replayCommentFloor:_this.replayUeId,
            replayCommentAuthor:replayAuthor,
            replayCommentCons:refcomCon
          }
        }).then((res) => {
          let replayCommentdata = res.data;
          if(replayCommentdata.status=="success"){
            //回复评论成功
            console.log(_this.commentList)
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
        axios({
          method: 'post',
          url: '/webskill/post/surePublish',
          data:{
            surePostId:_this.postId
          }
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
        axios({
          method: 'post',
          url: '/webskill/post/deleteSurePublish',
          data:{
            surePostId:_this.postId
          }
        }).then((res) => {
          var result=res.data;
          if(result.status=="success"){
            location.href="/index";
          }else{
            _this.deletePostAjaxError="-"+result.message;
          }
        })
      }
  },
  computed: {
    ...mapGetters(['loginStatue','loginUser'])
  },
  mounted () {
   this.getArticleDetail();
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
        .nextPrev{
          margin-top:30px;
          font-size: .14rem;
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
        .comments{
          padding:20px 20px 20px 0;
          margin:60px 0 35px 0;
          .conTitle{
            padding: 15px 0;
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
            float: right;
            display: inline-block;
            position: relative;
            margin-right: 10px;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            text-align: center;
            background: blueviolet;
            color: #fff;
            cursor: pointer;
            margin-top:20px;
            &:hover{
              background: black;
            }
        }
      .leaveWordSubmit{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        width: 50px;
        text-align: center;
        background: blueviolet;
        color: #fff;
        float: right;
        margin-top: 10px;
        cursor:pointer;
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
}
</style>
