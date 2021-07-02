const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/getma',
        {
            target: 'http://passport.bilibili.com/qrcode/getLoginUrl',
            changeOrigin: true,
            pathRewrite: {
                '^/getma':'/'
            }
        }),
        createProxyMiddleware('/getinfo',
        {
            target: 'http://passport.bilibili.com/qrcode/getLoginInfo',
            changeOrigin: true,
            pathRewrite: {
                '^/getinfo':'/'
            }
        }),
        createProxyMiddleware('/getdouyuma',
        {
            target: 'https://passport.douyu.com/scan/generateCode',
            changeOrigin: true,
            pathRewrite: {
                '^/getdouyuma':'/'
            }
        })
    )
}