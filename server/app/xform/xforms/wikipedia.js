//
// For *wikipedia.org/wiki/* articles
//
var cheerio = require('cheerio')

module.exports = function (html) {
  var $ = cheerio.load(html)

  // Grab the heading to reinsert later.
  var title = $('#firstHeading')

  // Remove everything we don't want in the page.
  // Remove everything we don't want.
  // We select everything to get all potential elements no matter how deeply
  // nested because finding comments is tricky (no explicit selector).
  $.root()
    .find('*')
    .contents()
    .filter(function () {
      var tagsToRemove = {
        noscript: true,
        script: true,
        link: true,
        style: true,
        table: true
      }
      return this && (this.type === 'comment' ||
        (this.tagName && this.tagName.toLowerCase() in tagsToRemove))
    })
    .remove()

  $('#toc, #siteSub, #contentSub, .mw-jump, .hatnote, .thumb.tright, .printfooter, #catlinks').each(function (i, el) {
    $(el).remove()
  })
  $('.mw-editsection, .reference, .noprint.Inline-Template.Template-Fact, .visualClear').each(function (i, el) {
    $(el).remove()
  })
  $('h1, h2, h3, h4, h5, h6, .references > *').each(function (i, el) {
    $(el).html($(el).text())
  })

  // Add the title back in.
  $('#mw-content-text').prepend(title)

  return $('#mw-content-text').html()
}
