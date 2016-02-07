var cheerio = require("cheerio");

module.exports = function(html) {
    // Grab the heading to reinsert later.
    var title = cheerio.load(html)("#firstHeading");

    // Clean the content of wikipedia stuff.
    var $ = cheerio.load(cheerio.load(html)("#mw-content-text").html());

    // Remove comments.
    $.root().contents().each(function() {
        if (this.type === "comment") {
            $(this).remove();
        }
    });

    // Get rid if internal wiki links.
    $("a").each(function() {
        if ($(this).attr("href").indexOf("/") === 0) {
            $(this).replaceWith($(this).html());
        }
    });

    $("script").each(function(i, el) {
        $(el).remove();
    });
    $("noscript").each(function(i, el) {
        $(el).remove();
    });
    $("table").each(function(i, el) {
        $(el).remove();
    });
    $("#toc").each(function(i, el) {
        $(el).remove();
    });
    $("#siteSub, #contentSub, .mw-jump, .hatnote, .thumb.tright, .printfooter, #catlinks, .visualClear")
        .each(function(i, el) {
            $(el).remove();
        });
    $(".mw-editsection").each(function(i, el) {
        $(el).remove();
    });
    $(".reference").each(function(i, el) {
        $(el).remove();
    });
    $(".noprint.Inline-Template.Template-Fact").each(function(i, el) {
        $(el).remove();
    });
    $("h1,h2,h3,h4,h5,h6").each(function(i, el) {
        $(el).html($(el).text());
    });
    $(".references > *").each(function(i, el) {
        $(el).html($(el).text());
    });

    // Unwrap silly columns.
    $(".columns").each(function() {
        $(this).replaceWith($(this).html());
    });

    // Add the title back in.
    $.root().prepend(title);

    return $.html();
};
