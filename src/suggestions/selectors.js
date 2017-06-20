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
export const loading = (state) => !!state[REDUCER_KEY].loading
export const list = (state) => state[REDUCER_KEY].suggestions

export const selector = createStructuredSelector({
  error,
  isError,
  errorMessage,

  loading,

  list,
})
export default selector
