var ExtractTextPlugin = require('extract-text-webpack-plugin')
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var noopPlugin = require('noop-webpack-plugin')
var path = require('path')
var SriPlugin = require('webpack-subresource-integrity')
var webpack = require('webpack')

// This seems to be the direction webpack 2 is going from reading various posts.
// It is the job of this function to return the config object used by webpack 2.
module.exports = function (env) {
  const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
  const IS_PRODUCTION = ENV === 'production'

  var plugins = [
    new webpack.LoaderOptionsPlugin({
      minimize: IS_PRODUCTION,
      debug: !IS_PRODUCTION
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.[hash].js'
    }),
    new ExtractTextPlugin({
      allChunks: true,
      disable: process.env.NODE_ENV === 'development',
      filename: 'app.[hash].css',
    }),
    // see: https://github.com/jantimon/favicons-webpack-plugin#advanced-usage
    // Needs a .png file.
    new FaviconsWebpackPlugin('./src/favicon.png'),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: IS_PRODUCTION
    }),
    new HtmlWebpackPlugin({
      hash: true,
      // 2017-Feb-07: Minifying is causing errors to be thrown. Turn it off.
      // minify: IS_PRODUCTION,
      template: 'src/index.hbs',
      filename: './index.html'
    }),
    IS_PRODUCTION ? noopPlugin : new webpack.HotModuleReplacementPlugin(),
    IS_PRODUCTION ? noopPlugin : new webpack.NoEmitOnErrorsPlugin(),
    IS_PRODUCTION ? new webpack.optimize.UglifyJsPlugin({
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
    }) : noopPlugin,
  ]

  return {
    devtool: IS_PRODUCTION ? 'nosources-source-map' : 'cheap-module-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 3001,
      proxy: {
        '/api': 'http://localhost:3000',
      },
      publicPath: '/',
    },
    entry: {
      app: [
        'babel-polyfill',
        IS_PRODUCTION ? '' : 'react-hot-loader/patch',
        './src/index.js',
      ],
      vendor: ['react']
    },
    output: {
      crossOriginLoading: 'anonymous',
      path: path.resolve(path.join(__dirname, 'public')),
      publicPath: '/',
      filename: '[name].bundle.[hash].js'
    },
    plugins: plugins,
    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules'
      ],
      // NOTE: Webpack 2 still in beta, the usual ['', '.js', '.jsx'] throws a validation error.
      extensions: ['.js', '.jsx', '.scss', '.css']
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
            IS_PRODUCTION ? 'noop-loader' : 'react-hot-loader/webpack',
            'babel-loader',
          ]
        },
        {
          test: /\.hbs$/,
          use: [
            'handlebars-loader'
          ]
        },
        {
          test: /\.s?css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                query: {
                  minimize: IS_PRODUCTION,
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
              {
                loader: 'sass-loader',
              },
              'postcss-loader',
            ]
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
