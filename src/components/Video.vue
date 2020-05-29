<template>
  <div class="rtmpVideo">
    <video id="myVideo" class="video-js">
      <!-- <source src="rtmp://58.200.131.2:1935/livetv/hunantv" type="rtmp/flv" /> -->
    </video>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "myVideo",
  data() {
    return {};
  },
  mounted() {
    this.initVideo();
  },
  methods: {
    initVideo() {
      // 初始化视频方法
      let myPlayer = this.$video('myVideo', {
        // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        // 自动播放属性,muted:静音播放
        autoplay: "muted",
        // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        // 在视频开始播放之前显示的图像的URL
        poster: "http://imgsrc.baidu.com/forum/pic/item/024f78f0f736afc35145daddb319ebc4b7451238.jpg?v=tbs",
        // 设置视频播放器的显示宽度（以像素为单位）
        width: "560px",
        // 设置视频播放器的显示高度（以像素为单位）
        height: "350px",
        sources: [{
          src: 'rtmp://58.200.131.2:1935/livetv/hunantv',
          type: 'rtmp/flv'
        },]
      }, function onPlayerReady() {
        console.log("播放器已准备就绪!");
        // In this context, `this` is the player that was created by Video.js.
        this.play();
        // How about an event listener?
        this.on("ended", function () {
          console.log("啊...这么快结束了？！");
        });
      }
      );
    }
  },
  destroyed() {
    this.$video('myVideo').dispose();
  }
};
</script>

<style lang='less' scoped>
.rtmpVideo{
  /deep/.video-js{
    .vjs-big-play-button{
      top: calc(~'50% - 22.5px');
      left: calc(~'50% - 45px');
    }
  }
}

</style>