<template>
  <div class="image-preview-container">
    <img class="img-primary" @click="(e) => (visible = true)" :src="src" />
    <el-dialog
      :append-to-body="true"
      :visible="visible"
      :show-close="true"
      @close="(e) => (visible = false)"
    >
      <img class="img-preview" :src="src" />
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    computed: {
      finalSrc() {
        return `http://${hostname}:8000/image/${this.src}`;
      },
    },
    props: ["src"],
  };
</script>

<style lang="less" scope>
  .image-preview-container {
    height: 100%;
    width: 100%;
    .img-primary {
    }
  }
</style>
