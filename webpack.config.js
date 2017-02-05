var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

// This seems to be the direction webpack 2 is going from reading various posts.
// env is a wepback specific env created at the command line via args like
// --env.blah 42 which becomes env = {blah: 42}
// It is the job of this function to return the config object used by webpack.
module.exports = function (env) {
  const ENV = env && env.production ? 'production' : 'development'
  const IS_PRODUCTION = ENV === 'production'

  var plugins = IS_PRODUCTION ? [
    // Production.
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(ENV) }
    }),
    new ExtractTextPlugin({
      filename: 'app.css'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './public/index.html'
    })
  ] : [
    // Development.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(ENV) }
    }),
    new ExtractTextPlugin({
      filename: 'app.css'
    }),
    // Removed for webpack 2.
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './public/index.html'
    })
  ]

  var entry = IS_PRODUCTION ? {
    // Production
    app: './client/index.js',
    vendor: ['react']
  } : {
    // Development
    app: [
      'webpack-hot-middleware/client?http://0.0.0.0:3000',
      './client/index.js'
    ],
    vendor: ['react']
  }

  return {
    devtool: IS_PRODUCTION ? 'source-map' : 'eval',
    entry: entry,
    output: {
      path: path.resolve(path.join(__dirname, 'public')),
      publicPath: '/',
      filename: '[name].bundle.js'
    },
    plugins: plugins,
    resolve: {
      // NOTE: Webpack 2 still in beta, the usual ['', '.js', '.jsx'] throws a validation error.
      extensions: ['.js', '.jsx']
    },
    module: {
      // webpack 2: loaders becomes rules
      rules: [
        {
          test: /\.jsx?$/,
          // This module exports plain ES6, which doesn't get transformed because
          // it lives in node_modules, and the arrow functions make uglifyjs barf.
          exclude: /node_modules\/(?!(easy-on-the-eyes-content)\/).*/,
          // Use babelrc for general configuration, webpack specific config in webpack.
          use: [
            'react-hot-loader',
            'babel-loader'
          ]
        },
        {
          test: /\.css$/,
          // rc3 extract text plugin now in line with other webpack plgins
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              query: {
                minimize: false
              }
            }]
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
    }
  }
}
