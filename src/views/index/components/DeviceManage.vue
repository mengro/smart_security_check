<template>
  <div class="device-manage">
    <div class="header">
      <div class="title">
        <div class="point"></div>
        <div class="name">设备管理</div>
      </div>
      <div @click="$emit('close')" class="close">
        <img src="../../../assets/images/close.png" />
      </div>
    </div>
    <div class="button-row">
      <div @click="(e) => addHandle()" class="button active">+ 添加</div>
    </div>
    <div class="table-container">
      <div class="list-header">
        <div class="num">序号</div>
        <div class="name">名称</div>
        <div class="count">摄像头数</div>
        <div class="status">状态</div>
        <!-- <div class="remark">备注</div> -->
        <div class="action">操作</div>
      </div>
      <div class="table-body">
        <div class="list-row" :key="item.id" v-for="(item, index) in deviceList">
          <div class="num">{{ index }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="count">{{ 3 }}</div>
          <div class="status">{{ workStatusMap[item.workStatus] }}</div>
          <!-- <div class="remark">{{ item.remark }}</div> -->
          <div class="action">{{ item.action }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/constant.js'
import { workStatusMap } from "../config";
export default {
  data() {
    return {
      deviceList: [],
      workStatusMap,
    };
  },
  props: ["openAddDeviceModal"],
  methods: {
    addHandle() {
      this.$emit("close");
      this.openAddDeviceModal();
    },
    initList() {
      axios.post(`${API_URL}/api/device/search`, {
        page: 0,
        pageSize: 50
      }).then(res => {
        if (Array.isArray(res.data.data.list)) {
          this.deviceList = res.data.data.list
        }
      })
    },
  },
  mounted(){
    this.initList()
  }
};
</script>
<style lang="less" scoped>
  .device-manage {
    height: 740px;
    width: 1283px;
    background: url("../../../assets/images/组 175.png") 0 0 no-repeat;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      width: 98%;
      height: 20px;
      bottom: 5px;
      left: 1%;
      box-shadow: 0 -0px 20px 16px rgba(9, 18, 54, 0.8);
      background: rgba(9, 18, 54, 0.8);
      z-index: 2;
    }
    .header {
      display: flex;
      justify-content: space-between;
      .title {
        padding-left: 20px;
        margin-top: 24px;
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
          font-size: 24px;
          font-family: Source Han Sans SC;
          font-weight: bold;
          color: rgba(76, 251, 244, 1);
        }
      }
      .close {
        margin-top: 42px;
        margin-right: 16px;
        cursor: pointer;
      }
    }
    .button-row {
      text-align: left;
      margin: 24px 48px;
    }
    .table-container {
      width: 92%;
      margin: auto;
      .table-body {
        height: 520px;
        overflow-y: auto;
      }
      .list-header,
      .list-row {
        display: flex;
        justify-content: flex-start;
      }
      .list-header {
        font-size: 23px;
        font-family: Source Han Sans SC;
        font-weight: bold;
        color: rgba(129, 184, 227, 1);
        border-bottom: 1px solid rgba(129, 184, 227, 0.2);
        padding-bottom: 4px;
        margin-bottom: 16px;
      }
      .list-row {
        font-size: 23px;
        font-family: Source Han Sans SC;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(
          54deg,
          rgba(6, 37, 68, 0.6) 0%,
          rgba(7, 52, 88, 0.6) 100%
        );
        border-radius: 2px;
        margin-bottom: 12px;
        .num {
          font-size: 29px;
          font-family: DIN Alternate;
          font-weight: bold;
          color: rgba(179, 255, 249, 1);
        }
      }
      .num {
        width: 10%;
      }
      .name {
        text-align: left;
        width: 30%;
      }
      .count {
        width: 16%;
      }
      .status {
        width: 16%;
      }
      .remark {
        text-align: left;
        width: 30%;
      }
      .action {
        text-align: left;
        width: 28%;
        text-indent: 40px;
      }
    }
  }
</style>
