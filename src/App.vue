<template>
  <div id="app">
    <img src="./assets/logo.png">
    <homeList></homeList>
  </div>
</template>

<script>
import HomeList from './components/HomeList'

export default {
  name: 'app',
  components: {
    HomeList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
