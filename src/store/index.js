import Vue from 'vue'
import Vuex from 'vuex'
import task from './task'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    task
  },
  plugins: [createPersistedState()]
})
