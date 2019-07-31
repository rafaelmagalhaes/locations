import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCQ6L0pYW0cgu-wLt2QXYHurlbteuDlc_M',
    libraries: 'places'
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
