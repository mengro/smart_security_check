<template>
  <div class="add-device">
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
                choosePosition(this.activeSiteRow);
                $emit('close');
                $modal.hide('device-manage');
              }
            "
            class="position-setting"
            >地图定位</span
          >
        </el-form-item>
        <el-form-item class="form-item" prop="xrayCode" label="X光机AI编号">
          <el-input
            placeholder="请输入内容"
            class="input"
            v-model="formModel.xrayCode"
          />
        </el-form-item>
        <el-form-item class="form-item" prop="cameraCoreId" label="EC200">
          <el-select
            :style="{ width: '100%' }"
            placeholder="请选择EC200"
            class="input"
            v-model="formModel.cameraCoreId"
          >
            <el-option
              v-for="item in ecList"
              :key="item.id"
              :label="item.code"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="form-item"
          prop="frontCameraRTSP"
          label="前摄像头RTSP"
        >
          <el-input
            placeholder="请输入拉流地址：rtsp://"
            class="input half"
            v-model="formModel.frontCameraRTSP"
          />
          <span class="camera-name">
            <span class="camera-label">
              前摄像头通道名：
            </span>
            {{ formModel.frontCameraCode }}
          </span>
        </el-form-item>
        <el-form-item
          class="form-item"
          prop="backCameraRTSP"
          label="后摄像头RTSP"
        >
          <el-input
            placeholder="请输入拉流地址：rtsp://"
            class="input half"
            v-model="formModel.backCameraRTSP"
          />
          <span class="camera-name">
            <span class="camera-label">
              后摄像头通道名：
            </span>
            {{ formModel.backCameraCode }}
          </span>
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
  import { ec200Search } from "@/services/console.js";
  export default {
    data() {
      return {
        deviceList: [],
        formModel: {
          orientation: "",
          coordinate: "",
          code: "",
          latitude: "",
          xrayCode: "",
          cameraCoreId: "",
          frontCameraRTSP: "",
          backCameraRTSP: "",
          frontCameraCode: "",
          backCameraCode: "",
        },
        ecList: [],
        rules: {
          orientation: [
            {
              required: true,
              message: "请输入场馆",
            },
          ],
          coordinate: [
            {
              required: true,
              message: "请输入安检口",
            },
          ],
          code: [
            {
              required: true,
              message: "请输入序号",
            },
          ],
          latitude: [
            {
              required: true,
              message: "请输入地图定位",
            },
          ],
          xrayCode: [
            {
              required: true,
              message: "请输入X光机AI编号",
            },
          ],
          cameraCoreId: [
            {
              required: true,
              message: "请输入EC200",
            },
          ],
          frontCameraRTSP: [
            {
              required: true,
              message: "请输入前摄像头RTSP",
            },
          ],
          backCameraRTSP: [
            {
              required: true,
              message: "请输入后摄像头RTSP",
            },
          ],
        },
      };
    },
    props: ["activeSiteRow", "choosePosition", "updateList"],
    methods: {
      echo() {
        const newModel = Object.assign({}, this.formModel, this.activeSiteRow);
        this.formModel = newModel;
      },
      ec200Search(pagination) {
        ec200Search({
          ...pagination,
          type: 1,
        }).then((res) => {
          if (res.data && res.data.list) {
            this.ecList = res.data.list;
          }
        });
      },
      save() {
        this.$refs["formRef"].validate((valid) => {
          if (valid) {
            const params = {
              ...this.formModel,
            };
            if (this.activeSiteRow) {
              params.id = this.activeSiteRow.id;
            }
            deviceGroupAdd(params).then((res) => {
              this.$emit("close");
              this.updateList();
            });
          } else {
            return false;
          }
        });
      },
      updateCamera() {
        this.formModel.frontCameraCode = `front-${this.formModel.coordinate}-${this.formModel.code}`;
        this.formModel.backCameraCode = `back-${this.formModel.coordinate}-${this.formModel.code}`;
      },
    },
    watch: {
      "formModel.coordinate": function () {
        this.updateCamera();
      },
      "formModel.code": function () {
        this.updateCamera();
      },
      activeSiteRow: function (newValue, oldValues) {
        if (newValue && !oldValues) {
          this.echo();
        }
      },
    },
    mounted() {
      this.echo();
      this.ec200Search();
    },
  };
</script>

<style lang="less" scoped>
  .add-device {
    padding: 24px;
    position: relative;
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

    .form-container {
      width: 80%;
      margin-left: 6%;
      margin-top: 24px;

      .form-item {
        width: 100%;

        .input.half {
          width: 35%;
        }
      }

      .position-setting {
        font-size: 18px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: rgba(118, 233, 254, 1);
        background: url("../../assets/images/marker_icon_small.png") 0 center
          no-repeat;
        height: 42px;
        padding-left: 24px;
        margin-left: 24px;
        background-size: 20px auto;
        cursor: pointer;
      }
    }

    .camera-name {
      margin-left: 24px;
    }

    .buttons-row {
      text-align: right;

      .active {
        margin-right: 12px;
      }
    }
  }
</style>
