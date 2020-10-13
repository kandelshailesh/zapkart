// import { notification } from 'antd'
import callApi from 'utils/callApi'

/* eslint-disable import/prefer-default-export */
export async function updateMerchant(url, data, method = 'PATCH') {
  try {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image') {
        value.forEach((i) => {
          if (i.originFileObj) {
            formData.append('image', i.originFileObj)
          }
        })
      } else if (key === 'deletedImage') {
        value.forEach((i) => {
          formData.append('deletedImage[]', i)
        })
      } else {
        formData.append(key, value)
      }
    })

    const options = {
      method,
      body: formData,
    }
    const res = await callApi(url, options)
    if (res?.success) return res
    if (res?.error) throw new Error(res.error)
  } catch (error) {
    // notification.error({
    //   message: 'Error updating',
    //   description: error.message,
    // })
    return { error: error.message }
  }
  return null
}
