import Lazyload from 'vue-lazyload'
import Icon from './Icon'

const install = (Vue) => {
  if (install.installed) {
    return
  }
  install.installed = true
  const components = [
    Icon
  ]
  components.forEach(component => {
    component.install(Vue)
  })
  Vue.use(Lazyload, {
    loading: require('../assets/loading-spin.svg'),
    attempt: 3
  })
}

export default {
  install
}
