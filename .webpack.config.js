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
  resolve: {
    // NOTE: Webpack 2 still in beta, the usual ['', '.js', '.jsx'] throws a
    // validation error.
    extensions: ['.js', '.jsx']
  },
  module: {
    // webpack 2: loaders becomes rules
    rules: [
      {
        test: /\.jsx?$/,
        // Make this a "preloader".
        enforce: 'pre',
        use: [
          'standard-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        // Use babelrc for general configuration, webpack specific config in webpack.
        use: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        // 2017=Jan-27: Webpack 2 + ExtractTextPlugin still requires the loader key.
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
                // For font and icon requires.
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 100000
          }
        }]
      }
    ]
  },
  plugins: plugins
}
