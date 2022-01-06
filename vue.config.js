module.exports = {
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // history方式打包路径，根路径下填'/';如果在/app/下，填'/app/'
  publicPath: "/",
  // build后，静态文件存放地址
  assetsDir: "static",
  // 关闭代码检查
  // lintOnSave: false,
  // 配置请求地址以及转发规则
  devServer: {
    // 开发时候请求地址
    host: "localhost",
    // 开发时请求端口
    port: "80",
    // 编译完后自动打开浏览器
    open: false,
    // 配置转发规则
    proxy: {
      // 转发规则(可以多个)
      "/api": {
        target: "http://127.0.0.1:60000", // 转发地址
        changeOrigin: true, // 是否开启跨域
        ws: true, // websocket是否开启
        // 重写路径
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
