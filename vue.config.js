
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const svgoConfig = require('./src/utils/svgo.config')
const CDN = require('./src/config/cdn')
// 分析打包体积用
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const resolve = dir => path.resolve(__dirname, dir)
const name = 'vue-cli3.0-demo'
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV === 'development',
  // 关闭sourceMap
  productionSourceMap: false,
  devServer: {
  },
  chainWebpack: (config) => {
    const svgLoader = config.module.rule('svg')
    // 删除已有的svg-loader
    svgLoader.uses.clear()
    // 添加新的svg-loader 自动生成symbol标签插入到body里
    svgLoader
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .options(svgoConfig)
      .end()
    // 指定loader解析目录
    svgLoader.include.add(resolve('src/assets/icons'))

    // 将原本处理svg的loader去除assets路径
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/icons'))
      .end()

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
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = CDN.cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = CDN.cdn.dev
      }
      return args
    })

    // https://webpack.js.org/configuration/devtool/#development
    config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))
    config.when(process.env.NODE_ENV !== 'development', config => {
      config.plugin('ScriptExtHtmlWebpackPlugin').after('html').use('script-ext-html-webpack-plugin', [{
        // `runtime` must same as runtimeChunk name. default is `runtime`
        inline: /runtime\..*\.js$/
      }])
      config.optimization.minimizer([
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false,
          parallel: true,
          cache: true
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
      ])
    })
    config.optimization.runtimeChunk('single')
  },
  configureWebpack: config => {
    config.name = name
    config.resolve.alias = {
      '@': resolve('src'),
      '@c': resolve('src/components')
    }
    if (process.env.NODE_ENV !== 'development') {
      // 生产环境使用cdn，打包时不打包这些资源
      config.externals = CDN.externals
    }
  }
}
