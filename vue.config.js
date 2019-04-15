const path = require('path')
// 去console插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: './dist',
  lintOnSave: true,
  // 是否提取css到style标签
  // css: {
  //   extract: false
  // },
  chainWebpack: (config) => {
    // 这里配置px2rem-loader
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
        sourceMap: true,
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
    ]
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
