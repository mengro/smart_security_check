<template>
  <el-table :style="tableStyle" :data="data">
    <el-table-column prop="date" label="时间" width="180"> </el-table-column>
    <el-table-column prop="date" label="告警状态" width="180">
    </el-table-column>
    <el-table-column prop="date" label="操作"> </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableStyle: {
          width: "100%",
          minHeight: "380px",
        },
      };
    },
    props: ["data"],
  };
</script>

<style>
</style>