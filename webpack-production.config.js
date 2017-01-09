/* Use this command for production :: webpack --config webpack-production.config.js -p */
/* Use http-server to check in production, as running webpack will again build in development moode */
var webpackStrip = require('strip-loader');
var devConfig = require('./webpack.config.js');
var stripLoader = {
	test: [/\.js$/, /\.es6$/],
	exclude: /node_modules/, 
	loader: webpackStrip.loader('console.log')
}

devConfig.module.loaders.push(stripLoader);

module.exports = devConfig;
