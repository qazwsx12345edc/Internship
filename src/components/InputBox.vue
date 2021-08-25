<template>
  <div class="edit-popout">
    <h2>{{ showTitle }}</h2>
    <span>标题:</span>
    <input type="text" autofocus v-model="todoTitle" class="edit-input" @keydown.enter="focusToNext()" ref="input1"/>
    <br />
    <span>内容:</span>
    <input type="text" v-model="todoContent" class="edit-input" ref="input2" @keydown.up="focusToLast()" @keydown.enter="submit()"/>
    <select v-model="isCompleted" v-if="thisCompleted !== null">
      <option value="true">已完成</option>
      <option value="false">未完成</option>
    </select>
    <br />
    <button @click="submit()">确认</button>
  </div>
</template>

<script>
export default {
  props: {
    thisTodoTitle: String,
    thisTodoContent: String,
    thisCompleted: Boolean,
  },

  data() {
    return {};
  },

  computed: {
    todoTitle: {
      get() {
        return this.thisTodoTitle;
      },
      set(value) {
        this.$emit("changeTodoTitle", value);
      },
    },

    todoContent: {
      get() {
        return this.thisTodoContent;
      },
      set(value) {
        this.$emit("changeTodoContent", value);
      },
    },

    isCompleted: {
      get() {
        return this.thisCompleted;
      },
      set(value) {
        if (value === "true") {
          this.$emit("changeTodoCompleted", true);
        } else {
          this.$emit("changeTodoCompleted", false);
        }
      },
    },

    showTitle() {
      if (this.thisCompleted === null) {
        return "新增todo";
      }
      return "编辑todo";
    },
  },

  methods: {
    submit() {
      this.$emit("submit");
    },

    focusToNext(){
      this.$refs.input2.focus()
    },

    focusToLast(){
      this.$refs.input1.focus()
    }
  },
};
</script>
