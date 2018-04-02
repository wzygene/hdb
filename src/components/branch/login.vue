<template>
  <div id="login">
    <div class="login-frame">
      <div class="left">
        <img :src="require('../../common/img/image_2.png')" alt="">
      </div>
      <div class="right">
        <h3 class="login-frame-title">广告主后台系统登陆</h3>
        <div class="username-frame">
          <i class="iconfont icon-yonghu"></i>
          <input class="username" type="text" placeholder="请输入账号" v-model="account" @focus="tipsTag=false" @keyup.enter="login">
        </div>
        <div class="password-frame">
          <i class="iconfont icon-mima"></i>
          <input class="password" type="password" placeholder="请输入密码" v-model="passwd" @focus="tipsTag=false" @keyup.enter="login">
        </div>
        <div class="code valid-code">
          <i class="iconfont icon-zhucedengluyanzhengma"></i>
          <input class="valid" placeholder="请输入验证码" v-model="identifyCodeInp" @focus="tipsTag=false" @keyup.enter="login">
          <div class="identifyCode-frame" @click="refreshCode">
            <identify :identifyCode="identifyCode"></identify>
          </div>
        </div>
        <transition name="tips">
          <div class="error-tip" v-if="tipsTag">{{tips}}</div>
        </transition>
        <div class="login-btn">
          <el-button type="warning" round @click="login">登 录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import identify from '../public/identify'
import {baseUrl} from '../../common/js/common.js'

export default {
  data () {
    return {
      account: '',
      passwd: '',
      identifyCodes: '1234567890',
      identifyCode: '',
      identifyCodeInp: '',
      tips: '账号或密码不能为空',
      tipsTag: false
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 登陆
    login () {
      if (this.account === '' || this.passwd === '') {
        this.tipsTag = true
        this.tips = '账号和密码不可为空'
      } else if (this.identifyCodeInp === '') {
        this.tipsTag = true
        this.tips = '验证码不可为空'
      } else if (this.identifyCodeInp === this.identifyCode) {
        this.$http.post(baseUrl + '/user/login', {
          account: this.account,
          passwd: require('md5')(this.passwd)
        }, { emulateJSON: true }).then(res => {
          if (res.body.status === 100) {
            // let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            let redirect = decodeURIComponent('/')
            this.$router.replace({
              path: redirect
            })
          } else {
            this.tipsTag = true
            this.tips = '账号或密码错误'
            this.refreshCode()
            this.passwd = ''
            this.identifyCodeInp = ''
          }
        })
      } else {
        this.tipsTag = true
        this.tips = '验证码错误，请重试'
        this.identifyCodeInp = ''
        this.refreshCode()
      }
    },
    // 判断是否登陆
    isLogin () {
      console.log('登陆')
    },
    // 生成随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 刷新验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 制作验证码图片 参数分别是：可选择构成验证码的字符， 验证码的位数
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    }
  },
  components: {
    identify
  },
  created () {
    // this.isLogin()
  }
}
</script>

<style lang="scss">
@import '../../common/scss/color.scss';

#login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../../common/img/login_bg.png'), url('../../common/img/login_bg2.png');
  .login-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 560px;
    box-sizing: border-box;
    overflow: hidden;
    background: url('../../common/img/image_1.png') no-repeat left;
    border-radius: 10px;
    box-shadow: 0 0 30px #e0e0e0;
    .left {
      position: absolute;
      left: 0;
      width: 50%;
      height: 100%;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .right {
      background-color: #fff;
      position: absolute;
      right: 0;
      width: 50%;
      height: 100%;
      padding: 72px 60px 79px;
      box-sizing: border-box;
      .login-frame-title {
        color: $mainColor;
        text-align: center;
        margin-bottom: 40px;
        font-size: 24px;
        font-weight: 400;
      }
      .username-frame, .password-frame, .valid-code {
        height: 49px;
        position: relative;
        margin-top: 20px;
        .iconfont {
          height: 16px;
          color: #999;
          position: absolute;
          margin: auto;
          top: 8px;
          left: -4px;
          font-size: 30px;
          &.icon-zhucedengluyanzhengma {
            left: -1px;
            font-size: 26px;
          }
        }
      }
      .username, .password, .valid {
        height: 100%;
        border-bottom: 1px solid $borderColor;
        border-radius: 0;
        padding-left: 46px;
        box-sizing: border-box;
        width: 100%;
        font-size: 16px;
        font-family: 'Microsoft YaHei';
      }
      .login-btn {
        position: absolute;
        left: 60px;
        bottom: 78px;
        .el-button {
          font-family: 'Microsoft YaHei';
          border: none;
          background-color: $mainColor;
          width: 330px;
          border-radius: 30px;
          height: 59px;
          font-size: 24px;
          box-shadow: 0 0 10px #feaf62;
          &:hover {
            background-color: $mainColor;
          }
        }
      }
      .valid-code {
        position: relative;
        .identifyCode-frame {
          display: inline;
          position: absolute;
          top: 2px;
          right: 0;
        }
      }
      .error-tip {
        margin-top: 20px;
        font-size: 15px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        color: #ff0000;
      }
    }
  }
  .tips-enter,
  .tips-leave-to {
    opacity: 0;
  }
  .tips-enter-active,
  .tips-leave-active {
    transition: all 0.2s ease-in-out;
  }
}
</style>
