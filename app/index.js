var exphbs = require("express-handlebars");
var express = require("express");
var favicon = require("serve-favicon");
var Handlebars = require("Handlebars");
var htmlToMarkdown = require("html-to-markdown");
var logger = require("./logger");
var morgan = require("morgan");
var path = require("path");

// For accessing public, views, and other sibling directories.
var ROOT_PATH = path.resolve(path.join(__dirname, ".."));

var app = express();

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: false,
    helpers: {
        toJSON: function (object) {
            return new Handlebars.SafeString(JSON.stringify(object));
        },
    },
}));
app.set("view engine", ".hbs");
app.set("views", path.join(ROOT_PATH, "views"));

app.use(favicon(path.join(ROOT_PATH, "public", "favicon.ico")));
app.use(morgan("dev"));

// TODO: Setup proxy that
// * sniffs domain and makes guesses about filter
// * Makes GET request to remote page.
// * Returns the markdown in a minimal JSON object.
// * Return manageable errors and log on server side.
// * TODO Part 2: show in a client
// app.get("/api/fetch", function(req, res) {
//     var u = req.query.u; // url
//     if (u) {
//         htmlToMarkdown.fetch(u, "wikipedia", function(err, content) {
//             if (err || !content) {
//                 logger.error("Could not retrieve content from:", u, "with error:", err);
//                 res.send(404).send({
//                     error: "Could not retrieve content."
//                 });
//             } else {
//                 logger.debug("fetched content from:", u);
//                 res.send({
//                     content: content
//                 });
//             }
//         });
//     } else {
//         res.status(401).send({
//             error: "'u'rl querystring parameter required."
//         });
//     }
// });

app.get("/", function (req, res) {
    var u = req.query.u;

    // This is going to get nasty really quick, but for now...
    var filterGuesser = function (u) {
        if (/\.wikipedia\./.test(u)) {
            return "wikipedia";
        } else {
            return "normal";
        }
    };

    if (u) {
        var filter = filterGuesser(u);
        htmlToMarkdown.fetch(u, filter, function (err, content) {
            // Send no matter what, but log output. The client should
            // handle presence or lack of content and not care about
            // the URL.
            if (err) {
                logger.error("Could not retrieve content from:", u, "with error:", err);
            } else {
                logger.debug("fetched content from:", u, "using filter:", filter);
            }

            res.render("reader", {
                bootstrap: {
                    content: content,
                },
            });
        });
    } else {
        res.render("reader", {
            bootstrap: {
                content: "",
            },
        });
    }
});

app.use(express.static(path.join(ROOT_PATH, "public")));

module.exports = app;
