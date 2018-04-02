<template>
  <div class="top">
    <resetPassword
      v-if="resetPasswordFlag"
      :flag="resetPasswordFlag"
      :passwdcur="reset.passwdcur"
      :passwdnew="reset.passwdnew"
      :passwdagain="reset.passwdagain"
      @close="closeReset"></resetPassword>
    <div class="left">
      <img :src="require('common/img/logo.png')" class="logo">
    </div>
    <div class="right">
      <p class="tips">欢迎使用小果互动广告主后台！</p>
      <div class="login-info">
        <el-dropdown class="username-info" @command="handleCommand">
          <el-button :title="username">
            <i data-v-7b333ae1="" class="iconfont icon-yonghu2"></i>&nbsp;
            <span class="name">{{username}}</span>&nbsp;
            <i class="iconfont icon-xia"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="更改密码"><i data-v-7b333ae1="" class="iconfont icon-xiugai"></i>&nbsp;&nbsp;修改密码</el-dropdown-item>
            <el-dropdown-item command="退出登陆"><i data-v-7b333ae1="" class="iconfont icon-tuichu"></i>&nbsp;&nbsp;退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <transition name="successTips">
      <div class="successTips" v-if="successTips">
        <p class="tips-words">修改成功，请重新登陆</p>
      </div>
    </transition>
  </div>
</template>

<script>
import resetPassword from '../public/reset-password.vue'
import {baseUrl} from '../../common/js/common'

export default {
  props: {
    username: String
  },
  data () {
    return {
      resetPasswordFlag: false,
      successTips: false,
      reset: {
        passwdcur: '',
        passwdnew: '',
        passwdagain: ''
      }
    }
  },
  methods: {
    handleCommand (command) {
      if (command === '更改密码') {
        this.resetPasswordFlag = true
      } else if (command === '退出登陆') {
        this.$http.post(baseUrl + '/user/logout').then(res => {
          if (res.body.status === 201) {
            this.$router.replace({
              path: '/login',
              query: {
                redirect: this.$route.fullPath
              }
            })
          } else {
            alert('登出失败')
          }
        })
      }
    },
    succcess () {
      this.successTips = true
      setTimeout(() => {
        this.successTips = false
        this.$router.replace({
          path: '/login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      }, 2000)
    },
    closeReset (tag) {
      this.resetPasswordFlag = false
      if (tag) {
        this.succcess()
      }
    }
  },
  components: {
    resetPassword
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/scss/color.scss';

  @media screen and (max-width: 1600px) {
    .top {
      height: 70px;
    }
  }
  @media screen and (min-width: 1601px) {
    .top {
      height: 97px;
    }
  }
  .top {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: $mainColor;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    .left {
      width: 183px;
      height: 100%;
      position: relative;
      .logo {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    }
    .right {
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: nowrap;
      align-items: center;
      margin-right: 30px;
      .tips {
        color: white;
        font-size: 14px;
        padding-right: 20px;
      }
      .login-info {
        height: 100%;
      }
      .username-info {
        font-size: 18px;
        width: 320px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        .el-button {
          width: 100%;
          padding: 0;
          height: 100%;
          background-color: $mainColor;
          border: none;
          color: white;
          font-size: 18px;
          .name {
            display: inline-block;
            // width: 80%;
            height: 20px;
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow: hidden;
          }
          &:hover {
            background-color: #ff9d20;
          }
        }
      }
    }
  }
  .el-dropdown-menu {
    width: 320px;
    padding: 0;
    box-shadow: 0 0 30px #e0e0e0;
    .el-dropdown-menu__item {
      font-size: 18px;
      text-align: center;
      color: #666;
      height: 54px;
      line-height: 54px;
      &:hover {
        background-color: #fff;
        color: $mainColor;
      }
    }
  }
  .successTips {
    width: 227px;
    height: 89px;
    line-height: 89px;
    text-align: center;
    position: fixed;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    color: $mainColor;
    font-size: 20px;
    background-color: #fff;
    box-shadow: 0 0 30px #e0e0e0;
    border-radius: 8px;
  }
  .successTips-enter,
  .successTips-leave-to {
    opacity: 0;
  }
  .successTips-enter-active,
  .successTips-leave-active {
    transition: all 0.4s ease;
  }
</style>
