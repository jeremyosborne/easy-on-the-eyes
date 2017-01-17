import * as contentAPI from './content-api'
import { FETCHED_CONTENT, UPDATE_CONTENT } from './content-actions'
import { put, call, takeEvery } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

// Process of requesting content from server and updating content object on page.
const fetchContent = function* (action) {
  // TODO: Avoid page load content fetching and content that is the same.
  console.log('TODO: Fetch some content please! Action:', action)
  // TODO: Parse the location change and determine if we need to get new content.
  const content = yield call(contentAPI.fetchContent, {
    url: action.payload.query.url
  })
  // TODO: Differentiate between an actual error on the content grab and just no
  // content to show.
  yield put({type: FETCHED_CONTENT})
  yield put({type: UPDATE_CONTENT, content})
}

export const watchLocationForContent = function* () {
  yield takeEvery(LOCATION_CHANGE, fetchContent)
}
