import './assets/css/reset.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

/** 
 * Using vue-js-modal library
*/
import vmodal from 'vue-js-modal';
Vue.use(vmodal);

/** 
 * Implementing Alerts and Toasts
 * on VueJS Components Level
*/
import Alerts from './mixins/alerts.js'
Vue.mixin(Alerts);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
