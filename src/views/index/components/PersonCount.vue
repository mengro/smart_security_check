<template>
  <div class="personCount">
    <div class="personCount-row">
      <span>负责人</span>
      <span class="personCount-manage">
        张三
        <span
          @click="() => {
            $modal.show('person-manage');
          }"
          class="edit-button"
        ></span>
      </span>
    </div>
    <div class="personCount-row">
      <span>
        安检人员
        <span></span>
      </span>
      <span>到岗情况 ></span>
    </div>
    <modal :clickToClose="false" height="740" width="1283" name="person-manage">
      <person-manage
        @close="
          () => {
            currentEditDevice = null;
            $modal.hide('person-manage');
          }
        "
        :currentEditDevice="currentEditDevice"
      ></person-manage>
    </modal>
  </div>
</template>

<script>
import PersonManage from './PersonManage'
export default {
  props: [],
  components: {
    PersonManage,
  }
}
</script>
<style lang="less">
  .personCount {
    padding-top: 16px;
    .personCount-row {
      display: flex;
      justify-content: space-between;
      width: 90%;
      margin: 16px auto;
    }
    .personCount-manage {
      display: block;
    }
    .edit-button {
      display: inline-block;
      vertical-align: top;
      height: 22px;
      width: 22px;
      cursor: pointer;
      background: url(../../../assets/images/editor.png) center center;
      background-size: 100% 100%;
      &:hover {
        background: url(../../../assets/images/editor.active.png) center center;
        background-size: 100% 100%;
      }
    }
  }
</style>