<template>
  <div class="index" :style="{ height: pageHeight + 'px' }">
    <div class="content">
      <div class="head flex_between">
        <div class="time-text">
          <timer></timer>
        </div>
        <div class="console" @click="routeToConsolePage">
          控制台
        </div>
      </div>
      <div class="body flex_start">
        <div class="bodyItem bodyLeft">
          <!-- 设备统计 -->
          <div class="taskStatistics">
            <p class="sectionTitle">设备统计</p>
            <task-count :taskView="taskView"></task-count>
          </div>
          <!-- 数据统计 -->
          <div class="alarmStatistics">
            <p class="sectionTitle">数据统计</p>
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
                >
                  {{ item }}
                </div>
              </span>
            </div>
            <div id="gis-container" class="gis-container"></div>
            <div v-if="currentMovingMaker" class="map-buttons">
              <span @click="saveMoving" class="map-buttons-save">确定</span>
              <span @click="cancelMoving" class="map-buttons-cancel">取消</span>
            </div>
          </div>
        </div>
        <div class="bodyItem bodyRight">
          <div class="device-container">
            <div class="device-content">
              <p class="sectionTitle">安检详情</p>
              <div class="active-device-name">
                <img
                  src="../../assets/images/loction@2x.png"
                  width="17"
                  height="22"
                  alt
                />
                <span>{{
                  activeDevice.coordinate
                    ? `${activeDevice.coordinate}-${activeDevice.orientation}-${activeDevice.code}`
                    : "暂无设备"
                }}</span>
              </div>
              <ul class="camera-list">
                <li>
                  <div class="video">
                    <my-video
                      videoName="a"
                      :url="activeDevice.deviceAddressA"
                    ></my-video>
                  </div>
                  <!-- <div class="camera-name">{{ item.name }}</div> -->
                </li>
                <li>
                  <div class="video">
                    <my-video
                      videoName="b"
                      :url="activeDevice.deviceAddressB"
                    ></my-video>
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
                >
                  {{ item.name }}
                </li>
              </ul>
              <div class="video-container">
                <div class="video-header">
                  <h6 class="time">时间</h6>
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
                      <span
                        :style="{ color: colorMap[item.alarmLevel] }"
                        class="status"
                        >{{ item.statusDesc }}</span
                      >
                      <img
                        v-show="activeAlarmObj && activeAlarmObj.id === item.id"
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
      <el-dialog
        title="历史记录详情"
        :append-to-body="true"
        width="90%"
        @close="activeAlarmObj = null"
        :visible="!!activeAlarmObj"
      >
        <detail :data="activeAlarmObj"></detail>
      </el-dialog>
    </div>
    <modal :clickToClose="false" height="740" width="1283" name="device-manage">
      <device-manage
        ref="deviceListModal"
        :choosePosition="choosePosition"
        :openAddDeviceModal="openAddDeviceModal"
        @close="$modal.hide('device-manage')"
      ></device-manage>
    </modal>
  </div>
</template>

