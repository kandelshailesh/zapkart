import { all, takeEvery, put, call, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import {
  loginSocial,
  logoutJwt,
  // mockLoadCurrentAct,
  // mockLogin,
  login1,
  currentAccountJwt,
  // , currentAccount, login, logout,
} from 'services/user'
import { getLeftMenuDataSeller, getLeftMenuData, getTopMenuData } from 'services/menu'
import * as constants from '_constants'
import actions from './actions'

export function* LOGIN({ payload }) {
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(login1, email, password)

  if (success) {
    notification.success({
      message: constants.LOGIN_SUCCESS,
      description: constants.LOGIN_SUCCESS_MESSAGE,
    })
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
      payload: {
        user: success,
      },
    })
  }
}

export function* LOGIN_SOCIAL({ payload }) {
  console.log('in social login ')
  console.log(payload)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const {
    name,
    email,
    imageUrl: avatar,

    accessToken,
  } = payload
  const response = yield call(loginSocial, email, accessToken)

  if (response) {
    console.log(response)
    notification.success({
      message: constants.LOGIN_SUCCESS,
      description: constants.LOGIN_SUCCESS_MESSAGE,
    })
    const { userId: id, role, phone } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        email,
        role,
        name,
        phone,
        avatar,
        authorized: true,
      },
    })
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
  }
}

export function* GET_MENU_DATA(role) {
  let menuLeftData
  if (role === 'admin') {
    menuLeftData = yield call(getLeftMenuData)
  } else {
    menuLeftData = yield call(getLeftMenuDataSeller)
  }

  const menuTopData = yield call(getTopMenuData)
  yield put({
    type: 'menu/SET_STATE',
    payload: {
      menuLeftData,
      menuTopData,
    },
  })
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const data = yield call(currentAccountJwt)
  if (data) {
    const { user } = data
    yield put({
      type: actions.SET_STATE,
      payload: {
        ...user,
        loading: false,
        token: data.token,
        id: user.id,
        email: user.email,
        role: user.user_type.name,
        name: user.name,
        phone: user.phone,
        authorized: true,
      },
    })
    yield GET_MENU_DATA(user.user_type.name)
  } else {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        authorized: false,
      },
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield call(logoutJwt)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.LOGIN, LOGIN),
    takeEvery(actions.LOGIN_SOCIAL, LOGIN_SOCIAL),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(),
  ])
}
