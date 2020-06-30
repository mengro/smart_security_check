<template>
  <div>
    <div class="dateTimeGroup-container">
      <el-date-picker
        class="dateTimeGroup-date"
        v-model="value1"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-time-picker
        class="dateTimeGroup-time"
        is-range
        v-model="value1"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      >
      </el-time-picker>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="less">
.dateTimeGroup-container {
  text-indent: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .dateTimeGroup-date {
    width: 120px;
  }
  .dateTimeGroup-time {
    width: 300px;
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
