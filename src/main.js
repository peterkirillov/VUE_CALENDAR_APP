import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'
/* eslint-disable */
Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(Uimini)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
    var firebaseConfig = {
      apiKey: 'AIzaSyCPn9S4yKhZGr6d6AH6zSbVsbW9HrQzpuY',
      authDomain: 'vue-calendar-c22aa.firebaseapp.com',
      databaseURL: 'https://vue-calendar-c22aa.firebaseio.com',
      projectId: 'vue-calendar-c22aa',
      storageBucket: 'vue-calendar-c22aa.appspot.com',
      messagingSenderId: '137150300832',
      appId: '1:137150300832:web:a831bbc55bbeb442507fc5',
      measurementId: 'G-R3HQSZN78C'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
      this.$store.dispatch('loadTasks')
    })
  }
})
