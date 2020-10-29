/* eslint-disable import/prefer-default-export */
import callApi from 'utils/callApi'
import { notification } from 'antd'
import { API_CUSTOM_ATTRIBUTES } from '_constants'

export async function getCustomAttributes() {
  const url = API_CUSTOM_ATTRIBUTES.list
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const response = await callApi(url, options)
    console.log('response', response)
    if (response && response.data) return { data: response.data, count: response.count }
  } catch (error) {
    console.log('hi', error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    console.error(error)
  }
  return null
}
