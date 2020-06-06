import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from "vue-js-modal";
import Video from "video.js";
import "video.js/dist/video-js.css";
// import "videojs-contrib-hls";
// import 'videojs-flash';
import VueForm from "vue-form";
import "moment/locale/zh-cn";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

Vue.component("v-select", vSelect);
Vue.prototype.$video = Video;
Vue.config.productionTip = false;

Vue.use(VueForm);
Vue.use(VModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
