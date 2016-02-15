var path = require("path");



module.exports = {
    entry: "./client/index.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: "app.js",
    },
    module: {
        loaders: [
            {
                // We assume that requires done within the client folder should
                // be linted and ng-annotated.
                test: /\.js/,
                loader: "jshint!jscs",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: "style!css",
            },
            {
                // For font and icon requires.
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url?limit=100000",
            }
        ],
    }
};
