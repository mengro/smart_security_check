<template>
  <div class="info-container">
    <h3 class="info-title">
      {{ title }}
      <div class="video-replay">视频回放</div>
    </h3>
    <div class="info-body">
      <info-row name="IPC设备名"> </info-row>
      <info-row name="人体抓拍时间"> </info-row>
      <info-row name="包款式、颜色"> </info-row>
      <info-row name="人体图片"> </info-row>
      <info-row name="人脸图片"> </info-row>
    </div>
  </div>
</template>

<script>
  import InfoRow from "@/components/InfoRow";
  export default {
    props: ["title"],
    components: {
      InfoRow,
    },
  };
</script>

<style lang="less" scope>
  .video-replay {
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -14px;
    padding: 5px;
    background: url(../../../../assets/images/btn_replay.png) center center
      no-repeat;
    background-size: contain;
    font-weight: normal;
    font-size: 12px;
    color: #34b9fd;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
</style>
