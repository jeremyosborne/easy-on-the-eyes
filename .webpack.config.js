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
  new ExtractTextPlugin('app.css'),
  new webpack.optimize.UglifyJsPlugin({minimize: true})
] : [
  new StyleLintPlugin({
    configFile: '.stylelintrc',
    // glob pattern, not regex
    files: '**/*.?(s)@(a|c)ss',
    failOnError: true
  }),
  new ExtractTextPlugin('app.css'),
  new webpack.HotModuleReplacementPlugin()
]

var entry = PROD ? [
  './client/index.js'
] : [
  'webpack-dev-server/client?http://0.0.0.0:3000',
  'webpack/hot/only-dev-server',
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
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'standard-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel-loader?presets[]=es2015&presets[]=react']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
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
