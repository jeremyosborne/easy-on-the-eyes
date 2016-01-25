var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var htmlToMarkdown = require("html-to-markdown");
var logger = require("winston");
var morgan = require("morgan");

logger.level = "debug";

var app = express();

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(morgan("dev"));

// TODO: Setup proxy that
// * sniffs domain and makes guesses about filter
// * Makes GET request to remote page.
// * Returns the markdown in a minimal JSON object.
// * Return manageable errors and log on server side.
// * TODO Part 2: show in a client
app.get("/api/fetch", function(req, res) {
    var u = req.query.u; // url
    logger.debug("fetching content from:", u);
    if (u) {
        htmlToMarkdown.fetch(u, "wikipedia", function(err, content) {
            res.send(content);
        });
    } else {
        res.status(401).send("Require url querystring parameter.");
    }
});

app.use(express.static(path.join(__dirname, "public")));



if (require.main === module) {
    (function() {
        var http = require('http');
        var port = process.env.PORT || '3000';
        var server = http.createServer(app);
        server.listen(port);
        server.on('error', function(error) {
            if (error.syscall !== 'listen') {
                throw error;
            }

            var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
        server.on('listening', function() {
            var addr = server.address();
            var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            logger.info('Listening on ' + bind);
        });
    })();
}
