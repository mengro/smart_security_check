<template>
  <div class="add-device">
    <div class="header">
      <div class="title">
        <div class="point"></div>
        <div class="name">新增人员</div>
      </div>
      <div @click="$emit('close')" class="close">
        <img src="../../../assets/images/close.png" />
      </div>
    </div>
    <div class="form">
      <vue-form :state="formstate" @submit.prevent="onSubmit">
        <div class="form-item">
          <validate tag="label">
            <span class="label">姓名：</span>
            <input
              autocomplete="off"
              type="text"
              class="input"
              v-model="model.name"
              required
              name="name"
            />
          </validate>
        </div>
        <div class="form-item">
          <validate tag="label">
            <span class="label">安检区域：</span>
            <v-select
              autocomplete="off"
              type="text"
              class="input"
              v-model="model.workStatus"
              required
              name="name"
              label="label"
              :reduce="(status) => status.code"
              :options="[
                {
                  code: 1,
                  label: '待机',
                },
                {
                  code: 2,
                  label: '工作中',
                },
              ]"
            ></v-select>
          </validate>
        </div>
        <div class="form-item date-time-container">
          <validate tag="label">
            <span class="label">执勤时间：</span>
            <div class="input dateTimeGroup">
              <div
                v-for="(item, index) in dateTimeList"
                :key="index"
                class="dateTimeGroup-item"
              >
                <date-time-group
                  autocomplete="off"
                  type="text"
                  v-model="model.name"
                  required
                  name="name"
                />
              </div>
            </div>
          </validate>
          <span @click="addDateTime" class="date-time-add">+</span>
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
import DateTimeGroup from "./DateTimeGroup";
export default {
  data() {
    return {
      deviceList: [],
      formstate: {},
      model: {},
      dateTimeList: [
        {
          date: "",
          time: [],
        },
      ],
    };
  },
  props: ["currentEditDevice"],
  components: { DateTimeGroup },
  methods: {
    echo(id) {
      axios.get("/api/device/${id}").then((res) => {
        const { data } = res.data || {};
        if (data) {
          this.model = data;
        }
      });
    },
    addDateTime() {
      this.dateTimeList.push({
        date: "",
        time: [],
      });
    },
    save() {
      const {
        id,
        code,
        name,
        deviceAddressA,
        deviceAddressB,
        deviceAddressC,
        nodeId,
        version,
      } = this.model;
      axios
        .put("/api/device", {
          id,
          code,
          name,
          deviceAddressA,
          deviceAddressB,
          deviceAddressC,
          nodeId,
          version,
        })
        .then((res) => {
          this.$emit("close");
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
    height: 420px;
    overflow-y: auto;
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
        width: 130px;
        display: inline-block;
        vertical-align: middle;
      }
      .input {
        color: #fff;
        text-indent: 16px;
        font-size: 20px;
        font-family: Source Han Sans SC;
        font-weight: 500;
        width: 440px;
        height: 40px;
        display: inline-block;
        vertical-align: middle;
        background: rgba(34, 164, 255, 0.1);
        border: 1px solid rgba(34, 164, 255, 1);
        border-radius: 4px;
        &.dateTimeGroup {
          border: 0;
          height: auto;
          background: transparent;
          vertical-align: top;
          .dateTimeGroup-item {
            margin-bottom: 16px;
          }
        }
      }
    }
    .date-time-container {
      position: relative;
      .date-time-add {
        position: absolute;
        cursor: pointer;
        font-size: 30px;
        margin-left: 12px;
        bottom: 16px;
      }
    }
    .buttons-row {
      margin-top: 24px;
      padding-left: 130px;
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
