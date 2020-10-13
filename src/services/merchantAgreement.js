/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import { ERROR_TRY_LATER } from '_constants'
import callApi from 'utils/callApi'

export async function deleteMerchantAgreement(values) {
  const url = `/api/backend/v1/aggrement/merchant`
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
