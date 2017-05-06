//
// EXPERIMENTAL: Just an excuse to try out selectors. This app is likely not
// complex enough.
//

const createSelector = require('reselect').createSelector

const error = (state) => state.content.error
module.exports.error = error

const isError = createSelector(
  error,
  (error) => !!error.code
)
module.exports.isError = isError

const errorMessage = createSelector(
  isError,
  error,
  (isError, error) => isError ? error.message : ''
)
module.exports.errorMessage = errorMessage

// Can't fetch something that doesn't have a URL.
module.exports.isFetching = (state) => !!(state.content.isFetching && state.content.url)

module.exports.urlBeingFetched = (state) => state.content.isFetching ? state.content.url : ''
