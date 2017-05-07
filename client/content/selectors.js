import {createSelector, createStructuredSelector} from 'reselect'
import {REDUCER_KEY} from './constants'

export const error = (state) => state[REDUCER_KEY].error
export const isError = createSelector(
  error,
  (error) => !!error.code
)
export const errorMessage = createSelector(
  isError,
  error,
  (isError, error) => isError ? error.message : ''
)
export const content = (state) => state[REDUCER_KEY].content
export const text = createSelector(
  content,
  (content) => content.text
)
export const transformer = createSelector(
  content,
  (content) => content.transformer
)
export const url = createSelector(
  content,
  (content) => content.url
)

export const selector = createStructuredSelector({
  error,
  isError,
  errorMessage,

  content,
  text,
  transformer,
  url,
})
export default selector
