const axios = require('axios')
const cheerio = require('cheerio')
const moment = require('moment')
// const _ = require('lodash')

/**
 * Retrieve and transform web content.
 *
 * Call with a URL.
 *
 * Promise api rejecting with error or resolving with a content object.
 */
module.exports.fetch = (url) => {
  return axios.get('https://en.wikipedia.org/wiki/Portal:Current_events')
    .then(function (response) {
      const $ = cheerio.load(response.data)

      // TODO: process the links in the suggestions and return them (use url.resolve relative to wikipedia)
      // TODO: add sentiment by pre-reading the links
      return {
        // NOTE: using normal ES .map this would end up being an array of arrays,
        // but it seems that cheerio, should it contain an array of arrays, will flatten
        // the arrays on a call to get, returning one single array of all objects within.
        // Basically the below code works due to this quirk in cheerio.get and we don't end up
        // with a bunch of nested arrays.
        suggestions: $('.vevent').map(function () {
          // within each .vevent, the first tr contains the date subject, which applies
          // to all items.
          let date = $(this).find('tr:nth-child(1) tbody td:nth-child(1) .published').text()
          date = moment.utc(date).format('YYYY-MM-DD')

          // within each .vevent, the second tr contains categories, headlines, and articles.
          // categories are in the definition list...
          const categories = $(this).find('tr:nth-child(2) > td > dl').map(function () {
            return {
              title: $(this).text().trim(),
              href: null,
            }
          }).get()

          // ...unordered list siblings of categories are the associated articles
          return $(this).find('tr:nth-child(2) > td > ul').map(function (i) {
            return $(this).find('> li').map(function () {
              const subcategory = $(this).find('> a')
              // Everything in this structure applies to each article we find.
              const structure = {
                date: date,
                // we rely on structure of HTML in wikipedia page to determine
                // relationship
                category: categories[i],
                subcategory: {
                  title: subcategory.text().trim(),
                  // Resolve links to wikipedia
                  href: subcategory.attr('href').trim()
                }
              }
              // Form content by stripping ul and li tags and just leaving a tags and other text
              return $(this).find('> ul > li').map(function () {
                return Object.assign({
                  //
                  // TODO: Preserve links in the text. They're the suggestions we want to
                  // clicky click
                  //
                  // TODO: The final content generated should be normal content objects, with
                  // additional meta data. There shouldn't be a "suggestion" type, just a subtype
                  // of content
                  //
                  content: $(this).text()
                }, structure)
              }).get()
            }).get()
          }).get()
        }).get()
      }
    })
    .catch(function (err) {
      err = err || {}
      console.error('error fetching suggestions:', err)
      const code = err.response ? err.response.status : 500
      // Network error OR non-okay response.
      var error = {
        error: {
          code: code,
          message: 'Could not retrieve suggestions',
        },
        suggestions: [],
      }
      throw error
    })
}
