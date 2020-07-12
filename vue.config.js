'use strict'
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const cdn = {
  // 忽略打包的第三方库
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'crypto-js': 'CryptoJS',
    'vue-router': 'VueRouter',
    axios: 'axios'
  },
  // 通过cdn方式使用
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.runtime.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/crypto-js@4.0.0/crypto-js.min.js'
  ]
}
module.exports = {
  productionSourceMap: false, // 关闭生产环境的 source map
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
    // 配置cdn引入
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn
      return args
    })
  },
  configureWebpack: config => {
    // 忽略打包配置
    config.externals = cdn.externals
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
          '^/api': '/'
        }
      }
    }
  },
  css: {
    extract: true,
    sourceMap: false
  }
}
