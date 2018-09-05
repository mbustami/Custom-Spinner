const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
	entry: './src/index.js',
	output: { filename: 'bundle.js', path: path.join(__dirname, 'dist') },
	module: {
		rules: [
			{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src']
					}
				}
			},			
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: [path.join(__dirname, 'src')],
				use: [{
					loader: 'babel-loader'
				}],
			}
		]
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
				filename: '[file].map'
			})
	],
	devServer: {
		hot: true,
		inline: true,
		stats: 'errors-only',
    }
};