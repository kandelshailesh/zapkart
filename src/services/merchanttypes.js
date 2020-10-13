/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'

const MERCHANTTYPE_URL = '/api/backend/v1'

export async function getmerchanttype() {
  try {
    const res = await callApi(`${MERCHANTTYPE_URL}/merchanttype`)
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

export async function editMerchantType(id, values) {
  const url = `${MERCHANTTYPE_URL}/updatemerchanttype/${id}`
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
