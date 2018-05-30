<!--
后台文件资源上传
https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md
-->
<template>
  <div class="conDetails row">
    <section>
      <p class="title">文件上传:</p>
      <uploader :options="options" class="uploader-example" @file-complete="fileComplete" @complete="complete" @file-added="filesAdded" @file-add="filesAdd" @file-error="fileError" @file-success="fileSuccess" @file-removed="fileRemoved">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <p class="fileTitle">
            <input type="text" maxlength="20" placeholder="请输入描述" v-model="uploadTitle" />
            <select name="" id="" v-model="uploadResourceType">
              <option selected value="private">私有</option>
              <option value="public">公开</option> 
            </select>
          </p>
          <p class="chooseFileType">选择您要上传得文件类型:</p>
          <uploader-btn>上传图片/文件</uploader-btn>
          <!-- <uploader-btn :attrs="attrs">上传图片</uploader-btn> -->
          <uploader-btn :directory="true">上传目录</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
      <p class="error">
        <span class="sureUploadErr">{{errorMsg}}</span>
      </p>
      <p>
        <span class="sureUpload"  @click="surUpload()">确认</span>
      </p>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from 'axios'
export default {
  data () {
    return {
      uploadTitle:"",
      errorMsg:"",
      uploadResourceType:"private",
      pathList:[], //待确认真实资源名路径
      mapPathList:[], //对应得本地文件名
      options: {
        target: '/webskill/uploading',
        testChunks: false
      },
      attrs: {
        accept: 'image/*'
      }
    }
  },
  created () {
   
  },
  components: {
    
  },
  methods: {
      ...mapActions(["setAalertMsgFn"]),
      // complete (rootFile) {
      //   console.log('complete', rootFile)
      // },
      // fileComplete (rootFile) {
      //   console.log('file complete:'+rootFile);
      // },
      filesAdded (file, event){
        // console.log("filesAdded:"+file, event);
      },
      // filesAdd (file, event){
      //   console.log("filesAdd:"+file, event)
      // },
      fileSuccess (rootFile, files, message){
        let filename=files.file.name;
        this.mapPathList.push(filename);
        this.pathList.push(JSON.parse(message).fileUrl);
      },
      fileError (rootFile, file, message){
        // console.log("fileError:"+rootFile, file, message);
      },
      fileRemoved (files){
        let filename=files.file.name;
        let remIndex=this.mapPathList.indexOf(filename);
        this.pathList.splice(remIndex,1);
      },
      surUpload(){
        let _this=this;
        this.errorMsg="";
        if(!this.uploadTitle){
          this.errorMsg="描述不能为空!";
          return false;
        }
        if(!this.pathList.length){
          this.errorMsg="请选择您要上传得资源!";
          return false;
        }
        axios({
          method: 'post',
          url: '/webskill/uploadResource',
          data:{
            uploadTitle:_this.uploadTitle,
            uploadResourceType:_this.uploadResourceType,
            uploadResourceUrl:JSON.stringify(_this.pathList)
          }
        }).then((res) => {
          let uploadData = res.data;
          if(uploadData.status=="success"){
            _this.errorMsg="上传完毕";
            // _this.uploadResourceType="";
            // _this.pathList=[];
            // _this.mapPathList=[];
            setTimeout(function(){
              location.reload();
            },2000)
          }else{
            _this.errorMsg=uploadData.message;
          }
        })
      }
  }
}
</script>

<style lang="scss" scoped>
.conDetails{
  background: #fcfcfa;
  box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
  section{
    .uploader-file .uploader-file-remove{
      display: block !important;
    }
    padding: 30px;
    padding-top: 15px;
    .title{
      margin-bottom: 15px;
      font-size: 16px;
    }
    .chooseFileType{
      margin-bottom: 10px;
    }
    .fileTitle{
      input{
        width: 280px;
        border: 1px solid #ccc;
        outline: none;
        height: 30px;
        line-height: 30px;
        color: #333;
        padding: 0 .1rem;
        margin-bottom: 25px;
      }
    }
    .uploader-example {
      padding: 15px;
      font-size: 12px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    }
    .uploader-example .uploader-btn {
      margin-right: 4px;
    }
    .uploader-example .uploader-list {
      max-height: 4.4rem;
      overflow: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .error{
      text-align: right;
      margin-top: 10px;
       .sureUploadErr{
          color: red;
        }
    }
   
    .sureUpload{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      width: 50px;
      text-align: center;
      background: #8a2be2;
      color: #fff;
      float: right;
      cursor: pointer;
      margin:18px 0;
      &:hover{
        background: #333;
        color: #fff;
      }
    }
  }
}
</style>
