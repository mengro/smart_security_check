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
            <p class="sectionTitle">任务统计</p>
            <ul class="taskList flex_start_v">
              <li>
                <img
                  src="../../assets/images/icon_1@2x.png"
                  width="100%"
                  height="100%"
                />
                <p>- 数据流 -</p>
                <p>{{ taskView.dataNum }}</p>
                <p>次</p>
              </li>
              <li>
                <img
                  src="../../assets/images/icon_2@2x.png"
                  width="100%"
                  height="100%"
                />
                <p>- 视频流 -</p>
                <p>{{ taskView.videoNum }}</p>
                <p>分钟</p>
              </li>
              <li>
                <img
                  src="../../assets/images/icon_3@2x.png"
                  width="100%"
                  height="100%"
                />
                <p>- 图片流 -</p>
                <p>{{ taskView.picNum }}</p>
                <p>张</p>
              </li>
            </ul>
          </div>
          <!-- 报警统计 -->
          <div class="alarmStatistics">
            <p class="sectionTitle">报警统计</p>
            <ul class="taskList flex_start_v">
              <li
                class="flex_start_v"
                :style="{ backgroundImage: `url(${item.icon})` }"
                v-for="item in alarmMap"
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
            <p class="sectionTitle">设备统计</p>
            <ul class="deviceList flex_start_v">
              <li>
                <p class="text">智能前端</p>
                <p class="num">{{ deviceCountView.webFrontTotalNum }}</p>
                <p class="proportion">
                  <span>{{ deviceCountView.webFrontEnableNum }}</span> /
                  <span>{{ deviceCountView.webFrontDisableNum }}</span>
                </p>
              </li>
              <li>
                <p class="text">安检机</p>
                <p class="num">{{ deviceCountView.machineTotalNum }}</p>
                <p class="proportion">
                  <span>{{ deviceCountView.machineEnableNum }}</span> /
                  <span>{{ deviceCountView.machineDisableNum }}</span>
                </p>
              </li>
              <li>
                <p class="text">摄像头</p>
                <p class="num">{{ deviceCountView.cameraTotalNum }}</p>
                <p class="proportion">
                  <span>{{ deviceCountView.cameraEnableNum }}</span> /
                  <span>{{ deviceCountView.cameraDisableNum }}</span>
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
                  v-for="(item, index) in String(securityCheckTotal).split('')"
                >
                  {{ item }}
                </div>
              </span>
            </div>
            <ul class="entries-contianer">
              <li
                class="entries-item"
                :key="item.id"
                v-for="item in deviceViewsList"
              >
                <h6 class="entries-item-title">{{ item.name }}</h6>
                <div class="entries-item-data">
                  <span class="data-count">{{ item.securityCheckNum }}</span>
                  <span
                    :style="{
                      color:
                        deviceStatusMap[item.workStatus] &&
                        deviceStatusMap[item.workStatus].color,
                    }"
                    class="data-status"
                  >
                    {{
                      deviceStatusMap[item.workStatus] &&
                      deviceStatusMap[item.workStatus].text
                    }}
                  </span>
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
                    <my-video></my-video>
                  </div>
                  <!-- <div class="camera-name">{{ item.name }}</div> -->
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
                    @click="(e) => setActiveVideo(item, e)"
                    :key="item.time"
                    v-for="item in videoList"
                    class="video-item"
                  >
                    <span class="time">{{ item.gmtCreate }}</span>
                    <div
                      class="process"
                      :style="{
                        visibility:
                          item.alarmStatus <= 2 && item.status === 1
                            ? ''
                            : 'hidden',
                      }"
                    >
                      <process :length="4" :value="item.picNum"></process>
                    </div>
                    <span
                      :style="{ color: parseStatus(item).color }"
                      class="status"
                      >{{ parseStatus(item).text }}</span
                    >
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
      width="1283"
      height="939"
      :pivotY="0.2"
      :pivotX="0.1"
      name="alarm-image"
    >
      <alarm-image
        @close="
          () => {
            $modal.hide('alarm-image');
            activeVideoId = null;
          }
        "
        :activeVideoId="activeVideoId"
        :activeTagTop="activeTagTop"
      ></alarm-image>
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
import AlarmImage from "./components/AlarmImage";
import DeviceManage from "./components/DeviceManage";
import Process from "./components/Process";
import AddDevice from "./components/AddDevice";
import Timer from "./components/Timer";
import MyVideo from "@/components/Video";
import { Chart } from "@antv/g2";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import axios from "axios";
import moment from "moment";
import { API_URL, WS_URL } from "@/constant.js";
import {
  deviceStatusMap,
  alarmStatusMap,
  statusMap,
  parseStatus,
} from "./config";

