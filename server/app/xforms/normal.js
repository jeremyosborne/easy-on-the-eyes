var cheerio = require("cheerio");

// Baseline for reading websites, what we assume pages we don't sniff out will
// go through.
module.exports = function(html) {
    var $ = cheerio.load(html);

    // Remove everything we don't want.
    $.root().find("noscript,script,link,style").remove();

    $.root()
        .find("*")
        .contents()
        .filter(function() {
            return this.type === "comment";
        })
        .remove();


    return $("body").html();
};
