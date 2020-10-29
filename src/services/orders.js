import { CATALOG_API_URL, ERROR_TRY_LATER, STRINGS } from '_constants'
import { getFormData } from 'utils'
import { notification } from 'antd'
import callApi from 'utils/callApi'

// const fields = ['status', 'priorityOrder', 'text', 'rating', 'title']

// eslint-disable-next-line import/prefer-default-export
export async function editOrder(data, orderId) {
  try {
    const d = data
    if (data.shippingAddress) d.shippingAddress = JSON.stringify(d.shippingAddress)
    if (data.billingAddress) d.billingAddress = JSON.stringify(d.billingAddress)
    const formData = getFormData(d)
    const options = {
      method: 'PATCH',
      body: formData,
    }
    const res = await callApi(`${CATALOG_API_URL.editOrder}/${orderId}`, options)
    if (res && res.data)
      notification.success({
        message: STRINGS.editSuccess,
      })
    return res
  } catch (error) {
    console.error(error)

    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return { error: error.message }
  }
}

export async function createOrderByAdmin(data) {
  try {
    const formData = getFormData(data)
    const options = {
      method: 'POST',
      body: formData,
    }
    const res = await callApi(`${CATALOG_API_URL.orderbyadmin}`, options)
    if (res && res?.success) {
      notification.success({
        message: STRINGS.Success,
        description: STRINGS.addSuccess,
      })
    }
    return res
  } catch (error) {
    console.error(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return { error: error.message }
  }
}

export async function addPrecriptionByAdmin(data, userID) {
  try {
    const formData = getFormData(data)
    const options = {
      method: 'PATCH',
      body: formData,
    }
    const res = await callApi(`${CATALOG_API_URL.prescriptionbyadmin}/${userID}`, options)
    if (res && res?.success) {
      notification.success({
        message: STRINGS.success,
        description: STRINGS.addSuccess,
      })
    }
    return res
  } catch (error) {
    console.error(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return { error: error.message }
  }
}

export default async function getPrescriptionByAdmin(userID) {
  const url = `${CATALOG_API_URL.getprescriptionbyadmin}?userId=${userID}`
  try {
    const res = await callApi(url)
    // const { products } = res
    const { success } = res
    if (success) return res
  } catch (error) {
    console.error(error)
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export async function editOrderItem(data, orderItemId) {
  try {
    const formData = getFormData(data)
    const options = {
      method: 'PATCH',
      body: formData,
    }
    const res = await callApi(`${CATALOG_API_URL.editOrderItem}/${orderItemId}`, options)
    if (res && res.data)
      notification.success({
        message: STRINGS.editSuccess,
      })
    return res
  } catch (error) {
    console.error(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return { error: error.message }
  }
}

// orderItemId, merchantId
export async function assignOItemMerchant(data) {
  try {
    const formData = getFormData(data)
    const options = {
      method: 'POST',
      body: formData,
    }
    const res = await callApi(`${CATALOG_API_URL.assignOrderItem}`, options)
    if (res && res.success)
      notification.success({
        message: STRINGS.editSuccess,
      })
    return res
  } catch (error) {
    console.error(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return { error: error.message }
  }
}

// orderItemId
export async function deleteOItemMerchant(data) {
  try {
    const formData = getFormData(data)
    const options = {
      method: 'DELETE',
      body: formData,
    }
    const res = await callApi(`${CATALOG_API_URL.assignOrderItem}`, options)
    if (res && res.success)
      notification.success({
        message: STRINGS.editSuccess,
      })
    return res
  } catch (error) {
    console.error(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return { error: error.message }
  }
}

/**
 *
 * @param {string} data.productId
 * @param {number} data.quantity
 * @param {string} orderItemId
 * @returns order data
 */
export async function addOrderItem(data, masterOrderId) {
  try {
    const formData = getFormData(data)
    const options = {
      method: 'POST',
      body: formData,
    }
    const res = await callApi(
      `${CATALOG_API_URL.editOrder}/${masterOrderId}/add-order-item`,
      options,
    )
    if (res && res.data)
      notification.success({
        message: STRINGS.editSuccess,
      })
    return res
  } catch (error) {
    console.error(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return { error: error.message }
  }
}