export default {
  name: "index",
  data() {
    return {
      deviceStatusMap,
      alarmStatusMap,
      statusMap,
      pageHeight: window.innerHeight,
      taskView: {
        dataNum: 0,
        picNum: 0,
        videoNum: 0,
      },
      chartsData: [],
      alarmMap: {
        securityCheck: {
          id: 1,
          icon: require("../../assets/images/1.png"),
          text: "过包总数",
          num: 0,
        },
        lostPackage: {
          id: 2,
          icon: require("../../assets/images/2.png"),
          text: "遗留包总数",
          num: 0,
        },
        wrongPackage: {
          id: 3,
          icon: require("../../assets/images/3.png"),
          text: "拿错包总数",
          num: 0,
        },
      },
      deviceCountView: {
        webFrontDisable: 0,
        webFrontEnable: 0,
        webFrontTotal: 0,
        machineDisable: 0,
        machineEnable: 0,
        machineTotal: 0,
        cameraDisable: 0,
        cameraEnable: 0,
        cameraTotal: 0,
      },
      securityCheckTotal: 0,
      deviceViewsList: [],
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
          id: 2,
        },
        {
          name: "摄像头一号",
          id: 3,
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
      videoList: [],
      activeVideoId: null,
      activeTagTop: 0,
    };
  },
  created() {},
  mounted() {
    this.initPage();
    // 挂载浏览器高度获取方法
    const that = this;
    window.onresize = () => {
      return (() => {
        that.pageHeight = window.innerHeight;
      })();
    };
    this.checkSocket();
    this.initCharts();
  },
  methods: {
    setActiveVideo(item, e) {
      this.activeVideoId = item.id;
      this.$modal.show("alarm-image");
      this.activeTagTop = e.target.offsetTop;
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
      const socket = new SockJS(WS_URL);
      this.stompClient = Stomp.over(socket, { debug: false });
      this.stompClient.connect({}, (frame) => {
        this.stompClient.subscribe("/topic/statistics", (greeting) => {
          const datas = JSON.parse(greeting.body);
          if (datas) {
            this.renderView(datas);
          }
        });
        this.stompClient.subscribe("/topic/device", (greeting) => {
          const deviceData = JSON.parse(greeting.body);
          if (deviceData.id) {
            const index = this.deviceViewsList.findIndex(
              (item) => item.id === deviceData.id
            );
            if (index > -1) {
              if (deviceData.status === 2) {
                this.deviceViewsList.splice(index, 1);
              } else {
                this.deviceViewsList.splice(index, 1, deviceData);
              }
            } else {
              this.deviceViewsList.push(deviceData);
            }
          } else {
            this.deviceViewsList.push(deviceData);
          }
        });
        this.stompClient.subscribe("/topic/securityCheckCount", (greeting) => {
          const count = JSON.parse(greeting.body);
          this.securityCheckTotal = count;
        });
        this.stompClient.subscribe("/topic/securityCheckDetail", (greeting) => {
          const { securityCheckList } = JSON.parse(greeting.body) || {};
          this.renderSecurityCheckList(securityCheckList);
        });
      });
    },
    initCharts() {
      this.chart = new Chart({
        container: this.$refs.chartsRef,
        autoFit: true,
        height: 500,
      });
      this.chart.scale({
        hours: {
          range: [0, 1],
        },
        count: {
          nice: true,
          range: [0, 1],
        },
      });

      this.chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });

      this.chart.axis("count", {
        grid: null,
      });
      this.chart.axis("hours", {
        label: {
          formatter: (val) => {
            return moment().set("hours", val).format("HH:00");
          },
        },
      });
      this.chart
        .area()
        .position("hours*count")
        .color("type", ["rgba(255,255,255,0.1)"]);
      this.chart
        .line()
        .position("hours*count")
        .color("type", ["#D249FF", "#2FCCFF"])
        .shape("smooth");
      this.chart
        .point()
        .position("hours*count")
        .color("#D249FF")
        .size(2)
        .shape("square");
      this.chart.legend({
        position: "top",
      });
    },
    initPage() {
      axios.get(`${API_URL}/init`).then((res) => {
        if (res.data) {
          this.renderView(res.data);
          const { deviceList, securityCheckTotal, securityCheckList } =
            res.data || {};
          // deviceList
          if (Array.isArray(deviceList)) {
            this.deviceViewsList = deviceList;
          }
          this.securityCheckTotal = securityCheckTotal || 0;
          this.renderSecurityCheckList(securityCheckList);
        }
      });
    },
    renderView(viewDatas) {
      const {
        taskView,
        alarmView,
        deviceList,
        securityCheckTotal,
        deviceView,
        securityCheckList,
      } = viewDatas || {};
      // taskView
      if (taskView) {
        this.taskView = taskView;
      }
      // alarmView
      if (alarmView) {
        const {
          lostPackageNum,
          securityCheckNum,
          wrongPackageNum,
          lostPackageNumGroupByHour,
          wrongPackageNumGroupByHour,
        } = alarmView;
        this.alarmMap.securityCheck.num = securityCheckNum;
        this.alarmMap.lostPackage.num = lostPackageNum;
        this.alarmMap.wrongPackage.num = wrongPackageNum;
        if (
          Array.isArray(lostPackageNumGroupByHour) &&
          Array.isArray(wrongPackageNumGroupByHour)
        ) {
          const lostPackageNumGroup = lostPackageNumGroupByHour.map((item) => ({
            hours: item.hours,
            count: item.count,
            type: "遗留包数",
          }));
          const wrongPackageNumGroup = wrongPackageNumGroupByHour.map(
            (item) => ({
              hours: item.hours,
              count: item.count,
              type: "错拿包数",
            })
          );
          this.chartsData = [...lostPackageNumGroup, ...wrongPackageNumGroup];
          this.renderCharts();
        }
      }
      // deviceCountView
      if (deviceView) {
        this.deviceCountView = deviceView;
      }
    },
    renderCharts() {
      this.chart.data(this.chartsData);
      this.chart.render();
    },
    renderSecurityCheckList(securityCheckList) {
      // videoList
      if (Array.isArray(securityCheckList)) {
        this.videoList = securityCheckList;
      }
    },
    parseStatus,
  },
  destroyed() {},
  components: {
    AlarmImage,
    DeviceManage,
    Process,
    AddDevice,
    MyVideo,
    Timer,
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
