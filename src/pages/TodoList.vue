<template>
  <section class="todoapp">
    <header class="header">
      <section class="todo-count">
        <span class="todo-completed-count">
          completed: {{ todoList.length - activeNumber }}
        </span>
        <span class="todo-uncompleted-count">
          uncompleted: {{ activeNumber }}
        </span>
      </section>
      <h1>TodoList</h1>
      <input
        class="new-todo-title"
        autofocus
        placeholder="Title"
        v-model="newTitle"
        @keydown.enter="onKeyDownInputContent()"
      />
      <input
        class="new-todo-detail"
        placeholder="What needs to be done?"
        v-model="newTodoContent"
        @keydown.enter="onKeyDownAddTodo()"
      />
    </header>
    <section class="main">
      <ul class="todo-list">
        <li class="todo" v-for="(item, index) in todoListFiltered" :key="index">
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              v-model="todoListFiltered[index].isCompleted"
            />
            <label class="todo_value">
              {{ item.title }}
              <span>{{ item.content }}</span>
              <div class="edit">删除</div>
              <div class="edit">编辑</div>
            </label>
          </div>
        </li>
      </ul>
    </section>
    <footer class="footer">
      <ul class="filters">
        <li>
          <a href="#/all">All</a>
        </li>
        <li>
          <a href="#/active">Uncompleted</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <button class="clear-completed">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      todoList: [],
      newTitle: "",
      newTodoContent: "",
      activeNumber: 0,
    };
  },

  methods: {
    // 将光标移到下一个输入框
    onKeyDownInputContent() {
      if (this.newTitle != "") {
        document.querySelector(".new-todo-detail").focus();
      }
    },

    //添加todo
    onKeyDownAddTodo() {
      if (this.newTitle != "" && this.newTodoContent != "") {
        const newTodo = {
          title: this.newTitle,
          content: this.newTodoContent,
          isCompleted: false,
        };
        this.todoList.push(newTodo);
        this.activeNumber++;
        this.newTitle = "";
        this.newTodoContent = "";
        document.querySelector(".new-todo-title").focus();
      }
    },
  },

  computed: {
    todoListFiltered() {
      return this.todoList;
    },
  },
};
</script>

<style>
.wrapper {
  height: 100%;
  padding-top: 60px;
}

@import url("../css/index.css");
</style>
