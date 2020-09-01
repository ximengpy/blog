<template>
  <div class="login-box">
    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :modal="false"
      :before-close= 'beforeClose'
      custom-class='dialog-login'
    >
      <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="rules"
      >
        <el-form-item label="用户名" prop="user">
          <el-input v-model="form.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" show-password></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClick" :disabled="submitDisabled">登录</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import {postLogin} from '@/api/index'
  export default {
    name: "Login",
    props : ["dialogVisible"],
    inject:['reload'] ,
    data(){
      return {

        //表单数据
        form :{
          user : "",
          pwd : "",
          // checkPwd : "",
          svgCode : ""
        },
        submitDisabled:false,
        //表单验证
        rules:{
          //用户名验证
          user : [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {
              //数据类型
              type:"string",
              //正则规则
              trigger: ['blur','change']
            }
          ],

          //密码验证
          pwd : {
            type:"string",
            validator : (rule,value,cb)=>{
              if (value){
                //验证密码是否符合规则
                if (/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{3,18}$/.test(value)){
                  cb();
                }else{
                  cb(new Error("3-18位，不允许出现奇怪的字符哦~"));
                }
              }else{
                cb(new Error("请输入密码"));
              }

              //在这里还需要触发确认密码的验证
              this.form.checkPwd && this.$refs.form.validateField("checkPwd");
            },
            required: true,
            message: '3-18位，不允许出现奇怪的字符',
            trigger: ['blur','change']
          },

        },
      }
    },

    methods : {
      handleClick(){
        this.submitDisabled = true;
        this.$refs["form"].validate((valid) => {
          if (valid) {
            //验证都通过
            postLogin(this.form).then(res=>{
              // console.log(res)
              if (res.code){
                this.submitDisabled = false;
                //登录失败
                this.$message({
                  message: res.msg,
                  type: 'error',
                  duration : 2000
                });
              }
              else{
                //登录成功
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration : 2000
                });
                  this.submitDisabled = false;
                  this.$emit("handleClose", true);
                  this.reload()
              }
            }).catch(e=>{
              this.$message({
                message: e,
                type: 'error',
                duration : 2000
              });
              this.submitDisabled = false;
            });
          } else {
            this.submitDisabled = false;
            //验证没通过
            return false;
          }
        });
      },
      beforeClose(done){
        this.$emit("handleClose");
      }
    },

    mounted() {
    },
    destroyed() {
    }
  }
</script>

<style lang="less">

  .login-box {
    .dialog-login {
      width: 36%;
    }
    .el-form{
      user-select: none;
      padding-right: 30px;

      .vcode{
        .el-input{
          float: left;
          width: 35%;
        }
        div.svg{
          float: left;
          width: 35%;
          height: 40px;
          /deep/ svg{
            width: 100% !important;
            height: 100% !important;
          }
        }
        .el-link{
          font-size: 12px;
        }
      }
    }
  }
  @media screen and (max-width: 966px)  {
    .login-box {
      .dialog-login {
        width: 100%;
      }
    }
  }
</style>