<script>
  import AlarmImage from "./components/AlarmImage";
  import DeviceManage from "./components/DeviceManage";
  import Process from "./components/Process";
  import MyChart from "./components/MyChart";
  import TaskCount from "./components/TaskCount";
  import PersonCount from "./components/PersonCount";
  import Timer from "./components/Timer";
  import MyVideo from "@/components/Video";
  import Detail from "../console/Detail";
  import SockJS from "sockjs-client";
  import Stomp from "webstomp-client";
  import axios from "axios";
  import { WS_URL } from "@/constant.js";
  import { deviceStatusMap, statusMap, parseStatus, colorMap } from "@/config";
  import markerActivePng from "@/assets/images/device_dot_active.png";
  import markerPng from "@/assets/images/device_dot.png";
  import markerMoving from "@/assets/images/maker_moving.png";

  const activeMarkerIcon = new AMap.Icon({
    size: new AMap.Size(64, 64), // 图标尺寸
    image: markerActivePng, // Icon的图像
    imageOffset: new AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
    imageSize: new AMap.Size(64, 64), // 根据所设置的大小拉伸或压缩图片
  });

  const markerIcon = new AMap.Icon({
    size: new AMap.Size(64, 64), // 图标尺寸
    image: markerPng, // Icon的图像
    imageOffset: new AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
    imageSize: new AMap.Size(64, 64), // 根据所设置的大小拉伸或压缩图片
  });

  const movingMarkerIcon = new AMap.Icon({
    size: new AMap.Size(70, 85), // 图标尺寸
    image: markerMoving, // Icon的图像
    imageOffset: new AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
    imageSize: new AMap.Size(70, 85), // 根据所设置的大小拉伸或压缩图片
  });

  export default {
    name: "index",
    data() {
      return {
        deviceStatusMap,
        colorMap,
        statusMap,
        pageHeight: window.innerHeight,
        taskView: {
          cameraCoreNum: 0,
          cameraNum: 0,
          xrayNum: 0,
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
            text: "错拿包总数",
            num: 0,
          },
        },
        consoleVisible: false,
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
        videoTypeTab: {
          activeVideoTab: 1,
          subTabs: [
            {
              name: "全部",
              tabKey: 1,
            },
            {
              name: "正常通行",
              tabKey: 2,
            },
            {
              name: "异常包",
              tabKey: 3,
            },
            {
              name: "违禁品",
              tabKey: 4,
            },
            {
              name: "未匹配",
              tabKey: 5,
            },
          ],
        },
        videoList: [],
        activeAlarmObj: null,
        markers: [],
        currentMovingMaker: null,
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
      this.initGis();
    },
    methods: {
      initGis() {
        this.map = new AMap.Map("gis-container", {
          zoom: 20,
          mapStyle: "amap://styles/d2d9f0bac875a60d2e0e35dbfe6849fb", //设置地图的显示样式
        });
        this.map.on("click", this.addDevicePoint);
        this.map.on("zoomend", (e) => {
          const zoom = this.map.getZoom();
          if (zoom < 15) {
            this.markers.forEach((marker) => {
              marker.hideTitle();
            });
          } else {
            this.markers.forEach((marker) => {
              marker.showTitle();
            });
          }
        });
      },
      addDevicePoint(e) {
        const device = this.chooseingDevice;
        this.updateDevicePoint(e).then((e) => {
          const mk =
            this.markers && this.markers.find((mk) => mk.id === device.id);
          if (mk) {
            const newPosition = new AMap.LngLat(e.lnglat.lng, e.lnglat.lat);
            mk.setPosition(newPosition);
          } else {
            this.addPoint(
              {
                lng: e.lnglat.lng,
                lat: e.lnglat.lat,
              },
              device
            );
          }
        });
      },
      routeToConsolePage() {
        this.$router.push({
          path: "/console",
        });
      },
      updateDevicePoint(e) {
        if (this.chooseingDevice) {
          return this.$confirm(
            `确定设置位置为经度：${e.lnglat.lng}，纬度：${e.lnglat.lat}吗？`,
            "设置位置"
          ).then(() => {
            axios.put("/api/device", {
              id: this.chooseingDevice.id,
              code: this.chooseingDevice.code,
              coordinate: this.chooseingDevice.coordinate,
              orientation: this.chooseingDevice.orientation,
              deviceAddressA: this.chooseingDevice.deviceAddressA,
              deviceAddressB: this.chooseingDevice.deviceAddressB,
              deviceAddressC: this.chooseingDevice.deviceAddressC,
              nodeId: this.chooseingDevice.nodeId,
              workStatus: this.chooseingDevice.workStatus,
              workTime: this.chooseingDevice.workTime,
              alarmStatus: this.chooseingDevice.alarmStatus,
              version: this.chooseingDevice.version,
              longitude: e.lnglat.lng,
              latitude: e.lnglat.lat,
            });
            this.chooseingDevice = null;
            return e;
          });
        }
      },
      saveMoving() {
        axios.put("/api/device", {
          id: this.chooseingDevice.id,
          code: this.chooseingDevice.code,
          coordinate: this.chooseingDevice.coordinate,
          orientation: this.chooseingDevice.orientation,
          deviceAddressA: this.chooseingDevice.deviceAddressA,
          deviceAddressB: this.chooseingDevice.deviceAddressB,
          deviceAddressC: this.chooseingDevice.deviceAddressC,
          nodeId: this.chooseingDevice.nodeId,
          workStatus: this.chooseingDevice.workStatus,
          workTime: this.chooseingDevice.workTime,
          alarmStatus: this.chooseingDevice.alarmStatus,
          version: this.chooseingDevice.version,
          longitude: this.finalPosition.lng,
          latitude: this.finalPosition.lat,
        });
        this.iconChangeBack();
      },
      cancelMoving() {
        if (this.originPosition) {
          this.currentMovingMaker &&
            this.currentMovingMaker.setPosition(this.originPosition);
        }
        this.iconChangeBack();
      },
      iconChangeBack() {
        this.currentMovingMaker.setIcon(this.originIcon);
        this.currentMovingMaker.isMoving = false;
        this.chooseingDevice = null;
        this.currentMovingMaker = null;
      },
      addPoint({ title, lng, lat } = {}, device, active) {
        var marker = new AMap.Marker({
          position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: device.code,
          icon: active ? activeMarkerIcon : markerIcon,
          draggable: true,
          offset: new AMap.Pixel(0, 32),
          anchor: "bottom-center",
        });
        marker.id = device.id;
        if (active) {
          this.lastMarker = marker;
          marker.setzIndex(101);
        }
        const showTitle = () => {
          const active = this.activeDevice.id === device.id;
          marker.setLabel({
            offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
            content: `<div class=${
              active ? "active" : "normal"
            }>                                                                                                  </div>`, //设置文本标注内容
            direction: "top", //设置文本标注方位
          });
        };
        const hideTitle = () => {
          marker.setLabel({
            offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
            content: `<div class="hidden"></div>`, //设置文本标注内容
            direction: "top", //设置文本标注方位
          });
        };
        marker.showTitle = showTitle;
        marker.hideTitle = hideTitle;
        showTitle();
        marker.on("dragstart", (e) => {
          hideTitle();
          if (!marker.isMoving) {
            this.originPosition = new AMap.LngLat(e.lnglat.lng, e.lnglat.lat);
            const active = this.activeDevice.id === device.id;
            if (active) {
              this.originIcon = activeMarkerIcon;
            } else {
              this.originIcon = markerIcon;
            }
          }
          marker.setIcon(movingMarkerIcon);
          marker.isMoving = true;
          this.currentMovingMaker = marker;
        });
        marker.on("dragend", (e) => {
          this.chooseingDevice = device;
          this.finalPosition = {
            lng: e.lnglat.lng,
            lat: e.lnglat.lat,
          };
        });
        marker.on("mouseover", (e) => {
          const zomm = this.map.getZoom();
          if (zomm < 15) {
            showTitle();
          }
        });
        marker.on("mouseout", (e) => {
          const zomm = this.map.getZoom();
          if (zomm < 15) {
            hideTitle();
          }
        });
        marker.on("click", (e) => {
          this.markerClickHandle(marker, device);
        });
        // 将创建的点标记添加到已有的地图实例：
        this.map.add(marker);
        this.markers.push(marker);
      },
      markerClickHandle(marker, device) {
        this.setActiveDevice(device);
        if (this.lastMarker) {
          this.lastMarker.setIcon(markerIcon);
          this.lastMarker.setzIndex(100);
          const zomm = this.map.getZoom();
          if (zomm >= 15) {
            this.lastMarker.showTitle();
          } else {
            this.lastMarker.hideTitle();
          }
        }
        marker.setzIndex(101);
        marker.showTitle();
        marker.setIcon(activeMarkerIcon);
        this.lastMarker = marker;
      },
      choosePosition(device) {
        this.chooseingDevice = device;
      },
      setActiveAlarm(item, e) {
        this.activeAlarmObj = item;
      },
      addDeviceListToMap(deviceList) {
        deviceList.forEach((device, index) => {
          if (device.latitude && device.longitude) {
            this.addPoint(
              {
                title: device.name,
                lng: device.longitude,
                lat: device.latitude,
              },
              device,
              index === 0
            );
          }
        });
        if (deviceList[0]) {
          this.map.setCenter([deviceList[0].longitude, deviceList[0].latitude]);
        } else {
          this.map.setCenter([120.165477, 30.278475]); // 默认设知道西湖文化广场
        }
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
      initDeviceList() {
        this.$refs.deviceListModal && this.$refs.deviceListModal.initList();
      },
      connection() {
        const socket = new SockJS(WS_URL);
        this.stompClient = Stomp.over(socket, {
          debug: false,
        });
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
              if (deviceData.id === this.activeDevice.id) {
                this.activeDevice = deviceData;
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
        axios.get("/init").then((data) => {
          if (data) {
            this.renderView(data);
            const { deviceList, securityCheckTotal, securityCheckList } =
              data || {};
            // deviceList
            if (Array.isArray(deviceList)) {
              this.deviceViewsList = deviceList;
              this.activeDevice = deviceList[0] || {};
              this.addDeviceListToMap(deviceList);
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
            Array.isArray(securityCheckNumGroupByHour) &&
            Array.isArray(lostPackageNumGroupByHour) &&
            Array.isArray(wrongPackageNumGroupByHour)
          ) {
            const securityCheckNumGroup = securityCheckNumGroupByHour.map(
              (item) => ({
                hours: item.hours,
                count: item.count,
                type: "过包总数",
              })
            );
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
      TaskCount,
      MyVideo,
      Detail,
      Timer,
    },
  };
</script>

<style lang="less" scoped>
  @import "./index.less";
</style><style lang="less">
  .amap-marker-label {
    background-color: transparent;
    border: 0;
    margin-left: -20px;
    margin-top: -12px;
    z-index: 3;

    .normal {
      background-image: url("../../assets/images/device_map_count.png");
    }

    .active {
      background-image: url("../../assets/images/device_map_active.png");
    }

    .hidden {
      display: none;
    }

    .normal,
    .active {
      background-position: center center;
      background-repeat: no-repeat;
      width: 90px;
      height: 80px;
      background-size: cover;
      padding-top: 18px;
      font-size: 12px;
      line-height: 18px;
      box-sizing: border-box;
    }
  }
</style>
