import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCwO_zeKZ9hDaXiP-ZM_rrSC21X_0KoPe8',
    libraries: 'places'
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
