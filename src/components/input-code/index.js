// import VueInputCode from './inputcode.vue'

// if (typeof window !== 'undefined' && window.Vue) {
//   Vue.component('vue-input-code', VueInputCode)
// };

// export default VueInputCode
import VueInputCode from './input-code.vue'

VueInputCode.install = (Vue) => {
  Vue.component(VueInputCode.name, VueInputCode)
}

export default VueInputCode
