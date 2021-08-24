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
              v-model="item.isCompleted"
              @click="onClickUpdateActiveNumber(index)"
            />
            <label class="todo_value">
              {{ item.title }}
              <span>{{ item.content }}</span>
              <div class="edit" @click="onClickRemoveTodo(index)">删除</div>
              <div class="edit" @click="onClickEditShow()">编辑</div>
            </label>
          </div>
        </li>
      </ul>
    </section>
    <footer class="footer">
      <ul class="filters">
        <li>
          <a href="#/all" @click="showAll()">All</a>
        </li>
        <li>
          <a href="#/uncompleted" @click="showUncompleted()">Uncompleted</a>
        </li>
        <li>
          <a href="#/completed" @click="showCompleted()">Completed</a>
        </li>
      </ul>
      <button class="clear-completed" @click="onClickRemoveAllCompleted()">
        Clear completed
      </button>
    </footer>
    <section class="edit-popout" v-show="isEditShow">
      <h2>编辑todo</h2>
      <input type="text" v-model="thisTodoTitle" />
      <br />
      <input type="text" v-model="thisTodoContent" />
      <br />
      <select>
        <option value="true">已完成</option>
        <option value="false">未完成</option>
      </select>
      <br />
      <button @click="onClickUpdateTodo()">确认</button>
    </section>
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
      isEditShow: false,
      thisTodoTitle: "",
      thisTodoContent: "",
      showModel: "All",
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

    // 复选框 更新完成数量
    onClickUpdateActiveNumber(index, event) {
      // 筛选状态下不可编辑
      event = event || window.event;
      if (this.showModel != "All") {
        event.preventDefault();
      }
      if (this.todoList[index].isCompleted === false) {
        this.activeNumber--;
      } else {
        this.activeNumber++;
      }
    },

    // 删除todo
    onClickRemoveTodo(index) {
      if (this.showModel === "All") {
        if (this.todoList[index].isCompleted === false) {
          this.activeNumber--;
        }
        this.todoList.splice(index, 1);
      }
    },

    onClickEditShow() {
      if (this.showModel === "All") {
        this.isEditShow = true;
      }
    },

    // 确认编辑
    onClickUpdateTodo() {
      this.isEditShow = false;
      this.thisTodoTitle = "";
      this.thisTodoContent = "";
    },

    // 批量删除已完成
    onClickRemoveAllCompleted() {
      for (let index = 0; index < this.todoList.length; index++) {
        if (this.todoList[index].isCompleted === true) {
          this.todoList.splice(index, 1);
          index--;
        }
      }
    },

    showUncompleted() {
      this.showModel = "Uncompleted";
    },

    showCompleted() {
      this.showModel = "Completed";
    },

    showAll() {
      this.showModel = "All";
    },
  },

  computed: {
    todoListFiltered() {
      if (this.showModel === "Uncompleted") {
        return this.todoList.filter((item) => {
          return item.isCompleted === false;
        });
      } else if (this.showModel === "Completed") {
        return this.todoList.filter((item) => {
          return item.isCompleted === true;
        });
      }
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
