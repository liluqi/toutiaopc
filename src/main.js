import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/index.less'
import Component from '@/components/index.js'
import axios from '@/axios/request.js' // 引入封装后的axios
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(Component)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
