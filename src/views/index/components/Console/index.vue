<template>
  <div class="console-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="EC200" name="ec200">
        <h3 class="subTitle">
          EC200数据列表
        </h3>
        <ec-list :data="ecData"></ec-list>
      </el-tab-pane>
      <el-tab-pane label="安检点" name="site">
        <h3 class="subTitle">
          <span>安检点列表</span>
          <el-button @click="openAddModal" size="small">添加安检点</el-button>
        </h3>
        <site-list :data="ecData"></site-list>
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="record">
        <h3 class="subTitle">
          历史记录
        </h3>
        <record-list :data="recordData"></record-list>
      </el-tab-pane>
    </el-tabs>
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
        currentPage: 1,
        pageSize: 20,
        total: 0,
      };
    },
    props: ["openAddDeviceModal"],
    methods: {
      handleClick(tab) {
        this.activeName = tab.name;
      },
      deviceGroupSearch(pagination) {
        deviceGroupSearch({
          ...pagination,
        }).then((res) => {
          if (res.data && res.data.list) {
            this.siteData = res.data.list;
          }
        });
      },
      ec200Search(pagination) {
        ec200Search({
          ...pagination,
        }).then((res) => {
          if (res.data && res.data.list) {
            this.ecData = res.data.list;
          }
        });
      },
      securityCheckSearch(pagination) {
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
        this.openAddDeviceModal(null);
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
    },
  };
</script>

<style lang="less" scoped>
  .console-container {
    position: relative;
    text-align: left;
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
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 24px;
    text-align: right;
  }
</style>