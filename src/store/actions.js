import mutation_types from "./mutation-types"

const actions = {
  new_todo(context, newTodo) {
    context.commit(mutation_types.new_todo, newTodo)
  },

  update_todo(context, payload) {
    context.commit(mutation_types.update_todo_title, { index: payload.index, newTitle: payload.newTitle })
    context.commit(mutation_types.update_todo_content, { index: payload.index, newContent: payload.newContent })
    context.commit(mutation_types.update_todo_completed, { index: payload.index, newCompleted: payload.newCompleted })
  }
}

export default actions