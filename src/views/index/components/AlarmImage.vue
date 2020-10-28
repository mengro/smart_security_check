<template>
<div class="alarm-history-view">
  <div class="content">
    <div class="status">
      <div :style="{ color: statusMap[activeAlarmObj.status].color }" class="status-text">
        <span :style="{ background: statusMap[activeAlarmObj.status].color }" class="ract"></span>
        {{
            statusMap[activeAlarmObj.status] &&
            statusMap[activeAlarmObj.status].text
          }}
      </div>
      <div @click="$emit('close')" class="close"></div>
    </div>
    <div class="header">
      <div class="info">
        <span>告警原因：
        </span>
        <span>告警时间： {{ activeAlarmObj.gmtModify }}</span>
        <span>告警地点：{{ name }}</span>
      </div>
      <div v-if="isAlarm" class="buttons">
        <div @click="$emit('close')" class="button">暂不处理</div>
        <div @click="clickHandle" class="button active">处理完成</div>
      </div>
    </div>
    <div class="video-content">
      <div :key="item.id" v-for="item in alarmList" class="video">
        <img :src="`http://${hostname}:8000/image/${item.imgAddress}`" :alt="item.imgAddress" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import {
  statusMap
} from "@/config";
export default {
  data() {
    return {
      alarmList: [],
      statusMap,
    };
  },
  computed: {
    hostname() {
      return window.location.hostname;
    },
    isAlarm() {
      return (
        this.activeAlarmObj.alarmStatus === 3 ||
        this.activeAlarmObj.alarmStatus === 4
      );
    },
  },
  props: ["activeAlarmObj", "name"],
  watch: {
    activeAlarmObj(value, newValue) {
      if (value.id !== newValue.id) {
        this.initView();
      }
    },
  },
  methods: {
    clickHandle() {
      axios
        .put("/api/securityCheck/1751", {
          id: this.activeAlarmObj.id,
          alarmStatus: 2,
        })
        .then((res) => {
          if (res.data.flag) {
            this.$emit("close");
          }
        });
    },
    initView() {
      axios.post(`/api/securityCheck/${this.activeAlarmObj.id}`).then((res) => {
        if (Array.isArray(res.data.securityCheckDetailList)) {
          this.alarmList = res.data.securityCheckDetailList;
        }
      });
    },
  },
  mounted() {
    this.initView();
  },
  components: {},
};
</script>

<style lang="less" scoped>
.alarm-history-view {
  position: absolute;
  height: 939px;
  width: 1283px;
  background: url("../../../assets/images/alarmModalBg.png") 0 0 no-repeat;
  z-index: 1;
  top: 80px;
  right: 30%;

  .content {
    position: absolute;
    height: 100%;
    width: 100%;

    .status {
      position: relative;
      height: 62px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .status-text {
        font-size: 24px;
        font-family: Source Han Sans SC;
        font-weight: bold;
        color: rgba(255, 46, 65, 1);
        margin-left: 5%;

        .ract {
          display: inline-block;
          height: 8px;
          width: 8px;
          vertical-align: middle;
          margin-left: -24px;
          margin-right: 8px;
        }
      }

      .close {
        height: 20px;
        width: 20px;
        margin-right: 24px;
        margin-bottom: -60px;
        cursor: pointer;
      }
    }

    .header {
      width: 90%;
      margin: 22px auto 0;
      display: flex;
      justify-content: space-between;

      .info {
        font-size: 20px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: #fff;

        span {
          display: inline-block;
          margin-right: 32px;
        }
      }

      .buttons {
        .active {
          margin-left: 16px;
        }
      }
    }

    .video-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height: calc(~"100% - 138px");
      overflow-y: auto;
      width: 90%;
      margin: 24px auto 0;

      .video {
        height: 366px;
        flex: 0 0 544px;
        padding: 18px;
        margin: 0 16px;
        border: 2px solid rgba(255, 255, 255, 1);
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        box-sizing: border-box;

        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
          flex: 1 0 320px;
        }

        img {
          height: 100%;
          max-width: 100%;
        }
      }
    }
  }
}
</style>
