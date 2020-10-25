<template>
  <div>
    <el-table :style="tableStyle" :data="data">
      <el-table-column prop="gmtCreate" label="时间"> </el-table-column>
      <el-table-column prop="status" label="告警状态"> </el-table-column>
      <el-table-column prop="action" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="历史记录详情"
      :append-to-body="true"
      width="90%"
      @close="activeRow = null"
      :visible="!!activeRow"
    >
      <detail></detail>
    </el-dialog>
  </div>
</template>

<script>
  import Detail from "./Detail";
  import { securityCheckDetail } from "@/services/console.js";
  export default {
    data() {
      return {
        activeRow: null,
        tableStyle: {
          width: "100%",
        },
      };
    },
    props: ["data"],
    methods: {
      handleClick(row) {
        this.activeRow = row;
      },
      securityCheckDetail() {
        console.log(111);
        if (!this.activeRow) {
          return;
        }
        securityCheckDetail(this.activeRow.id).then((res) => {
          if (res.data) {
            const { securityCheckDetailList, gmtCreate } = res.data;
          }
        });
      },
    },
    watch: {
      activeRow: function (newValue) {
        if (newValue) {
          this.securityCheckDetail();
        }
      },
    },
    components: {
      Detail,
    },
  };
</script>

<style>
</style>