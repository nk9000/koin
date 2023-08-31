const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/http://localhost:3000/',
    createProxyMiddleware({
      target: 'https://api.coingecko.com',
      changeOrigin: true,
      pathRewrite: {
        '^http://localhost:3000/': '/api/v3/coins/markets',
      },
    })
  );
};
