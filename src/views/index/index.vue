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
          <!-- 设备统计 -->
          <div class="taskStatistics">
            <p class="sectionTitle">设备统计</p>
            <device-count :deviceCountView="deviceCountView"></device-count>
          </div>
          <!-- 设备统计 -->
          <!-- <div class="deviceStatistics">
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
          </div>-->
          <!-- 数据统计 -->
          <div class="alarmStatistics">
            <p class="sectionTitle">数据统计</p>
            <!-- <ul class="taskList flex_start_v">
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
            </ul>-->
            <div class="charts-container">
              <my-chart ref="myCharts"></my-chart>
            </div>
          </div>
          <!-- 人员统计 -->
          <p class="sectionTitle">人员统计</p>
          <person-count></person-count>
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
                >{{ item }}</div>
              </span>
            </div>
            <!-- <ul class="entries-contianer">
              <li
                :class="`entries-item ${item.workStatus === 3 ? 'error' : ''} ${
                  activeDevice.id === item.id ? 'active' : ''
                }`"
                :key="item.id"
                v-for="item in deviceViewsList"
                @click="(e) => setActiveDevice(item)"
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
            </ul>-->
            <div id="gis-container" class="gis-container"></div>
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
                <img src="../../assets/images/loction@2x.png" width="17" height="22" alt />
                <span>{{ activeDevice.name }}</span>
              </div>
              <ul class="camera-list">
                <li>
                  <div class="video">
                    <my-video videoName="a" :url="activeDevice.deviceAddressA"></my-video>
                  </div>
                  <!-- <div class="camera-name">{{ item.name }}</div> -->
                </li>
                <li>
                  <div class="video">
                    <my-video videoName="b" :url="activeDevice.deviceAddressB"></my-video>
                  </div>
                  <!-- <div class="camera-name">{{ item.name }}</div> -->
                </li>
                <li>
                  <div class="video">
                    <my-video videoName="c" :url="activeDevice.deviceAddressC"></my-video>
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
                  @click="(e) => setActiveTab(item.tabKey)"
                >{{ item.name }}</li>
              </ul>
              <div class="video-container">
                <div class="video-header">
                  <h6 class="time">时间</h6>
                  <h6 class="process">进度</h6>
                  <h6 class="status">状态</h6>
                </div>
                <div class="video-list-container">
                  <ul class="video-list">
                    <li
                      @click="(e) => setActiveAlarm(item, e)"
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
                      >{{ parseStatus(item).text }}</span>
                      <img
                        v-show="activeAlarmObj.id === item.id"
                        class="activeTag"
                        src="../../assets/images/alarmModalActiveTag.png"
                        alt
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <alarm-image
        v-if="!!activeAlarmObj.id"
        @close="
        () => {
          $modal.hide('alarm-image');
          activeAlarmObj = {};
        }
      "
        :activeAlarmObj="activeAlarmObj"
        :name="activeDevice.name"
      ></alarm-image>
    </div>
    <modal :clickToClose="false" height="740" width="1283" name="device-manage">
      <device-manage
        :choosePosition="choosePosition"
        :openAddDeviceModal="openAddDeviceModal"
        @close="$modal.hide('device-manage')"
      ></device-manage>
    </modal>
    <modal :clickToClose="false" height="580" width="782" name="add-device">
      <add-device
        @close="
          () => {
            currentEditDevice = null;
            $modal.hide('add-device');
          }
        "
        :currentEditDevice="currentEditDevice"
      ></add-device>
    </modal>
    <!-- <button
      @click="e => activeDevice.deviceAddressA = 'rtmp://58.200.131.2:1935/livetv/hunantv'"
    >aaaa</button>-->
  </div>
</template>

<script>
import AlarmImage from "./components/AlarmImage";
import DeviceManage from "./components/DeviceManage";
import Process from "./components/Process";
import MyChart from "./components/MyChart";
import AddDevice from "./components/AddDevice";
import DeviceCount from "./components/DeviceCount";
import PersonCount from "./components/PersonCount";
import Timer from "./components/Timer";
import MyVideo from "@/components/Video";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import axios from "axios";
import { WS_URL } from "@/constant.js";
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
      currentEditDevice: null,
      securityCheckTotal: 0,
      deviceViewsList: [],
      activeDevice: {},
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
      activeAlarmObj: {},
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
    this.initGis()
  },
  methods: {
    initGis() {
      this.map = new AMap.Map('gis-container', {
        zoom: 20,
      });
      this.map.on('click', e => {
        if (this.chooseing) {
          this.$confirm(`确定设置位置为经度：${e.lnglat.lng}，纬度：${e.lnglat.lat}吗？`, '设置位置')
            .then(() => {
              this.addPoint({
                lng: e.lnglat.lng,
                lat: e.lnglat.lat,
              })
              this.map.setDefaultCursor('pointer')
            })
        }
      })
    },
    addPoint({
      title,
      lng,
      lat,
    } = {}) {
      var marker = new AMap.Marker({
          position: new AMap.LngLat(lng, lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title,
          draggable: true,
          raiseOnDrag: true,
      });
      // 将创建的点标记添加到已有的地图实例：
      this.map.add(marker);
    },
    choosePosition(device) {
      this.chooseing = true
      this.map.setDefaultCursor('url("https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png"), default')
      // this.addPoint()
    },
    setActiveAlarm(item, e) {
      if (
        item.alarmStatus !== 3 &&
        item.alarmStatus !== 4 &&
        item.status === 1
      ) {
        return;
      }
      this.activeAlarmObj = item;
    },
    openAddDeviceModal(device) {
      this.currentEditDevice = device;
      this.$modal.show("add-device");
    },
    checkSocket() {
      if ("WebSocket" in window) {
        this.connection();
      } else {
        alert("当前浏览器 Not support websocket");
      }
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
    initPage() {
      axios.get('/init').then((res) => {
        if (res.data) {
          this.renderView(res.data);
          const { deviceList, securityCheckTotal, securityCheckList } =
            res.data || {};
          // deviceList
          if (Array.isArray(deviceList)) {
            this.deviceViewsList = deviceList;
            this.activeDevice = deviceList[0] || {};
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
          securityCheckNumGroupByHour,
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
          const securityCheckNumGroup = securityCheckNumGroupByHour.map((item) => ({
            hours: item.hours,
            count: item.count,
            type: "过包总数",
          }));
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
          this.$refs.myCharts &&
            this.$refs.myCharts.renderCharts([
              ...securityCheckNumGroup,
              ...lostPackageNumGroup,
              ...wrongPackageNumGroup,
            ]);
        }
      }
      // deviceCountView
      if (deviceView) {
        this.deviceCountView = deviceView;
      }
    },
    renderSecurityCheckList(securityCheckList) {
      // videoList
      if (Array.isArray(securityCheckList)) {
        this.videoList = securityCheckList;
      }
    },
    parseStatus,
    setActiveDevice(targetDevice) {
      this.activeDevice = targetDevice;
      this.stompClient.send(
        "/app/send",
        JSON.stringify({
          type: "device",
          value: targetDevice.id,
        }),
        {}
      );
    },
    setActiveTab(tabKey) {
      this.videoTypeTab.activeVideoTab = tabKey;
      this.stompClient.send(
        "/app/send",
        JSON.stringify({
          type: "detail",
          value: tabKey,
        }),
        {}
      );
    },
  },
  destroyed() {},
  components: {
    AlarmImage,
    DeviceManage,
    Process,
    PersonCount,
    MyChart,
    AddDevice,
    DeviceCount,
    MyVideo,
    Timer,
  },
};
</script>

<style lang="less" scoped>
  @import "./index.less";
</style>
