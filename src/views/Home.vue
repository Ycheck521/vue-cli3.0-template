<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <text-field v-model.trim="validCode" type="tel" maxlength="6" placeholder="请输入验证码"/>
     <security-code v-model="validCode"></security-code>
     <input-code span-size="20px" type="number" :number="6" height="40px" span-color="#000" input-color="#000" input-size="20px" :code="code" :get-input="getInput" :success="success"></input-code>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@c/HelloWorld.vue'

export default {
  name: 'home',
  data () {
    return {
      baseUrl: process.env.BASE_URL,
      validCode: '',
      code: []
    }
  },
  methods: {
  },
  components: {
    // HelloWorld
  }
}
</script>
<style lang="less">
.home {
  background: red;
  width: 80%
}
p {
  font-size: 10px;
}
</style>
