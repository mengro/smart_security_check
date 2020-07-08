<template>
  <div class="personCount">
    <div class="personCount-row">
      <span>负责人</span>
      <span class="personCount-manage">
        <span class="principal-input">
          <el-input v-if="editing" size="mini" v-model="principal"></el-input>
          <span v-else-if="principal">{{principal}}</span>
          <span v-else>待设置</span>
        </span>
        <i
          @click="e => {
            editing = true
          }"
          v-if="!editing"
          class="icon el-icon-edit-outline"
        ></i>
        <!-- <i @click="editing = false" v-if="editing" class="icon el-icon-close"></i> -->
        <i @click="changePrincipal" v-if="editing" class="icon el-icon-check"></i>
      </span>
    </div>
    <div class="personCount-row">
      <span>
        安检人员
        <span></span>
      </span>
      <span class="show-button" @click="() => {
        $modal.show('time-table');
      }">到岗情况 ></span>
    </div>
    <!-- <modal :clickToClose="false" height="740" width="1283" name="person-manage">
      <person-manage
        @close="
          () => {
            $modal.hide('person-manage');
          }
        "
      ></person-manage>
    </modal>-->
    <modal :clickToClose="false" height="900" width="1283" name="time-table">
      <time-table
        @close="
          () => {
            $modal.hide('time-table');
          }
        "
      ></time-table>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
// import PersonManage from './PersonManage'
import TimeTable from './TimeTable'
export default {
  data() {
    return {
      editing: false,
      principal: '',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      axios.get('/api/staff/selectPrincipal')
        .then(res => {
          const { data } = res.data
          this.principal = data ? data.name : ''
        })
    },
    changePrincipal() {
      if (!this.principal) {
        return
      }
      axios.post(`/api/staff/changePrincipal/${this.principal}`)
      this.editing = false
    }
  },
  components: {
    // PersonManage,
    TimeTable,
  }
}
</script>
<style lang="less">
  .personCount {
    padding-top: 16px;
    .personCount-row {
      display: flex;
      justify-content: space-between;
      width: 90%;
      margin: 16px auto;
    }
    .personCount-manage {
      display: block;
      width: 120px;
      display: flex;
      justify-content: flex-end;
      &.editing {
        border-bottom: 1px solid #fff;
      }
      .el-input__inner {
        background: transparent;
        color: #fff;
      }
    }
    .icon {
      padding-top: 2px;
      margin-left: 8px;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
    .show-button {
      cursor: pointer;
    }
  }
</style>