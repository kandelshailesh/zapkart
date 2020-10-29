import {
  all, put, call,
  // select
} from 'redux-saga/effects'
import { getLeftMenuData, getTopMenuData } from 'services/menu'
// import { currentAccount } from 'services/user'
// import { getUser } from '../user/reducers'

export function* GET_DATA() {
  // yield call(currentAccount)
  // const user1 = yield select(getUser)
  // console.log(user1)
  const menuLeftData = yield call(getLeftMenuData)
  const menuTopData = yield call(getTopMenuData)
  yield put({
    type: 'menu/SET_STATE',
    payload: {
      menuLeftData,
      menuTopData,
    },
  })
}

export default function* rootSaga() {
  yield all([
    // GET_DATA(), // run once on app load to fetch menu data
  ])
}
