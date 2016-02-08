//
// Normal transform, assumed to be useful for any website.
//
var cheerio = require("cheerio");

module.exports = function(html) {
    var $ = cheerio.load(html);

    // Remove everything we don't want.
    // We select everything to get all potential elements no matter how deeply
    // nested because finding comments is tricky (no explicit selector).
    $.root()
        .find("*")
        .contents()
        .filter(function() {
            var tagsToRemove = {
                noscript: true,
                script: true,
                link: true,
                style: true,
            };
            return this && (this.type === "comment" ||
                (this.tagName && this.tagName.toLowerCase() in tagsToRemove));
        })
        .remove();

    // Return the assumed visible content.
    return $("body").html();
};
