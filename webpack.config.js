var path = require('path');

module.exports = {
	context: path.resolve('source'),
	entry: ["./utils.js","./app.js"],
	output: {
		path: path.resolve('build/'),
		publicPath: '/public/assets/',
		filename: "bundle.js"
	}, 

	devServer: {
		contentBase: 'public'
	},

	module:{
		
		loaders: [
			{
				test: /\.(js|es6)$/,
				exclude: /node_modules/, 
				loader: "babel-loader"
			}, 
			{
				test: /\.css$/,
				exclude: /node_modules/, 
				loader: "style-loader!css-loader!autoprefixer-loader"
			}, 
			{
				test: /\.scss$/,
				exclude: /node_modules/, 
				loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
			}, 
			{
				test: /\.(png|jpg)$/,
				exclude: /node_modules/, 
				loader: "url-loader?limit=5000"
			}    
		],
		postLoaders: [
			{
				test: /\.js$/,
				exclude: 'node_modules',
				loader: 'eslint'
			}, 
		]
	},

	resolve: {
		extensions: ['', '.js', '.es6']
	},
	watch: true
}
