<template>
  <div class="conDetails">
    <section>
      <article class="conPost">
        <h1 class="title">标题</h1>
        <div class="meta"><span class="creatTime">2018年1月7日</span><span class="pageViewNum">0</span> 次浏览<span class="commentNum">0</span> 次评论<span class="commentLabel">标签: <i class="labelName">标签名</i> </span></div>
        <div class="details">
          <!--文章内容-->
          <div class="detCon" v-html="contents">

          </div>
          <!--评论内容-->
          <div class="comments">
            <p class="conTitle">评论专区&nbsp;&nbsp;<a href="#editor-container">【点我去评论 】</a></p>
            <ul class="commentList">
              <li class="commentD">
                <p class="commentInfo clear">
                  <span class="commentUser left">maoxiangmin</span>
                  <span class="commentTime right">评论于 <i class="time">20180121</i></span>
                </p>
                <div class="comcon">
                  评论内容
                </div>
                <div class="commentHandle clear">
                  <p class="commentHandleType right">
                    <span class="comLike">1</span>
                    <span class="comTread">1</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="editor-container" id="editor-container">
            <UE  :config=config :id=ue1 ref="ue"></UE>
          </div>
          <p class="firstSofa" v-show="firstSofaShow">还没有评论哦，来抢个沙发吧！</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import UE from './ue/ue';
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
        contents:"发表内容区域",
        commentsList:[],
        firstSofaShow:true
    }
  },
  components: {
    UE
  },
  methods: {
      //获取编辑器内容
      getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
      }
  }
}
</script>

<style lang="scss" scoped>
.conDetails{
  section{
    background: #fcfcfa;
    box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
    .conPost{
      width: 920px;
      background: #fff;
      margin-bottom: 20px;
      padding: 30px;
      .title{
        margin-bottom: 5px;
        font-weight: bold;
        font-size: 20px;
        font-family: Pmingliu,Mingliu;
      }
      .details{
        .detCon{
          font-size: 16px;
          padding:20px 20px 20px 0;
        }
        .comments{
          padding:20px 20px 20px 0;
          border-bottom: 1px solid #ccc;
          margin-bottom: 35px;
          .conTitle{
            padding: 15px 0;
            text-align:center;
            font-size:14px;
          }
          .commentList{
            .commentD{
              padding: 10px 0;
              margin-bottom:10px;
              .commentInfo{
                margin: 10px 0;
                font-size:14px;
                border-bottom: 1px dashed #ccc;
                padding-bottom: 8px;
              }
              .comcon{
                margin-top: 12px;
              }
              .commentHandle{
                margin:8px 0;
                .commentHandleType{
                  display:inline-block;
                  .comTread,.comLike{
                    display:inline-block;
                    padding-left: 22px;
                    width: 20px;
                    height: 20px;
                    margin-left:8px;
                    color:#999;
                    background: url("../assets/images/comIcon.png") no-repeat;
                    margin: 0 12px;
                  }
                  .comLike{
                    background-position: 0 -80px; 
                  }
                  .comTread{
                    background-position: 0 -120px; 
                  }
                }
              }
            }
          }
        }
        .firstSofa{
          background: #f0f0f0;
          color: #999;
          text-align: center;
          padding: 5px 0;
          font-size: 12px;
          margin-top: 30px;
        }
      }
      .meta{
        margin-top: 10px;
        border-bottom: 1px dashed #ccc;
        padding-bottom: 18px;
        color: #777;
        font-size: 12px;
        .creatTime{
          margin-bottom: 15px;
          color: #777;
          font-size: 12px;
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
