<template>
  <div class="data-govern">
    <top :username="username"></top>
    <leftMenu></leftMenu>
    <div class="data-govern-body">
      <div class="header">位置：计划管理</div>
      <div class="data-search">
        <div class="left">
          <div class="block">
            <el-date-picker
              :editable=false
              v-model="planList.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="block">
            <el-input placeholder="计划ID" @keypress.native="inputLimit" v-model="planList.putonid" class="input" clearable @keyup.enter.native="getPlan" @clear="getPlan"></el-input>
          </div>
          <div class="block">
            <el-input placeholder="广告ID" @keypress.native="inputLimit" v-model="planList.adid" class="input" clearable @keyup.enter.native="getPlan" @clear="getPlan"></el-input>
          </div>
          <div class="block">
            <el-button class="search-btn" type="warning" @click="getPlan">查 询</el-button>
          </div>
        </div>
      </div>
      <div class="data-table">
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" >
          <el-table-column prop="PutOnId" label="计划ID"></el-table-column>
          <el-table-column prop="Adid" label="广告ID"></el-table-column>
          <el-table-column prop="AdTaskName" label="广告计划名称" width="200"></el-table-column>
          <el-table-column prop="ExposureCount" label="广告曝光" ></el-table-column>
          <el-table-column prop="CTRStr" label="点击率"></el-table-column>
          <el-table-column prop="ChargeTypeFilter" label="计费类型"></el-table-column>
          <el-table-column prop="ClickPvCount" label="计费点击" ></el-table-column>
          <el-table-column prop="TransferPvCount" label="转化PV" ></el-table-column>
          <el-table-column prop="price" label="计费单价" ></el-table-column>
          <el-table-column prop="InCome" label="消耗" ></el-table-column>
          <el-table-column prop="StatisDate" label="日期" width="150"></el-table-column>
           <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" ><span>查看计划</span></el-button>
            </template>
          </el-table-column>
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
      planList: {
        date: ['', ''],
        putonid: '',
        adid: '',
        page: 1
      },
      tableData: []
    }
  },
  methods: {
    tableRowClassName (row) { // 列表各行换色
      if (row.rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return ''
      }
    },
    handleClick (row) { // 查看计划
      this.$router.push({
        path: 'editPlan',
        query: {
          id: row.PutOnId
        }
      })
    },
    getPlan () { // 获取计划数据
      if (this.planList.putonid !== '' && !/^\d+$/.test(this.planList.putonid)) {
        this.$message({
          message: '您输入的ID有误，请重新输入',
          type: 'warning'
        })
        this.planList.putonid = ''
        return
      } else if (this.planList.adid !== '' && !/^\d+$/.test(this.planList.adid)) {
        this.$message({
          message: '您输入的ID有误，请重新输入',
          type: 'warning'
        })
        this.planList.adid = ''
        return
      }
      const params = {
        begindate: formatDate(this.planList.date ? this.planList.date[0] : ''),
        enddate: formatDate(this.planList.date ? this.planList.date[1] : ''),
        adname: this.planList.adname,
        putonid: parseInt(this.planList.putonid) || null,
        adid: parseInt(this.planList.adid) || null,
        page: this.planList.page || 1
      }
      this.$http.get(baseUrl + '/puton/list', {params: params}, { emulateJSON: true }).then(result => {
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
            item.price = item.Price.toFixed(2)
            if (item.ChargeType === 1) {
              item.ChargeTypeFilter = 'CPC'
              item.TransferPvCount = '-'
            } else {
              item.ChargeTypeFilter = 'CPA'
              item.ClickPvCount = '-'
            }
          })
          console.log(this.tableData)
          this.username = res.username
          this.dataNum = res.TotalNum
        }
      })
    },
    changePage (currentPage) {
      this.planList.page = currentPage
      this.getPlan()
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
  components: {
    top,
    leftMenu
  },
  created () {
    this.getPlan()
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
      padding: 22px;
      display: flex;
      height: 88px;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      box-sizing: border-box;
      box-shadow: 0 0 3px #e0e0e0;
      .left {
        display: flex;
        justify-content: flex-start;
        .block {
          margin-right: 23px;
          .advertiseName {
            width: 150px;
          }
        }
        .search-btn {
          border-radius: 20px;
          width: 94px;
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
        border: 1px solid $mainColor;
        width: 240px;
        text-align: center;
        height: 34px;
        line-height: 34px;
        border-radius: 17px;
        font-size: 14px;
        color: $mainColor;
      }
    }
    .data-table {
      box-shadow: 0 0 3px #e0e0e0;
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
    .input {
      width: 120px;
    }
    .el-button--text {
      border: none;
      color: $mainColor;
      span {
        border-bottom: 1px solid $mainColor;
      }
    }
  }
</style>
