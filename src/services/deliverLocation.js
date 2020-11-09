/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'
// import { BANNER_API_URL } from '_constants'

// const INFORMATIONS_URL = BANNER_API_URL.getBanners

export async function getDeliveryLocation() {
  console.log('In*****')
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await callApi('/api/catalog/v1/availabilitypincode', options)
    console.log('response get', res)
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

export async function getAdminDeliveryLocation(merchantId) {
  console.log('In*****',merchantId)
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await callApi(`/api/catalog/v1/availabilitypincode/?merchantId=${merchantId}`, options)
    console.log('response get', res)
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

export async function editDeliveryLocationStatus(id, status) {
  console.log('edit', id)
  const url = `/api/catalog/v1/availabilitypincode/${id}?status=${status}`
  const options = {
    method: 'PATCH',
  }
  try {
    const res = await callApi(url, options)
    if (res.data && res.data.status === status) {
      notification.success({
        message: 'Success!',
        description: 'Status updated successfully',
      })
      return true
    }
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function deleteDeliveryLocation(id) {
  console.log('delete', id)
  const url = `/api/catalog/v1/availabilitypincode/${id}`
  const options = {
    method: 'DELETE',
  }
  try {
    const res = await callApi(url, options)
    console.log('res', res)
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

export async function addDeliveryLocation(values) {
  console.log('values add', values)
  //   const formData = new FormData()

  //   Object.entries(values).map(([key, value]) => {
  //     formData.append(key, value)
  //     return null
  //   })
  const url = `/api/catalog/v1/availabilitypincode`
  const options = {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await callApi(url, options)
    console.log('response', res)
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

export async function editDeliveryLocation(id, values) {
  console.log('ttttttttttttt', values)
  const url = `/api/catalog/v1/availabilitypincode/${id}`
  // const formData = new FormData()
  // const formImgs = values.images.map(i => {
  //   console.log('rrrrr', i)
  //   if (i.originFileObj) formData.append('image', i.originFileObj)
  //   return i.uid
  // })

  // delete values.images
  // console.log('formImgs', formImgs)

  // const delImgs = origData.images.filter(i => !formImgs.includes(i._id))
  // delImgs.forEach(i => {
  //   formData.append('deletedImages[]', i._id)
  // })
  // Object.entries(values).map(([key, value]) => {
  //   console.log(key, value)
  //   formData.append(key, value)
  //   return ''
  // })
  // console.log('formData', formData)
  const options = {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await callApi(url, options)
    console.log('Editresponse', res)
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
