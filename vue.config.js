
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const svgoConfig = require('./src/utils/svgo.config')
const CDN = require('./src/config/cdn')
// 分析打包体积用
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const resolve = dir => path.resolve(__dirname, dir)

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
        args[0].cdn = CDN.cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = CDN.cdn.dev
      }
      return args
    })
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
        remUnit: 37.5
      })
      .end()
      // 配置别名
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('@c', resolve('src/components'))
  },
  configureWebpack: config => {
    let plugins = [
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      new webpack.NoEmitOnErrorsPlugin(),
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
      config.externals = CDN.externals
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  devServer: {
  }
}
