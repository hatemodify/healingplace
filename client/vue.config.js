module.exports = {
  configureWebpack: {
    devServer: {
      host: 'dev.local.com',
      port: '3000',
      disableHostCheck: true,
      https: true
    }
  }
}
