import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from "vue-js-modal";
import VueForm from "vue-form";
import "moment/locale/zh-cn";
import vSelect from "vue-select";
import { DatePicker, TimePicker, Input } from 'element-ui'
import "vue-select/dist/vue-select.css";

import 'video.js/dist/video-js.css'
import '@/utils/axios.config'

Vue.component("v-select", vSelect);
Vue.prototype.$video = window.videojs || videojs;
Vue.config.productionTip = false;

Vue.use(VueForm);
Vue.use(VModal);
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Input)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");