var app = require("./app");
var http = require("http");
var logger = require("./app/logger");


// Config
var port = process.env.PORT || "3000";



var server = http.createServer(app);
server.listen(port);
server.on("error", function (error) {
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

server.on("listening", function () {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    logger.info("Listening on " + bind);
});
