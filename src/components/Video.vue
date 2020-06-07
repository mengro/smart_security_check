<template>
  <video
    data-setup='{ "techOrder": ["flash"] }'
    preload="auto"
    muted
    controls
    autoplay
    :id="'myvideo' + videoName"
    class="video-js"
    type="rtmp/flv"
    :src="url"
  >
    <!-- <source src="rtmp://58.200.131.2:1935/livetv/hunantv" type="rtmp/flv" /> -->
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
      this.updateSrc();
    },
  },
  mounted() {
    this.initVideo();
  },
  methods: {
    // play() {
    //   if (this.url) {
    //     const playerEle = document.getElementById("myvideo" + this.videoName)
    //     const sourceEle = document.createElement('source')
    //     sourceEle.type = 'application/x-rtsp'
    //     sourceEle.src = this.url
    //     playerEle.appendChild(sourceEle)
    //     Streamedian.player("myvideo" + this.videoName, {
    //       socket: "wss://streamedian.com/ws/",
    //     });
    //   }
    // },
    updateSrc() {
      if (!this.url) {
        return;
      }
      this.videoPlayer.src(this.url);
      this.videoPlayer.load();
    },
    initVideo() {
      //初始化视频方法
      this.videoPlayer = this.$video("#myvideo" + this.videoName, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        muted: true,
        //自动播放属性,muted:静音播放
        autoplay: true,
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "154px",
        //设置视频播放器的显示高度（以像素为单位）
        height: "100px",
      });
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
