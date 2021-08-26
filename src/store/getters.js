const getters = {
  todoList: state => state.todos.todoList,
  completedNumber: state => state.todos.todoList.filter(item => {
    return item.isCompleted === true
  }).length,
  uncompletedNumber: (state, getters) => getters.todoList.length - getters.completedNumber
}

export default getters