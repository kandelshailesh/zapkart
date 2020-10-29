/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import { ERROR_TRY_LATER } from '_constants'
import callApi from 'utils/callApi'

// const requiredFields = [
//   'name',
//   'status',
//   'regnumber',
//   'firstName',
//   'lastName',
//   'email'
// ]

export async function getProducts() {
  const url = '/mongodb/v1/products'
  try {
    const res = await callApi(url)
    const { products } = res
    console.log(res)
    if (products) return products
    notification.error({
      error: 'No products',
    })
  } catch (error) {
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export async function addMerchant(values) {
  const url = '/api/backend/v1/merchant/create'
  console.log('44433', values)
  const formData = new FormData()
  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const options = {
    method: 'POST',
    body: formData,
  }

  try {
    const res = await callApi(url, options)
    const { data } = res
    console.log(res)
    if (data) return data
  } catch (error) {
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export async function editMerchant(values, id) {
  const url = `/api/backend/v1/updatemerchant/${id}`
  const formData = new FormData()

  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const options = {
    method: 'PATCH',
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    // const { data } = res
    console.log(res)
    if (res && res.success) return true
    // if (data) return data
  } catch (error) {
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export async function getMerchants() {
  const url = `/api/backend/v1/merchant`
  try {
    const res = await callApi(url)
    return res
  } catch (error) {
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}
