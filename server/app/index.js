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



// TODO: Make this configurable with a `hot-reload` env switch, or something
// like that.
//
// Add an intercept for asset requests that allows building on the fly and
// reloading the browser page on changed files.
(function() {
    // Step 1: Create & configure a webpack compiler
    var webpack = require("webpack");
    var webpackConfig = require(process.env.WEBPACK_CONFIG ?
            process.env.WEBPACK_CONFIG : path.resolve(ROOT_PATH, "webpack.config"));

    // Modify the default config with dev only things we need for hot rebuid and reload.
    webpackConfig.entry.push("webpack/hot/dev-server");
    webpackConfig.entry.push("webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true");
    webpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    webpackConfig.plugins.push(new webpack.NoErrorsPlugin());

    var compiler = webpack(webpackConfig);

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler, {
        // log: console.log,
        // path: "/__webpack_hmr",
        // heartbeat: 10 * 1000
    }));
})();



// HTML page content ends up on the bootstrap.
app.use(function(req, res, next) {
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
                res.locals.bootstrap.content = x.f(body);

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

// TODO: Setup proxy that
// * sniffs domain and makes guesses about filter
// * Makes GET request to remote page.
// * Returns the markdown in a minimal JSON object.
// * Return manageable errors and log on server side.
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
    res.render("reader");
});

app.use(express.static(path.join(ROOT_PATH, "public")));

module.exports = app;
