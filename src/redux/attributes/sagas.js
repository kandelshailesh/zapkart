import { all, takeEvery, put, call } from 'redux-saga/effects'
// import { notification } from 'antd'
// import { login, login1, loginSocial, logoutJwt, currentAccount, currentAccountJwt, logout } from 'services/user'
import { getAttributeGroups } from 'services/attributes'
import actions from './actions'
// import * as constants from '../../constants'

export function* FETCH_ATTRIBUTES() {
  yield put({
    type: 'attribute/SET_STATE',
    payload: {
      isFetching: true,
    }
  });
  const attributeGroups = yield call(getAttributeGroups);
  console.log(attributeGroups)
  yield put({
    type: actions.SET_STATE,
    payload: {
      data: attributeGroups
    }
  })

}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.FETCH_ATTRIBUTES, FETCH_ATTRIBUTES),
  ])
}
