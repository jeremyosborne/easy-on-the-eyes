// TODO: Maybe get rid of this or expand it. This was more useful when we
// were doing conversion from markdown to html. It now feels a bit superfluous.
var Content = function (el) {
  return {
    isEmpty: function () {
      return !el.innerHTML.trim()
    }
  }
}

var content = Content(document.querySelector('.content'))

module.exports = content
