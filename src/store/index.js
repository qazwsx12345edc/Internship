import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todoList: []
  },
  getters,
  mutations,
  actions,
  strict: true // 开启严格模式
})

export default store