import * as contentAPI from './content-api'
import {FETCH_CONTENT, FETCHED_CONTENT, UPDATE_CONTENT} from './content-actions'
import {put, call, takeEvery} from 'redux-saga/effects'

// Process of requesting content from server and updating content object on page.
const fetchContent = function* (action) {
  // TODO: Differentiate between an actual error on the content grab and just no
  // content to show.
  const content = yield call(contentAPI.fetchContent, action)
  yield put({type: FETCHED_CONTENT})
  yield put({type: UPDATE_CONTENT, content})
}

export const watchFetchContent = function* () {
  yield takeEvery(FETCH_CONTENT, fetchContent)
}
