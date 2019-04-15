<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@c/HelloWorld.vue'

export default {
  name: 'home',
  data () {
    return {
      baseUrl: process.env.BASE_URL
    }
  },
  components: {
    HelloWorld
  }
}
</script>
<style lang="less">
p {
  font-size: 10px;
}
</style>
