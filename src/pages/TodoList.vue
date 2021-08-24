<template>
  <section class="todoapp">
    <!-- 标题 输入框 -->
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

    <!-- todo列表 -->
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
              <div class="edit" @click="onClickEditShow(index)">编辑</div>
            </label>
          </div>
        </li>
      </ul>
    </section>

    <!-- 底部筛选框 -->
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

    <!-- 编辑框 -->
    <section class="edit-popout" v-show="isEditShow">
      <h2>编辑todo</h2>
      <span>标题:</span>
      <input type="text" v-model="thisTodoTitle" class="edit-input" autofocus />
      <br />
      <span>内容:</span>
      <input type="text" v-model="thisTodoContent" class="edit-input" />
      <select v-model="thisCompleted">
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
      isEditShow: false,
      thisTodoTitle: "",
      thisTodoContent: "",
      thisCompleted: null,
      thisIndex: 0,
      showModel: "All",
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
    },

    // 删除todo
    onClickRemoveTodo(index) {
      if (this.showModel === "All") {
        this.todoList.splice(index, 1);
      }
    },

    // 显示编辑框
    onClickEditShow(index) {
      if (this.showModel === "All") {
        this.thisIndex = index;
        const item = this.todoList[index];
        this.thisTodoTitle = item.title;
        this.thisTodoContent = item.content;
        this.thisCompleted = item.isCompleted;
        this.isEditShow = true;
      }
    },

    // 确认编辑
    onClickUpdateTodo() {
      this.todoList[this.thisIndex].title = this.thisTodoTitle;
      this.todoList[this.thisIndex].content = this.thisTodoContent;
      this.todoList[this.thisIndex].isCompleted = this.thisCompleted;
      this.isEditShow = false;
      this.thisTodoTitle = "";
      this.thisTodoContent = "";
      this.thisCompleted = null;
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
    // 筛选
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

    // activeNumber() {
    //   return this.todoList.filter((item) => {
    //       return item.isCompleted === false;
    //     }).length;
    // }
  },

  watch: {
    todoList: {
      handler() {
        this.activeNumber = this.todoList.filter((item) => {
          return item.isCompleted === false;
        }).length;
      },
      deep: true,
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
