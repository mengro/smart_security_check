<template>
<el-table :style="tableStyle" :data="data">
  <el-table-column prop="code" label="设备号"> </el-table-column>
  <el-table-column prop="streamAddress" label="IP地址">
    <template slot-scope="scope">
      {{getDetailInfo(scope.row).IP}}
    </template>
  </el-table-column>
  <el-table-column prop="detailInfo" label="通道数（最多8路）">
    <template slot-scope="scope">
      {{getDetailInfo(scope.row).channelNum}}
    </template>
  </el-table-column>
  <el-table-column prop="detailInfo" label="已绑定的IPC">
    <template slot-scope="scope">
      {{String(getDetailInfo(scope.row).bindIPCList)}}
    </template>
  </el-table-column>
</el-table>
</template>

<script>
const statusMap = {
  1: '激活',
  2: '未激活',
}
export default {
  data() {
    return {
      tableStyle: {
        width: "100%",
        minHeight: "420px",
      },
      statusMap,
    };
  },
  methods: {
    getDetailInfo(row) {
      if (row.detailInfo) {
        try {
          return JSON.parse(row.detailInfo)
        } catch (err) {
          return {}
        }
      } else {
        return {}
      }
    }
  },
  props: ["data"],
};
</script>

<style>
</style>
