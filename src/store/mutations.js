import mutation_types from "./mutation-types"

const mutations = {
  [mutation_types.new_todo](state, newTodo) {
    state.todoList.unshift(newTodo)
  },

  [mutation_types.remove_todo](state, index) {
    state.todoList.splice(index, 1)
  },

  [mutation_types.update_todo_title](state, payload) {
    state.todoList[payload.index].title = payload.newTitle
  },

  [mutation_types.update_todo_content](state, payload) {
    state.todoList[payload.index].content = payload.newContent
  },

  [mutation_types.update_todo_completed](state, payload) {
    state.todoList[payload.index].isCompleted = payload.newCompleted
  }
}

export default mutations