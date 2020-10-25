<template>
<div class="info-container">
  <div class="side">
    <div class="info-row">
      <info-row name="IPC设备名">
      </info-row>
      <info-row class="value">
      </info-row>
    </div>
    <div class="info-row">
      <info-row name="人体抓拍时间">
      </info-row>
      <info-row class="value">
      </info-row>
    </div>
    <div class="info-row">
      <info-row name="包款式、颜色">
      </info-row>
      <info-row class="value">
      </info-row>
    </div>
    <div class="info-row">
      <info-row name="人体图片">
      </info-row>
      <info-row class="value">
      </info-row>
    </div>
    <div class="info-row">
      <info-row name="人脸图片">
      </info-row>
      <info-row class="value">
      </info-row>
    </div>
  </div>
</div>
</template>

<script>
import InfoRow from '@/components/InfoRow'
export default {
  components: {
    InfoRow,
  }
}
</script>

<style lang="less">
</style>
