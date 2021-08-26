import Vuex from 'vuex'
import todos from './todos.js'
import getters from './getters.js'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  modules: {
    todos
  },
  strict: true // 开启严格模式
})

export default store