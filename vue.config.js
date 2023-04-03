const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  //关键点在这
  runtimeCompiler: true,

  assetsDir:'static',
  publicPath: '/',
  devServer:{
    proxy: {
      '/atcapi/': {
        target: 'https://atc.skylineflyleague.cn/', // 配置访问的服务器地址
        //pathRewrite: { '^/atcapi': '' },  // 用于将请求中的 /api 字符串替换为空, 然后访问地址就能正确访问，若不添加此行配置，那么访问地址就变成了： http://localhost:5000/api/request_url，这样的请求就会出现 404 操作
        ws: true, // 是否支持 webstocket, 默认是 true
        changeOrigin: true, // 用于控制请求头中的 host 值, 默认是 ture
        headers:{
          Referer: 'https://atc.skylineflyleague.cn/',
          Host: 'atc.skylineflyleague.cn'
        },
      },
      '/goApi/': {
        target: 'https://atc.skylineflyleague.cn/', // 配置访问的服务器地址
        //pathRewrite: { '^/goApi': '' },  // 用于将请求中的 /api2 字符串替换为空, 然后访问地址就能正确访问，若不添加此行配置，那么访问地址就变成了： http://localhost:6000/api/request_url，这样的请求就会出现 404 操作
        ws: true, // 是否支持 webstocket, 默认是 true
        changeOrigin: true, // 用于控制请求头中的 host 值, 默认是 ture
        headers:{
          Referer: 'https://atc.skylineflyleague.cn/',
          Host: 'atc.skylineflyleague.cn'
        },
      },'/LocalApi/': {
        target: 'http://127.0.0.1:6677/', // 配置访问的服务器地址
        pathRewrite: { '^/LocalApi': '' },  // 用于将请求中的 /api2 字符串替换为空, 然后访问地址就能正确访问，若不添加此行配置，那么访问地址就变成了： http://localhost:6000/api/request_url，这样的请求就会出现 404 操作
        ws: true, // 是否支持 webstocket, 默认是 true
        changeOrigin: true, // 用于控制请求头中的 host 值, 默认是 ture
        headers:{
          Referer: 'https://atc.skylineflyleague.cn/',
          Host: 'atc.skylineflyleague.cn'
        },
      },
      '/images/': {
        target: 'https://atc.skylineflyleague.cn/', // 配置访问的服务器地址
        //pathRewrite: { '^/goApi': '' },  // 用于将请求中的 /api2 字符串替换为空, 然后访问地址就能正确访问，若不添加此行配置，那么访问地址就变成了： http://localhost:6000/api/request_url，这样的请求就会出现 404 操作
        ws: true, // 是否支持 webstocket, 默认是 true
        changeOrigin: true, // 用于控制请求头中的 host 值, 默认是 ture
        headers:{
          Referer: 'https://atc.skylineflyleague.cn/',
          Host: 'atc.skylineflyleague.cn'
        },
      }
    }
  }
})