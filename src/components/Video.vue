<template>
  <video controls autoplay :id="'myvideo' + videoName" class="video-js">
    <!-- <source :src="url" type="application/x-rtsp" /> -->
    <!-- <source
      src="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov"
      type="application/x-rtsp"
    />-->
  </video>
</template>

<script>
export default {
  name: "TestTwo",
  data() {
    return {};
  },
  props: ["url", "videoName"],
  watch: {
    url(value) {
      this.play()
    }
  },
  mounted() {
    this.play()
  },
  methods: {
    play() {
      if (this.url) {
        const playerEle = document.getElementById("myvideo" + this.videoName)
        const sourceEle = document.createElement('source')
        sourceEle.type = 'application/x-rtsp'
        sourceEle.src = this.url
        playerEle.appendChild(sourceEle)
        Streamedian.player("myvideo" + this.videoName, {
          socket: "wss://streamedian.com/ws/",
        });
      }
    },
    initVideo() {
      //初始化视频方法
      // this.$video("#myvideo" + this.videoName, {
      //   //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      //   controls: true,
      //   //自动播放属性,muted:静音播放
      //   autoplay: "muted",
      //   //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      //   preload: "auto",
      //   //设置视频播放器的显示宽度（以像素为单位）
      //   width: "154px",
      //   //设置视频播放器的显示高度（以像素为单位）
      //   height: "100px",
      // }).ready(function () {
      //   this.play();
      //   this.on("ended", function () {});
      // });
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
