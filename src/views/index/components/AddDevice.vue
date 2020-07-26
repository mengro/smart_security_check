<template>
  <div class="add-device">
    <div class="header">
      <div class="title">
        <div class="point"></div>
        <div class="name">{{ currentEditDevice ? "更新设备" : "添加设备" }}</div>
      </div>
      <div @click="$emit('close')" class="close">
        <img src="../../../assets/images/close.png" />
      </div>
    </div>
    <div class="form">
      <vue-form :state="formstate" @submit.prevent="onSubmit">
        <div class="form-item">
          <span class="label">ID：</span>
          <span class="text">{{this.currentEditDevice.id}}</span>
        </div>
        <div class="form-item">
          <validate tag="label">
            <span class="label">设备地址：</span>
            <input
              :style="{width: '120px'}"
              autocomplete="off"
              type="text"
              class="input"
              v-model="model.coordinate"
              required
              name="coordinate"
            />
          </validate>
          <validate tag="label">
            <input
              :style="{width: '120px', marginLeft: '17px'}"
              placeholder="方位"
              autocomplete="off"
              type="text"
              class="input"
              v-model="model.orientation"
              required
              name="orientation"
            />
          </validate>
          <validate tag="label">
            <input
              :style="{width: '120px', marginLeft: '17px'}"
              placeholder="设备号"
              autocomplete="off"
              type="text"
              class="input"
              v-model="model.code"
              required
              name="code"
            />
          </validate>
        </div>
        <div class="form-item">
          <validate tag="label">
            <span class="label">摄像头推流地址：</span>
            <div class="mulInput">
              <input
                autocomplete="off"
                type="text"
                class="input"
                v-model="model.deviceAddressA"
                required
                name="name"
              />
              <input
                autocomplete="off"
                type="text"
                class="input"
                v-model="model.deviceAddressB"
                required
                name="name"
              />
              <input
                autocomplete="off"
                type="text"
                class="input"
                v-model="model.deviceAddressC"
                required
                name="name"
              />
            </div>
          </validate>
        </div>
        <div class="form-item">
          <validate tag="label">
            <span class="label">坐标信息：</span>
            <input
              :style="{width: '120px'}"
              autocomplete="off"
              type="text"
              class="input"
              v-model="model.longitude"
              required
              name="name"
            />
          </validate>
          <validate tag="label">
            <input
              :style="{width: '120px', marginLeft: '17px'}"
              autocomplete="off"
              type="text"
              class="input"
              v-model="model.latitude"
              required
              name="coordinate"
            />
          </validate>
          <span
            @click="(e) => {
              choosePosition(this.currentEditDevice)
              $emit('close')
              $modal.hide('device-manage')
            }"
            class="position-setting"
          >地图定位</span>
        </div>
        <div class="buttons-row">
          <div @click="save" class="button active" type="submit">确定</div>
          <div @click="$emit('close')" class="button">取消</div>
        </div>
      </vue-form>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        deviceList: [],
        formstate: {},
        model: {},
      };
    },
    props: ["currentEditDevice", "choosePosition", "initDeviceList"],
    methods: {
      echo(id) {
        axios.get(`/api/device/${id}`).then((res) => {
          const { data } = res.data || {};
          if (data) {
            this.model = data;
          }
        });
      },
      save() {
        const {
          id,
          coordinate,
          orientation,
          code,
          deviceAddressA,
          deviceAddressB,
          deviceAddressC,
          nodeId,
          version,
          longitude,
          latitude,
        } = this.model;
        axios
          .put("/api/device", {
            id,
            coordinate,
            orientation,
            code,
            deviceAddressA,
            deviceAddressB,
            deviceAddressC,
            nodeId,
            version,
            longitude,
            latitude,
          })
          .then((res) => {
            this.$emit("close");
            this.initDeviceList();
          });
      },
    },
    mounted() {
      if (this.currentEditDevice && this.currentEditDevice.id) {
        this.echo(this.currentEditDevice.id);
      }
    },
  };
</script>
<style lang="less" scoped>
  .add-device {
    height: 580px;
    width: 782px;
    background: url("../../../assets/images/addDevice.png") 0 0 no-repeat;
    .header {
      display: flex;
      justify-content: space-between;
      .title {
        padding-left: 20px;
        margin-top: 24px;
        .point {
          display: inline-block;
          vertical-align: middle;
          width: 8px;
          height: 8px;
          background: rgba(76, 251, 244, 1);
        }
        .name {
          display: inline-block;
          vertical-align: middle;
          margin-left: 16px;
          font-size: 24px;
          font-family: Source Han Sans SC;
          font-weight: bold;
          color: rgba(76, 251, 244, 1);
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
      .mulInput {
        display: inline-block;
        width: 400px;
        vertical-align: top;
        .input {
          margin-bottom: 12px;
        }
      }
      .form-item {
        margin-top: 24px;
        .label {
          font-size: 23px;
          font-family: Source Han Sans SC;
          font-weight: 500;
          color: rgba(129, 184, 227, 1);
          width: 200px;
          display: inline-block;
          vertical-align: middle;
        }
        .input {
          color: #fff;
          text-indent: 16px;
          font-size: 20px;
          font-family: Source Han Sans SC;
          font-weight: 500;
          width: 400px;
          height: 40px;
          display: inline-block;
          vertical-align: middle;
          background: rgba(34, 164, 255, 0.1);
          border: 1px solid rgba(34, 164, 255, 1);
          border-radius: 10px;
        }
        .text {
          color: #fff;
          text-indent: 16px;
          font-size: 20px;
          font-family: Source Han Sans SC;
          font-weight: 500;
        }
      }
      .position-setting {
        font-size: 18px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: rgba(118, 233, 254, 1);
        background: url("../../../assets/images/marker_icon_small.png") 0 center
          no-repeat;
        height: 42px;
        padding-left: 24px;
        margin-left: 24px;
        background-size: 20px auto;
        cursor: pointer;
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
<style lang="less">
  .v-select {
    .vs__selected {
      color: #fff;
    }
    .vs__clear,
    .vs__open-indicator {
      fill: #fff;
    }
    .vs__dropdown-menu {
      background: rgba(255, 255, 255, 0.9);
    }
    .vs__dropdown-option--highlight {
      background: rgba(34, 164, 255, 1);
    }
  }
</style>
