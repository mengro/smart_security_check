<template>
  <div class="info-container">
    <h3 class="info-title">
      X光机
    </h3>
    <div class="info-body">
      <info-row name="X光机"> {{ data.deviceName }}</info-row>
      <info-row name="抓拍时间"> {{ data.happenedTime }}</info-row>
      <info-row name="违禁品识别">{{ data.detailInfo }} </info-row>
      <div :style="{ margin: '16px 16px 8px 16px' }">
        <image-preview :src="`http://${hostname}:8000/image/${data.xrayImage}`">
        </image-preview>
      </div>
    </div>
  </div>
</template>

<script>
  import InfoRow from "@/components/InfoRow";
  import ImagePreview from "@/components/ImagePreview.vue";
  export default {
    props: ["data"],
    components: {
      InfoRow,
      ImagePreview,
    },
    computed: {
      hostname() {
        return window.location.hostname;
      },
    },
  };
</script>

<style lang="less">
</style>
