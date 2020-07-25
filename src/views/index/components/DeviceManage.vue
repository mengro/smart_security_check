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
      <!-- <div @click="(e) => addHandle()" class="button active">+ 添加</div> -->
    </div>
    <div class="table-container">
      <div class="list-header">
        <div class="num">ID</div>
        <div class="name">名称</div>
        <div class="count">坐标信息</div>
        <div class="status">状态</div>
        <!-- <div class="remark">备注</div> -->
        <div class="action">操作</div>
      </div>
      <div class="table-body">
        <div class="list-row" :key="item.id" v-for="item in deviceList">
          <div class="num">{{ item.id }}</div>
          <div class="name">{{ `${item.coordinate}-${item.orientation}-${item.code}` }}</div>
          <div class="count">
            经度：{{item.longitude}}
            纬度：{{item.latitude}}
          </div>
          <div class="status">
            <img :style="{height: '32px'}" :src="workStatusIconMap[item.status]" alt="." />
          </div>
          <!-- <div class="remark">{{ item.remark }}</div> -->
          <div class="action">
            <span
              v-if="!item.latitude && !item.longitude"
              @click="(e) => {
              choosePosition(item)
              $emit('close')
            }"
              class="text-button edit"
            >选择位置</span>
            <span @click="(e) => addHandle(item)" class="text-button edit">编辑</span>
            <span v-if="item.status === 2" @click="e => onHandle(item.id)" class="text-button stop"></span>
            <span v-else @click="e => offHandle(item.id)" class="text-button start"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { workStatusMap, workStatusIconMap } from "../config";
  export default {
    data() {
      return {
        deviceList: [],
        workStatusMap,
        workStatusIconMap,
      };
    },
    props: ["openAddDeviceModal", "choosePosition"],
    methods: {
      addHandle(device) {
        this.openAddDeviceModal(device);
        // this.$emit("close");
      },
      initList() {
        axios
          .post("/api/device/search", {
            page: 0,
            pageSize: 50,
          })
          .then((res) => {
            if (Array.isArray(res.data.data.list)) {
              this.deviceList = res.data.data.list;
            }
          });
      },
      offHandle(id) {
        axios.post(`/api/device/disable?ids=${id}`).then((res) => {
          this.initList();
        });
      },
      onHandle(id) {
        axios.post(`/api/device/enable?ids=${id}`).then((res) => {
          this.initList();
        });
      },
    },
    mounted() {
      this.initList();
    },
  };
</script>
<style lang="less" scoped>
  .device-manage {
    height: 740px;
    width: 1283px;
    background: url("../../../assets/images/modalBg.png") 0 0 no-repeat;
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
      height: auto;
      margin: auto;
      border: 1px solid rgba(129, 184, 227, 0.2);
      border-right: 0;
      border-bottom: 0;
      .table-body {
        overflow-y: auto;
        max-height: 768px;
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
        color: #fff;
        background: linear-gradient(
          54deg,
          rgba(6, 37, 68, 0.6) 0%,
          rgba(7, 52, 88, 0.6) 100%
        );
        .num,
        .name,
        .count,
        .status,
        .remark,
        .action {
          padding: 12px 16px;
        }
      }
      .list-row {
        font-size: 18px;
        font-family: Source Han Sans SC;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        border-bottom: 1px solid rgba(129, 184, 227, 0.2);
        border-radius: 2px;
        .num {
          font-size: 22px;
          font-family: DIN Alternate;
          font-weight: bold;
          color: rgba(179, 255, 249, 1);
        }
      }
      .num,
      .name,
      .count,
      .status,
      .remark,
      .action {
        text-align: center;
        border-right: 1px solid rgba(129, 184, 227, 0.2);
        padding: 8px 16px;
      }
      .num {
        width: 2%;
      }
      .name {
        width: 32%;
      }
      .count {
        width: 28%;
      }
      .status {
        width: 10%;
      }
      .action {
        width: 16%;
        .text-button {
          display: inline-block;
          cursor: pointer;
          margin-right: 24px;
          vertical-align: middle;
          &.edit {
            color: rgba(34, 164, 255, 1);
            font-size: 18px;
          }
          &.stop {
            background: url("../../../assets/images/stop.png") center center
              no-repeat;
            width: 66px;
            height: 25px;
            background-size: cover;
          }
          &.start {
            background: url("../../../assets/images/start.png") center center
              no-repeat;
            width: 66px;
            height: 25px;
            background-size: cover;
          }
        }
        .line {
          display: inline-block;
          color: rgba(255, 255, 255, 0.2);
          margin: 0 16px;
        }
      }
    }
  }
</style>
