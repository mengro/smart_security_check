<template>
<div>
  <el-table :style="tableStyle" :data="data">
    <el-table-column prop="orientation" label="场馆"> </el-table-column>
    <el-table-column prop="coordinate" label="安检口"> </el-table-column>
    <el-table-column prop="code" label="安检口序号"> </el-table-column>
    <el-table-column prop="longitude" label="地图定位坐标">
      <template slot-scope="scope">
        <div>
          {{`经度：${scope.row.longitude}，纬度： ${scope.row.latitude}`}}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="xrayCode" label="X光机AI编号"> </el-table-column>
    <el-table-column prop="cameraCoreId" label="EC200"> </el-table-column>
    <el-table-column prop="frontCameraRTSP" label="前摄像头RTSP"> </el-table-column>
    <el-table-column prop="backCameraRTSP" label="后摄像头RTSP"> </el-table-column>
    <el-table-column prop="action" label="操作">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {
  deviceDelete
} from '@/services/console.js'
export default {
  data() {
    return {
      tableStyle: {
        width: "100%",
        minHeight: "420px",
      },
    };
  },
  methods: {
    handleDelete(row) {
      this.$confirm('确定要删除吗')
        .then(() => {
          deviceDelete(row.id)
            .then(res => {
              this.updateList()
            })
        })
    }
  },
  props: ["data", 'handleEdit', 'updateList'],
};
</script>

<style>
</style>
