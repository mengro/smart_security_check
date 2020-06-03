<template>
  <div class="my-charts" ref="chartsRef"></div>
</template>

<script>
import { Chart } from "@antv/g2";
import moment from "moment";
export default {
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.chart = new Chart({
        container: this.$refs.chartsRef,
        autoFit: true,
        height: 500,
      });
      this.chart.scale({
        hours: {
          range: [0, 1],
        },
        count: {
          nice: true,
          range: [0, 1],
        },
      });

      this.chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });

      this.chart.axis("count", {
        grid: null,
      });
      this.chart.axis("hours", {
        label: {
          formatter: (val) => {
            return moment().set("hours", val).format("HH:00");
          },
        },
      });
      this.chart
        .area()
        .position("hours*count")
        .color("type", ["rgba(255,255,255,0.1)"]);
      this.chart
        .line()
        .position("hours*count")
        .color("type", ["#D249FF", "#2FCCFF"])
        .shape("smooth");
      this.chart
        .point()
        .position("hours*count")
        .color("#D249FF")
        .size(2)
        .shape("square");
      this.chart.legend({
        position: "top",
      });
    },
    renderCharts(chartsData) {
      this.chart.data(chartsData);
      this.chart.render();
    },
  }
}
</script>
<style lang="less" scoped>
  .my-charts {
    width: 100%;
    height: 100%;
  }
</style>