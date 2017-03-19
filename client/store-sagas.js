//
// Integration point for redux sagas.
//
import { watchLocationForContent } from './content-sagas'
import createSagaMiddleware from 'redux-saga'

export const rootSaga = function * () {
  yield [
    watchLocationForContent()
  ]
}

export const sagaMiddleware = createSagaMiddleware()
