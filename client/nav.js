var content = require("./content");
var dataBootstrap = require("./databootstrap");

// Nav form if initial content is empty / no initial content requested.
var nav = function(content) {
    var navForm;
    if (content.isEmpty()) {
        navForm = document.querySelector(".nav");
        navForm.className = navForm.className.replace(/hide/, "");
        navForm.addEventListener("submit", function (ev) {
            window.location.href = "/?u=" + encodeURIComponent(document.querySelector("#u").value);
            ev.preventDefault();
        });
    }
};

nav(content);



// Attempt to read links in this single pane view.
// We hope whatever links are left are worth reading.
var linkInterceptor = function(ev) {
    var t = ev.target;
    if (t.tagName.toLowerCase() === "a") {
        var href = t.getAttribute("href");

        // TODO: Will need a real URL parser, but for now, treat this is our
        // one usecase.
        if (href[0] === "/" && href[1] !== "/") {
            window.location.href = "/?u=" + encodeURIComponent(dataBootstrap.get("rootUrl")) + encodeURIComponent(href);
        } else {
            // In this case, good luck to you.
            window.location.href = "/?u=" + encodeURIComponent(href);
        }

        ev.preventDefault();
    }
};

document.querySelector("body").addEventListener("click", linkInterceptor);
