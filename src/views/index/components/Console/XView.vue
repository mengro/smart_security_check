<template>
  <div class="info-container">
    <h3 class="info-title">
      X光机
    </h3>
    <div class="info-body">
      <info-row name="X光机"> </info-row>
      <info-row name="抓拍时间"> </info-row>
      <info-row name="违禁品识别"> </info-row>
      <info-row name=""> </info-row>
    </div>
  </div>
</template>

<script>
  import InfoRow from "@/components/InfoRow";
  export default {
    components: {
      InfoRow,
    },
  };
</script>

<style lang="less">
</style>
