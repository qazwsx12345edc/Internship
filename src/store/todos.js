const todos = {
  state: {
    todoList: []
  },

  mutations: {
    new_todo(state, newTodo) {
      state.todoList.unshift(newTodo)
    },

    remove_todo(state, index) {
      state.todoList.splice(index, 1)
    },

    update_todo_title(state, payload) {
      state.todoList[payload.index].title = payload.newTitle
    },

    update_todo_content(state, payload) {
      state.todoList[payload.index].content = payload.newContent
    },

    update_todo_completed(state, payload) {
      state.todoList[payload.index].isCompleted = payload.value
    }
  },

  actions: {

  },
}

export default todos