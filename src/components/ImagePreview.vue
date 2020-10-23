<template>
<div>
  <img class="img-primary" @click="e => visible = true" :src="src">
  <el-dialog :visible="visible" :show-close="true" @close="e => visible = false">
    <img class="img-preview" :src="src">
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      visible
    }
  },
  props: ['src']
}
</script>

<style lang="less" scope>

</style>
