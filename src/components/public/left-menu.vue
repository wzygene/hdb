<template>
  <div class="leftMenu">
    <div class="menu">
      <div class="data-govern">
        <router-link tag="span" to="/dataGovern" :class="['govern-tab', {'active':link === '/dataGovern'}]" @click="link">
          <p><i class="iconfont icon-shuju4"></i>广告管理</p>
        </router-link>
        <router-link tag="span" to="/planGovern" :class="['govern-tab', {'active':link === '/planGovern' || link === '/editPlan'}]" @click="link">
          <p><i class="iconfont icon-zhaopian2"></i>计划管理</p>
        </router-link>
      </div>
      <div class="plan-govern"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      link: this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/scss/color.scss';

  @media screen and (max-width: 1600px) {
    .leftMenu {
      padding-top: 70px;
    }
  }
  @media screen and (min-width: 1601px) {
    .leftMenu {
      padding-top: 97px;
    }
  }
  .leftMenu {
    width: 183px;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: $leftMenuColor;
    .data-govern {
      width: 100%;
      color: #fff;
      .govern-tab {
        cursor: pointer;
        padding: 26px 0;
        box-sizing: border-box;
        display: block;
        width: 100%;
        height: 72px;
        font-size: 16px;
        p {
          font-size: 18px;
          text-align: center;
          height: 20px;
        }
        .iconfont {
          margin-right: 18px;
        }
        &:hover {
          background-color: #38383b;
        }
        &.active {
          background-color: #38383b;
          color: $mainColor;
          p {
            border-left: 1px solid $mainColor;
          }
        }
      }
    }
  }
</style>
