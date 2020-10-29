/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import callApi from 'utils/callApi'
import { CATALOG_API_URL } from '_constants'

const CATEGORIES_URL = CATALOG_API_URL.getCategories

export async function getCategories() {
  try {
    const res = await callApi(CATEGORIES_URL)
    if (res.data) return res.data
  } catch (error) {
    console.log(error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
  }
  return null
}

export async function editStatus(id, status) {
  const url = `${CATEGORIES_URL}/${id}?status=${status}`
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

export async function addCategory(values) {
  console.log(values)
  const formData = new FormData()
  const images = values.image
  images.map((i) => formData.append('image', i))
  delete values.image

  if (values.custome_offer) {
    values?.custome_offer?.forEach((element) => {
      formData.append('custome_offer[]', element)
    })
    delete values.custome_offer
  }
  if (values.disclaimer) {
    values?.disclaimer?.forEach((element) => {
      formData.append('disclaimer[]', element)
    })
    delete values.disclaimer
  }

  Object.entries(values).map(([key, value]) => {
    formData.append(key, value)
    return null
  })
  const url = `${CATEGORIES_URL}/create`
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

export async function deleteCategory(id) {
  const url = `${CATEGORIES_URL}/${id}`
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

export async function editCategory(id, values, origData = {}) {
  const url = `${CATEGORIES_URL}/${id}`
  const formData = new FormData()
  console.log('values.image', values.image)
  console.log('origData.images', origData.images)
  // const origImgs = origData.images.map(i => i._id)
  // console.log(origImgs)
  if (values.image) {
    const formImgs = values.image.map((i) => {
      if (i.originFileObj) formData.append('image', i.originFileObj)
      return i.uid
    })
    delete values.image
    console.log('formImgs', formImgs)
    const delImgs = origData.images.filter((i) => !formImgs.includes(i._id))
    if (delImgs && delImgs.length > 0)
      delImgs.forEach((i) => {
        formData.append('deletedImages[]', i._id)
      })
  }
  if (values.custome_offer) {
    values?.custome_offer?.forEach((element) => {
      formData.append('custome_offer[]', element)
    })
    delete values.custome_offer
  }
  if (values.disclaimer) {
    values?.disclaimer?.forEach((element) => {
      formData.append('disclaimer[]', element)
    })
    delete values.disclaimer
  }

  Object.entries(values).map(([key, value]) => {
    formData.append(key, value)
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
