import { CATALOG_API_URL, STRINGS } from '_constants'
import callApi from 'utils/callApi'
import qs from 'qs'
import { getFormData } from 'utils'
import { notification } from 'antd'

export async function getCategories(query = null) {
  const queryString = query ? `?${qs.stringify(query)}` : ''
  console.log(query)
  console.log(queryString)
  try {
    const { data } = await callApi(`${CATALOG_API_URL.getCategories}${queryString}`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function uploadExcel(file) {
  try {
    const formData = getFormData({ file })
    const options = {
      body: formData,
      method: 'POST',
    }
    const { success } = await callApi(`${CATALOG_API_URL.uploadExcel}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}

export async function uploadAgreement(file) {
  try {
    const formData = new FormData()
    file.forEach((element) => {
      formData.append('merchantFiles', element.originFileObj)
    })
    const options = {
      body: formData,
      method: 'POST',
    }
    const { success } = await callApi(`${CATALOG_API_URL.uploadAgreement}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}

export async function uploadAgreementByAdmin(id, file) {
  try {
    const formData = new FormData()
    file.forEach((element) => {
      formData.append('adminFiles', element.originFileObj)
    })
    formData.append('merchantId', id)
    const options = {
      body: formData,
      method: 'POST',
    }
    const { success } = await callApi(`${CATALOG_API_URL.agreementByAdmin}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}

export async function UpdateAgreementStatusByAdmin(data) {
  try {
    const jsonData = JSON.stringify(data)
    const options = {
      body: jsonData,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    }
    const { success } = await callApi(`${CATALOG_API_URL.agreementStatusByAdmin}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}

export async function deleteAgreementByAdmin(data) {
  try {
    const formData = getFormData(data)

    const options = {
      body: formData,
      method: 'POST',
    }
    const { success } = await callApi(`${CATALOG_API_URL.agreementByAdmin}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}

export async function uploadProdImgs(files) {
  try {
    const formData = new FormData()
    files.map((i) => formData.append('file', i))
    const options = {
      body: formData,
      method: 'POST',
    }
    const { success } = await callApi(`${CATALOG_API_URL.uploadImages}`, options)
    if (success) return true
  } catch (error) {
    console.log(error)
    notification.error({
      message: error.message,
    })
  }
  return false
}

export async function getBrands(query = null) {
  const queryStr = query ? `?${qs.stringify(query)}` : ''
  try {
    const { data } = await callApi(`${CATALOG_API_URL.getBrands}/${queryStr}`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getTaxClasses() {
  try {
    const { data } = await callApi(CATALOG_API_URL.getTaxClasses)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getData(url) {
  try {
    const res = await callApi(url)
    if (res?.data) return res.data
    if (res?.error) throw new Error(res.error.message)
  } catch (error) {
    console.log(error)
    return { error: error.message }
  }
  return null
}

export async function editData(url, data, type = 'formdata', method = 'PATCH') {
  console.log('edddd', url, data, type)
  let body = null
  if (type === 'formdata') body = getFormData(data)
  if (type === 'json') body = JSON.stringify(data)
  try {
    const restOptions = type === 'json' ? { headers: { 'Content-Type': 'application/json' } } : {}
    const options = {
      method,
      body,
      ...restOptions,
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

export async function deleteData(url) {
  try {
    const options = {
      method: 'DELETE',
    }
    const res = await callApi(url, options)
    console.log('edddd res', res, options)
    if (res?.success) {
      notification.success({
        message: STRINGS.deleteSuccess,
      })
      return true
    }
    if (res?.error) throw new Error(res.error)
  } catch (error) {
    notification.error({
      message: STRINGS.deleteError,
      description: error.message,
    })
    return false
  }
  return false
}

export async function getCompositions() {
  try {
    const { data } = await callApi(CATALOG_API_URL.getCompositions)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getSaltCompositions() {
  try {
    const { data } = await callApi(`${CATALOG_API_URL.saltComposition}/query?status=active`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getSaltSynonms() {
  try {
    const { data } = await callApi(`${CATALOG_API_URL.saltsynonims}/query?status=active`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getSizeChart() {
  try {
    const { data } = await callApi(`${CATALOG_API_URL.sizeChart}/query?status=active`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getCustomOffer() {
  try {
    const { data } = await callApi(`${CATALOG_API_URL.customeoffer}/query?status=active`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getManufacturer() {
  try {
    const { data } = await callApi(`${CATALOG_API_URL.manufacture}/query?status=active`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getContainerValue() {
  try {
    const { data } = await callApi(`${CATALOG_API_URL.containervalue}/query?status=active`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getDisclemer() {
  try {
    const { data } = await callApi(`${CATALOG_API_URL.disclaimer}/query?status=active`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getMedicineType() {
  try {
    const { data } = await callApi(`${CATALOG_API_URL.medicinetypes}/query?status=active`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getAllMerchnats() {
  try {
    const { data } = await callApi(`${CATALOG_API_URL.getMerchants}`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getOrganics() {
  try {
    const { data } = await callApi(CATALOG_API_URL.getOrganics)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getMedicineTypes() {
  try {
    const { data } = await callApi(CATALOG_API_URL.getMedicineTypes)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getUserGroups(role) {
  try {
    const { data } = await callApi(`/api/backend/v1/usergroup/list/${role}`)
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getCountries() {
  try {
    const { data } = await callApi('/api/backend/v1/country')
    if (data) return data
  } catch (error) {
    console.log(error)
  }
  return null
}

export async function getStates(id) {
  try {
    const { data } = await callApi(`/api/catalog/v1/indianpincode?stateName=1`/{id})
    if (data) return data
  } catch (error) {
    console.log('error state',error)
  }
  return null
}

export async function getCities(id) {
  try {
    const { data } = await callApi(`/api/backend/v1/city/${id}`)
    if (data) return data
  } catch (error) {
    console.log('error city',error)
  }
  return null
}

export async function getCity(sname){
  try{
    const {data} = await callApi(`/api/catalog/v1/indianpincode?districts=${sname}`)
    if (data) return data
  }catch (error) {
    console.log(error)
  }
  return null
}

export async function getStat(){
  try{
    const {data} = await callApi('/api/catalog/v1/indianpincode?stateName=1')
    if (data) return data
  }catch (error) {
    console.log(error)
  }
  return null
}

export async function getZip(dist){
  try{
    const {data} = await callApi(`/api/catalog/v1/indianpincode?pincodes=${dist}`)
    if (data) return data
  }catch (error) {
    console.log(error)
  }
  return null
}

export async function getGeneralSettings() {
  try {
    const res = await callApi(`/api/catalog/v1/generalSettings`)
    if (res) return res
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    console.log(error)
  }
  return null
}

export async function editGeneralsettings(vals) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vals),
    }
    const res = await callApi(`/api/catalog/v1/generalSettings`, options)
    if (res) return res
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    console.log(error)
  }
  return null
}

export async function editFooterSettings(vals) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vals),
    }
    const res = await callApi(`${CATALOG_API_URL.getFooterSettings}`, options)
    if (res) return res
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    console.log(error)
  }
  return null
}

export async function editMailSettings(vals) {
  try {
    const formData = getFormData(vals)
    const options = {
      method: 'PATCH',
      body: formData,
    }
    const res = await callApi(`/api/backend/v1/mailSettings/edit`, options)
    if (res) return res
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    console.log(error)
  }
  return null
}

export async function getMailSettings() {
  try {
    const res = await callApi(`/api/backend/v1/mailSettings`)
    if (res) return res
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    console.log(error)
  }
  return null
}
