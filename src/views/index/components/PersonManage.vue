<template>
  <div class="device-manage">
    <div class="header">
      <div class="title">
        <div class="point"></div>
        <div class="name">人员管理</div>
      </div>
      <div @click="$emit('close')" class="close">
        <img src="../../../assets/images/close.png" />
      </div>
    </div>
    <div class="button-row">
      <div @click="(e) => addHandle()" class="button active">+ 新增</div>
    </div>
    <div class="table-container">
      <div class="list-header">
        <div class="person">姓名</div>
        <div class="name">安检区域</div>
        <div class="time">执勤时间</div>
        <div class="status">当前状态</div>
      </div>
      <div class="table-body">
        <div class="list-row" :key="item.id" v-for="(item, index) in deviceList">
          <div class="person">{{ index }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="time">{{ 3 }}</div>
          <div class="status">
            <div class="point" :style="{background: statusColorMap[item.status]}"></div>
          </div>
        </div>
      </div>
    </div>
    <modal :clickToClose="false" height="580" width="782" name="person-add">
      <person-add
        @close="
          () => {
            currentEditDevice = null;
            $modal.hide('person-add');
          }
        "
        :currentEditDevice="currentEditDevice"
      ></person-add>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';
import PersonAdd from './PersonAdd'
const statusColorMap = {
  0: '#ccc',
  1: '#409eff'
}
export default {
  data() {
    return {
      deviceList: [],
      statusColorMap,
    };
  },
  props: [],
  methods: {
    addHandle(device) {
      this.$modal.show('person-add');
    },
    initList() {
      axios.post('/api/staff/search', {
        page: 0,
        pageSize: 100
      }).then(res => {
        if (Array.isArray(res.data.data.list)) {
          this.deviceList = res.data.data.list
        }
      })
    },
    offHandle(id) {
      axios.post(`/api/device/disable?ids=${id}`)
        .then(res => {
          this.initList()
        })
    },
    onHandle(id) {
      axios.post(`/api/device/enable?ids=${id}`)
        .then(res => {
          this.initList()
        })
    }
  },
  components: {
    PersonAdd
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
      margin: auto;
      .table-body {
        height: 568px;
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
        .person {
          font-size: 29px;
          width: 15%;
          font-family: DIN Alternate;
          font-weight: bold;
          color: rgba(179, 255, 249, 1);
        }
      }
      .person {
        text-indent: 30px;
        width: 15%;
        text-align: left;
      }
      .name {
        text-align: left;
        width: 30%;
      }
      .time {
        width: 16%;
        text-align: left;
      }
      .status {
        width: 16%;
        text-align: center;
      }
      .action {
        text-align: left;
        width: 28%;
        text-indent: 40px;
        .text-button {
          display: inline-block;
          text-indent: 0px;
          cursor: pointer;
          &.edit {
            color: rgba(34, 164, 255, 1);
          }
          &.delete {
            color: rgba(255, 46, 65, 1);
          }
        }
        .line {
          display: inline-block;
          text-indent: 0px;
          color: rgba(255, 255, 255, 0.2);
          margin: 0 16px;
        }
      }
      .point {
        height: 20px;
        width: 20px;
        display: inline-block;
        border-radius: 10px;
      }
    }
  }
</style>
