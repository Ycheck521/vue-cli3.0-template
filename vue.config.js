const path = require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: './dist',
  lintOnSave: true,
  parallel: require('os').cpus().length > 1,
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
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components')
        }
      }
    })
  }
}
