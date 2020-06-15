<template>
  <ul class="taskCount-container flex_start_v">
    <li>
      <img src="../../../assets/images/icon_1@2x.png" width="100%" height="100%" />
      <p>- 智能前端 -</p>
      <p>
        <span>总数：</span>
        {{ deviceCountView.webFrontTotalNum }}
      </p>
      <p>
        <span>使用：</span>
        {{ deviceCountView.webFrontEnableNum }}
      </p>
      <p>
        <span>未使用：</span>
        {{ deviceCountView.webFrontDisableNum }}
      </p>
    </li>
    <li>
      <img src="../../../assets/images/icon_2@2x.png" width="100%" height="100%" />
      <p>- 安检机 -</p>
      <p>
        <span>总数：</span>
        {{ deviceCountView.machineTotalNum }}
      </p>
      <p>
        <span>使用：</span>
        {{ deviceCountView.machineEnableNum }}
      </p>
      <p>
        <span>未使用：</span>
        {{ deviceCountView.machineDisableNum }}
      </p>
    </li>
    <li>
      <img src="../../../assets/images/icon_3@2x.png" width="100%" height="100%" />
      <p>- 摄像头 -</p>
      <p>
        <span>总数：</span>
        {{ deviceCountView.cameraTotalNum }}
      </p>
      <p>
        <span>使用：</span>
        {{ deviceCountView.cameraEnableNum }}
      </p>
      <p>
        <span>未使用：</span>
        {{ deviceCountView.cameraDisableNum }}
      </p>
    </li>
  </ul>
</template>

<script>
export default {
props: ['deviceCountView']
}
</script>
<style lang="less" scoped>
  .textLinearGradient {
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
    margin-top: -12px;

    li {
      position: relative;
      width: 120px;
      height: 180px;
      background-size: 100% 100%;

      p {
        position: absolute;
        left: 0;
        right: 0;
        font-size: 12px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: left;
        text-indent: 24px;
        white-space: nowrap;
        &:nth-child(2) {
          text-indent: 0px;
          font-family: Source Han Sans SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          bottom: 55px;
          text-align: center;
        }

        &:nth-child(3) {
          bottom: 32px;
          font-size: 14px;
          .textLinearGradient;
        }

        &:nth-child(4) {
          bottom: 16px;
        }
        &:nth-child(5) {
          bottom: 0px;
        }
      }
    }
  }
</style>