<template>
  <ul class="process-container">
    <li
      v-for="(item, index) in new Array(length)"
      :key="index"
      :class="`process-item ${value > index ? 'active' : ''}`"
    ></li>
  </ul>
</template>

<script>
export default {
  props: ["length", "value"],
};
</script>
<style lang="less" scoped>
.process-container {
  .process-item {
    display: inline-block;
    vertical-align: middle;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border: 1px solid rgba(54, 197, 224, 1);
    background: linear-gradient(
      90deg,
      rgba(78, 255, 245, 1) 0%,
      rgba(78, 255, 245, -8.67) 36%
    );
    border-radius: 50%;
    &.active {
      background: #4efff5;
    }
  }
}
</style>
