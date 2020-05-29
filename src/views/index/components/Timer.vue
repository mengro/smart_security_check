<template>
  <p class="time">{{ formattedTime }}</p>
</template>

<script>
import moment from "moment";
let interval;
export default {
  data() {
    return {
      currentTime: new Date(),
    };
  },
  computed: {
    formattedTime() {
      return moment(this.currentTime).format("YYYY年MM月DD日 dddd HH:mm:ss");
    },
  },
  methods: {
    startTiming() {
      interval = setInterval(() => {
        this.currentTime = new Date();
      }, 1000);
    },
  },
  mounted() {
    this.startTiming();
  },
  unmounted() {
    clearInterval(interval);
  },
};
</script>
<style lang="less" scoped>
.time {
  color: #4fd4ff;
  font-size: 24px;
}
</style>
