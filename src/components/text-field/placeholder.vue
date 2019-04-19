<template>
  <div class="text-field-placeholder" :class="{'show': show}">
    {{text}}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    show: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
  @import "../../styles/theme/default.less";
  .text-field-placeholder{
    position: absolute;
    opacity: 0;
    transition: opacity .45s @easeOutFunction;
    color: @disabled-color;
    line-height: 38px; /*no*/
    user-select: none;
    cursor: text;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
    &.show{
      opacity: 1;
    }
    .text-field.multi-line &{
      line-height: 1.5;
    }
  }
</style>
