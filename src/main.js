import Vue from 'vue'
import App from './App.vue'
import router from './router'

import "./assets/reset.css"
import "./assets/style.sass"

Vue.config.productionTip = false

export const EVENT_BUS = new Vue();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
