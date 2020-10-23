<template>
<div class="info-row">
  <span class="name">
    {{name}}
  </span>
  <span class="value">
    {{value}}
  </span>
</div>
</template>

<script>
export default {
  props: ['name', 'value']
}
</script>

<style lang="less">
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .name {
    width: 100px;
  }
}
</style>
