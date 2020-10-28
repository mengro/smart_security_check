<template>
<div class="add-device">
  <div class="form-container">
    <el-form ref="formRef" :rules="rules" :model="formModel" label-width="120px">
      <el-form-item class="form-item" prop="ip" label="IP">
        <el-input class="input" placeholder="请输入IP地址" v-model="formModel.ip" />
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
import {
  ec200Add
} from "@/services/console.js";
import axios from "axios";
export default {
  data() {
    return {
      formModel: {
        ip: "",
      },
      rules: {
        ip: [{
          required: true,
          message: "请输入场馆"
        }],
      },
    };
  },
  props: ["currentEditDevice", "choosePosition", "updateList"],
  methods: {
    save() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          ec200Add({
            type: 1,
            deviceGroupId: 0,
            detailInfo: JSON.stringify(this.formModel)
          }).then((res) => {
            this.$emit("close");
            this.updateList();
          });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {},
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
      background: url("../../assets/images/marker_icon_small.png") 0 center no-repeat;
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
