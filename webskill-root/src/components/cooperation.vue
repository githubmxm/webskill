<!--
关于我们
-->
<template>
        <section class="aboutWe">
          <header class="aboutHead">
             <h1 class="aboutTitle headTitle">本站商务合作 </h1>
          </header>
          <div class="aboutTaat">
            <h1 class="aboutTitle">合作</h1>
            <div class="aboutCon">
                为适应网络打造及推广,开通的合作通道。<br/>
                因采用的技术类型问题，本站暂时只能接受ie9以上及其他高版本浏览器与移动端可正常访问.此版本网站具体访问兼容性问题还未做出明确列表。您也可自主尝试，我们将在后续进行可能的优化！感谢您的理解。
            </div>
          </div>
          <div class="aboutTaat">
            <h1 class="aboutTitle">内容</h1>
            <div class="aboutCon">
               涉及的合作内容暂时主要以广告位为主.对于广告位的位置处理可商议。若有其它涉及内容亦可商谈，感谢您的支持与信赖!
              <br/>
            </div>
          </div>
          <!-- <div class="aboutTaat">
            <h1 class="aboutTitle">赞助</h1>
            <div class="aboutCon">
                支付宝,微信赞助,感谢您的支持,我们将持续改进及完善。
                <p class="zzimgs">
                    <img class="zfbzf" src="/webskill/images/zfb.png" width=150 alt="">
                    <img class="wxzf" src="/webskill/images/wxrwm.png" width=150 alt="">
                </p>
            </div>
          </div>
          <div class="aboutTaat">
            <h1 class="aboutTitle">联系</h1>
            <div class="aboutCon">
               QQ,WX:1123360735(注明来意哦),您也可通过留言与我们联系！
            </div>
          </div> -->
          <p class="thanks">
            此致：谢礼！！！
          </p>
        </section>
      </template>
      
      <style lang="scss" scoped>
      .aboutWe{
        background: #fff;
        padding: .2rem;
        .aboutTitle{
           font-size: .18rem;
           color:#0ab120;
        }
        .headTitle{
            font-size: .20rem;
        }
        .aboutCon{
          font-size:.14rem;
          line-height: .24rem;
          margin-top:20px;
          color:#666;
          .zzimgs{
              margin-top: 10px;
          }
          .zfbzf{
            margin-right: 15px;
          }
          .wxzf{
              vertical-align: top;
          }
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