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
            <div class="commentHandle clear">
              <p class="commentHandleType right" v-if="false">
                <span class="comLike">{{arLikeNum}}</span>
                <span class="comTread">{{arDownNum}}</span>
                <!-- <span class="replay">回复</span> -->
              </p>
            </div>
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
              <li class="commentD" v-for="comment in commentList" :key="comment.commentId">
                <p class="commentInfo clear">
                  <span class="commentUser left">{{comment.commentAuthor}}</span>
                  <span class="commentTime right">评论于 <i class="time">{{comment.commentTime}}</i></span>
                </p>
                <div class="comcon" v-html="comment.commentCon"></div>
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
          initialFrameHeight:200,
          //更多其他参数，请参考ueditor.config.js中的配置项
          serverUrl: '/server/ueditor/controller.php'
        },
        ue1: "ue1", // 不同编辑器必须不同的id,
        arCons:"",
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
        commentList:[]
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
                _this.arCons=postshow.data.newNoteDetail.newNoteCont;
                _this.arTitle=postshow.data.newNoteDetail.newNoteTitle;
                _this.arTime=postshow.data.newNoteDetail.newNoteTime;
                _this.arDownNum=postshow.data.newNoteDetail.newNoteLikeNum;
                _this.arLikeNum=postshow.data.newNoteDetail.newNoteDownNum;
                _this.arComeNum=postshow.data.newNoteDetail.newNoteComeNum;
                _this.arViewNum=postshow.data.newNoteDetail.newNoteViewNum;
                _this.commentList=postshow.data.articleComment;
              }
            }
          });
      },
      //提交评论内容
      postComment(){
        this.error="";
        let _this=this;
        let content = this.$refs.ue.getUEContent();
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
            _this.getArticleDetail();
            _this.$refs.ue.clearContent();
          }
        })
      }
  },
  computed: {
    ...mapGetters(['loginStatue'])
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
        font-size: .2rem;
      }
      .details{
        .detcom{
          padding:20px 20px 5px 0;
           border-bottom:1px solid #ccc;
        }
        .detCon{
          font-size: .16rem;
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
                    background: url("../assets/images/comIcon.png") no-repeat 0 0;
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
              .commentInfo{
                margin: 10px 0;
                font-size:.14rem;
                border-bottom: 1px dashed #ccc;
                padding-bottom: 8px;
                .commentUser{
                  color: #4093c6;
                }
                .commentTime,.time{
                  color: #ccc;
                }

              }
              .comcon{
                margin-top: 12px;
                font-size:.135rem;
              }
            }
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
