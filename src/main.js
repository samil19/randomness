import Vue from 'vue'
import App from './App.vue'

import { CardPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { store } from './store/store';

Vue.use(CardPlugin)
Vue.config.productionTip = false

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
