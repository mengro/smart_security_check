<template>
  <div class="info-row">
    <span class="name"> {{ `${name}${name ? ":" : ""}` }} </span>
    <span class="value">
      {{ value }}
    </span>
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
  }
</style>
