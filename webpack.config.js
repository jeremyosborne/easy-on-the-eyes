var ExtractTextPlugin = require('extract-text-webpack-plugin')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var SriPlugin = require('webpack-subresource-integrity')
var webpack = require('webpack')

// This seems to be the direction webpack 2 is going from reading various posts.
// It is the job of this function to return the config object used by webpack 2.
module.exports = function (env) {
  const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
  const IS_PRODUCTION = ENV === 'production'

  var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV)
      }
    }),
    new ExtractTextPlugin({
      filename: 'app.css'
    }),
    // see: https://github.com/jantimon/favicons-webpack-plugin#advanced-usage
    // Needs a .png file.
    new FaviconsWebpackPlugin('./client/favicon.png'),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: IS_PRODUCTION
    }),
    new HtmlWebpackPlugin({
      hash: true,
      // 2017-Feb-07: Minifying is causing errors to be thrown. Turn it off.
      // minify: IS_PRODUCTION,
      template: 'client/index.hbs',
      filename: './index.html'
    })
  ]

  if (IS_PRODUCTION) {
    // Production only settings.
    plugins = [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
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
      })
    ].concat(plugins)
  } else {
    // Dev only settings.
    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  }

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
      crossOriginLoading: 'anonymous',
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
          test: /\.hbs$/,
          use: [
            'handlebars-loader'
          ]
        },
        {
          test: /\.css$/,
          // rc3 extract text plugin now in line with other webpack 2 plugins
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
