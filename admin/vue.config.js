module.exports = {
  configureWebpack: {
    devServer: {
      host: 'dev.local.com',
      port: '9999',
      disableHostCheck: true,
      https: true
    }
  }
}
