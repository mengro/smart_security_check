<template>
  <div class="index" :style="{ height: pageHeight + 'px' }">
    <div class="content">
      <div class="head flex_between">
        <div class="time-text">
          <timer></timer>
        </div>
      </div>
      <div class="body flex_start">
        <div class="bodyItem bodyLeft">
          <!-- 任务统计 -->
          <div class="taskStatistics">
            <p class="sectionTitle">{{ taskData.title }}</p>
            <ul class="taskList flex_start_v">
              <li v-for="item in taskData.list" :key="item.id">
                <img :src="item.icon" width="100%" height="100%" />
                <p>- {{ item.text }} -</p>
                <p>{{ item.num }}</p>
                <p>{{ item.unit }}</p>
              </li>
            </ul>
          </div>
          <!-- 报警统计 -->
          <div class="alarmStatistics">
            <p class="sectionTitle">{{ alarmData.title }}</p>
            <ul class="taskList flex_start_v">
              <li
                class="flex_start_v"
                :style="{ backgroundImage: `url(${item.icon})` }"
                v-for="item in alarmData.list"
                :key="item.id"
              >
                <div>
                  <p class="num">{{ item.num }}</p>
                  <p class="text">{{ item.text }}</p>
                </div>
              </li>
            </ul>
            <div ref="chartsRef" class="charts-container"></div>
          </div>
          <!-- 设备统计 -->
          <div class="deviceStatistics">
            <p class="sectionTitle">{{ deviceData.title }}</p>
            <ul class="deviceList flex_start_v">
              <li v-for="item in deviceData.list" :key="item.id">
                <p class="text">{{ item.text }}</p>
                <p class="num">{{ item.num }}</p>
                <p class="proportion">
                  <span>{{ item.proportion.n1 }}</span> /
                  <span>{{ item.proportion.n2 }}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="bodyItem bodyCenter">
          <div class="count-container">
            <div class="count-header">
              <span class="title">检测人数:</span>
              <span class="count">
                <div
                  class="number-item"
                  :key="index"
                  v-for="(item, index) in String(entriesData.count).split('')"
                >
                  {{ item }}
                </div>
              </span>
            </div>
            <ul class="entries-contianer">
              <li
                class="entries-item"
                :key="item.id"
                v-for="item in entriesData.list"
              >
                <h6 class="entries-item-title">{{ item.title }}</h6>
                <div class="entries-item-data">
                  <span class="data-count">{{ item.count }}</span>
                  <span class="data-status">{{ item.statusDesc }}</span>
                </div>
                <div class="entries-item-name">
                  <span class="name-count">检测人数</span>
                  <span class="name-status">运行状态</span>
                </div>
              </li>
              <li class="entries-item placeholder">占位符</li>
              <li class="entries-item placeholder">占位符</li>
              <li class="entries-item placeholder">占位符</li>
              <li class="entries-item placeholder">占位符</li>
            </ul>
          </div>
        </div>
        <div class="bodyItem bodyRight">
          <div class="device-container">
            <div @click="$modal.show('device-manage')" class="device-header">
              <!-- 设备管理按钮 -->
            </div>
            <div class="device-content">
              <p class="sectionTitle">安检详情</p>
              <div class="active-device-name">
                <img
                  src="../../assets/images/loction@2x.png"
                  width="17"
                  height="22"
                  alt
                />
                <span>{{ activeDevice.name }}</span>
              </div>
              <ul class="camera-list">
                <li :key="item.id" v-for="item in cameraList">
                  <div class="video">
                    <video></video>
                  </div>
                  <div class="camera-name">{{ item.name }}</div>
                </li>
              </ul>
              <ul class="camera-tab">
                <li
                  :class="
                    videoTypeTab.activeVideoTab === item.tabKey
                      ? 'active button'
                      : 'button'
                  "
                  :key="item.tabKey"
                  v-for="item in videoTypeTab.subTabs"
                >
                  {{ item.name }}
                </li>
              </ul>
              <div class="video-container">
                <div class="video-header">
                  <h6 class="time">时间</h6>
                  <h6 class="process">进度</h6>
                  <h6 class="status">状态</h6>
                </div>
                <ul class="video-list">
                  <li
                    @click="(e) => setActiveVideo(item)"
                    :key="item.time"
                    v-for="item in videoList"
                    class="video-item"
                  >
                    <span class="time">{{ item.time }}</span>
                    <process
                      :length="4"
                      :value="item.process"
                      class="process"
                    ></process>
                    <span class="status">{{ item.statusDesc }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      :clickToClose="false"
      height="1200"
      width="1400"
      pivotY="0.8"
      pivotX="0"
      name="video-view"
    >
      <video-view @close="$modal.hide('video-view')"></video-view>
    </modal>
    <modal :clickToClose="false" height="740" width="1283" name="device-manage">
      <device-manage
        :openAddDeviceModal="openAddDeviceModal"
        @close="$modal.hide('device-manage')"
      ></device-manage>
    </modal>
    <modal :clickToClose="false" height="580" width="782" name="add-device">
      <add-device @close="$modal.hide('add-device')"></add-device>
    </modal>
  </div>
</template>

<script>
import VideoView from "./components/VideoView";
import DeviceManage from "./components/DeviceManage";
import Process from "./components/Process";
import AddDevice from "./components/AddDevice";
import Timer from "./components/Timer";
import Video from "@/components/Video";
import { Chart } from "@antv/g2";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
const data = [
  { month: "Jan", city: "Tokyo", temperature: 7 },
  { month: "Jan", city: "London", temperature: 3.9 },
  { month: "Feb", city: "Tokyo", temperature: 6.9 },
  { month: "Feb", city: "London", temperature: 4.2 },
  { month: "Mar", city: "Tokyo", temperature: 9.5 },
  { month: "Mar", city: "London", temperature: 5.7 },
  { month: "Apr", city: "Tokyo", temperature: 14.5 },
  { month: "Apr", city: "London", temperature: 8.5 },
  { month: "May", city: "Tokyo", temperature: 18.4 },
  { month: "May", city: "London", temperature: 11.9 },
  { month: "Jun", city: "Tokyo", temperature: 21.5 },
  { month: "Jun", city: "London", temperature: 15.2 },
  { month: "Jul", city: "Tokyo", temperature: 25.2 },
  { month: "Jul", city: "London", temperature: 17 },
  { month: "Aug", city: "Tokyo", temperature: 26.5 },
  { month: "Aug", city: "London", temperature: 16.6 },
  { month: "Sep", city: "Tokyo", temperature: 23.3 },
  { month: "Sep", city: "London", temperature: 14.2 },
  { month: "Oct", city: "Tokyo", temperature: 18.3 },
  { month: "Oct", city: "London", temperature: 10.3 },
  { month: "Nov", city: "Tokyo", temperature: 13.9 },
  { month: "Nov", city: "London", temperature: 6.6 },
  { month: "Dec", city: "Tokyo", temperature: 9.6 },
  { month: "Dec", city: "London", temperature: 4.8 },
];
const baseUrl = "http://localhost:9527/websocket";

export default {
  name: "index",
  data() {
    return {
      pageHeight: window.innerHeight,
      taskData: {
        title: "任务统计",
        list: [
          {
            id: 1,
            icon: require("../../assets/images/icon_1@2x.png"),
            text: "数据流",
            num: 2648,
            unit: "次",
          },
          {
            id: 2,
            icon: require("../../assets/images/icon_2@2x.png"),
            text: "视频流",
            num: 6659,
            unit: "分钟",
          },
          {
            id: 3,
            icon: require("../../assets/images/icon_3@2x.png"),
            text: "图片流",
            num: 46325,
            unit: "张",
          },
        ],
      },
      alarmData: {
        title: "报警统计",
        list: [
          {
            id: 1,
            icon: require("../../assets/images/1.png"),
            text: "过包总数",
            num: 2648,
          },
          {
            id: 2,
            icon: require("../../assets/images/2.png"),
            text: "遗留包总数",
            num: 6659,
          },
          {
            id: 3,
            icon: require("../../assets/images/3.png"),
            text: "拿错包总数",
            num: 46325,
          },
        ],
      },
      deviceData: {
        title: "设备统计",
        list: [
          {
            id: 1,
            text: "智能前端",
            num: 2648,
            proportion: { n1: "2273", n2: "635" },
          },
          {
            id: 2,
            text: "安检机",
            num: 6659,
            proportion: { n1: "2273", n2: "635" },
          },
          {
            id: 3,
            text: "摄像头",
            num: 46325,
            proportion: { n1: "2273", n2: "635" },
          },
        ],
      },
      entriesData: {
        count: 13526366666,
        list: [
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 1,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 2,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 3,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 4,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 5,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 5,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 5,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 5,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 5,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 5,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 5,
          },
          {
            title: "大会堂正门口入口A",
            count: 2000,
            statusDesc: "空闲",
            status: 5,
          },
        ],
      },
      activeDevice: {
        name: "大会堂正门入口A",
      },
      cameraList: [
        {
          name: "摄像头一号",
          id: 1,
        },
        {
          name: "摄像头一号",
          id: 1,
        },
        {
          name: "摄像头一号",
          id: 1,
        },
      ],
      videoTypeTab: {
        activeVideoTab: 1,
        subTabs: [
          {
            name: "全部",
            tabKey: 1,
          },
          {
            name: "归档中",
            tabKey: 2,
          },
          {
            name: "已归档",
            tabKey: 3,
          },
          {
            name: "告警",
            tabKey: 4,
          },
        ],
      },
      videoList: [
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 3,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 2,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 4,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 2,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
        {
          id: "001",
          time: "2020年5月19日 11:56:23",
          process: 1,
          statusDesc: "错拿包",
          status: 1,
        },
      ],
      activeVideoId: null,
    };
  },
  created() {},
  mounted() {
    this.initCharts();
    // 挂载浏览器高度获取方法
    const that = this;
    window.onresize = () => {
      return (() => {
        that.pageHeight = window.innerHeight;
      })();
    };
    this.checkSocket();
  },
  methods: {
    setActiveVideo(item) {
      this.activeVideoId = item.id;
      this.$modal.show("video-view");
    },
    openAddDeviceModal() {
      this.$modal.show("add-device");
    },
    checkSocket() {
      if ("WebSocket" in window) {
        this.initWebSocket();
      } else {
        alert("当前浏览器 Not support websocket");
      }
    },
    sendMessage() {
      this.stompClient.send("/alarmView", JSON.stringify(this.text), {});
    },
    initWebSocket() {
      this.connection();
    },
    connection() {
      const socket = new SockJS(baseUrl);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
        this.stompClient.subscribe("/alarmView", (greeting) => {
          this.datas.push(JSON.parse(greeting.body));
        });
      });
    },
    initCharts() {
      const chart = new Chart({
        container: this.$refs.chartsRef,
        autoFit: true,
        height: 500,
      });
      chart.data(data);
      chart.scale({
        month: {
          range: [0, 1],
        },
        temperature: {
          nice: true,
        },
      });

      chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });

      chart.axis("temperature", {
        grid: null,
        label: {
          formatter: (val) => {
            return val + " °C";
          },
        },
      });
      chart
        .area()
        .position("month*temperature")
        .color("city", ["rgba(255,255,255,0.2)"]);
      chart
        .line()
        .position("month*temperature")
        .color("city", ["#D249FF", "#2FCCFF"])
        .shape("smooth");
      chart
        .point()
        .position("month*temperature")
        .color("#D249FF")
        .size(2)
        .shape("square");

      chart.render();
    },
  },
  destroyed() {},
  components: {
    VideoView,
    DeviceManage,
    Process,
    AddDevice,
    Video,
    Timer,
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
