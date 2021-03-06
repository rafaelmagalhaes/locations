import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)


Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_KEY,
    libraries: 'places'
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
