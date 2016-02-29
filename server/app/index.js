var express = require("express");
var favicon = require("serve-favicon");
var logger = require("./logger");
var morgan = require("morgan");
var request = require("request");
var path = require("path");
var xform = require("./xform");

// For accessing public, views, and other sibling directories.
var ROOT_PATH = path.resolve(path.join(__dirname, "..", ".."));

var app = express();

app.set("views", path.join(ROOT_PATH, "views"));
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

app.use(favicon(path.join(ROOT_PATH, "public", "favicon.ico")));
app.use(morgan("dev"));

// Pass along the dev server state.
app.use(function(req, res, next) {
    res.locals.DEV_SERVER = !!process.env.DEV_SERVER;
    next();
});

// Content of the article/page to load, if it exists.
app.use(function(req, res, next) {
    res.locals.content = {__html: ""};
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
                res.locals.content = {__html: x.f(body).trim()};
            }
            next();
        });
    } else {
        next();
    }
});

app.get("/", function(req, res) {
    res.render("reader");
});

app.use(express.static(path.join(ROOT_PATH, "public")));

module.exports = app;
