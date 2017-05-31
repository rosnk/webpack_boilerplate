var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
/* Uncoment this to generate seperate css file
 var ExtractTextPlugin = require('extract-text-plus-webpack-plugin');
 */

var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION  = process.env.NODE_ENV === 'production';

var entry = PRODUCTION /* check if running in production */
    ? [
          "./source/utils.js",  /* run if production is true */
          "./source/main.js"
      ]
    : [
          "./source/utils.js",  /* run if development is true */
          "./source/main.js",
          "webpack/hot/dev-server",
          "webpack-dev-server/client?http://localhost:8080"
      ];

var plugins = PRODUCTION
    ? [
      new webpack.optimize.UglifyJsPlugin(),
      /*uncomment this to generate seperate css bundle file-loader

        // new ExtractTextPlugin('style-[contenthash:10].css'),  //
      */

      // new webpack.optimize.UglifyJsPlugin({
      //   comments: true,
      //   mangle: false,
      //   compress: {
      //     warnings: true
      //   }
      // })
      new CopyWebpackPlugin([
			    { from: 'source/public_static/images', to: 'images', force: true }
			])
    ]
    : [
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([
			    { from: 'source/public_static/images', to: 'images', force: true }
			])
    ];


  plugins.push(
  	new webpack.DefinePlugin({
  	 /* any thing set here is directly available in source code */
  	 /* here, either development is true or production is true, this variable can be used to check code running on "development-production" inside the script.  */
  		DEVELOPMENT: JSON.stringify(DEVELOPMENT),
  		PRODUCTION: JSON.stringify(PRODUCTION)
  	})
  );

  /* uncomment this section and replace  "style-loader!css-loader!autoprefixer-loader" with the variable name cssLoader
    // const cssLoader = PRODUCTION
    //       ? ExtractTextPlugin.extract({
    //           loader: 'css-loader'
    //         })
    //       : ['style-loader', 'css-loader', 'autoprefixer-loader' ];
  */


module.exports = {
  devtool: 'source-map',
	// context: path.resolve('source'),
	entry: entry,
  plugins: plugins,
	output: {
    path: path.join(__dirname, 'build'),
		publicPath: '/build/',
		filename: "bundle.js"
	},
  devServer: { inline: true },
  module:{
    loaders: [
      {
       test: /\.(js|es6)$/,
       exclude: /node_modules/,
       use: ['babel-loader']
      },
     {
       test: /\.(png|jpg|gif)$/,
       exclude: /node_modules/,
       use: ["url-loader?limit=5000&name=images/[hash:12].[ext]"]
     },
     {
       test: /\.css$/,
       exclude: /node_modules/,
       loader: "style-loader!css-loader!autoprefixer-loader"
     },
     {
       test: /\.scss$/,
       exclude: /node_modules/,
       loader: "style-loader!css-loader!autoprefixer-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
     }

    ]

  }

}
