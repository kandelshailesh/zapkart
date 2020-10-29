/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'
import { COUPEN_API_URL, COUPENSECTION_API_URL } from '_constants'

const INFORMATIONS_URL = COUPEN_API_URL.getCoupens
const INFORMATIONS_COUPENSECTION_URL = COUPENSECTION_API_URL.getCoupensection
const INFORMATIONSPATCH_URL = COUPEN_API_URL.updateCoupens

export async function getCoupenSection() {
  try {
    const res = await callApi(`${INFORMATIONS_COUPENSECTION_URL}`)
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

export async function editBannersStatus(id, status) {
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

export async function deleteCoupen(id) {
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

export async function addCoupens(values) {
  const formData = new FormData()
  Object.entries(values).map(([key, data]) => {
    if (key === 'userData') formData.append(key, JSON.stringify(data))
    else if (key === 'validFrom' || key === 'validTo')
      formData.append(key, new Date(data).toISOString().slice(0, 10))
    else formData.append(key, data)
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

export async function editCoupens(id, values, origData) {
  console.log('ttttttttttttt', origData)
  const url = `${INFORMATIONSPATCH_URL}/${id}`
  const formData = new FormData()
  Object.entries(values).forEach(([key, data]) => {
    if (key === 'userData' || key === 'coupen_user_mappings')
      formData.append(key, JSON.stringify(data))
    else if (key === 'validFrom' || key === 'validTo')
      formData.append(key, new Date(data).toISOString().slice(0, 10))
    else if (data === '' || data === 'null') formData.append(key, null)
    else formData.append(key, data)
    // return null;
  })
  const options = {
    method: 'PATCH',
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    console.log('resss', res)
    if (res && res.message) return res.message
    return null
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return null
  }
}
