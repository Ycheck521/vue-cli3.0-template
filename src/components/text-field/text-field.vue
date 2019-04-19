<template>
  <div class="text-field" :class="textFieldClass">
    <div class="text-field-left" v-if="$slots.left">
      <slot name="left">
      </slot>
    </div>
    <div @click="handleLabelClick" ref="content" class="text-field-content" :class="{center}">
      <text-field-label v-if="label" :float="float" :focus="isFocused">{{label}}</text-field-label>
      <placeholder v-if="placeholder" :text="placeholder" :show="showPlaceholder"></placeholder>
      <slot>
        <input v-if="!multiLine " ref="input" :type="type" :value="inputValue"
          :disabled="disabled" @change="handleChange" @focus="handleFocus" @input="handleInput" @blur="handleBlur"
          :max="max" :min="min" :maxlength="maxlength" class="text-field-input" :class="{center}">
        <x-textarea v-else ref="textarea" :value="inputValue" :disabled="disabled" :rows="rows" :rowsMax="rowsMax" @change="handleChange" @input="handleInput" @focus="handleFocus" @blur="handleBlur"></x-textarea>
      </slot>
      <underline v-if="underlineShow" :disabled="disabled" :focus="isFocused" :error="!!errorText"/>
      <div class="text-field-help" :class="errorClass" v-if="errorText">
        <div>
          {{errorText}}
        </div>
      </div>
    </div>
    <div class="text-field-right" v-if="$slots.right">
      <slot name="right">
      </slot>
    </div>
  </div>
</template>
<script>
import underline from './underline'
import textFieldLabel from './text-field-label'
import xTextarea from './textarea'
import placeholder from './placeholder'
const COMPONENT_NAME = 'text-field'
const EVENT_FOCUS = 'focus'
const EVENT_BLUR = 'blur'
const EVENT_CHANGE = 'change'
export default {
  name: COMPONENT_NAME,
  props: {
    value: {},
    type: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    labelFloat: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    max: {
      type: [Number, String]
    },
    min: {
      type: [Number, String]
    },
    maxlength: {
      type: [Number, String]
    },
    multiLine: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 1
    },
    rowsMax: {
      type: Number
    },
    underlineShow: {
      type: Boolean,
      default: true
    },
    errorText: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean
    }
  },
  data () {
    return {
      isFocused: false,
      inputValue: this.value,
      charLength: 0
    }
  },
  methods: {
    handleFocus (event) {
      this.isFocused = true
      this.$emit(EVENT_FOCUS, event)
    },
    handleBlur (event) {
      this.isFocused = false
      if (this.type === 'number' && !this.inputValue && this.inputValue !== 0 && this.$refs.input) {
        this.$refs.input.value = ''
      }
      this.$emit(EVENT_BLUR, event)
    },
    handleInput (val) {
      this.inputValue = val.target ? val.target.value : val
    },
    handleChange (e) {
      this.$emit(EVENT_CHANGE, e, e.target.value)
    },
    handleLabelClick () {
      this.$emit('labelClick')
    }
  },
  computed: {
    textFieldClass () {
      return {
        'disabled': this.disabled,
        'multiLine': this.multiLine,
        'error': !!this.errorText,
        'has-label': !!this.label,
        'has-right': !!this.$slots.right
      }
    },
    float () {
      return this.labelFloat && !this.isFocused && !this.inputValue && this.inputValue !== 0
    },
    errorClass () {
      return {
        'disabled': this.disabled,
        'error': !!this.errorText
      }
    },
    showPlaceholder () {
      return !this.float && !this.inputValue && this.inputValue !== 0
    }
  },
  watch: {
    value (val) {
      this.inputValue = val
    },
    inputValue (val, oldVal) {
      this.charLength = this.maxLength && String(this.inputValue) ? String(this.inputValue).length : 0
      this.$emit('input', val)
    }
  },
  components: {
    xTextarea,
    underline,
    textFieldLabel,
    placeholder
  }
}
</script>

<style lang="less">
@import '../../styles/theme/default.less';
  .text-field {
    display: flex;
    position: relative;
    font-size: 16px; /*no*/
    width: 100%; /*no*/
    min-height: 60px; /*no*/
    color: @text-color;
    &-content {
      flex: 1;
      padding-top: 4px; /*no*/
      padding-bottom: 12px; /*no*/
      &.center {
        text-align: center;
      }
      .text-field.disabled & {
        color: @disabled-color;
        cursor: not-allowed;
      }
      .text-field.has-label & {
        padding-top: 22px; /*no*/
        padding-bottom: 12px; /*no*/
      }
    }
    &-input {
      appearance: none;
      outline: none;
      border: none;
      background: none;
      border-radius: 0 0 0 0;
      box-shadow: none;
      display: block;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 38px; /*no*/
      font-style: inherit;
      font-variant: inherit;
      font-weight: inherit;
      font-stretch: inherit;
      font-size: inherit;
      font-family: inherit;
      color: inherit;
      font-family: inherit;
      position: relative;
      box-sizing: border-box;
      &.center {
        text-align: center;
      }
    }
    &-help {
      position: absolute;
      margin-top: 3px; /*no*/
      font-size: 12px; /*no*/
      line-height: 12px; /*no*/
      display: flex;
      justify-content: space-between;
      left: 0;
      right: 0;
      .text-field.error & {
        color: @danger;
      }
      .text-field.disabled & {
        color: inherit;
      }
    }
    &-right {
      padding-top: 7px; /*no*/
      .text-field.has-label & {
        padding-top: 25px; /*no*/
        padding-bottom: 15px; /*no*/
      }
    }
    .x-button {
      height: 32px; /*no*/
      font-size: 0;
      padding: 0 30px; /*no*/
      &-text {
        font-size: 12px; /*no*/
      }
    }
  }
</style>
