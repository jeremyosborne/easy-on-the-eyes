var app = require("./app");
var http = require("http");
var logger = require("./app/logger");
var path = require("path");
var reload = require("reload");
var webpack = require("webpack");



// Setup server.
var port = process.env.PORT || "3000";
var server = http.createServer(app);
server.on("error", function(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES": {
            logger.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        }
        case "EADDRINUSE": {
            logger.error(bind + " is already in use");
            process.exit(1);
            break;
        }
        default: {
            throw error;
        }
    }
});
server.on("listening", function() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    logger.info("Listening on " + bind);
});



if (process.env.DEV_SERVER) {
    logger.info("Developer server serving.");

    // Build assets then start server.
    //
    // Add an intercept for asset requests that allows building on the fly and
    // reloading the browser page on changed files.
    // Step 1: Create & configure a webpack compiler
    var webpackConfig = require(path.resolve(__dirname, "../.webpack.config"));
    webpack(webpackConfig, function(err, status) {
        if (err) {
            logger.error("Webpack asset build had a problem:", err);
        } else {
            // Assets built, run the server.
            logger.info("Webpack assets built.");

            // Browser reload, see:
            // see: https://www.npmjs.com/package/reload
            // Was not able to get this working without an explicit delay and `wait`.
            reload(server, app, 300, true);

            server.listen(port);
        }
    });
} else {
    server.listen(port);
}
