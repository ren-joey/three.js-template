const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[hash].bundle.js'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      }
    ]
  },
  optimization:{
    minimize: false, // <---- disables uglify.
    // minimizer: [new UglifyJsPlugin()] if you want to customize it.
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false
    }),
    new cleanWebpackPlugin({
      verbose: true
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ]
}
