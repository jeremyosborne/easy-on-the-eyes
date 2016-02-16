var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: [
        "./client/index.js",
    ],
    output: {
        path: path.resolve(path.join(__dirname, "public")),
        publicPath: "/",
        filename: "app.js",
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "jscs!jshint",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: "stylelint"
            },
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
            },
            {
                // For font and icon requires.
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url?limit=100000",
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin("app.css"),
    ],
    stylelint: {
        configFile: path.join(__dirname, "./.stylelintrc"),
    },
};
