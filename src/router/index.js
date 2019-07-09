import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Task from '@/components/Task'
/* eslint-disable */
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/event',
      name: 'task',
      component: Task
    }
  ]
})
