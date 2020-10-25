<template>
  <div class="add-device">
    <div class="header">
      <div class="title">
        <div class="point"></div>
        <div class="name">
          {{ currentEditDevice ? "更新安检点" : "添加安检点" }}
        </div>
      </div>
      <div @click="$emit('close')" class="close">
        <img src="../../../assets/images/close.png" />
      </div>
    </div>
    <div class="form-container">
      <el-form
        ref="formRef"
        :rules="rules"
        :model="formModel"
        label-width="120px"
      >
        <el-form-item class="form-item" prop="orientation" label="场馆">
          <el-input
            class="input"
            placeholder="请输入内容"
            v-model="formModel.orientation"
          />
        </el-form-item>
        <el-form-item class="form-item" prop="coordinate" label="安检口">
          <el-input
            class="input"
            placeholder="请输入内容"
            v-model="formModel.coordinate"
          />
        </el-form-item>
        <el-form-item class="form-item" prop="code" label="序号">
          <el-input
            placeholder="请输入数字"
            class="input"
            v-model="formModel.code"
          />
        </el-form-item>
        <el-form-item class="form-item" prop="longitude" label="地图定位">
          <el-input
            placeholder="经度"
            class="input half"
            v-model="formModel.longitude"
          />
          <el-input
            placeholder="纬度"
            :style="{ marginLeft: '20px' }"
            class="input half"
            v-model="formModel.latitude"
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
        <el-form-item class="form-item" prop="xRayCode" label="X光机AI编号">
          <el-input
            placeholder="请输入内容"
            class="input"
            v-model="formModel.xRayCode"
          />
        </el-form-item>
        <el-form-item class="form-item" prop="cameraCoreId" label="EC200">
          <el-input
            placeholder="请选择"
            class="input"
            v-model="formModel.cameraCoreId"
          />
        </el-form-item>
        <el-form-item
          class="form-item"
          prop="frontCameraRTSP"
          label="前摄像头RTSP"
        >
          <el-input
            placeholder="请输入拉流地址：rtsp://"
            class="input"
            v-model="formModel.frontCameraRTSP"
          />
        </el-form-item>
        <el-form-item
          class="form-item"
          prop="backCameraRTSP"
          label="后摄像头RTSP"
        >
          <el-input
            placeholder="请输入拉流地址：rtsp://"
            class="input"
            v-model="formModel.backCameraRTSP"
          />
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
  import { deviceGroupAdd } from "@/services/device.js";
  import axios from "axios";
  export default {
    data() {
      return {
        deviceList: [],
        formModel: {
          orientation: "",
          coordinate: "",
          code: "",
          latitude: "",
          xRayCode: "",
          cameraCoreId: "",
          frontCameraRTSP: "",
          backCameraRTSP: "",
        },
        rules: {
          orientation: [{ required: true, message: "请输入场馆" }],
          coordinate: [{ required: true, message: "请输入安检口" }],
          code: [{ required: true, message: "请输入序号" }],
          latitude: [{ required: true, message: "请输入地图定位" }],
          xRayCode: [{ required: true, message: "请输入X光机AI编号" }],
          cameraCoreId: [{ required: true, message: "请输入EC200" }],
          frontCameraRTSP: [{ required: true, message: "请输入前摄像头RTSP" }],
          backCameraRTSP: [{ required: true, message: "请输入后摄像头RTSP" }],
        },
      };
    },
    props: ["currentEditDevice", "choosePosition", "initDeviceList"],
    methods: {
      echo(id) {
        axios.get(`/api/device/${id}`).then((res) => {
          const { data } = res.data || {};
          if (data) {
            this.formModel = data;
          }
        });
      },
      save() {
        this.$refs["formRef"].validate((valid) => {
          if (valid) {
            deviceGroupAdd(this.formModel).then((res) => {
              this.$emit("close");
              this.initDeviceList();
            });
          } else {
            return false;
          }
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
    .title {
      padding-left: 20px;
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
      margin-top: 24px;
      .form-item {
        width: 100%;
        .input.half {
          width: 33%;
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
    }
    .buttons-row {
      text-align: right;
      .active {
        margin-right: 12px;
      }
    }
  }
</style>
