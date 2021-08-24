<template>
  <div id="app">
    <TodoList/>
  </div>
</template>

<script>
import TodoList from "./pages/TodoList.vue"

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>
#app {
  width: 100%;
  user-select: none;
}
</style>
