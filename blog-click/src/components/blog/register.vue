<template>
  <div class="register-box">
    <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      :modal="false"
      :before-close= 'beforeClose'
      custom-class='dialog-register'
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
        <el-form-item label="验证码" prop="svgCode" class="vcode" >
          <el-input v-model="form.svgCode"></el-input>
          <div class="svg" v-html="register.svgText"></div>
          <el-link type="primary" @click="getVCode" :disabled="register.disabled">{{register.refreshText}}</el-link>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClick" :disabled="register.submitDisabled">立即注册</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import request from '../../api/index'
  const getRegisterVcode = request.getRegisterVcode;
  const getRegisterCheckVcode = request.getRegisterCheckVcode;
  const getpostRegister = request.postRegister
  export default {
    name: "Register",
    props:["dialogVisible"],
    data(){
      return {

        //表单数据
        form :{
          user : "",
          pwd : "",
          // checkPwd : "",
          svgCode : ""
        },
              //注册相关的数据
        register : {
          svgText : "loading...",
          refreshText : "刷新",
          disabled : true,
          timer : null,
          submitDisabled: false
        },
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

          svgCode : {
            validator : (rule,value,cb)=>{
              if (!value){
                cb(new Error("请输入验证码！"));
              }else{
                getRegisterCheckVcode(value).then(res=>{
                  if (res.data.code === 0){
                    cb();
                  }else{
                    cb(new Error("验证码错误"));
                  }
                }).catch(e=>{
                  cb(new Error("未知错误…"));
                });
              }
            },
            required: true,
            trigger: 'blur'
          },
        },
      }
    },

    methods : {
      getVCode(){
        getRegisterVcode().then(res=>{
          clearTimeout(this.register.timer);
          let t = 0;
          let fn = ()=>{
            t += 1000;
            if (t > res.data.time){
              clearTimeout(this.register.timer);
              this.register.disabled = false;
              this.register.refreshText = "刷新";
            }else{
              this.register.disabled = true;
              this.register.refreshText = (((res.data.time - t)/1000)|0) + "s后可以刷新";
            }
          };
          this.register.timer = setInterval(fn,1000);
          fn();

          //更新图片
          this.register.svgText = res.data.data;
        });
      },
    /*注册的点击*/
      handleClick(){
        this.register.submitDisabled = true;
        this.$refs["form"].validate((valid) => {
          if (valid) {
            //验证都通过
            getpostRegister(this.form).then(res=>{
              this.getVCode();
              if (res.data.code){
                this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration : 2000
                });
                this.register.submitDisabled = false;
              }else{
                //注册成功
                this.$message({
                  message: '注册成功,即将跳转登录页面',
                  type: 'success',
                  duration : 2000
                });
                setTimeout(()=>{
                  this.register.submitDisabled = false;
                  this.$emit("handleClose",true);
                },1800);
              }
            }).catch(e=>{
              this.register.submitDisabled = false;
              this.getVCode();
              this.$message({
                message: "注册失败请稍后再试~",
                type: 'error',
                duration : 2000
              });
            });
          } else {
            this.register.submitDisabled = false;
            //验证没通过
            return false;
          }
        });
      },

      /*关闭的回调*/
      beforeClose(done){
        this.$emit("handleClose");
      }
    },

    mounted() {
      this.getVCode();
    },
    destroyed() {
      clearTimeout(this.register.timer);
    }
  }
</script>

<style  lang="less">

  .register-box {
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
    & .dialog-register {
      width: 36%;
    }
  }

  @media screen and (max-width: 966px) {
    .register-box {
      & .dialog-register {
        width: 100%;
      }
    }
  }
</style>
