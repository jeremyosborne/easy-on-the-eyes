var content = require('./content')
var url = require('url')

// Nav form if initial content is empty / no initial content requested.
var nav = function (content) {
  var navForm
  if (content.isEmpty()) {
    navForm = document.querySelector('.nav')
    navForm.className = navForm.className.replace(/hide/, '')
    navForm.addEventListener('submit', function (ev) {
      window.location.href = '/?u=' + encodeURIComponent(document.querySelector('#u').value)
      ev.preventDefault()
    })
  }
}

nav(content)

// Easy on the eyes acts as a proxy. The page equivalent is stored in the
// `?u=<page>` param.
var contentUrl = url.parse(window.location.href, true).query.u || ''
if (contentUrl) {
  try {
    contentUrl = decodeURIComponent(contentUrl)
  } catch (err) {
    contentUrl = ''
  }
}

// Attempt to read links in this single pane view.
// We hope whatever links are left are worth reading.
var linkInterceptor = function (ev) {
  var t = ev.target
  if (t.tagName.toLowerCase() === 'a') {
    var targetHref = t.getAttribute('href')
    if (targetHref) {
      // Using the `url.resolve` logic should allow links to
      // be resolved correctly against the content url, whether relative or
      // absolute.
      window.location.href = '/?u=' + encodeURIComponent(url.resolve(contentUrl, targetHref))
      ev.preventDefault()
    }
  }
}

document.querySelector('body').addEventListener('click', linkInterceptor)
