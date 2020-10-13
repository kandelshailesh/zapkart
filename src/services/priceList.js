/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import { CATALOG_API_URL } from '_constants'
import callApi from 'utils/callApi'
import { getFormData } from 'utils'

export async function editStatus(id, { status, approveStatus }) {
  const url = `${CATALOG_API_URL.updateProductPriceByAdmin}/${id}`
  const options = {
    body: JSON.stringify({ status, approveStatus }),
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  }
  try {
    const res = await callApi(url, options)
    if (res.success) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function uploadPrintList(file) {
  try {
    const formData = getFormData({ file })
    const options = {
      body: formData,
      method: 'POST',
    }
    const { success } = await callApi(`${CATALOG_API_URL}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}

export async function addProductPriceByMerchant(values) {
  try {
    const options = {
      body: JSON.stringify(values),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
    const { success } = await callApi(`${CATALOG_API_URL.createPriceByMerchant}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}

export async function updateProductPriceByMerchant({ price, quantity, commission, _id }) {
  try {
    const options = {
      body: JSON.stringify({ price, quantity, commission }),
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    }
    const { success } = await callApi(`${CATALOG_API_URL.updatePriceByMerchant}/${_id}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}

export async function deleteProductPriceByMerchant(_id) {
  try {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    const { success } = await callApi(`${CATALOG_API_URL.deletePriceByMerchant}/${_id}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}

export async function deleteProductPriceByAdmin(id) {
  try {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
    const { success } = await callApi(`${CATALOG_API_URL.deletePriceByadmin}/${id}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}
