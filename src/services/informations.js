/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'
import { CATALOG_API_URL } from '_constants'

const INFORMATIONS_URL = CATALOG_API_URL.getInformations
const reqFields = [
  'name',
  'metaTitle',
  'metaDescription',
  'metaKeywords',
  'status',
  'priorityOrder',
  'shortDescription',
  'htmlContent',
]

export async function getInformations() {
  try {
    const res = await callApi(INFORMATIONS_URL)
    if (res.data) return { data: res.data }
  } catch (error) {
    console.log(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
  }
  return null
}

export async function editInformationStatus(id, status) {
  const url = `${INFORMATIONS_URL}/${id}?status=${status}`
  const options = {
    method: 'PATCH',
  }
  try {
    const res = await callApi(url, options)
    if (res.data && res.data.status === status) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function deleteInformation(id) {
  const url = `${INFORMATIONS_URL}/${id}`
  const options = {
    method: 'DELETE',
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

export async function addInformation(values) {
  console.log(values)
  const formData = new FormData()
  Object.entries(values).map(([key, value]) => {
    formData.append(key, value)
    return null
  })
  const url = `${INFORMATIONS_URL}/create`
  const options = {
    method: 'POST',
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    if (res && res.data) return res.data
    return null
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return null
  }
}

export async function editInformation(id, values) {
  console.log(values)
  const url = `${INFORMATIONS_URL}/${id}`
  const formData = new FormData()
  Object.entries(values).map(([key, value]) => {
    console.log(key, value)
    if (reqFields.includes(key)) formData.append(key, value)
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
