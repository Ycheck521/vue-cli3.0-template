const path = require('path')
// 去console插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const svgoConfig = require('./src/utils/svgo.config')
// 分析打包体积用
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const resolve = dir => path.resolve(__dirname, dir)

// cdn预加载使用
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'element-ui': 'ELEMENT',
  'js-cookie': 'Cookies',
  'nprogress': 'NProgress'
}

const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
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
      'https://cdn.bootcss.com/vue/2.5.21/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js',
      'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
    ]
  }
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: './dist',
  lintOnSave: true,
  // 关闭sourceMap
  productionSourceMap: false,
  // 是否提取css到style标签
  // css: {
  //   extract: false
  // },
  chainWebpack: (config) => {
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })

    // 移除 prefetch 插件
    /**
     * vue-cli3.0默认会在用户空闲时提前预加载一些将来可能会用到的资源，在移动端会消耗带宽，需要去掉
     */
    config.plugins.delete('prefetch')
    // 将原本处理svg的loader去除assets路径
    config.module.rule('images').test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
    config.module.rule('images').exclude.add(resolve('src/assets/icons'))
    // 删除已有的svg-loader
    const svgLoader = config.module.rule('svg')
    svgLoader.uses.clear()
    // 指定loader解析目录
    svgLoader.include.add(resolve('src/assets/icons'))
    // 添加新的svg-loader 自动生成symbol标签插入到body里
    svgLoader.use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: 'icon-[name]' })
    svgLoader.use('svgo-loader').loader('svgo-loader').options(svgoConfig)

    // 配置px2rem-loader
    config.module
      .rule('less')
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      // px2rem-loader需要在postcss-loader之前，要不然less的嵌套语法会报错
      .before('postcss-loader')
      .options({
        remUnit: 75
      })
      .end()
      // 配置别名
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('@c', resolve('src/components'))
  },
  configureWebpack: config => {
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        },
        sourceMap: false,
        parallel: true
      }),
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
      // new BundleAnalyzerPlugin()
    ]
    if (process.env.NODE_ENV !== 'development') {
      // 生产环境使用cdn，打包时不打包这些资源
      config.externals = externals
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
