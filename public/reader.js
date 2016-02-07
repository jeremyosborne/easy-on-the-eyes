/* jshint browser:true */

(function (bootstrap) {

    var Content = function(c) {
        // This was needed when we used markdown... now is it needed?
        return {
            toHTML: function () {
                return c || "";
            },
        };
    };

    // We only have one content object for now.
    var content = Content(bootstrap.content);

    var render = function(content) {
        document.querySelector(".content").innerHTML = content.toHTML();
    };

    // First render.
    render(content);

    // Attempt to read links in this single pane view.
    // We hope whatever links are left are worth reading.
    var linkInterceptor = function(ev) {
        var t = ev.target;
        if (t.tagName.toLowerCase() === "a") {
            ev.preventDefault();
            window.location.href = "/?u=" + encodeURIComponent(t.href);
        }
    };

    document.querySelector("body").addEventListener("click", linkInterceptor);

    var nav = function(content) {
        var navForm;
        if (!content) {
            navForm = document.querySelector(".nav");
            navForm.className = navForm.className.replace(/hide/, "");
            navForm.addEventListener("submit", function (ev) {
                window.location.href = "/?u=" + encodeURIComponent(document.querySelector("#u").value);
                ev.preventDefault();
            });
        }
    };

    nav(content.toHTML());

})(window.bootstrap);
