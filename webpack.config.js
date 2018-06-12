const Webpack = require('webpack')
const Autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: ['babel-polyfill', './app/main.js'],
  devtool: 'eval-source-map',
  output: {
    path: __dirname + '/dist',
    //path: './app',
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new Webpack.LoaderOptionsPlugin({
      options: {
        postcss: [Autoprefixer()]
      }
    })
  ]
}
