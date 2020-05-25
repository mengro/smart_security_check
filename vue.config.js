// vue.config.js 配置说明
// 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档

const path = require('path')
// const fs = require('fs')
const webpack = require('webpack')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 baseUrl 为 /my-app/。
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和publicPath的生产环境路径一致）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'assets',
  // 指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
  // indexPath: "myIndex.html",
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,

  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: false,
  // 如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
  // lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('public', resolve('public'))
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('service', resolve('src/service'))
      .set('store', resolve('src/store'))
      .set('router', resolve('src/router'))
  },
  // configureWebpack: (config) => {
  //   config.resolve.modules[0] = path.resolve(__dirname, 'node_modules');
  //   config.resolve.modules[1] = 'node_modules';
  // },
  configureWebpack: {
    plugins: []
  },
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,
  // 它支持webPack-dev-server的所有选项
  devServer: {
    // open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8081, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // 配置多个代理
    proxy: {
      '/api': {
        // target: 'http://172.16.1.186:8089',          //  英杰
        // target: 'http://172.16.0.125:8089',          // 子涵
        // target: "http://172.16.0.103:8089",          // 北瓜
        // target: 'http://172.16.0.128:8089',          // 恩来
        // target: "http://172.16.0.229:8088",          // 雪狼
        // target: 'http://172.16.0.128:8089',          // 崇文
        // target: 'http://192.168.250.147:8089',       // 迦鑫
        // target: 'http://172.16.1.223:8089',          // 小鱼
        // target: 'http://192.168.250.48:8089',        // 明龙
        // target: 'http://fdpm.goujiawang.com',        // 预发环境
        target: 'http://tdpm.goujiawang.com', // 测试环境
        // target: 'http://dpm.goujiawang.com',         // 正式环境
        // target: 'http://ddpm.goujiawang.com',        // 测试集群环境
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/mock': {
        target: 'http://rap2.goujiawang.com:38080/app/mock/19', // 预发环境
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/mock': ''
        }
      },
      '/oss': {
        target: 'http://172.16.1.186:8089', // 英杰
        // target: 'http://172.16.0.93:8089', // 明龙
        // target: 'http://172.16.0.125:8089',          // 子涵·
        // target: "http://172.16.0.103:8088",          // 北瓜
        // target: 'http://172.16.0.138:8089',          // 恩来
        // target: 'http://tdpm.goujiawang.com', // 测试环境
        // target: 'http://fdpm.goujiawang.com', // 预发环境
        // target: 'http://172.16.1.186:8089',

        ws: true,
        changeOrigin: true
      }
    },
    before: app => { }
  },
  // 第三方插件配置
  pluginOptions: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
