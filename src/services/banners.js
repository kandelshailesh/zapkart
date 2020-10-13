/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'
import { BANNER_API_URL } from '_constants'

const INFORMATIONS_URL = BANNER_API_URL.getBanners

export async function getBanners() {
  try {
    const res = await callApi(INFORMATIONS_URL)
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

export async function deleteBanner(id) {
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

export async function addBanner(values) {
  console.log(values)
  const formData = new FormData()
  const { images } = values
  formData.append('image', images[0])
  Object.entries(values).map(([key, value]) => {
    formData.append(key, value)
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

export async function editBanner(id, values, origData) {
  console.log('ttttttttttttt', values)
  const url = `${INFORMATIONS_URL}/${id}`
  const formData = new FormData()
  const formImgs = values.images.map(i => {
    console.log('rrrrr', i)
    if (i.originFileObj) formData.append('image', i.originFileObj)
    return i.uid
  })

  delete values.images
  console.log('formImgs', formImgs)

  const delImgs = origData.images.filter(i => !formImgs.includes(i._id))
  delImgs.forEach(i => {
    formData.append('deletedImages[]', i._id)
  })
  Object.entries(values).map(([key, value]) => {
    console.log(key, value)
    formData.append(key, value)
    return ''
  })
  console.log('formData', formData)
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
