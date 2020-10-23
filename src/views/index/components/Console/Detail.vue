<template>
<div class="detail-container">
  <div class="side">
    <ipc-view :data="[]"></ipc-view>
  </div>
  <div class="center">
  </div>
  <div class="side">
  </div>
</div>
</template>

<script>
import IPCView from './IPCView'
export default {
  components: {
    IPCView,
  }
}
</script>

<style lang="less">
.detail-container {
  display: flex;
  justify-content: space-around;
  align-items: center;

  .side {
    width: 25%
  }

  .center {
    width: 40%;
  }
}
</style>
