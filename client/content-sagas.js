import * as contentAPI from './content-api'
import {FETCH_CONTENT, UPDATE_CONTENT} from './content-actions'
import {put, call, takeEvery} from 'redux-saga/effects'

const fetchContent = function* (action) {
  const content = yield call(contentAPI.fetchContent, action)
  yield put({type: UPDATE_CONTENT, content})
}

export const watchFetchContent = function* () {
  yield takeEvery(FETCH_CONTENT, fetchContent)
}
