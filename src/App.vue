<template>
  <div id="app">
      <HomePage/>
  </div>
</template>

<script>
import HomePage from './components/Home'
export default {
  name: 'App',
  data () {
    return {}
  },
  components: { HomePage },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  display: block;
}
</style>
