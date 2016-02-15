var dataBootstrap = require("./databootstrap");

// TODO: Maybe get rid of this or expand it. This was more useful when we
// were doing conversion from markdown to html. It now feels a bit superfluous.
var Content = function(c) {
    c = c ? c.trim() : "";
    return {
        isEmpty: function() {
            return !c;
        },
        toHTML: function () {
            return c;
        },
    };
};

var content = Content(dataBootstrap.get("content"));
module.exports = content;



// So light weight, just keep the view code here.
var render = function(content) {
    document.querySelector(".content").innerHTML = content.toHTML();
};

// First render.
render(content);
