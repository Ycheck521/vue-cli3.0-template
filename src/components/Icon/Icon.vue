<template>
  <svg class="icon" :style="iconStyle">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
{
  const _require = require.context('../../assets/icons', true, /\.svg$/)
  _require.keys().forEach(key => _require(key))
}
const COMPONENT_NAME = 'icon'
export default {
  name: COMPONENT_NAME,
  props: {
    icon: {
      type: String,
      require: true,
      default: ''
    },
    size: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.icon}`
    },
    iconStyle () {
      let { size } = this.$props
      return {
        width: `${size}px`,
        height: `${size}px`,
        color: this.color
      }
    }
  }
}
</script>

<style lang="less">
  .icon {
    display: inline-block;
    fill: currentColor;
    vertical-align: middle;
    overflow: hidden;
  }
</style>
