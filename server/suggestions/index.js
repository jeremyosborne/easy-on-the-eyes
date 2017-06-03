const axios = require('axios')
const cheerio = require('cheerio')

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
      // TODO: process the links in the suggestions and return them.
      // TODO: Tag them in some way?
      // TODO: make use of lodash to zip them
      return {
        suggestions: $('.vevent').map(function () {
          // within each .vevent, the first tr contains the date subject.
          // TODO: Make use of moment.
          const date = $(this).find('tr:nth-child(1) tbody td:nth-child(1)').text()
          // within each .vevent, the second tr contains categories, headlines, and articles.
          // categories are in the definition list...
          const categories = $(this).find('tr:nth-child(2) dl').map(function () {
            return {
              title: $(this).text().trim(),
              href: null,
            }
          }).get()
          // ...unordered list siblings of categories are the articles associated
          // with that category.
          const subCategories = $(this).find('tr:nth-child(2) > td > ul > li > a').map(function () {
            return {
              title: $(this).text().trim(),
              // Resolve links to wikipedia
              href: $(this).attr('href').trim(),
            }
          }).get()
          return {
            date: date,
            categories: categories,
            subCategories: subCategories,
            // unprocessed: $(this).html(),
          }
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
