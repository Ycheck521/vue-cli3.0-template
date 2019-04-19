<template>
  <div>
    <hr class="text-field-line" :class="lineClass" />
    <hr v-if="!disabled" class="text-field-focus-line" :class="focusLineClass"/>
  </div>
</template>

<script>
export default {
  props: {
    focus: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {
    lineClass () {
      const { disabled } = this
      let classNames = []
      if (disabled) classNames.push('disabled')
      return classNames
    },
    focusLineClass () {
      const { focus, error } = this
      let classNames = []
      if (error) classNames.push('error')
      if (focus) classNames.push('focus')
      return classNames
    }
  }
}
</script>

<style lang="less">
  @import '../../styles/theme/default.less';
  .text-field-line {
    margin: 0;
    height: 1px; /*no*/
    border: none;
    background-color: @border-color;
    position: absolute;
    left: 0;
    right: 0;
    &.disabled{
      height: auto;
      background-color: transparent;
      border-bottom: 2px solid @disabled-color; /*no*/
    }
  }
  .text-field-focus-line{
    margin: 0;
    height: 2px; /*no*/
    border: none;
    background-color: @primary-light;
    position: absolute;
    left: 0;
    right: 0;
    margin-top: -1px; /*no*/
    transform: scaleX(0);
    transition: transform .45s @easeOutFunction;
    &.focus {
      transform: scaleX(1);
    }
    &.error {
      transform: scaleX(1);
      background-color: @danger-light;
    }
  }
</style>
