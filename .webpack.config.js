var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StyleLintPlugin = require('stylelint-webpack-plugin')
var webpack = require('webpack')

const PROD = process.env.NODE_ENV === 'production'

var plugins = PROD ? [
  new StyleLintPlugin({
    configFile: '.stylelintrc',
    // glob pattern, not regex
    files: '**/*.?(s)@(a|c)ss',
    failOnError: true
  }),
  new ExtractTextPlugin({
    filename: 'app.css'
  }),
  new webpack.optimize.UglifyJsPlugin({minimize: true})
] : [
  new StyleLintPlugin({
    configFile: '.stylelintrc',
    // glob pattern, not regex
    files: '**/*.?(s)@(a|c)ss',
    failOnError: true
  }),
  new ExtractTextPlugin({
    filename: 'app.css'
  }),
  // Removed for webpack 2.
  // new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

var entry = PROD ? [
  './client/index.js'
] : [
  // 'webpack-dev-server/client?http://0.0.0.0:3000',
  // 'webpack/hot/only-dev-server',
  'webpack-hot-middleware/client?http://0.0.0.0:3000',
  './client/index.js'
]

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(path.join(__dirname, 'public')),
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    // webpack 2: loaders becomes rules
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'standard-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        // Please only configure via .babelrc where possible.
        use: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
                // For font and icon requires.
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url?limit=100000'
      }
    ]
  },
  plugins: plugins
}
