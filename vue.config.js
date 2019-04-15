const path = require('path')
// 去console插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
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
    // 移除 prefetch 插件
    /**
     * vue-cli3.0默认会在用户空闲时提前预加载一些将来可能会用到的资源，在移动端会消耗带宽，需要去掉
     */
    config.plugins.delete('prefetch')
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
      config.plugins = [...config.plugins, ...plugins]
    }
  }
}
