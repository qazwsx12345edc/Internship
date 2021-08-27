const getters = {
  todoList: state => state.todoList,
  completedNumber: state => state.todoList.filter(item => {
    return item.isCompleted === true
  }).length,
  uncompletedNumber: (state, getters) => getters.todoList.length - getters.completedNumber
}

export default getters