'use strict'
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// cdn
const cdn = {
  // 忽略打包的第三方库
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios'
  },
  // 通过cdn方式使用
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
    'https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js'
  ],
  css: []
}
// Vue.config.js 配置选项
module.exports = {
  // 选项
  //  基本路径
  publicPath: '/',
  //  构建时的输出目录
  outputDir: 'dist',
  //  放置静态资源的目录
  assetsDir: 'static',
  //  html 的输出路径
  indexPath: 'index.html',
  // 文件名哈希
  filenameHashing: true,
  //  是否在保存的时候使用 `eslint-loader` 进行检查。
  lintOnSave: true,
  //  是否使用带有浏览器内编译器的完整构建版本
  runtimeCompiler: false,
  //  是否为生产环境构建生成 source map？
  productionSourceMap: true,
  //  设置生成的 HTML 中 <link rel='stylesheet'> 和 <script> 标签的 crossorigin 属性。
  crossorigin: '',
  //  在生成的 HTML 中的 <link rel='stylesheet'> 和 <script> 标签上启用 Subresource Integrity (SRI)。
  integrity: false,
  //  调整内部的 webpack 配置
  configureWebpack: (config) => {
    // 忽略打包配置
    config.externals = cdn.externals
    // 生产环境相关配置
    if (isProduction) {
      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      )
      // 公共代码抽离
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            // 公用模块抽离
            common: {
              chunks: 'initial',
              minSize: 0, // 大于0个字节
              minChunks: 2 // 抽离公共代码时，这个代码块最小被引用的次数
            },
            // 第三方库抽离
            vendor: {
              priority: 1, // 权重
              test: /node_modules/,
              chunks: 'initial',
              minSize: 0, // 大于0个字节
              minChunks: 2 // 在分割之前，这个代码块最小应该被引用的次数
            }
          }
        }
      }
    }
  }, // (Object | Function)
  chainWebpack: (config) => {
    config.module
      .rule('swf')
      .test(/\.swf$/)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        return {
          limit: 10000
        }
      })
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
    config.plugin('copy').tap((args) => {
      args[0][0].to = 'resource'
      return args
    })
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index')
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload-index')
    // 配置cdn引入
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn
      return args
    })
  },
  // 配置 webpack-dev-server 行为。
  devServer: {
    // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖。默认情况下禁用。如果你只想显示编译错误 overlay: true
    // 如果你想显示警告以及错误
    overlay: {
      warnings: false,
      errors: false
    },
    // open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
    open: true,
    // 默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    host: '0.0.0.0',
    port: 8080,
    https: false,
    // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
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
    }, // string | Object
    before: app => {}
  },
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // Css-loader 时，使用 `{ Css: { ... } }`。
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {},
  // 三方插件的选项
  pluginOptions: {
    // ...
  }
}
