<!--
关于我们
-->
<template>
  <div class="aboutWe">
    <div class="aboutHead">
       <h1 class="aboutTitle">关于我们</h1>
       <span>前端博客 . StarFire_xm</span>
    </div>
    <div class="aboutTaat">
      <h1 class="aboutTitle">关于本站</h1>
      <div class="aboutCon">
        欢迎来到技百讯前端博客（<a class="red" target="_blank" href="/index">zshom.com</a>）,本博客建立于2018.2.1起步上线,存在或多或少的各类问题，欢迎大家的踊跃提出与建议等(<a class="red" target="_blank" href="/leaveword">前往发表看法</a>)。我们将极力改进。
        <br/>
        <br/>
        本博客主要致力于前端及各类技术的跟近与交流学习,其大部分文章内容来源于实践与总结。
        <br/>
        <br/>
        对于涉及的内容转载我们均明确注明来源及链接，如有不慎涉及隐私等问题利益，请留言,我们将第一时间处理回复。感谢您的理解!!!,
        同时对于本站内的私有版权等内容请勿转载，否则均视为侵权处理,若有需要及其他可留言与我们,将已尽快时间回复您的问答,感谢您的配合。
        <br/>
        <br/>
        本站采用vue,nodejs,h5,bootStarp为主要前后端开发技术,因此设计较多PC端低浏览器版本兼容问题,推荐使用IE9及更高浏览器查阅,对于低版本可能无法打开该站点或存在各类可能的其他问题，敬请谅解！！！
      </div>
    </div>
    <div class="aboutTaat">
      <h1 class="aboutTitle">本站历程</h1>
      <div class="aboutCon">
        2018年1月,开始规划本博客
        <br/>
      </div>
    </div>
    <div class="aboutTaat">
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
             兴趣:阅读,旅游
           </li>
           <li>
             居住:北京
           </li>
         </ul>
      </div>
    </div>
    <div class="aboutTaat">
      <h1 class="aboutTitle">博主联系</h1>
      <div class="aboutCon">
         QQ,WX:1123360735(注明来意哦)
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