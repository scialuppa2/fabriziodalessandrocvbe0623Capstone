const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ 
    target: 'https://localhost:44314',
    changeOrigin: true,
    secure: false,
  }));
};
