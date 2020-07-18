import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from "vue-js-modal";
import VueForm from "vue-form";
import "moment/locale/zh-cn";
import vSelect from "vue-select";
import { DatePicker, TimePicker, Input, MessageBox, Message, Tabs, TabPane, Radio, RadioButton, RadioGroup, Table, TableColumn, Button } from 'element-ui'
import "vue-select/dist/vue-select.css";

import 'video.js/dist/video-js.css'
import '@/utils/axios.config'
import './theme.scss'

Vue.component("v-select", vSelect);
Vue.prototype.$video = window.videojs || videojs;
Vue.prototype.$confirm = MessageBox
Vue.prototype.$message = Message
Vue.config.productionTip = false;

Vue.use(VueForm);
Vue.use(VModal);
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");