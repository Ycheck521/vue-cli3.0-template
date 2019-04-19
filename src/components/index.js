import Lazyload from 'vue-lazyload'
import Icon from './Icon'
import TextField from './text-field'
import SecurityCode from './security-code'
import inputCode from './input-code'

const install = (Vue) => {
  if (install.installed) {
    return
  }
  install.installed = true
  const components = [
    Icon,
    TextField,
    SecurityCode,
    inputCode
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
