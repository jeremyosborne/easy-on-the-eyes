const axios = require('axios')
const cheerio = require('cheerio')
const logger = require('../logger')
const memoryCache = require('memory-cache')
const moment = require('moment')
// const _ = require('lodash')
const url = require('url')

/**
 * Retrieve and transform web content.
 *
 * Call with a URL.
 *
 * Promise api rejecting with error or resolving with a content object.
 */
module.exports.fetch = () => {
  const sourceUrl = 'https://en.wikipedia.org/wiki/Portal:Current_events'
  const cachedContent = memoryCache.get(sourceUrl)
  if (cachedContent) {
    return Promise.resolve(cachedContent)
  }
  return axios.get(sourceUrl)
    .then(function (response) {
      const $ = cheerio.load(response.data)
      logger.debug('suggestions: cache miss, retrieving suggestions from:', sourceUrl)

      // TODO: add sentiment by pre-reading the links
      const suggestions = {
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
              // We assume the category has no link.
              href: null,
            }
          }).get()

          // ...unordered list siblings of categories are the associated articles
          return $(this).find('tr:nth-child(2) > td > ul').map(function (i) {
            return $(this).find('> li').map(function () {
              const subcategory = $(this).find('> a')
              // Everything in this structure applies to each article we find.
              // Form content by stripping ul and li tags and just leaving a tags and other text
              return $(this).find('> ul > li').map(function () {
                const suggestionContent = $(this)
                return {
                  content: {
                    url: sourceUrl,
                    type: 'text/plain',
                    // Inside each URL, we assume only plain HTML exists, and that
                    // is the content of our suggestions.
                    text: suggestionContent.text().trim(),
                    date: date,
                    tags: [
                      categories[i],
                      {
                        title: subcategory.text().trim(),
                        // Resolve links to wikipedia
                        href: subcategory.attr('href') ? url.resolve(sourceUrl, subcategory.attr('href').trim()) : null,
                      },
                    ].concat(
                        // Links from within the text.
                        suggestionContent.find('a').map(function () {
                          const link = $(this)
                          return {
                            title: link.text().trim(),
                            href: link.attr('href') ? url.resolve(sourceUrl, link.attr('href').trim()) : null,
                          }
                        }).get()
                      ),
                  }
                }
              }).get()
            }).get()
          }).get()
        }).get()
      }
      memoryCache.put(sourceUrl, suggestions, 1000 * 60 * 60 * 5)  // 5 hours
      return suggestions
    }).catch(function (err) {
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
