<template>
  <el-table :style="tableStyle" :data="data">
    <el-table-column prop="code" label="设备号"> </el-table-column>
    <el-table-column prop="streamAddress" label="IP地址"> </el-table-column>
    <el-table-column prop="date" label="通道数（最多8路）"> </el-table-column>
    <el-table-column prop="status" label="激活状态"> </el-table-column>
    <el-table-column prop="date" label="已绑定的IPC"> </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableStyle: {
          width: "100%",
          minHeight: "420px",
        },
      };
    },
    props: ["data"],
  };
</script>

<style>
</style>