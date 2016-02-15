var content = require("./content");
var dataBootstrap = require("./databootstrap");
var url = require("url");

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
        var targetHref = t.getAttribute("href");
        var baseHref = dataBootstrap.get("rootUrl");
        if (targetHref) {
            // In this case, good luck to you.
            window.location.href = "/?u=" + encodeURIComponent(url.resolve(baseHref, targetHref));

            ev.preventDefault();
        }
    }
};

document.querySelector("body").addEventListener("click", linkInterceptor);
