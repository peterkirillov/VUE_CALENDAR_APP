import firebase from 'firebase/app'
import Task from './task_help'

const getDefaultState = () => {
  return {
    tasks: []
  }
}

export default {
  state: {
    tasks: {}
  },
  mutations: {
    loadTasks (state, payload) {
      state.tasks = payload
    },
    newTask (state, payload) {
      state.tasks.push(payload)
    },
    /*
    deleteTask (state) {
      // for (let i of state.tasks) {
      //   console.log(i.title)
      state.tasks.splice(state.tasks, 1)
    },
    */
    resetTasks (state, payload) {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
    async loadTasks ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // взятие данных по событиям из firebase
        const task = await firebase.database().ref('tasks').once('value')
        const tasks = task.val() || {}
        const tasksArray = []
        Object.keys(tasks).forEach(key => {
          const t = tasks[key]
          let taskObj =
            new Task(
              // t.id,
              t.title,
              t.description,
              t.departureStation,
              t.arrivalStation,
              t.user
            )
          taskObj.id = key
          tasksArray.push(taskObj)
        })
        commit('loadTasks', tasksArray)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async newTask ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // логика
        const newTask = new Task(
          // payload.id,
          payload.title,
          payload.description,
          payload.departureStation,
          payload.arrivalStation,
          getters.user.id
        )
        const task = await firebase.database().ref('tasks').push(newTask)

        commit('newTask', {
          ...newTask,
          id: task.key
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async deleteTask ({commit}, id) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('tasks').child(id).remove()

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    /*
    deleteTask ({commit}, payload) {
      commit('deleteTask', payload)
    },
    */
    resetTasks ({commit}, payload) {
      commit('resetTasks', payload)
    }
  },
  getters: {
    tasks (state, getters) {
      // return state.tasks
      return state.tasks.filter(task => {
        return task.user === getters.user.id
      })
    }
  }
}
