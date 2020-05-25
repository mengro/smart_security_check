<template>
  <div class="index" :style="{height: pageHeight+'px'}">
    <div class="content">
      <div class="head flex_between">
        <p class="time">2020 年 5 月 19 日 星期二 16:56:01</p>
        <h3>智慧安检综合管理平台</h3>
        <p class="device">设备管理</p>
      </div>
      <div class="body flex_start">
        <div class="bodyItem bodyLeft">
          <!-- 任务统计 -->
          <div class="taskStatistics">
            <p class="sectionTitle">{{taskData.title}}</p>
            <ul class="taskList flex_start_v">
              <li v-for="item in taskData.list" :key="item.id">
                <img :src="item.icon" width="100%" height="100%">
                <p>- {{item.text}} -</p>
                <p>{{item.num}}</p>
                <p>{{item.unit}}</p>
              </li>
            </ul>
          </div>
          <!-- 报警统计 -->
          <div class="alarmStatistics">
            <p class="sectionTitle">{{alarmData.title}}</p>
            <ul class="taskList flex_start_v">
              <li class="flex_start_v" v-for="item in alarmData.list" :key="item.id">
                <img :src="item.icon" width="30" height="30">
                <div>
                  <p class="num">{{item.num}}</p>
                  <p class="text">{{item.text}}</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- 设备统计 -->
          <div class="deviceStatistics">
            <p class="sectionTitle">{{deviceData.title}}</p>
            <ul class="deviceList flex_start_v">
              <li v-for="item in deviceData.list" :key="item.id">
                  <p class="text">{{item.text}}</p>
                  <p class="num">{{item.num}}</p>
                  <p class="proportion">
                    <span>{{item.proportion.n1}}</span> /
                    <span>{{item.proportion.n2}}</span>
                  </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="bodyItem bodyCenter"></div>
        <div class="bodyItem bodyRight"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      pageHeight: window.innerHeight,
      taskData: {
        title: '任务统计',
        list: [
          { id: 1, icon: require('../../assets/images/icon_1@2x.png'), text: '数据流', num: 2648, unit: '次' },
          { id: 2, icon: require('../../assets/images/icon_2@2x.png'), text: '视频流', num: 6659, unit: '分钟' },
          { id: 3, icon: require('../../assets/images/icon_3@2x.png'), text: '图片流', num: 46325, unit: '张' }
        ]
      },
      alarmData: {
        title: '报警统计',
        list: [
          { id: 1, icon: require('../../assets/images/logo.png'), text: '过包总数', num: 2648 },
          { id: 2, icon: require('../../assets/images/logo.png'), text: '遗留包总数', num: 6659 },
          { id: 3, icon: require('../../assets/images/logo.png'), text: '拿错包总数', num: 46325 }
        ]
      },
      deviceData: {
        title: '设备统计',
        list: [
          { id: 1, text: '智能前端', num: 2648, proportion: { n1: '2273', n2: '635' } },
          { id: 2, text: '安检机', num: 6659, proportion: { n1: '2273', n2: '635' } },
          { id: 3, text: '摄像头', num: 46325, proportion: { n1: '2273', n2: '635' } }
        ]
      }
    }
  },
  created () {

  },
  mounted () {
    // 挂载浏览器高度获取方法
    const that = this
    window.onresize = () => {
      return (() => {
        that.pageHeight = window.innerHeight
      })()
    }
  },
  methods: {},
  destroyed () {}
}

</script>

<style lang="less" scoped>
@import './index.less';
</style>
