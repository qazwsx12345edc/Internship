<template>
  <div id="app">
    <router-link to="/todo-list"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  width: 100%;
  user-select: none;
}
</style>
