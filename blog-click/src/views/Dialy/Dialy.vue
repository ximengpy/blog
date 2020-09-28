
<template>
  <!--日记  -->
  <div class="diary" >
    <div class="diary-main">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in diaryList"
          :key="index"
          :timestamp="item.date |getD"
          placement="top"
          :reverse="false"
        >
          <el-card>
            <p>{{item.txt}}</p>
            <img
              v-if="item.img"
              :src="item.img"
              :alt="item.txt"
              width="100%">
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import {getDiary} from '../../api/index'
export default {
  name: 'Diary',
  data() {
    return {
      diaryList: []
    }
  },
  created() {
    this.getdiary()
  },
  methods: {
    //获取日志列表
    getdiary() {
      getDiary().then(res =>{
        this.diaryList = res.data
      })
    }
  },
      filters:{
      getD(val){
        let date = new Date(val);
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
      }
    },

}
</script>

<style lang="less">
  .diary {
    background-color: rgba(221, 238, 255, 0.5);
    padding: 80px 0;

    & .diary-main {
      box-sizing: border-box;
      background-color: #fff;
      max-width: 960px;
      margin: 0 auto;
      padding: 80px 50px 80px 156px;
      animation: showin 2s;
      animation-fill-mode: forwards;
      @keyframes showin {
        from{
          opacity: 0;
        }
        to{
          opacity: 1;
        }
      }
    }
    & .el-timeline {
      width: 694px;
      /deep/ .el-timeline-item__timestamp {
        position: absolute;
        top: -8px;
        left: -134px;
        font-size: 20px;
        font-weight: bolder;
        color: #6bc30d;
      }

      .el-timeline-item{
        & .el-card__body {
          padding: 15px;
          background-color: rgb(228,231,237);
        }
        .el-card{
          p{
            font-size: 14px;
            line-height: 30px;
            color: darkcyan;
          }
        }
      }
    }
  }
    @media screen and (max-width: 966px)  {
      .diary {
        & .diary-main {
          width: 100%;
          // padding: 80px 0 80px 140px;
        }

        & .el-timeline {
          width: 119%;

          /deep/ .el-timeline-item__timestamp {

          }
        }
      }
    }
</style>
