<!--
关于我们
-->
<template>
  <div class="aboutWe">
    <div class="aboutHead">
       <h1 class="aboutTitle">关于我们</h1>
       <span>前端博客 . StarFire_xm</span>
    </div>
    <section class="aboutTaat">
      <h1 class="aboutTitle">关于本站</h1>
      <article class="aboutCon">
        欢迎来到技百讯前端博客（<a class="red" target="_blank" href="/index">zshom.com</a>）,本博客建立于2018.4.22起步上线,存在或多或少的各类问题，欢迎大家的踊跃提出与建议等(<a class="red" target="_blank" href="/leaveword">前往发表看法</a>)。我们将极力改进。
        <br/>
        <br/>
        本站致力于打造安全、稳定、全面、可控的用于技术积累与探讨，为更广大的技术学者提供尽可能的快捷、高效的学习、交流与积累。更多丰富内容将逐步完善与开放，真诚的欢迎您的加入。
        <br/>
        <br/>
        对于涉及的内容转载我们均明确要求注明来源及链接，如有不慎涉及隐私等问题利益，请留言,我们将第一时间处理回复。感谢您的理解!!!,
        同时对于本站内的私有版权等内容问题请遵循本司条款与要求，否则均视为侵权处理,若有需要及其他可留言与我们,我们将已最快时间回复您的问答,感谢您的理解、配合和支持。
        <br/>
        <br/>
        因技术选型问题,本站暂只支持较高版本浏览器访问,低版本将存在兼容运行等问题.推荐使用IE9及更高浏览器查阅,对于低版本可能无法打开该站点或存在各类可能的其他问题，敬请谅解！！！
      </article>
    </section>
    <div class="aboutTaat">
      <h1 class="aboutTitle">本站历程</h1>
      <div class="aboutCon">
        2018年1月,开始规划本博客
        <br/>
        <br/>
        2018年4月22日,本博客初成上线第一版.因还有较多完善之处故现主要以技术文档查看与个人留版为主要目的。应用体系待进一步完善。感谢您的访问.
        <br/>
        <br/>
        2019年7月6日,优化界面与部分BUG完善,增加第三方QQ授权登陆功能
      </div>
    </div>
    <section class="aboutTaat">
      <h1 class="aboutTitle">站长简介</h1>
      <div class="aboutCon">
         <ul class="aboutme">
           <li>
             网名:StarFire_xm
           </li>
           <li>
             学历:大专
           </li>
           <li>
             职位:web前端开发工程师
           </li>
           <li>
             兴趣:阅读,影视,旅游,技术
           </li>
           <li>
             居住:北京
           </li>
         </ul>
      </div>
    </section>
    <div class="aboutTaat">
      <h1 class="aboutTitle">博主联系</h1>
      <div class="aboutCon">
         QQ,WX:1123360735(注明来意哦),您也可通过留言与我们联系！
      </div>
    </div>
    <p class="thanks">
      此致：谢礼！！！
    </p>
  </div>
</template>

<style lang="scss" scoped>
.aboutWe{
  background: #fff;
  padding: .2rem;
  .aboutTitle{
     font-size: .18rem;
     color:#0ab120;
  }
  .aboutCon{
    font-size:.14rem;
    line-height: .24rem;
    margin-top:20px;
    color:#666;
    .red{
      color:red;
      text-decoration: underline;
    }
    .aboutme{
      li{
         margin: 10px 0;
      }
    }
  }
}
.aboutHead{
  span{
    display:inline-block;
    font-szie:.16rem;
    color:#ccc;
    margin-top: 10px;
  }
}
.aboutTaat{
  margin:30px 0;
}
.thanks{
  font-size:.20rem;
  color: blueviolet;
}

</style>