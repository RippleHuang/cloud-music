'use strict'
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
module.exports = {
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('getIcons', resolve('src/getIcons'))
      .set('plugins', resolve('src/plugins'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('utils', resolve('src/utils'))
      .set('views', resolve('src/views'))
  },
  devServer: {
    // 默认是 localhost如果希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    host: '0.0.0.0',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://localhost:3000',
        /* 允许跨域 */
        changeOrigin: true,
        // false为http访问，true为https访问
        secure: false,
        // 设置代理
        pathRewrite: {
          '^/api': 'http://localhost:3000' // 重写接口
        }
      }
    }
  }
}
