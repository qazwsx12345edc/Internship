<template>
  <div class="todoapp">
    <!-- 标题 输入框 -->
    <header class="header">
      <div class="todo-count" @click="onClickAddShow()">
        <span class="todo-completed-count">
          completed: {{ completedNumber }}
        </span>
        <span class="add" style="font-weight:500; font-size:24px">+</span>
        <span class="todo-uncompleted-count">
          uncompleted: {{ uncompletedNumber }}
        </span>
      </div>
      <h1>TodoList</h1>
    </header>

    <!-- todo列表 -->
    <div class="main">
      <ul class="todo-list">
        <li class="todo" v-for="(item, index) in todoListFiltered" :key="index">
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              v-model="item.isCompleted"
              @click="onClickUpdateUncompletedNumber()"
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
    </div>

    <!-- 底部筛选框 -->
    <footer class="footer">
      <ul class="filters">
        <li>
          <a @click="showAll()">All</a>
        </li>
        <li>
          <a @click="showUncompleted()">Uncompleted</a>
        </li>
        <li>
          <a @click="showCompleted()">Completed</a>
        </li>
      </ul>
      <button class="clear-completed" @click="onClickRemoveAllCompleted()">
        Clear completed
      </button>
    </footer>

    <!-- 弹出框 -->
    <InputBox
      :class="inputBoxClass"
      :thisTodoTitle="thisTodoTitle"
      :thisTodoContent="thisTodoContent"
      :thisCompleted="thisCompleted"
      @changeTodoTitle="changeTodoTitle"
      @changeTodoContent="changeTodoContent"
      @changeTodoCompleted="changeTodoCompleted"
      @submit="inputSubmit"
    />
  </div>
</template>

<script>
import InputBox from "../components/InputBox.vue";
export default {
  components: {
    InputBox,
  },
  data() {
    return {
      todoList: [],
      isEditShow: false,
      thisTodoTitle: "",
      thisTodoContent: "",
      thisCompleted: null,
      thisIndex: 0,
      showModel: "All",
      uncompletedNumber: 0,
    };
  },

  methods: {
    //添加todo
    addTodo() {
      if (this.thisTodoTitle !== "" && this.thisTodoContent != "") {
        const newTodo = {
          title: this.thisTodoTitle,
          content: this.thisTodoContent,
          isCompleted: false,
        };
        this.todoList.unshift(newTodo);
        this.thisTodoTitle = "";
        this.thisTodoContent = "";
        this.isEditShow = false
      }
    },

    // 复选框 更新完成数量
    onClickUpdateUncompletedNumber(event) {
      // 筛选状态下不可编辑
      event = event || window.event;
      if (this.showModel !== "All") {
        event.preventDefault();
      }
    },

    // 删除todo
    onClickRemoveTodo(index) {
      if (this.showModel === "All") {
        this.todoList.splice(index, 1);
      }
    },

    onClickAddShow() {
      this.isEditShow = true
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
    updateTodo() {
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

    changeTodoTitle(value) {
      this.thisTodoTitle = value
    },

    changeTodoContent(value) {
      this.thisTodoContent = value
    },
    
    changeTodoCompleted(value) {
      this.thisCompleted = value
    },

    inputSubmit(){
      if (this.thisCompleted === null) {
        this.addTodo()
      }
      else{
        this.updateTodo()
      }
    }
    
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

    completedNumber() {
      return this.todoList.length - this.uncompletedNumber;
    },

    inputBoxClass() {
      if (this.isEditShow) {
        return "edit-popout-show"
      }
      return ""
    }
  },

  watch: {
    todoList: {
      handler() {
        this.uncompletedNumber = this.todoList.filter((item) => {
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
