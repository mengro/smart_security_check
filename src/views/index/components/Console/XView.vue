<template>
  <div class="info-container">
    <h3 class="info-title">
      X光机
    </h3>
    <div class="info-body">
      <info-row name="X光机"> </info-row>
      <info-row name="抓拍时间"> </info-row>
      <info-row name="违禁品识别"> </info-row>
      <div :style="{ margin: '16px 16px 8px 16px' }">
        <image-preview
          :src="
            data.bodyImage || 'http://121.37.12.97:8000/image/15126_0101.jpg'
          "
        >
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
  };
</script>

<style lang="less">
</style>
