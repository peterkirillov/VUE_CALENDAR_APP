import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
