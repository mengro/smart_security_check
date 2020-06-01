import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls';
import VueForm from 'vue-form';
import 'moment/locale/zh-cn'

Vue.prototype.$video = Video
Vue.config.productionTip = false

Vue.use(VueForm);
Vue.use(VModal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')