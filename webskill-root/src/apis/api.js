/**
 * 接口详情配置
 * @author StarFire_xm
 */
export function tyApi() {
    let baseUrl="";
    return {
        //获取token
        getToken:baseUrl+"/webskill/getToken",
        //登录状态查询
        loginStatus:baseUrl+"/webskill/loginStatus",
        //验证码
        vcode:baseUrl+"/webskill/vcode",
        //用户注册
        register:baseUrl+"/webskill/register",
        //登录
        login:baseUrl+"/webskill/login",
        //绑定登录
        bindAccountLogin:baseUrl+"/webskill/bindAccountLogin",
        //微信分享信息获取
        getWxInfo:baseUrl+"/webskill/getWxInfo",
        //退出
        loginExit:baseUrl+"/webskill/loginExit",
        //开通使用
        openUse:baseUrl+"/webskill/openUse",
        //返回图片上传配置参数
        ueController:baseUrl+"/webskill/UE/node/controller",
        //用户留言
        leaveWord:baseUrl+"/webskill/leaveWord",
        //留言详情
        leavewordDetail:baseUrl+"/webskill/leavewordDetail",
        //删除留言
        deleteLeave:baseUrl+"/webskill/deleteLeave",
        //获取云标签
        getCloudTags:baseUrl+"/webskill/getCloudTags",
        //获取导航菜单
        getNavs:baseUrl+"/webskill/getNavs",
        //获取全部笔录列表,技能快讯，推荐工具，搜索导航
        newestNote:baseUrl+"/webskill/newestNote",
        //互动专区
        leaveWordInteract:baseUrl+"/webskill/leaveWordInteract",
        //获取文章详情
        postShow:baseUrl+"/webskill/post/show",
        //提交文章评论内容
        postComment:baseUrl+"/webskill/post/comment",
        //回复评论
        postReplayComment:baseUrl+"/webskill/post/replayComment",
        //删除评论
        delComment:baseUrl+"/webskill/post/delComment",
        //获取指定楼层回复评论内容
        postReplayCommentFloor:baseUrl+"/webskill/post/replayCommentFloor",
        //找回密码-获取邮箱认证码
        findPassGetCode:baseUrl+"/webskill/findPassGetCode",
        //找回密码-下一步
        findPassWordPost:baseUrl+"/webskill/findPassWordPost",
        //按技能类型查找文章列表
        articleTypeList:baseUrl+"/webskill/articleTypeList",
        //接收上传图片
        ueNodeController:baseUrl+"/webskill/UE/node/controller",
        //进入后台管理操作页
        webSkillAdmin:baseUrl+"/webskill/webSkillAdmin",
        //发布云标签
        postTags:baseUrl+"/webskill/post/tags",
        //新增导航菜单
        postNavs:baseUrl+"/webskill/post/navs",
        //发表内容
        posts:baseUrl+"/webskill/posts",
        //确认文章发布
        postSurePublish:baseUrl+"/webskill/post/surePublish",
        //获取待确认发布文章
        getSurePublish:baseUrl+"/webskill/getSurePublish",
        //删除待发布文章
        postDeleteSurePublish:baseUrl+"/webskill/post/deleteSurePublish",
        //数据分布
        articleDistribution:baseUrl+"/webskill/article/distribution",
        //个人资源预上传
        uploading:baseUrl+"/webskill/uploading",
        //个人资源确认上传
        uploadResource:baseUrl+"/webskill/uploadResource",
        //个人资源列表
        getMyResource:baseUrl+"/webskill/getMyResource",
        //资源读取
        downloadResource:baseUrl+"/webskill/downloadResource",
        //other
        other:baseUrl+"/webskill/other"

    }
  }