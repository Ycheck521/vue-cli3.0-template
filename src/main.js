import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components'
import { sync } from 'vuex-router-sync'
import 'lib-flexible/flexible.js'

Vue.use(components)
// 可以在store里拿到router的信息
sync(store, router)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 输入框在虚拟键盘弹出时，自动滚动到可见位置
document.body.addEventListener('click', function (event) {
  var element = event.target
  var tags = {
    'INPUT': 1,
    'TEXTAREA': 1
  }
  if ((element.tagName in tags)) {
    setTimeout(function () {
      element.scrollIntoViewIfNeeded()
    }, 400)
  }
}, false)
