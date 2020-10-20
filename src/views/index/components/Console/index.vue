<template>
  <div class="console-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="EC200" name="ec200">
        <ec-table :data="ecData"></ec-table>
      </el-tab-pane>
      <el-tab-pane label="安检点" name="point">
        <ec-table :data="ecData"></ec-table>
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="record">
        <ec-table :data="ecData"></ec-table>
      </el-tab-pane>
    </el-tabs>
    <span @click="$emit('close')" class="close">x</span>
  </div>
</template>

<script>
  import EcTable from "./EcTable";
  export default {
    data() {
      return {
        activeName: "ec200",
        ecData: [],
      };
    },
    methods: {
      handleClick(tab) {
        this.activeName = tab.name;
      },
    },
    components: {
      EcTable,
    },
  };
</script>

<style lang="less" scoped>
  .console-container {
    padding: 24px;
    background: #fff;
    position: relative;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      padding: 12px 24px;
      font-size: 24px;
      cursor: pointer;
    }
  }
</style>