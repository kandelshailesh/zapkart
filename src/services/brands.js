/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'
import { CATALOG_API_URL } from '_constants'

const BRANDS_URL = CATALOG_API_URL.getBrands

export async function getBrands() {
  try {
    const res = await callApi(BRANDS_URL)
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

export async function editBrandStatus(id, status) {
  const url = `${BRANDS_URL}/${id}?status=${status}`
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

export async function deleteBrand(id) {
  const url = `${BRANDS_URL}/${id}`
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

export async function addBrand(values) {
  console.log(values)
  const formData = new FormData()
  const images = values.image
  images.map(i => formData.append('image', i))
  delete values.image
  // req values
  // const reqValues=['metaTitle', metaString',...]
  Object.entries(values).map(([key, value]) => {
    formData.append(key, value)
    return null
  })
  const url = `${BRANDS_URL}/create`
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

export async function editBrand(id, values, origData) {
  console.log(values)
  const url = `${BRANDS_URL}/${id}`
  const formData = new FormData()
  console.log('values.image', values.image)
  console.log('origData.image', origData.image)
  // const origImgs = origData.images.map(i => i._id)
  // console.log(origImgs)
  const formImgs = values.image.map(i => {
    if (i.originFileObj) formData.append('image', i.originFileObj)
    return i.uid
  })

  delete values.image
  console.log('formImgs', formImgs)
  const reqFields = [
    'name',
    'metaTitle',
    'metaDescription',
    'metaKeywords',
    'status',
    'priorityOrder',
  ]
  const delImgs = origData.image.filter(i => !formImgs.includes(i._id))
  delImgs.forEach(i => {
    formData.append('deletedImage[]', i._id)
  })
  Object.entries(values).map(([key, value]) => {
    if (reqFields.includes(key)) formData.append(key, value)
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
