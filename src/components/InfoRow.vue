<template>
  <div class="info-row">
    <div class="name">{{ `${name}${name ? ":" : ""}` }}</div>
    <div v-if="value" class="value">
      {{ value }}
    </div>
    <div class="value" v-else><slot></slot></div>
  </div>
</template>

<script>
  export default {
    props: ["name", "value"],
  };
</script>

<style lang="less">
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    .name {
      width: 130px;
      text-align: right;
      color: #81b8e3;
    }
    .value {
      flex: 1;
    }
  }
</style>
