<template>
  <div class="console-container">
    <div class="console-head">
      <el-button size="small" @click="returnHome">返回数据中心</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="EC200" name="ec200">
        <h3 class="subTitle">
          <span>EC200数据列表</span>
          <el-button @click="openEcModal" size="small">添加EC200</el-button>
        </h3>
        <ec-list :data="ecData"></ec-list>
      </el-tab-pane>
      <el-tab-pane label="安检点" name="site">
        <h3 class="subTitle">
          <span>安检点列表</span>
          <el-button @click="openAddModal" size="small">添加安检点</el-button>
        </h3>
        <site-list
          :updateList="deviceGroupSearch"
          :handleEdit="handleEditSite"
          :data="siteData"
        ></site-list>
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="record">
        <h3 class="subTitle">
          历史记录
        </h3>
        <record-list :data="recordData"></record-list>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      width="72%"
      :destroy-on-close="true"
      :visible="addDeviceVisible"
      :append-to-body="true"
      @close="deviceDialogCloseHandle"
    >
      <add-device
        :activeSiteRow="activeSiteRow"
        :updateList="deviceGroupSearch"
        @close="deviceDialogCloseHandle"
      ></add-device>
    </el-dialog>
    <el-dialog
      title="添加EC200"
      :destroy-on-close="true"
      :visible="addEcVisible"
      :append-to-body="true"
      @close="addEcVisible = false"
    >
      <add-ec :updateList="ec200Search" @close="addEcVisible = false"></add-ec>
    </el-dialog>
    <div class="console-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import EcList from "./EcList";
  import SiteList from "./SiteList";
  import RecordList from "./RecordList";
  import AddDevice from "./AddDevice";
  import AddEc from "./AddEc";
  import {
    deviceGroupSearch,
    ec200Search,
    securityCheckSearch,
  } from "@/services/console.js";
  export default {
    data() {
      return {
        activeName: "",
        ecData: [],
        siteData: [],
        recordData: [],
        activeSiteRow: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        addDeviceVisible: false,
        addEcVisible: false,
      };
    },
    methods: {
      handleClick(tab) {
        this.activeName = tab.name;
      },
      deviceGroupSearch(pagination) {
        this.siteData = [];
        deviceGroupSearch({
          ...pagination,
        }).then((res) => {
          if (res.data && res.data.list) {
            this.siteData = res.data.list;
            this.total = res.data.total;
          }
        });
      },
      ec200Search(pagination) {
        this.ecData = [];
        ec200Search({
          ...pagination,
        }).then((res) => {
          if (res.data && res.data.list) {
            this.ecData = res.data.list;
            this.total = res.data.total;
          }
        });
      },
      securityCheckSearch(pagination) {
        this.recordData = [];
        securityCheckSearch({
          ...pagination,
        }).then((res) => {
          if (res.data && res.data.list instanceof Array) {
            this.recordData = res.data.list;
            this.total = res.data.total;
          }
        });
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      resetPagination() {
        this.pageSize = 20;
        this.currentPage = 1;
      },
      getData() {
        const pagination = {
          page: this.currentPage,
          pageSize: this.pageSize,
        };
        switch (this.activeName) {
          case "ec200":
            this.ec200Search(pagination);
            return;
          case "site":
            this.deviceGroupSearch(pagination);
            return;
          case "record":
            this.securityCheckSearch(pagination);
            return;
          default:
            break;
        }
      },
      openAddModal() {
        this.addDeviceVisible = true;
      },
      returnHome() {
        this.$router.push({
          path: "/",
        });
      },
      openEcModal() {
        this.addEcVisible = true;
      },
      handleEditSite(row) {
        this.addDeviceVisible = true;
        this.activeSiteRow = row;
      },
      deviceDialogCloseHandle() {
        this.addDeviceVisible = false;
        this.activeSiteRow = null;
      },
    },
    mounted() {
      this.activeName = "ec200";
    },
    watch: {
      activeName: function (newValue) {
        this.resetPagination();
        this.getData();
      },
      currentPage: function (newValue) {
        this.getData();
      },
      pageSize: function (newValue) {
        this.getData();
      },
    },
    components: {
      EcList,
      SiteList,
      RecordList,
      AddDevice,
      AddEc,
    },
  };
</script>

<style lang="less">
  body,
  html {
    height: 100%;
  }
  #app {
    height: 100%;
  }
  .console-container {
    position: relative;
    text-align: left;
    background: rgb(13, 33, 74);
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
    overflow: auto;
    .console-head {
      text-align: right;
    }
    .subTitle {
      height: 36px;
      line-height: 36px;
      font-size: 18px;
      color: #fff;
      font-weight: 500;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    padding-bottom: 72px;
  }

  .console-pagination {
    padding: 24px 0;
    text-align: right;
  }
</style>
