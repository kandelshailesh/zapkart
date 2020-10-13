/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'
import { USERGROUP_API_URL, USER_API_URL } from '_constants'

const USERGROUP_URL = USERGROUP_API_URL.getUserGroup
const USER_API = USER_API_URL.getUserPerPage

export async function getuserGroup(role) {
  try {
    const res = await callApi(`${USERGROUP_URL}/list/${role}`)
    if (res.data) return res.data
  } catch (error) {
    console.log(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
  }
  return null
}

export async function getparticularuserGroup(id) {
  try {
    const res = await callApi(`${USERGROUP_URL}/${id}`)
    if (res.data) return res.data
  } catch (error) {
    console.log(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
  }
  return null
}

export async function adduserGroup(values, role) {
  const url = `${USERGROUP_URL}/create/${role}`
  const formData = new FormData()
  console.log('value', values)
  Object.entries(values).map(([key, value]) => {
    formData.append(key, value)
    return ''
  })

  const options = {
    method: 'POST',
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    if (res && res.success) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function edituserGroup(id, values) {
  const url = `${USERGROUP_URL}/updateuserGroup/${id}`
  const formData = new FormData()
  console.log('value', values)
  Object.entries(values).map(([key, value]) => {
    formData.append(key, value)
    return ''
  })

  const options = {
    method: 'PATCH',
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    if (res && res.success) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function getActiveUserPagination(limit, page) {
  try {
    const res = await callApi(`${USER_API}/${limit}/${page}`)
    if (res.data) return res.data
  } catch (error) {
    console.log(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
  }
  return null
}
