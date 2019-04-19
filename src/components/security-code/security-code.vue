<template>
  <section class="security-code-wrap">
    <ul ref="ul" class="security-code-container">
      <li @click="handleClick(index)" class="field-wrap" v-for="(item, index) in number" :key="index">
        <i class="char-field">
          {{value[index] || placeholder}}
        </i>
      </li>
    </ul>
    <div class="input-box" :style="{left: left, width: width, height: height, 'z-index': zIndex}">
      <input ref="input" type="tel" @keyup="handleInput($event)" @keyup.delete="deleteInput" :maxlength="1" v-model="inputCode">
    </div>
  </section>
</template>
<script>
export default {
  name: 'SecurityCode',
  props: {
    number: {
      type: Number,
      default: 6
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: '',
      // 输入框的位置
      left: '',
      // 输入框的宽
      width: '',
      // 输入框的高
      height: '',
      zIndex: 10,
      // 当前是第几个
      inputCodeNum: 0,
      // input的值
      inputCode: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getDom(this.inputCodeNum)
    })
  },
  methods: {
    handleClick (index) {
      if (index < this.number) {
        this.inputCode = this.value[index]
        this.getDom(index)
      }
    },
    // 获取当前元素
    getDom (currentIndex) {
      this.left = this.$refs.ul.children[currentIndex].getBoundingClientRect().left + 'px'
      this.width = this.$refs.ul.children[currentIndex].getBoundingClientRect().width + 'px'
      this.height = this.$refs.ul.children[currentIndex].getBoundingClientRect().height + 'px'
      this.$refs.input.focus()
    },
    // 删除输入
    deleteInput () {
      if (this.inputCodeNum !== 0) {
        this.inputCodeNum--
        if (!this.inputCodeNum === this.number - 1) {
          this.inputCode = this.value[this.value.length - 1]
        }
        this.getDom(this.inputCodeNum)
        this.value = this.value.substring(0, this.value.length - 1)
      }
    },
    hideKeyboard () {
      // 输入完成隐藏键盘
      document.activeElement.blur() // ios隐藏键盘
      this.$refs.input.blur() // android隐藏键盘
    },
    handleSubmit () {
      this.$emit('input', this.value)
    },
    handleInput (e) {
      if (!this.inputCode) return
      if (this.inputCodeNum < this.number - 1) {
        if (/^[0-9]*$/.test(this.inputCode)) {
          this.inputCodeNum++
          this.getDom(this.inputCodeNum)
          this.value += this.inputCode
        }
        this.inputCode = ''
      } else {
        if (this.inputCodeNum === this.number - 1) {
          if (/^[0-9]*$/.test(this.inputCode)) {
            this.inputCodeNum++
            this.value += this.inputCode
            this.hideKeyboard()
          } else {
            this.inputCode = ''
          }
        }
      }
      this.handleSubmit()
    }
  }
  // computed: {
  //   inputLeft () {
  //     return 1
  //   },
  //   inputCode: {
  //     get: function () {
  //       return this.value
  //     },
  //     set: function (newValue) {
  //       this.value = newValue.replace(/[^\d]/g, '')
  //     }
  //   }
  // }
}
</script>
<style scoped lang="less">
 .input-box {
   position:absolute;
   top:0;
   left:0;
   border:none;
   background:none;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   input {
     border: none;
     outline: none;
     width: 100%;
     text-align: center;
     font-size: 24px;
     font-style: normal;
   }
 }
 .security-code-wrap {
   position: relative;
   overflow: hidden;
 }
 .security-code-container {
 margin: 0;
 padding: 0;
 display: flex;
 justify-content: center;
 .field-wrap {
  list-style: none;
  display: block;
  width: 80px;
  height: 80px;
  line-height: 80px;
  font-size: 16px;
  background-color: #fff;
  margin: 2px;
  color: #000;
  .char-field {
  font-style: normal;
  font-size: 24px;
  }
 }
 }
</style>
