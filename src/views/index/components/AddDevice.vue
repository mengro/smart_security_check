<template>
  <div class="add-device">
    <div class="header">
      <div class="title">
        <div class="point"></div>
        <div class="name">
          {{ currentEditDevice ? "更新设备" : "添加设备" }}
        </div>
      </div>
      <div @click="$emit('close')" class="close">
        <img src="../../../assets/images/close.png" />
      </div>
    </div>
    <div class="form-container">
      <el-form :model="formModel" label-width="120px">
        <el-form-item class="form-item" label="场馆">
          <el-input
            class="input"
            v-model="model.coordinate"
            name="coordinate"
          />
        </el-form-item>
        <el-form-item class="form-item" label="安检口">
          <el-input
            class="input"
            v-model="model.coordinate"
            name="coordinate"
          />
        </el-form-item>
        <el-form-item class="form-item" label="序号">
          <el-input
            class="input"
            v-model="model.coordinate"
            name="coordinate"
          />
        </el-form-item>
        <el-form-item class="form-item" label="地图定位">
          <el-input
            :style="{ width: '160px' }"
            class="input"
            v-model="model.longitude"
            name="name"
          />
          <el-input
            :style="{ width: '160px', marginLeft: '20px' }"
            class="input"
            v-model="model.longitude"
            name="name"
          />
          <span
            @click="
              (e) => {
                choosePosition(this.currentEditDevice);
                $emit('close');
                $modal.hide('device-manage');
              }
            "
            class="position-setting"
            >地图定位</span
          >
        </el-form-item>
        <el-form-item class="form-item" label="X光机AI编号">
          <div class="mulInput">
            <el-input
              class="input"
              v-model="model.deviceAddressA"
              name="name"
            />
          </div>
        </el-form-item>
        <el-form-item class="form-item" label="EC200">
          <div class="mulInput">
            <el-input
              class="input"
              v-model="model.deviceAddressA"
              name="name"
            />
          </div>
        </el-form-item>
        <el-form-item class="form-item" label="前摄像头RTSP">
          <div class="mulInput">
            <el-input
              class="input"
              v-model="model.deviceAddressA"
              name="name"
            />
          </div>
        </el-form-item>
        <el-form-item class="form-item" label="EC200">
          <div class="mulInput">
            <el-input
              class="input"
              v-model="model.deviceAddressA"
              name="name"
            />
          </div>
        </el-form-item>
        <div class="buttons-row">
          <div @click="save" class="button active" type="submit">确定</div>
          <div @click="$emit('close')" class="button">取消</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        deviceList: [],
        formModel: {},
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
    padding: 24px;
    position: relative;
    background: rgba(9, 18, 54, 0.95);
    border: 1px solid #6076ad;
    text-align: left;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      padding: 12px 24px;
      font-size: 24px;
      cursor: pointer;
    }
    .form-container {
      width: 80%;
      margin-left: 6%;
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
    }
  }
</style>
