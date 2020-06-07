import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VModal from "vue-js-modal";
import VueForm from "vue-form";
import "moment/locale/zh-cn";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

// import videojs from 'video.js'
// // import SWF_URL from 'videojs-swf/dist/video-js.swf'
// import 'videojs-flash'
// import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'

// videojs.options.flash.swf = SWF_URL

Vue.component("v-select", vSelect);
Vue.prototype.$video = window.videojs || videojs;
Vue.config.productionTip = false;

Vue.use(VueForm);
Vue.use(VModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");