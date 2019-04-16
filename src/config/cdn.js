module.exports = {
  cdn: {
    // 开发环境
    dev: {
      css: [
      ],
      js: []
    },
    // 生产环境
    build: {
      css: [
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
        'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
      ],
      js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.4/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
        'https://unpkg.com/element-ui/lib/index.js',
        'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
        'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
      ]
    }
  },
  // cdn预加载使用
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'element-ui': 'ELEMENT',
    'js-cookie': 'Cookies',
    'nprogress': 'NProgress'
  }
}
