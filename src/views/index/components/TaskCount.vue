<template>
  <ul class="taskCount-container flex_start_v">
    <li>
      <img
        src="../../../assets/images/icon_1@2x.png"
        width="100%"
        height="100%"
      />
      <p>- EC200 -</p>
      <p><span class="prefix">总数：</span>{{ taskView.cameraCoreNum }}</p>
      <!-- <p>次</p> -->
    </li>
    <li>
      <img
        src="../../../assets/images/icon_2@2x.png"
        width="100%"
        height="100%"
      />
      <p>- X光机AI盒 -</p>
      <p><span class="prefix">总数：</span>{{ taskView.xrayNum }}</p>
      <!-- <p>分钟</p> -->
    </li>
    <li>
      <img
        src="../../../assets/images/icon_3@2x.png"
        width="100%"
        height="100%"
      />
      <p>- 抓拍摄像头 -</p>
      <p><span class="prefix">总数：</span>{{ taskView.cameraNum }}</p>
      <!-- <p>张</p> -->
    </li>
  </ul>
</template>

<script>
  export default {
    props: ["taskView"],
  };
</script>

<style lang="less" scoped>
  .textLinearGradient {
    font-size: 24px;
    font-family: DIN Alternate;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-shadow: 0px 0px 29px rgba(0, 0, 0, 0.24);

    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(0, 255, 255, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  ul.taskCount-container {
    display: flex;
    justify-content: space-around;
    width: 510px;

    li {
      position: relative;
      width: 120px;
      height: 180px;
      background-size: 100% 100%;
      .prefix {
        font-size: 16px;
      }
      p {
        position: absolute;
        left: 0;
        right: 0;
        font-size: 15px;

        &:nth-child(2) {
          font-size: 15px;
          font-family: Source Han Sans SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          bottom: 55px;
        }

        &:nth-child(3) {
          bottom: 26px;
          font-size: 18px;
          .textLinearGradient;
        }

        &:nth-child(4) {
          bottom: 6px;
          font-size: 15px;
          font-family: Source Han Sans SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
</style>
