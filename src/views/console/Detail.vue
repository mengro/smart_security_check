<template>
  <div class="detail-container">
    <div class="side">
      <ipc-view
        title="前摄像头"
        :data="infoData ? infoData.frontInfo : {}"
      ></ipc-view>
    </div>
    <div class="center">
      <div class="result-container">
        <div class="result-title">安检口</div>
        <div class="result-value">
          {{ infoData ? infoData.location : "" }}
        </div>
        <div class="result-title">分析结果</div>
        <div
          :style="{
            color:
              colorMap[
                infoData && infoData.alarmLevel ? infoData.alarmLevel : 1
              ],
          }"
          class="result-value"
        >
          {{ infoData ? infoData.statusDesc : "" }}
        </div>
        <div class="result-title">生成时间</div>
        <div class="result-value">
          {{ infoData ? infoData.gmtCreate : "" }}
        </div>
      </div>
      <x-view :data="infoData ? infoData.xrayInfo : {}"></x-view>
    </div>
    <div class="side">
      <ipc-view
        title="后摄像头"
        :data="infoData ? infoData.backInfo : {}"
      ></ipc-view>
    </div>
  </div>
</template>

<script>
  import { securityCheckDetail } from "@/services/console.js";
  import IpcView from "./IpcView";
  import XView from "./XView";
  import { colorMap } from "@/config";
  export default {
    data() {
      return {
        colorMap,
        infoData: null,
      };
    },
    props: ["id"],
    methods: {
      initView() {
        if (!this.id) {
          return;
        }
        securityCheckDetail(this.id).then((res) => {
          if (res.data) {
            this.infoData = res.data;
          }
        });
      },
    },
    mounted() {
      this.initView();
    },
    components: {
      IpcView,
      XView,
    },
  };
</script>

<style lang="less">
  .detail-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;

    .info-container {
      background: #0e2a63;

      border: 1px solid #6076ad;

      .info-title {
        text-align: center;
        background: #1d4587;
        padding: 4px 0;
        position: relative;
      }

      .info-body {
        padding: 12px 0;
      }
    }

    .side {
      width: 30%;
    }

    .center {
      width: 30%;
    }

    .result-container {
      text-align: center;

      .result-title,
      .result-value {
        line-height: 2;
      }

      .result-title {
        color: #81b8e3;
      }

      .result-value {
        margin-bottom: 24px;
        font-size: 18px;
      }
    }
  }
</style>
