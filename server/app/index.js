var exphbs = require("express-handlebars");
var express = require("express");
var favicon = require("serve-favicon");
var Handlebars = require("Handlebars");
var logger = require("./logger");
var morgan = require("morgan");
var request = require("request");
var path = require("path");
var url = require("url");
var xform = require("./xform");

// For accessing public, views, and other sibling directories.
var ROOT_PATH = path.resolve(path.join(__dirname, "..", ".."));

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

// Pass along the dev server state.
app.use(function(req, res, next) {
    res.locals.DEV_SERVER = !!process.env.DEV_SERVER;
    next();
});

// Some things get added to the bootstrap to help out the client side JS.
// Declare location of the content.
app.use(function(req, res, next) {
    res.locals.content = "";
    res.locals.bootstrap = {};
    next();
});

// All incoming requests might have a u query string parameter.
// If they do, we will attempt to retrieve the contents at the URL.
app.use(function(req, res, next) {
    var u = req.query.u;
    if (u) {
        var x = xform.bestGuess(u);
        request(u, function(err, reqResponse, body) {
            if (err) {
                logger.error("Could not retrieve content from:", u, "with error:", err);
            } else {
                logger.debug("fetched content from:", u, "using filter:", x.name);
                res.locals.content = x.f(body).trim();

                // Also parse the url and make available.
                var parsedUrl = url.parse(u);
                res.locals.bootstrap.rootUrl = url.format({
                    protocol: parsedUrl.protocol,
                    host: parsedUrl.host,
                });
            }
            next();
        });
    } else {
        next();
    }
});

app.get("/", function (req, res) {
    res.render("reader");
});

app.use(express.static(path.join(ROOT_PATH, "public")));

module.exports = app;
