import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from "vue-js-modal";
import "moment/locale/zh-cn";
import vSelect from "vue-select";
import { DatePicker, Select, Option, TimePicker, Input, Dialog, MessageBox, Message, Pagination, Tabs, TabPane, Radio, RadioButton, RadioGroup, Table, TableColumn, Button, Form, FormItem } from 'element-ui'
import "vue-select/dist/vue-select.css";

import '@/utils/axios.config'
import 'video.js/dist/video-js.css'
import '@/assets/style/theme.scss'
import '@/assets/style/el-theme.less'

Vue.component("v-select", vSelect);
Vue.prototype.$video = window.videojs || videojs;
Vue.prototype.$confirm = MessageBox
Vue.prototype.$message = Message
Vue.config.productionTip = false;

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(VModal);
Vue.use(Dialog);
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(Pagination)
Vue.use(RadioGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");