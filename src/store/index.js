import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import task from './task'
import user from './user'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    task
  },
  plugins: [createPersistedState()]
})
