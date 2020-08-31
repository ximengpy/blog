
<template>
  <div class="avatar-box">
    <el-dialog
      title="请上传头像"
      :visible.sync="dialogVisible"
      :modal="false"
      :close-on-click-modal="false"
      :before-close= 'beforeClose'
      custom-class='dialog-avatar'
    >
      <el-upload
        class="avatar-uploader"
        :action="server_img"
        :isshow-file-list= 'false'
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :with-credentials="true"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height:178px"></i>
      </el-upload>

    </el-dialog>
  </div>
</template>

<script>
import request  from '../../api/index.js'
import {Avatar} from '../../utils/baseURL'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  inject: ['reload'],
  name: 'Avatar',
  data() {
    return {
      imageUrl:'',
      server_img: ''
    }
  },
  created() {
    this.server_img = Avatar
  },
  methods: {
    beforeClose() {
      this.$emit("handleClose");
    },
    handleAvatarSuccess(res,file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message({
        message: "头像上传成功",
        type: 'success',
        duration : 2000
      });
      window.location.reload()
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return  isLt2M;
    }
  }
}
</script>

<style lang='less'>
  .avatar-box {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-dialog__body {
      padding: 30px 91px;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      display: block;
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .dialog-avatar {
      width: 36%;
    }
  }
  @media screen and (max-width: 966px) {
    .avatar-box {
      & .dialog-avatar {
        width: 100%;
      }
    }
  }
</style>
