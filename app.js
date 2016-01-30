var exphbs = require('express-handlebars');
var express = require("express");
var favicon = require("serve-favicon");
var Handlebars = require("Handlebars");
var htmlToMarkdown = require("html-to-markdown");
var logger = require("winston");
var morgan = require("morgan");
var path = require("path");


logger.level = "debug";

var app = express();

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: false,
    helpers: {
        toJSON: function(object){
        	return new Handlebars.SafeString(JSON.stringify(object));
        }
    }
}));
app.set("view engine", ".hbs");

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
    if (u) {
        htmlToMarkdown.fetch(u, "wikipedia", function(err, content) {
            if (err || !content) {
                logger.error("Could not retrieve content from:", u, "with error:", err);
                res.send(404).send({
                    error: "Could not retrieve content."
                });
            } else {
                logger.debug("fetched content from:", u);
                res.send({
                    content: content
                });
            }
        });
    } else {
        res.status(401).send({
            error: "'u'rl querystring parameter required."
        });
    }
});

app.get("/", function(req, res) {
    var u = req.query.u;
    // Make an attempt to get the requested content.
    if (u) {
        htmlToMarkdown.fetch(u, "wikipedia", function(err, content) {
            // Send no matter what, but log output. The client should
            // handle presence or lack of content and not care about
            // the URL.
            if (err) {
                logger.error("Could not retrieve content from:", u, "with error:", err);
            } else {
                logger.debug("fetched content from:", u);
            }
            res.render("reader", {
                bootstrap: {
                    content: content
                }
            });
        });
    } else {
        res.render("reader", {
            bootstrap: {
                content: ""
            }
        });
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
