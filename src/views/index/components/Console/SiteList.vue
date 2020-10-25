<template>
  <div>
    <el-table :style="tableStyle" :data="data">
      <el-table-column prop="date" label="场馆"> </el-table-column>
      <el-table-column prop="date" label="安检口"> </el-table-column>
      <el-table-column prop="date" label="安检口序号"> </el-table-column>
      <el-table-column prop="date" label="地图定位坐标"> </el-table-column>
      <el-table-column prop="date" label="X光机AI编号"> </el-table-column>
      <el-table-column prop="date" label="EC200"> </el-table-column>
      <el-table-column prop="date" label="前摄像头RTSP"> </el-table-column>
      <el-table-column prop="date" label="后摄像头RTSP"> </el-table-column>
      <el-table-column prop="date" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
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