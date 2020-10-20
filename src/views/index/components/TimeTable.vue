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
    <div v-if="choosedDates.length <= 0" class="button setTime-button">
      设置时间
    </div>
    <div v-else class="section section-dateList">
      <el-radio-group v-model="activeDate" style="margin-bottom: 30px;">
        <el-radio-button :label="date" :key="date" v-for="date in choosedDates">
          <div class="dateGrid">
            <div class="date-view">{{ getDate(date) }}</div>
            <div class="week-view">周{{ getWeekDay(date) }}</div>
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
      <el-table
        :cell-class-name="getCellClass"
        :data="tableData"
        border
        style="width: 100%;"
      >
        <el-table-column align="center" prop="range" label="时间段" width="300">
          <template slot-scope="scope">
            <el-time-picker
              size="medium"
              v-if="editingRowIndex === scope.$index"
              class="dateTimeGroup-time"
              is-range
              v-model="dataForm.range"
              format="HH:mm"
              range-separator="-"
              :default-value="scope.row.range"
            ></el-time-picker>
            <span v-else
              >{{ scope.row.workTimeStart.slice(0, 5) }} ~
              {{ scope.row.workTimeEnd.slice(0, 5) }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="personInCharge"
          label="负责人"
          width="180"
        >
          <template slot-scope="scope">
            <el-input
              placeholder="负责人"
              style="width: 120px;"
              v-model="dataForm.personInCharge"
              size="medium"
              v-if="editingRowIndex === scope.$index"
            ></el-input>
            <span v-else>{{ scope.row.personInCharge }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="personOnDuty" label="当班人员">
          <template slot-scope="scope">
            <el-input
              placeholder="输入当班人员，多个用英文,隔开"
              style="width: 320px;"
              v-model="dataForm.personOnDuty"
              size="medium"
              v-if="editingRowIndex === scope.$index"
            ></el-input>
            <span v-else>{{ scope.row.personOnDuty }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="action" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="(e) => saveHandle(scope.row)"
              v-if="editingRowIndex === scope.$index"
              type="text text-button"
              >保存</el-button
            >
            <el-button
              @click="(e) => cancelHandle(scope.row, scope.$index)"
              v-if="editingRowIndex === scope.$index"
              type="text text-button"
              >取消</el-button
            >
            <el-button
              @click="(e) => setEditingRowHandle(scope.row, scope.$index)"
              v-if="editingRowIndex !== scope.$index"
              type="text text-button"
              >编辑</el-button
            >
            <el-button
              v-if="!!scope.row.id"
              @click="(e) => deleteHandle(scope.row, scope.$index)"
              type="text text-button"
              style="color: #f56c6c;"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div v-if="editingRowIndex < 0" @click="addRowHandle" class="icon-addRow">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <modal
      class="modal-set-date"
      :clickToClose="false"
      height="580"
      width="782"
      name="set-date"
    >
      <div class="title">
        <div class="point"></div>
        <div class="name">设置时间</div>
      </div>
      <div @click="cancelDateSetting" class="set-date-close">
        <img src="../../../assets/images/close.png" />
      </div>
      <div class="section section-chooseDate">
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
        <div @click="(e) => setDateRangeHandle()" class="button">保存</div>
      </div>
    </modal>
  </div>
</template>

<script>
  import axios from "axios";
  import moment from "moment";

  const pickerOptions = {
    shortcuts: [
      {
        text: "往后一周",
        onClick(picker) {
          const start = new Date();
          const end = new Date();
          end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
          picker.$emit("pick", [start, end]);
        },
      },
    ],
  };
  const getInitialData = () => {
    return {
      range: [moment("2020-07-07 09:00:00"), moment("2020-07-07 18:00:00")],
      personInCharge: "",
      personOnDuty: "",
    };
  };
  const billIdMap = {};
  export default {
    data() {
      return {
        activeDeivcce: "",
        deviceList: [],
        pickerOptions,
        timeRange: [],
        choosedDates: [],
        editingDate: false,
        activeDate: "",
        tableData: [],
        editingRowIndex: -1,
        dataForm: getInitialData(),
      };
    },
    props: [],
    methods: {
      initDeviceList() {
        this.deviceList = [];
        return axios
          .post("/api/device/search", {
            page: 0,
            pageSize: 50,
          })
          .then((res) => {
            if (Array.isArray(res.data.data.list)) {
              this.deviceList = res.data.data.list;
              this.activeDeivcce = String(this.deviceList[0].id);
            }
          });
      },
      initDateList() {
        axios
          .post("/api/onDutyTime/search", {
            page: 0,
            pageSize: 50,
          })
          .then((res) => {
            const list = res.data.data.list;
            if (Array.isArray(list)) {
              this.choosedDates = list
                .map((item) => {
                  billIdMap[item.onDutyDate] = item.id;
                  return item.onDutyDate;
                })
                .sort((a, b) => {
                  return moment(a).valueOf() - moment(b).valueOf();
                });
              this.activeDate = this.choosedDates[0];
            }
          });
      },
      initTable() {
        this.tableData = [];
        this.dataForm = getInitialData();
        this.editingRowIndex = -1;
        axios
          .post("/api/onDutyDetail/search", {
            date: this.activeDate,
            billId: billIdMap[this.activeDate],
            page: 0,
            pageSize: 50,
            deviceId: this.activeDeivcce,
          })
          .then((res) => {
            if (Array.isArray(res.data.data.list)) {
              this.tableData = res.data.data.list;
            }
          });
      },
      setDateRangeHandle() {
        if (this.timeRange.length !== 2) {
          this.$message({
            type: "error",
            message: "请选择日期范围！",
          });
        } else {
          const [start, end] = this.timeRange;
          const dateList = [];
          let day = moment(start);
          const endDay = moment(end);
          while (day.valueOf() <= endDay.valueOf()) {
            dateList.push(day.format("YYYY-MM-DD"));
            day.add(1, "days");
          }
          axios
            .post("/api/onDutyTime", {
              dateList,
              deviceId: this.activeDeivcce,
            })
            .then((res) => {
              this.cancelDateSetting();
              this.initDateList();
              this.editingDate = false;
              this.$modal.hide("set-date");
            });
        }
      },
      getWeekDay(date) {
        return moment(date).format("dd");
      },
      getDate(date) {
        return moment(date).format("MM-DD");
      },
      addRowHandle() {
        this.tableData.push({});
        this.editingRowIndex = this.tableData.length - 1;
      },
      setEditingRowHandle(row, index) {
        const { personInCharge, personOnDuty, workTimeStart, workTimeEnd } = row;
        this.dataForm = {
          range: [
            moment(`2020-07-07 ${workTimeStart}`),
            moment(`2020-07-07 ${workTimeEnd}`),
          ],
          personInCharge: row.personInCharge,
          personOnDuty: row.personOnDuty,
        };
        this.editingRowIndex = index;
      },
      cancelHandle(row, index) {
        if (row && !row.id) {
          this.tableData.splice(index, 1);
        }
        this.dataForm = getInitialData();
        this.editingRowIndex = -1;
      },
      deleteHandle(row) {
        const { id } = row;
        this.$confirm("确定删除吗?").then(() => {
          axios.delete("/api/onDutyDetail/" + id).then((res) => {
            this.cancelHandle();
            this.initTable();
          });
        });
      },
      saveHandle(row) {
        const { range, personInCharge, personOnDuty } = this.dataForm;
        if (!range) {
          return this.$message({
            type: "error",
            message: "请选择时间段",
          });
        }
        if (!personInCharge) {
          return this.$message({
            type: "error",
            message: "请输入负责人",
          });
        }
        if (!personOnDuty) {
          return this.$message({
            type: "error",
            message: "请输入值班人员",
          });
        }
        let method = "post";
        const { id, version } = row;
        if (id) {
          method = "put";
        }
        const params = {
          id,
          billId: billIdMap[this.activeDate],
          workDate: this.activeDate,
          workTimeStart: moment(range[0]).format("HH:mm:ss"),
          workTimeEnd: moment(range[1]).format("HH:mm:ss"),
          personInCharge,
          personOnDuty,
          version,
          deviceId: this.activeDeivcce,
        };
        axios[method]("/api/onDutyDetail", params).then((res) => {
          this.cancelHandle();
          this.initTable();
        });
      },
      getCellClass({ row, column, rowIndex, columnIndex }) {
        if (
          column.property === "personOnDuty" &&
          this.editingRowIndex !== rowIndex &&
          row.workStatus == 1
        ) {
          return "personOnDuty-active";
        }
      },
      cancelDateSetting() {
        if (this.choosedDates.length > 0) {
          this.activeDate = this.choosedDates[0];
        } else {
          this.activeDate = "";
        }
        this.$modal.hide("set-date");
      },
    },
    watch: {
      activeDate: function (value) {
        if (value === "edit") {
          this.$modal.show("set-date");
        } else {
          this.initTable();
        }
      },
      activeDeivcce: function (value) {
        this.initTable();
      },
    },
    async mounted() {
      await this.initDeviceList();
      this.initDateList();
    },
  };
</script>
<style lang="less" scope>
  @borderColor: rgba(96, 118, 173, 1);
  @primarycolor: #6076ad;
  @inputColor: rgba(34, 164, 255, 0.1);
  @background: rgba(20, 34, 66, 1);
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
        margin-top: 36px;
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
    .setTime-button {
      width: 120px;
      margin-top: 24px 0;
      text-align: center;
    }
    .section-dateList {
      .dateGrid {
        height: 32px;
        width: 50px;
        .week-view,
        .date-view {
          font-weight: 800;
        }
        .week-view {
          font-size: 15px;
          line-height: 15px;
        }
        .date-view {
          font-size: 18px;
          line-height: 18px;
        }
        i {
          font-size: 24px;
          line-height: 32px;
        }
      }
    }
    .section-table {
      text-align: center;
      height: 620px;
      overflow-y: auto;
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
      .text-button {
        color: #1b98dc;
      }
      .icon-addRow {
        cursor: pointer;
        background: @background;
        color: #fefefe;
        font-size: 20px;
        font-weight: 600;
        padding: 8px 0;
        border: 1px solid @borderColor;
        border-top: 0;
        &:hover {
          color: @primarycolor;
        }
      }
    }
  }
</style>
<style lang="less">
  @borderColor: rgba(96, 118, 173, 1);
  @hoverColor: rgba(14, 252, 255, 1);
  @primarycolor: #6076ad;
  @inputColor: rgba(34, 164, 255, 0.2);
  @background: rgba(20, 34, 66, 1);
  .time-table-container {
    .section-chooseDate,
    .section-dateList {
      .el-input__inner {
        background: @background;
      }
      .el-range-input {
        background: @background;
        color: #fefefe;
      }
      .el-radio-button {
        margin: 4px;
        .el-radio-button__inner {
          border-radius: 4px;
          background: @background;
          border: 1px solid @borderColor;
          color: #fff;
        }
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: @primarycolor;
        border-color: @hoverColor;
        box-shadow: none;
        color: @hoverColor;
      }
      .el-radio-button__inner:hover {
        color: @primarycolor;
      }
    }
    .el-range-input {
      background-color: transparent !important;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: rgba(9, 18, 54, 0.95);
    }
    .el-table {
      font-size: 16px;
      .el-button--text {
        font-size: 16px;
      }
    }
    .el-table,
    .el-table--enable-row-hover .el-table__body tr > td {
      background-color: @background;
    }
    .el-date-editor .el-range-separator {
      color: #fefefe !important;
    }
  }
  .modal-set-date {
    background: url("../../../assets/images/addDevice.png") center center
      no-repeat;
    .title {
      padding-left: 20px;
      margin-top: 18px;
      .point {
        display: inline-block;
        vertical-align: middle;
        width: 8px;
        height: 8px;
        background: rgba(76, 251, 244, 1);
      }
      .name {
        display: inline-block;
        vertical-align: middle;
        margin-left: 16px;
        font-size: 20px;
        font-family: Source Han Sans SC;
        font-weight: bold;
        color: rgba(76, 251, 244, 1);
      }
    }
    .set-date-close {
      position: absolute;
      top: 50px;
      right: 0;
      margin-right: 16px;
      cursor: pointer;
    }
    .section-chooseDate {
      margin: 120px auto 0;
      width: min-content;
      position: relative;
      h4 {
        margin-bottom: 24px;
        color: rgba(129, 184, 227, 1);
        height: 23px;
      }
      .button {
        width: 324px;
        text-align: center;
        margin-top: 24px;
      }
    }
  }
  .time-table-container {
    .el-date-table td.in-range div {
      background-color: @inputColor!important;
      &:hover {
        background-color: @inputColor!important;
      }
    }
    .el-time-panel__btn,
    .el-time-panel__btn.confirm {
      color: #fefefe !important;
    }
    .el-time-spinner__item:hover:not(.disabled):not(.active) {
      background: transparent;
      color: @borderColor;
    }
    .el-time-panel__footer {
      border-color: @borderColor;
    }
    .el-date-range-picker__content.is-left {
      border-color: @borderColor;
    }
    .el-picker-panel *[slot="sidebar"],
    .el-picker-panel__sidebar {
      border-color: @borderColor;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__nav-wrap.is-scrollable {
      padding: 0 30px 0 24px;
    }
    .el-tabs__nav-wrap::after {
      display: none;
    }
    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      color: #1b98dc;
      font-size: 24px;
      font-weight: 900;
      line-height: 56px;
      height: 56px;
    }
    .el-tabs__item {
      width: 275px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      background: url("../../../assets/images/deviceNameBg.png") center center
        no-repeat;
      background-size: 100% 100%;
      padding: 0;
      &.is-active {
        background: url("../../../assets/images/deviceNameBgActive.png") center
          center no-repeat;
        background-size: 100% 100%;
        color: @hoverColor!important;
      }
    }
  }
</style>