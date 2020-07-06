<template>
  <div>
    <div class="dateTimeGroup-container">
      <el-date-picker format="MM-DD" type="dates" class="dateTimeGroup-date" v-model="dates" placeholder="选择日期（多选）"></el-date-picker>
      <el-time-picker
        class="dateTimeGroup-time"
        is-range
        v-model="timeRange"
        format="HH:mm"
        range-separator="-"
      ></el-time-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dates: '',
      timeRange: [new Date(2016, 9, 10, 8, 0, 0), new Date(2016, 9, 10, 18, 0, 0)]
    }
  },
  props: ['defaultDates', 'defaultRange'],
  watch: {
    defaultDates: function (value) {
      this.dates = value
    },
    defaultRange: function (value) {
      this.timeRange = value
    },
  },
};
</script>
<style lang="less">
  .dateTimeGroup-container {
    text-indent: 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    .dateTimeGroup-date {
      width: 360px;
    }
    .dateTimeGroup-time {
      width: 140px;
    }
    .el-input__prefix {
      display: none;
    }
    .el-input__inner {
      color: #fff;
      background: rgba(34, 164, 255, 0.1);
      border: 1px solid rgba(34, 164, 255, 1);
    }
    .el-range-input {
      color: #fff;
      background: transparent !important;
    }
    .el-range-separator {
      color: #fff;
    }
  }
</style>
