<template>
  <div class="text-field-label" :class="labelClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    focus: {
      type: Boolean,
      default: false
    },
    float: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    labelClass () {
      const { float, focus } = this
      let classNames = []
      if (float) classNames.push('float')
      if (focus) classNames.push('focus')
      return classNames
    }
  }
}
</script>

<style lang="less">
  @import "../../styles/theme/default.less";
  .text-field-label {
    line-height: 14px; /*no*/
    transition: all .45s @easeOutFunction;
    z-index: 1;
    cursor: text;
    color: @label-color;
    transform: translate3d(0, 0, 0) scale(0.875);
    transform-origin: left top;
    user-select: none;
    pointer-events: none;
    backface-visibility: hidden;
    .text-field.has-label & {
      top: 4px; /*no*/
      position: absolute;
    }
    .text-field.has-label &.float {
      top: 12px; /*no*/
      transform: translate3d(0, 22px, 0) scale(1); /*no*/
      color: @disabled-color;
    }
  }
</style>
