const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use((req, res, next) => {
  req.headers['referer'] = 'https://www.google.com';  // Spoofed referer
  next();
});

app.use('/', createProxyMiddleware({
  target: 'https://template-site.dev.nexuspointdev.co.uk/', // The site you want to test
  changeOrigin: true,
  logLevel: 'debug', // Enable logging for debugging
}));

app.listen(4000, () => {
  console.log('Proxy server is running on http://localhost:4000');
});