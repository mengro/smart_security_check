<template>
  <div class="staff-manage">
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
      <div :style="{'margin-right': '16px'}" @click="(e) => addHandle()" class="button active">新增</div>
      <div
        v-if="!editing"
        @click="(e) => {
        editing = true  
      }"
        class="button active"
      >编辑</div>
      <div v-else @click="(e) => {
        editing = false  
      }" class="button active">完成</div>
    </div>
    <div class="table-container">
      <div class="list-header">
        <div class="person">姓名</div>
        <div class="name">安检区域</div>
        <div class="time">执勤时间</div>
        <div class="status">当前状态</div>
        <div v-if="editing" class="action">操作</div>
      </div>
      <div class="table-body">
        <div class="list-row" :key="item.id" v-for="item in staffList">
          <div class="person">{{ item.name }}</div>
          <div class="name">{{ item.deviceName }}</div>
          <div class="time">
            <ul>
              <li v-for="time in item.staffWorkTimeList" :key="time.id">
                {{ `${time.workDate.slice(5)} ${time.workTimeStart.slice(0, 5)}~${time.workTimeEnd.slice(0, 5)}，` }}
              </li>
            </ul>
          </div>
          <div class="status">
            <div class="point" :style="{background: statusColorMap[String(item.workStatus)]}"></div>
          </div>
          <!-- <div class="remark">{{ item.remark }}</div> -->
          <div v-if="editing" class="action">
            <span @click="(e) => addHandle(item)" class="text-button edit">编辑</span>
            <span class="line">|</span>
            <span @click="e => deleteHandle(item.id)" class="text-button delete">删除</span>
          </div>
        </div>
      </div>
    </div>
    <modal :clickToClose="false" height="580" width="782" name="person-add">
      <person-add
        @close="
          () => {
            currentEditStaff = null;
            $modal.hide('person-add');
          }
        "
        :currentEditStaff="currentEditStaff"
        :refreshList="initList"
      ></person-add>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';
import PersonAdd from './PersonAdd'
const statusColorMap = {
  '0': '#ccc',
  '1': 'rgba(52, 239, 253, 1)'
}
export default {
  data() {
    return {
      staffList: [],
      statusColorMap,
      editing: false,
      currentEditStaff: null,
    };
  },
  props: [],
  methods: {
    addHandle(staff) {
      this.currentEditStaff = staff
      this.$modal.show('person-add');
    },
    initList() {
      axios.post('/api/staff/search', {
        page: 0,
        pageSize: 100,
        type: 2
      }).then(res => {
        if (Array.isArray(res.data.data.list)) {
          this.staffList = res.data.data.list
        }
      })
    },
    deleteHandle(id) {
      axios.delete(`/api/staff/${id}`)
        .then(res => {
          this.initList()
        })
    },
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
  .staff-manage {
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
          width: 12%;
          font-family: DIN Alternate;
          font-weight: bold;
          color: rgba(179, 255, 249, 1);
        }
      }
      .person {
        text-indent: 30px;
        width: 12%;
        text-align: left;
      }
      .name {
        text-align: left;
        width: 20%;
        white-space: pre-wrap;
        word-break: break-all;
        padding: 0 16px;
      }
      .time {
        width: 46%;
        text-align: left;
        ul {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          li {
            white-space: nowrap;
          }
        }
      }
      .status {
        width: 16%;
        text-align: center;
      }
      .action {
        text-align: left;
        width: 20%;
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
