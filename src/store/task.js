const getDefaultState = () => {
  return {
    tasks: []
  }
}

export default {
  state: {
    tasks: []
  },
  mutations: {
    newTask (state, payload) {
      state.tasks.push(payload)
    },

    resetTasks (state, payload) {
      Object.assign(state, getDefaultState())
    }

  },
  actions: {
    newTask ({commit}, payload) {
      commit('newTask', payload)
    },

    resetTasks ({commit}, payload) {
      // Object.assign(state, getDefaultState())
      commit('resetTasks', payload)
    }

  },
  getters: {
    tasks (state) {
      return state.tasks
    }
  }
}
