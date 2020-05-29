<template>
  <div class="add-device">
    <div class="header">
      <div class="title">
        <div class="point"></div>
        <div class="name">添加设备</div>
      </div>
      <div @click="$emit('close')" class="close">
        <img src="../../../assets/images/close.png">
      </div>
    </div>
    <div class="form">
      <vue-form :state="formstate" @submit.prevent="onSubmit">
        <div class="form-item">
        <validate tag="label">
          <span class="label">名称：</span>
          <input autocomplete="off" type="text" class="input" v-model="model.name" required name="name" />
        </validate>
        </div>
        <div class="form-item">
        <validate tag="label">
          <span class="label">摄像头推流地址：</span>
          <input autocomplete="off" type="text" class="input" v-model="model.name" required name="name" />
        </validate>
        </div>
        <div class="form-item">
        <validate tag="label">
          <span class="label">工作状态：</span>
          <input autocomplete="off" type="text" class="input" v-model="model.name" required name="name" />
        </validate>
        </div>
        <div class="form-item">
        <validate tag="label">
          <span class="label">备注：</span>
          <input autocomplete="off" type="text" class="input" v-model="model.name" required name="name" />
        </validate>
        </div>
        <div class="buttons-row">
          <div class="button active" type="submit">确定</div>
          <div class="button">取消</div>
        </div>
      </vue-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceList: [
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
        {
          id: '1',
          num: '1',
          name: '2311',
          count: '2311',
          status: '2311',
          remark: '2311',
          action: '2311',
        },
      ],
      formstate: {},
      model: {
        name: '',
        email: 'invalid-email'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .add-device {
    height: 580px;
    width: 782px;
    background: url('../../../assets/images/addDevice.png') 0 0 no-repeat;
    .header {
      display: flex;
      justify-content: space-between;
      .title {
        padding-left: 20px;
        margin-top: 24px;
        .point {
          display: inline-block;
          vertical-align: middle;
          width:8px;
          height:8px;
          background:rgba(76,251,244,1);
        }
        .name {
          display: inline-block;
          vertical-align: middle;
          margin-left: 16px;
          font-size:24px;
          font-family:Source Han Sans SC;
          font-weight:bold;
          color:rgba(76,251,244,1);
        }
      }
      .close {
        margin-top: 42px;
        margin-right: 16px;
        cursor: pointer;
      }
    }
    .form {
      text-align: left;
      width: 80%;
      margin: auto;
      margin-top: 24px;
      .form-item {
        margin-top: 24px;
        .label {
          font-size:23px;
          font-family:Source Han Sans SC;
          font-weight:500;
          color:rgba(129,184,227,1);
          width: 200px;
          display: inline-block;
          vertical-align: middle;
        }
        .input {
          color: #fff;
          text-indent: 16px;
          font-size:20px;
          font-family:Source Han Sans SC;
          font-weight:500;
          width:400px;
          height:40px;
          display: inline-block;
          vertical-align: middle;
          background:rgba(34,164,255,0.1);
          border:1px solid rgba(34,164,255,1);
          border-radius:10px;
        }
      }
      .buttons-row {
        margin-top: 24px;
        padding-left: 200px;
        .button {
          width: 50px;
          text-align: center;
        }
        .active {
          margin-right: 16px;
        }
      }
    }
  }
</style>