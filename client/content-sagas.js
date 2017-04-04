import * as contentAPI from './content-api'
import {FETCH_CONTENT, FETCHED_CONTENT} from './content-actions'
import {put, call, takeEvery} from 'redux-saga/effects'
import {LOCATION_CHANGE} from 'react-router-redux'

// Process of requesting content from server and updating content object on page.
const fetchContent = function * (action) {
  if (action.payload.query.url) {
    const url = action.payload.query.url
    yield put({type: FETCH_CONTENT, url})
    // Get new content based on state of url.
    const content = yield call(contentAPI.fetchContent, {
      url: action.payload.query.url
    })
    // TODO: Differentiate between an actual error and just no content to show.
    yield put({type: FETCHED_CONTENT, content})
  } else {
    // TODO: Better error handling.
    yield put({type: FETCHED_CONTENT, content: {__html: ''}})
  }
}

export const watchLocationForContent = function * () {
  yield takeEvery(LOCATION_CHANGE, fetchContent)
}
