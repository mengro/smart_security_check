<template>
  <div class="detail-container">
    <div class="side">
      <ipc-view title="前摄像头" :data="data ? data.frontInfo : {}"></ipc-view>
    </div>
    <div class="center">
      <x-view :data="data ? data.xrayInfo : {}"></x-view>
    </div>
    <div class="side">
      <ipc-view title="后摄像头" :data="data ? data.backInfo : {}"></ipc-view>
    </div>
  </div>
</template>

<script>
  import IpcView from "./IpcView";
  import XView from "./XView";
  export default {
    props: ["data"],
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
  }
</style>
