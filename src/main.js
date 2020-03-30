// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Axios from 'axios'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import request from './util/request'
import header from './components/common/header'
import footer from './components/common/footer'

Vue.use(MuseUI)
// Vue.use(Axios)
// Vue.prototype.$request = Axios
Vue.prototype.$request = request

Vue.component('header-view', header)
Vue.component('footer-view', footer)
// Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
