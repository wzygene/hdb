<template>
  <div class="data-govern">
    <top :username="username"></top>
    <leftMenu></leftMenu>
    <div class="data-govern-body">
      <div class="header">位置：广告管理</div>
      <div class="data-search">
        <div class="left">
          <div class="block">
            <el-date-picker
              :editable=false
              v-model="dateList.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="block">
            <el-input placeholder="广告ID" ref="adid" @keypress.native="inputLimit" v-model="dateList.adid" class="input search_id" clearable @keyup.enter.native="getList" @clear="getList"></el-input>
          </div>
          <div class="block">
            <el-input placeholder="广告名称" v-model="dateList.adname" class="input advertiseName" clearable @keyup.enter.native="getList"  @clear="getList"></el-input>
          </div>
          <div class="block">
            <el-button class="search-btn" type="warning" @click="getList" >查 询</el-button>
          </div>
        </div>
        <div class="right">
          账户余额（元）：<span class="yuan">{{balance}}</span>
        </div>
      </div>
      <div class="data-table">
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName"  >
          <el-table-column prop="AdId" label="广告ID"></el-table-column>
          <el-table-column prop="AdName" label="广告名称"></el-table-column>
          <!-- <el-table-column prop="ExposureCount" label="广告曝光" ></el-table-column> -->
          <!-- <el-table-column prop="Click" label="点击计费" ></el-table-column> -->
          <!-- <el-table-column prop="CTRStr" label="点击率"></el-table-column> -->
          <!-- <el-table-column prop="AccessPrice" label="点击单价" ></el-table-column> -->
          <el-table-column prop="inCome" label="消耗（元）" ></el-table-column>
          <el-table-column prop="StatisDate" label="统计时间"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-if="dataNum > 20"
        page-size="20"
        @current-change="changePage"
        :current-page="1"
        layout="prev, pager, next, jumper"
        :total="dataNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import top from '../public/top.vue'
import leftMenu from '../public/left-menu.vue'
import {baseUrl, formatDate} from '../../common/js/common'

export default {
  data () {
    return {
      username: '',
      dataNum: 0,
      balance: 0,
      tableData: [],
      dateList: {
        date: ['', ''],
        adname: '',
        adid: '',
        page: 1
      }
    }
  },
  methods: {
    tableRowClassName (row) {
      if (row.rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return ''
      }
    },
    getList () {
      if (this.dateList.adid !== '' && !/^\d+$/.test(this.dateList.adid)) {
        this.$message({
          message: '您输入的ID有误，请重新输入',
          type: 'warning'
        })
        this.dateList.adid = ''
        return
      }
      const params = {
        begindate: formatDate(this.dateList.date ? this.dateList.date[0] : ''),
        enddate: formatDate(this.dateList.date ? this.dateList.date[1] : ''),
        adname: this.dateList.adname,
        adid: parseInt(this.dateList.adid) || null,
        page: this.dateList.page
      }
      this.$http.get(baseUrl + '/data/list', {params: params}, { emulateJSON: true }).then(result => {
        const res = result.body
        if (res.status === 101) {
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        } else {
          this.tableData = res.data
          this.tableData.forEach(item => {
            item.inCome = item.InCome.toFixed(2)
          })
          this.dataNum = res.TotalNum
          this.balance = res.balance
          this.username = res.username
        }
      })
    },
    changePage (currentPage) {
      this.dateList.page = currentPage
      this.getList()
    },
    inputLimit (ev) {
      const oEv = ev || event
      const code = oEv.keyCode || oEv.charCode
      if (code === 8 || code === 9 || code === 46) {
        return 0
      } else if (code === undefined || !/[\d{1}]/g.test(String.fromCharCode(code))) {
        if (oEv.returnValue) {
          oEv.returnValue = false
        } else {
          oEv.preventDefault()
        }
      }
    }
  },
  created () {
    this.getList()
  },
  components: {
    top,
    leftMenu
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/scss/color.scss';

  .data-govern {
    width: 100%;
  }
  .data-govern-body {
    padding: 20px 30px 20px 20px;
    position: relative;
    .header {
      height: 55px;
      line-height: 55px;
      padding-left: 22px;
      background-color: #fff;
      font-size: 18px;
      color: #333;
      box-shadow: 0 0 3px #e0e0e0;
    }
    .data-search {
      margin: 20px 0;
      box-shadow: 0 0 3px #e0e0e0;
      padding: 10px 10px 10px 22px;
      display: flex;
      height: 88px;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      box-sizing: border-box;
      .left {
        display: flex;
        justify-content: flex-start;
        .block {
          margin-right: 23px;
          .advertiseName {
            width: 150px;
          }
          .search_id {
            input {
              ime-mode: disabled;
            }
          }
        }
        .search-btn {
          width: 95px;
          border-radius: 20px;
          border: none;
          &:hover {
            background-color: $mainColor;
          }
          &:active {
            background-color: $mainColor;
          }
          &:focus {
            background-color: $mainColor;
          }
        }
      }
      .right {
        margin-right: 12px;
        border: 1px solid $mainColor;
        width: 193px;
        text-align: center;
        height: 40px;
        border-radius: 20px;
        line-height: 40px;
        font-size: 14px;
        color: $mainColor;
        overflow: hidden;
      }
    }
    .data-table {
      box-shadow: 0 0 3px #e0e0e0;
      .el-table {
        border: none;
      }
    }
    .input {
      width: 120px;
    }
    .el-pagination {
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      bottom: -80px;
      width: 416px;
      padding-bottom: 40px;
    }
  }
</style>
