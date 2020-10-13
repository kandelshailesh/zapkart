// import firebase from 'firebase/app'
import { notification } from 'antd'
// import 'firebase/auth'
// import decode from 'jwt-decode'
import * as constants from '_constants'
import callApi from 'utils/callApi'
import { getFormData } from 'utils'
// import 'firebase/database'
// import 'firebase/storage'

// const firebaseConfig = {
//   apiKey: 'AIzaSyAE5G0RI2LwzwTBizhJbnRKIKbiXQIA1dY',
//   authDomain: 'cleanui-72a42.firebaseapp.com',
//   databaseURL: 'https://cleanui-72a42.firebaseio.com',
//   projectId: 'cleanui-72a42',
//   storageBucket: 'cleanui-72a42.appspot.com',
//   messagingSenderId: '583382839121',
// }

// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const firebaseAuth = firebase.auth
// export default firebaseApp

export async function loginSocial(email, accessToken) {
  console.log('in loginSocial services')
  const loginData = {
    email,
    accessToken,
  }
  const loginResponse = await fetch('/api/users/login_google', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })

  const resJSON = await loginResponse.json()
  console.log(loginResponse)
  console.log(resJSON)
  if (loginResponse.ok) {
    setToken(resJSON.token)
    return true
  }
  return notification.warning({
    message: loginResponse.status,
    description: resJSON.message,
  })
}

export function mockLogin(email, password) {
  console.log(email, password)
  return true
}

export function mockLoadCurrentAct() {
  return {
    email: 'admin@gmail.com',
    userId: '1232',
    role: 'admin',
    phone: '9998989878',
    name: 'Admin',
  }
}

// set user inactive
export async function editUser(values, userId) {
  try {
    const res = await callApi(`${constants.CATALOG_API_URL.editUser}/${userId}`, {
      method: 'PATCH',
      body: getFormData(values),
    })
    if (res) return res
    return null
  } catch (err) {
    console.error(err)
    return null
  }
}

// set user inactive
export async function updateUserPassword(values, userId) {
  try {
    const res = await callApi(`${constants.CATALOG_API_URL.updateUserPassword}/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (res) return res
    return null
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function addUser(values) {
  try {
    const res = await callApi(constants.CATALOG_API_URL.signup, {
      method: 'POST',
      body: getFormData(values),
    })
    if (res) return res
    return null
  } catch (err) {
    notification.error({
      message: 'Error!',
      description: err.message,
    })
    console.error(err)
    return null
  }
}

export async function login1(email, password) {
  console.log('login1')
  const formData = new FormData()
  formData.append('loginId', email)
  formData.append('password', password)

  try {
    const loginResponse = await callApi('/api/backend/v1/users/login', {
      method: 'POST',
      body: formData,
    })
    // if (!loginResponse.ok) {
    //   notification.warning({
    //     message: constants.STRINGS.loginFailed,
    //     description: constants.LOGIN_FAIL_MESSAGE,
    //   })
    //   return null
    // }
    // const resJSON = await loginResponse.json()
    // const resJSON = loginResponse;
    // console.log(resJSON)
    // if (loginResponse.status === 200) {
    if (loginResponse && loginResponse.token) {
      console.log('setting token', loginResponse.token)
      setToken(loginResponse.token)
      return loginResponse
    }
    return null
  } catch (err) {
    console.log(err)
    return notification.warning({
      message: constants.STRINGS.error,
      description: err.message,
    })
  }
}

const setToken = (token) => {
  localStorage.setItem('token', token)
}
const getToken = () => {
  return localStorage.getItem('token')
  // return null
}
const removeToken = () => {
  localStorage.removeItem('token')
}
// const isTokenExpired = token => {
//   console.log(token.exp, Date.now())
//   if (token.exp < Date.now() / 1000) return true
//   return false
// }

// export async function login(email, password) {
//   const loginData = {
//     email: 'sumi@gmail.com',
//     password: '1234',
//   }
//   console.log(JSON.stringify(loginData))
//   try {
//     const a = await fetch('/api/users/login', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     })
//     console.log(typeof a.status)
//     const resJSON = await a.json()
//     console.log(resJSON)
//     // if (a.status === 200) {
//     //   return {
//     //     data: resJSON
//     //   }
//     // }
//     // notification.warning({
//     //   message: a.status,
//     //   description: resJSON.message
//     // })
//   } catch (err) {
//     notification.warning({
//       message: err.code,
//       description: err.message,
//     })
//   }
//   return firebaseAuth()
//     .signInWithEmailAndPassword(email, password)
//     .then(() => true)
//     .catch(error => {
//       notification.warning({
//         message: error.code,
//         description: error.message,
//       })
//     })
// }

export async function deleteUser(userId) {
  try {
    const res = await callApi(`/api/backend/v1/users/${userId}`, {
      method: 'DELETE',
    })
    if (res) return res
    return null
  } catch (err) {
    notification.error({
      message: 'Error deleting!',
      description: err.message,
    })
    return null
  }
}

export async function currentAccountJwt() {
  const token = getToken()
  console.log('dsfg', token)
  if (typeof token !== 'undefined') {
    try {
      const loginResponse = await fetch('/api/backend/v1/users', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      })
      console.log(loginResponse.status)
      if (!loginResponse.ok) {
        notification.warning({
          message: constants.STRINGS.error,
          description: 'Invalid user credentials!',
        })
        return null
      }
      const resJSON = await loginResponse.json()
      console.log(resJSON)
      if (loginResponse.status === 200) {
        return resJSON
      }
      // removeToken(token)
      notification.warning({
        message: constants.SESSION_EXPIRED_MESSAGE,
        description: constants.SESSION_EXPIRED_MESSAGE_DESC,
      })

      return null
    } catch (error) {
      return null
    }
  }
  return null
}

// export async function currentAccount() {
//   let userLoaded = false
//   function getCurrentUser(auth) {
//     return new Promise((resolve, reject) => {
//       if (userLoaded) {
//         resolve(firebaseAuth.currentUser)
//       }
//       const unsubscribe = auth.onAuthStateChanged(user => {
//         userLoaded = true
//         unsubscribe()
//         resolve(user)
//       }, reject)
//     })
//   }
//   return getCurrentUser(firebaseAuth())
// }

// export async function logout() {
//   return firebaseAuth()
//     .signOut()
//     .then(() => true)
// }

export async function logoutJwt() {
  removeToken()
  return true
}
