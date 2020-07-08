<template>
  <div class="time-table-container">
    <div @click="$emit('close')" class="close">
      <img src="../../../assets/images/close.png" />
    </div>
    <div class="section section-tabs">
      <el-tabs class="tabs-container" v-model="activeDeivcce">
        <el-tab-pane
          :key="item.id"
          v-for="item in deviceList"
          :label="`${item.coordinate}-${item.orientation}-${item.code}`"
          :name="`${item.id}`"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="choosedDates.length <= 0 || editingDate" class="section section-chooseDate">
      <h4>请选择活动时间</h4>
      <el-date-picker
        v-model="timeRange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <br />
      <div @click="e => setDateRangeHandle()" class="button">保存</div>
    </div>
    <div v-else class="section section-dateList">
      <el-radio-group v-model="activeDate" style="margin-bottom: 30px;">
        <el-radio-button :label="date" :key="date" v-for="date in choosedDates">
          <div class="dateGrid">
            <div class="week-view">周{{getWeekDay(date)}}</div>
            <div class="date-view">{{getDate(date)}}</div>
          </div>
        </el-radio-button>
        <el-radio-button label="edit">
          <div class="dateGrid">
            <i class="el-icon-edit-outline"></i>
          </div>
        </el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="activeDate" class="section section-table">
      <el-table :cell-class-name="getCellClass" :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="range" label="时间段" width="300">
          <template slot-scope="scope">
            <el-time-picker
              size="small"
              v-if="editingRowIndex === scope.$index"
              class="dateTimeGroup-time"
              is-range
              v-model="dataForm.range"
              format="HH:mm:ss"
              range-separator="-"
              :default-value="scope.row.range"
            ></el-time-picker>
            <span v-else>{{ scope.row.workTimeStart }} ~ {{ scope.row.workTimeEnd }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="personInCharge" label="负责人" width="180">
          <template slot-scope="scope">
            <el-input
              placeholder="负责人"
              v-model="dataForm.personInCharge"
              size="small"
              v-if="editingRowIndex === scope.$index"
            ></el-input>
            <span v-else>{{ scope.row.personInCharge }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="personOnDuty" label="当班人员">
          <template slot-scope="scope">
            <el-input
              placeholder="输入当班人员，多个用英文,隔开"
              v-model="dataForm.personOnDuty"
              size="small"
              v-if="editingRowIndex === scope.$index"
            ></el-input>
            <span v-else>{{ scope.row.personOnDuty }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="action" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="e => saveHandle(scope.row)"
              v-if="editingRowIndex === scope.$index"
              type="text"
            >保存</el-button>
            <el-button
              @click="e => cancelHandle(scope.row, scope.$index)"
              v-if="editingRowIndex === scope.$index"
              type="text"
            >取消</el-button>
            <el-button
              @click="e => setEditingRowHandle(scope.row, scope.$index)"
              v-else
              type="text"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="editingRowIndex < 0" @click="addRowHandle" class="icon-addRow">
        <i class="el-icon-plus"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment'

const pickerOptions = {
  shortcuts: [{
    text: '往后一周',
    onClick(picker) {
      const start = new Date();
      const end = new Date();
      end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }]
}
const getInitialData = () => {
  return {
    range: [moment('2020-07-07 09:00:00'), moment('2020-07-07 18:00:00')],
    personInCharge: '',
    personOnDuty: '',
  }
}

export default {
  data() {
    return {
      activeDeivcce: '',
      deviceList: [],
      pickerOptions,
      timeRange: [],
      choosedDates: [],
      editingDate: false,
      activeDate: '',
      tableData: [],
      editingRowIndex: -1,
      dataForm: getInitialData(),
    };
  },
  props: [],
  methods: {
    init() {
      
    },
    initDeviceList() {
      this.deviceList = []
      axios.post('/api/device/search', {
        page: 0,
        pageSize: 50
      }).then(res => {
        if (Array.isArray(res.data.data.list)) {
          this.deviceList = res.data.data.list
          this.activeDeivcce = String(this.deviceList[0].id)
        }
      })
    },
    initDateList() {
      axios.post('/api/onDutyTime/search', {
        page: 0,
        pageSize: 50
      }).then(res => {
        if (Array.isArray(res.data.data.list)) {
          this.choosedDates = []
          this.activeDate = this.choosedDates[0]
        }
      })
    },
    initTable() {
      this.tableData = []
      this.dataForm = getInitialData()
      this.editingRowIndex = -1
      axios.post('/api/onDutyDetail/search', {
        deviceId: this.activeDeivcce,
        date: this.activeDate,
        page: 0,
        pageSize: 50,
      }).then(res => {
        if (Array.isArray(res.data.data.list)) {
          this.tableData = res.data.data.list
        }
      })
    },
    setDateRangeHandle() {
      if (this.timeRange.length !== 2) {
        this.$message({
          type: 'error',
          message: '请选择日期范围！'
        })
      } else {
        const [start, end] = this.timeRange
        const dateList = []
        let day = moment(start)
        const endDay = moment(end)
        while (day.valueOf() <= endDay.valueOf()) {
          dateList.push(day.format('MM-DD'))
          day.add(1, 'days')
        }
        this.choosedDates = dateList
        this.editingDate = false
        this.activeDate = this.choosedDates[0]
        axios.post('/api/onDutyTime', {
          dateList
        }).then(res => {
          this.editingDate = false
        })
      }
    },
    getWeekDay(date) {
      return moment(date).format('dd')
    },
    getDate(date) {
      return moment(date).format('MM-DD')
    },
    dateChangeHandle(date) {
      console.log(date);
      
    },
    addRowHandle() {
      this.tableData.push({})
      this.editingRowIndex = this.tableData.length - 1
    },
    setEditingRowHandle(row, index) {
      const { personInCharge, personOnDuty, workTimeStart, workTimeEnd } = row
      this.dataForm = {
        range: [moment(`2020-07-07 ${workTimeStart}`), moment(`2020-07-07 ${workTimeEnd}`)],
        personInCharge: row.personInCharge,
        personOnDuty: row.personOnDuty,
      }
      this.editingRowIndex = index
    },
    cancelHandle(row, index) {
      if (!row.id) {
        this.tableData.splice(index, 1)
      }
      this.dataForm = getInitialData()
      this.editingRowIndex = -1
    },
    saveHandle(row) {
      const { range, personInCharge, personOnDuty } = this.dataForm
      if (!range) {
        return this.$message({
          type: 'error',
          message: '请选择时间段'
        })
      }
      if (!personInCharge) {
        return this.$message({
          type: 'error',
          message: '请输入负责人'
        })
      }
      if (!personOnDuty) {
        return this.$message({
          type: 'error',
          message: '请输入值班人员'
        })
      }
      let method = 'post'
      const { billId, id } = row
      if (id) {
        method = 'put'
      }
      const params = {
        id,
        billId,
        workDate: this.activeDate,
        workTimeStart: range[0].format('HH:mm:ss'),
        workTimeEnd: range[1].format('HH:mm:ss'),
        personInCharge,
        personOnDuty,
      }
      axios[method]('/api/onDutyDetail', params)
        .then(res => {
          this.cancelHandle()
          this.initTable()
        })
    },
    getCellClass({row, column, rowIndex, columnIndex}) {
      if (column.property === 'personOnDuty' && this.editingRowIndex !== rowIndex) {
        return 'personOnDuty-active'
      }
    }
  },
  watch: {
    activeDate: function (value) {
      if (value === 'edit') {
        this.activeDate = ''
        this.editingDate = true
      } else {
        this.initTable()
      }
    }
  },
  mounted(){
    this.init()
    this.initDeviceList()
    this.initDateList()
  }
};
</script>
<style lang="less" scope>
  @borderColor: #02efff;
  @primarycolor: darken(@borderColor, 10%);
  @inputColor: rgba(34, 164, 255, 0.1);
  .time-table-container {
    width: 100%;
    height: 100%;
    position: relative;
    background: rgba(9, 18, 54, 0.95);
    border: 1px solid @borderColor;
    box-sizing: border-box;
    text-align: left;
    padding: 0px 32px;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      padding: 16px;
      cursor: pointer;
    }
    .section {
      margin-top: 16px;
    }
    .section-tabs {
      .tabs-container {
        .el-tabs__item {
          color: #fefefe;
          &.is-active {
            color: @primarycolor;
          }
        }
        .el-tabs__active-bar {
          background-color: @primarycolor;
        }
      }
    }
    .section-chooseDate {
      h4 {
        margin-bottom: 16px;
      }
      .button {
        width: 324px;
        text-align: center;
        margin-top: 24px;
      }
    }
    .section-dateList {
      .dateGrid {
        height: 32px;
        width: 50px;
        line-height: 16px;
        .week-view,
        .date-view {
          font-weight: 800;
        }
        i {
          font-size: 24px;
          line-height: 32px;
        }
      }
    }
    .section-table {
      text-align: center;
      .el-date-editor {
        width: 200px;
      }
      .personOnDuty-active {
        background: @primarycolor!important;
        color: #fefefe;
        &:hover {
          background: darken(@borderColor, 5%) !important;
        }
      }
      .icon-addRow {
        cursor: pointer;
        background: #fff;
        color: #222;
        font-size: 20px;
        font-weight: 600;
        padding: 8px 0;
        &:hover {
          color: @primarycolor;
        }
      }
    }
  }
</style>
<style lang="less">
  @borderColor: #02efff;
  @primarycolor: darken(@borderColor, 10%);
  @inputColor: rgba(34, 164, 255, 0.1);
  .time-table-container {
    .section-chooseDate,
    .section-dateList {
      .el-input__inner {
        background: @inputColor;
      }
      .el-range-input {
        background: transparent;
        color: #fefefe;
      }
      .el-range-separator {
        color: #fefefe;
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: @primarycolor;
        border-color: @primarycolor;
        box-shadow: none;
        color: #fff;
      }
      .el-radio-button__inner:hover {
        color: @primarycolor;
      }
    }
  }
</style>