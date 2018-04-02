<template>
  <div class="data-govern">
    <top :username="username"></top>
    <leftMenu></leftMenu>
    <div class="data-govern-body">
      <div class="header">位置：<span style="cursor: pointer;" @click="goToPlanGovern">计划管理</span> > 编辑计划</div>
      <div class="body">
        <div class="basic-info">
          <div class="title">广告基本信息（<i style="color: #ff8f00; font-style: normal">*</i> 必填）</div>
          <div class="input-group advertiseId">
            <span><i style="color: #ff8f00; font-style: normal">*</i> 广告ID/名称：</span>
            <el-input v-model="adid" disabled></el-input>
          </div>
        </div>
        <div class="idea">
          <div class="title">广告创意（<i style="color: #ff8f00; font-style: normal;">*</i> 必填）</div>
          <div class="input-group advertiseDes">
            <span><i style="color: #ff8f00; font-style: normal;">*</i> 广告描述：</span>
            <el-input v-model="addesc" disabled></el-input>
          </div>
          <div class="input-group btnName">
            <span><i style="color: #ff8f00; font-style: normal;">*</i> 按钮名称：</span>
            <el-input v-model="btnname" disabled></el-input>
          </div>
          <div class="input-group advertiseBanner">
            <span><i style="color: #ff8f00; font-style: normal;">*</i> 广告banner图：</span>
            <div class="bannerImg">
              <i class="iconfont icon-zhaopian2"></i>
              <img :src="bannersrc" alt="">
            </div>
          </div>
        </div>
        <div class="back-btn">
          <el-button type="warning" @click="goToPlanGovern">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from '../public/top.vue'
import leftMenu from '../public/left-menu.vue'
import {baseUrl} from '../../common/js/common'

export default {
  data () {
    return {
      adid: '',
      username: '',
      addesc: '',
      btnname: '',
      bannersrc: ''
    }
  },
  methods: {
    goToPlanGovern () {
      this.$router.push({
        path: 'planGovern'
      })
    },
    getDetail () {
      this.$http.get(baseUrl + '/puton/detail', {
        params: {putonid: parseInt(this.$route.query.id)}
      }, { emulateJSON: true }).then(result => {
        const res = result.body
        if (res.status === 101) {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        } else {
          this.adid = res.adid
          this.username = res.username
          this.addesc = res.addesc
          this.btnname = res.btnname
          this.bannersrc = res.bannersrc
        }
      })
    }
  },
  components: {
    top,
    leftMenu
  },
  created () {
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/scss/color.scss';

  .data-govern {
    width: 100%;
  }
  .data-govern-body {
    padding: 20px 30px 0 20px;
    .header {
      height: 56px;
      line-height: 56px;
      padding-left: 22px;
      background-color: #fff;
      color: #333;
      font-size: 18px;
    }
    .body {
      color: #333;
      background-color: #fff;
      margin-top: 20px;
      .basic-info {
        padding: 30px;
        border-bottom: 1px dashed #e0e0e0;
        .title {
          font-size: 18px;
        }
        .advertiseId {
          margin-top: 20px;
          padding-left: 20px;
          font-size: 14px;
          color: #999;
        }
      }
      .idea {
        padding: 26px;
        .title {
          font-size: 18px;
        }
        .input-group {
          margin-top: 20px;
          padding-left: 20px;
          font-size: 14px;
          color: #999;
        }
        .advertiseBanner {
          .bannerImg {
            width: 500px;
            height: 235px;
            background-color: #f9f9f9;
            margin-top: 10px;
            position: relative;
            .iconfont {
              position: absolute;
              margin: auto;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              width: 94px;
              height: 94px;
              border-radius: 50%;
              background-color: #e0e0e0;
              text-align: center;
              line-height: 94px;
              font-size: 60px;
              color: #f9f9f9;
            }
            img {
              position: absolute;
              max-width: 500px;
              max-height: 235px;
              margin: auto;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
            }
          }
        }
      }
      .back-btn {
        padding: 19px 150px 0;
        .el-button {
          font-family: 'Microsoft YaHei';
          border: none;
          background-color: $mainColor;
          margin-bottom: 20px;
          width: 268px;
          border-radius: 30px;
          height: 59px;
          font-size: 24px;
          box-shadow: 0 0 10px #feaf62;
          &:hover {
            background-color: $mainColor;
          }
        }
      }
      .input-group .el-input {
        width: 246px;
        height: 42px;
      }
    }
  }
</style>
