<template>
  <div class="video-view">
    <div class="content">
      <div class="status">
        告警
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
          <img :src="`http://121.37.12.97:8000/image/${item.imgAddress}`" />
        </div>
      </div>
    </div>
    <img src="../../../assets/images/弹出框.png" alt />
  </div>
</template>

<script>
import axios from "axios";
import { API_URL } from "@/constant.js";
export default {
  data() {
    return {
      videoList: []
    }
  },
  props: ['activeVideoId'],
  methods: {
    clickHandle() {
      axios.put(`${API_URL}/api/securityCheck`, {
        id: this.activeVideoId,
        alarmStatus: 2,
      })
        .then(res => {
          if(res.data.flag) {
            this.$emit('close')
          }
        })
    },
    initView() {
      axios.post(`${API_URL}/api/securityCheckDetail//findByBillId/${this.activeVideoId}`)
        .then(res => {
          if (Array.isArray(res.data)) {
            this.videoList = res.data
          }
        })
    }
  },
  mounted() {
    this.initView()
  }
};
</script>
<style lang="less" scoped>
  .video-view {
    position: relative;
    height: 100%;
    width: 100%;
    background: transparent;
    img {
      position: absolute;
      left: 0px;
      top: -60px;
      z-index: -1;
    }
    .content {
      position: absolute;
      left: 100px;
      top: 90px;
      height: 900px;
      width: 1160px;
      .status {
        position: relative;
        .close {
          position: absolute;
          right: 0;
          height: 20px;
          width: 20px;
          margin-right: -38px;
          margin-top: -12px;
          cursor: pointer;
        }
      }
      .header {
        margin-top: 32px;
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
        .video {
          margin-top: 24px;
          width: 561px;
          height: 366px;
          border: 2px solid rgba(255, 255, 255, 1);
          position: relative;
          img {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
          }
        }
      }
    }
  }
</style>
