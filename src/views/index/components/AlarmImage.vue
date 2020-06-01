<template>
  <div class="video-view">
    <div class="content">
      <div class="status">
        <div class="status-text">告警</div>
        <div @click="$emit('close')" class="close"></div>
      </div>
      <div class="header">
        <div class="info">
          <span>告警原因： 拿错包</span>
          <span>告警时间： 19:30:32</span>
          <span>告警地点：大会堂事事顺遂是</span>
        </div>
        <div class="buttons">
          <div @click="$emit('close')" class="button">暂不处理</div>
          <div @click="clickHandle" class="button active">处理完成</div>
        </div>
      </div>
      <div class="video-content">
        <div :key="item.seq" v-for="item in videoList" class="video">
          <img
            :src="`http://121.37.12.97:8000/image/${item.imgAddress}`"
            :alt="item.imgAddress"
          />
        </div>
      </div>
      <img
        class="activeTag"
        :style="{ top: `${activeTagTop - 80}px` }"
        src="../../../assets/images/alarmModalActiveTag.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "@/constant.js";
export default {
  data() {
    return {
      videoList: [],
    };
  },
  props: ["activeVideoId", "activeTagTop"],
  methods: {
    clickHandle() {
      axios
        .put(`${API_URL}/api/securityCheck`, {
          id: this.activeVideoId,
          alarmStatus: 2,
        })
        .then((res) => {
          if (res.data.flag) {
            this.$emit("close");
          }
        });
    },
    initView() {
      axios
        .post(
          `${API_URL}/api/securityCheckDetail/findByBillId/${this.activeVideoId}`
        )
        .then((res) => {
          if (Array.isArray(res.data.data)) {
            this.videoList = res.data.data;
          }
        });
    },
  },
  mounted() {
    this.initView();
    console.log(this.activeTagTop);
  },
  components: {},
};
</script>
<style lang="less" scoped>
.video-view {
  position: relative;
  height: 100%;
  width: 100%;
  background: url("../../../assets/images/alarmModalBg.png") 0 0 no-repeat;
  .content {
    position: absolute;
    height: 100%;
    width: 100%;
    .status {
      position: relative;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .status-text {
        font-size: 24px;
        font-family: Source Han Sans SC;
        font-weight: bold;
        color: rgba(255, 46, 65, 1);
        margin-left: 5%;
        &::before {
          content: "";
          display: inline-block;
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background: rgba(255, 46, 65, 1);
          vertical-align: middle;
          margin-left: -24px;
          margin-right: 16px;
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
      margin: 32px auto 0;
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
        width: 561px;
        height: 366px;
        border: 2px solid rgba(255, 255, 255, 1);
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        img {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 1;
        }
      }
    }
    .activeTag {
      position: absolute;
      right: 0;
    }
  }
}
</style>
