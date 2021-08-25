import VueRouter from 'vue-router'
import Vue from 'vue'
import TodoList from '../pages/TodoList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/todo-list',
    component: TodoList
  },
]

const router = new VueRouter({
  routes
})

export default router