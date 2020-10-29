/* eslint-disable import/prefer-default-export */
import { CATALOG_API_URL, STRINGS } from '_constants'
import { getFormData } from 'utils'
import { notification } from 'antd'
import callApi from 'utils/callApi'

/**
 *
 * @param {string} data.productId
 * @param {number} data.quantity
 * @param {string} orderItemId
 * @returns order data
 */
export async function createShipment(data) {
  try {
    const formData = getFormData(data)
    const options = {
      method: 'POST',
      body: formData,
    }
    const res = await callApi(`${CATALOG_API_URL.createShipment}`, options)
    if (res && res.data)
      notification.success({
        message: STRINGS.addSuccess,
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
export async function editShipment(data, shipmentId) {
  console.log('aaa', data)
  try {
    const formData = getFormData(data)
    const options = {
      method: 'PATCH',
      body: formData,
    }
    const res = await callApi(`${CATALOG_API_URL.shipment}/${shipmentId}`, options)
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
