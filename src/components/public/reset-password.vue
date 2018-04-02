<template>
  <transition name="reset">
    <div class="reset-password">
      <div class="reset-frame">
        <div class="header">
          <h4>修改密码</h4>
          <span class="iconfont icon-untitled94" @click="close(false)"></span>
        </div>
        <div class="body">
          <div class="input-group current-password">
            <span>原密码：</span>
            <el-input type="password" class="current-password-input" placeholder="输入原密码" v-model="passwdcur" @focus="resetTag = false"></el-input>
          </div>
          <div class="input-group new-password">
            <span>新密码：</span>
            <el-input type="password" class="new-password-input" placeholder="输入新密码（8至15位数字字母组合）" v-model="passwdnew" @focus="resetTag = false"></el-input>
          </div>
          <div class="input-group confirm-new-password">
            <span>确认密码：</span>
            <el-input type="password" class="confirm-new-password-input" placeholder="确认新密码（8至15位数字字母组合）" v-model="passwdagain" @focus="resetTag = false"></el-input>
          </div>
          <div class='tips' v-if="resetTag">{{resetTips}}</div>
        </div>
        <div class="footer">
          <el-button @click="close(false)" class="cancel">取消</el-button>
          <el-button @click="close(true)" class="confirm" type="warning">确定</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {baseUrl} from '../../common/js/common'

export default {
  props: {
    flag: Boolean,
    passwdcur: String,
    passwdnew: String,
    passwdagain: String
  },
  data () {
    return {
      openFlag: true,
      resetTips: '',
      resetTag: false
    }
  },
  methods: {
    close (tag) {
      if (tag) {
        if (this.passwdcur === '') {
          this.resetTips = '原密码输入不可为空'
          this.resetTag = true
        } else if (this.passwdnew === '') {
          this.resetTips = '请输入新密码'
          this.resetTag = true
        } else if (this.passwdagain === '') {
          this.resetTips = '请输入确认密码'
          this.resetTag = true
        } else if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/.test(this.passwdnew) || /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/.test(this.passwdagain))) {
          this.resetTips = '请输入8至15位数字与字母组合密码'
          this.resetTag = true
          this.passwdnew = ''
          this.passwdagain = ''
        } else if (this.passwdnew !== this.passwdagain) {
          this.resetTips = '新密码与确认密码不一致'
          this.resetTag = true
          this.passwdnew = ''
          this.passwdagain = ''
        } else {
          this.$http.post(baseUrl + '/user/modifypwd', {
            passwdcur: this.passwdcur,
            passwdnew: this.passwdnew,
            passwdagain: this.passwdagain
          }, { emulateJSON: true }).then(result => {
            const res = result.body
            if (res.status === 301) {
              this.$emit('close', true)
              this.resetTag = false
            } else {
              this.resetTips = res.remark
              this.resetTag = true
              this.passwdcur = ''
              this.passwdnew = ''
              this.passwdagain = ''
            }
          })
        }
      } else {
        this.$emit('close', false)
        this.resetTag = false
        this.passwdcur = ''
        this.passwdnew = ''
        this.passwdagain = ''
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../../common/scss/color.scss';

  .reset-password {
    color: #666;
    z-index: 2000;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.26);
    .reset-frame {
      box-shadow: 0 0 30px #e0e0e0;
      width: 548px;
      height: 360px;
      background-color: #fff;
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 6px;
      .header {
        text-align: center;
        position: relative;
        border-bottom: 1px solid #e0e0e0;
        color: #333;
        font-size: 20px;
        font-weight: 700;
        line-height: 68px;
        .iconfont {
          color: #999;
          position: absolute;
          top: 2px;
          right: 30px;
          font-size: 20px;
          &:hover {
            color: $mainColor;
          }
        }
      }
      .body {
        padding: 17px 81px 35px 83px;
        color: #999;
        font-size: 16px;
        position: relative;
        .input-group {
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
          margin: 12px;
          span {
            display: block;
            width: 80px;
            text-align: right;
            line-height: 36px;
          }
        }
        .tips {
          text-align: center;
          color: $mainColor;
          position: absolute;
          margin: auto;
          left: 0;
          right: 0;
          top: 178px;
        }
        .el-input {
          width: 280px;
          font-size: 14px;
        }
        input::-webkit-input-placeholder{
            color:#999;
        }
        input::-moz-placeholder{
            color:#999;
        }
        input:-moz-placeholder{
            color:#999;
        }
        input:-ms-input-placeholder{
            color:#999;
        }
      }
      .footer {
        padding: 0 130px;
        display: flex;
        justify-content: space-between;
        .el-button {
          font-size: 18px;
          width: 130px;
          height: 40px;
          border-radius: 20px;
          &.cancel {
            border-color: #e0e0e0;
            color: #666;
          }
          &.confirm {
            border: none;
            &:hover {
              background-color: $mainColor;
            }
          }
        }
      }
    }
  }
  .reset-enter,
  .reset-leave-to {
    opacity: 0;
  }

  .reset-enter-active,
  .reset-leave-active {
    transition: all 0.4s ease;
  }
</style>
