<template>
  <video muted preload="auto" autoplay="autoplay" ref="myVideo" :id="'myvideo' + videoName" class="video-js">
    <!-- <source :src="url" type="rtmp/flv" /> -->
    <source src="rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov" type="application/x-mpegURL" />
  </video>
</template>

<script>
/* eslint-disable */
export default {
  name: "TestTwo",
  data() {
    return {};
  },
  props: ['url', 'videoName'],
  mounted() {
    this.initVideo();
  },
  methods: {
    initVideo() {
      //初始化视频方法
      this.$video(
        '#myvideo' + this.videoName,
        {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "154px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "100px",
        },
      ).ready(function() {
        this.play();
        this.on("ended", function () {});
      })
    },
  },
};
</script>

<style lang="less" scoped>
.video-js {
  width: 100%;
  height: 100%;
}
</style>
