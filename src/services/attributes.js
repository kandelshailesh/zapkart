/* eslint-disable import/prefer-default-export */
import callApi from 'utils/callApi'
import { notification } from 'antd'
import { STRINGS, CATALOG_API_URL } from '_constants'

const ATTRIBUTES_GROUPS_URL = CATALOG_API_URL.getAttributes

// export async function getAttributeGroups() {
// const response = await fetch()
// }

// cache? -- unsafe
// let cacheAttrGrps = null;

// const ATTRIBUTES_GROUPS_URL = 'http://localhost:3002/api/attributesGroup'
export async function getAttributeGroups() {
  const url = ATTRIBUTES_GROUPS_URL
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
export async function addAttributeGroup(values) {
  const url = `${ATTRIBUTES_GROUPS_URL}/create`
  const json = JSON.stringify(values)
  console.log(json)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  }
  try {
    const res = await callApi(url, options)
    if (res && res.data) return res.data
  } catch (error) {
    console.error(error)
    notification.error({
      message: STRINGS.error,
      description: error.message,
    })
  }
  return null
}

export async function getAttributeGroup(id) {
  const url = `${ATTRIBUTES_GROUPS_URL}/${id}`
  try {
    const response = await callApi(url)
    console.log('response', response)
    if (response && response.data) return response.data
  } catch (error) {
    console.log('hi')
    console.error('yep', error)
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return null
  }
  return null
}

export async function editAttrGrpStatus(id, status) {
  const url = `${ATTRIBUTES_GROUPS_URL}/${id}?status=${status}`
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

export async function deleteAttributeGroup(id) {
  try {
    console.log('hi')
    const url = `${ATTRIBUTES_GROUPS_URL}/${id}`
    const options = {
      method: 'DELETE',
    }
    const response = await callApi(url, options)
    console.log(response)
    if (response.success) return true
  } catch (error) {
    notification.error({
      // TODO: abstract as component/ function
      message: 'Error!',
      description: error.message,
    })
  }
  return false
}
