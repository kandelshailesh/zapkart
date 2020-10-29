import { notification } from 'antd'
import { ERROR_TRY_LATER, CATALOG_API_URL } from '_constants'
import callApi from 'utils/callApi'

export default async function getAddressByuser(userID) {
  const url = `${CATALOG_API_URL.getAddress}/${userID}`
  try {
    const res = await callApi(url)
    // const { products } = res
    const { address } = res

    if (address) return address
    notification.error({
      message: 'NO address',
    })
  } catch (error) {
    console.error(error)
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export async function addAddress(data, userID) {
  const url = `${CATALOG_API_URL.addressCreate}/${userID}`
  try {
    const formattedData = getFormattedData(data)
    const options = {
      method: 'POST',
      body: JSON.stringify(formattedData),
      headers: { 'content-type': 'application/json' },
    }
    const res = await callApi(url, options)

    if (res && res.success) return res
    notification.error({
      error: 'Error',
      message: ERROR_TRY_LATER,
    })
    return res
  } catch (error) {
    return error
  }
}

function getFormattedData(data) {
  const newdata = {}

  if (data.fullName) {
    newdata.fullName = data.fullName
  }
  if (data.city) {
    newdata.city = data.city
  }
  if (data.state) {
    newdata.state = data.state
  }
  if (data.address_type) {
    newdata.address_type = data.address_type
  }
  if (data.age) {
    newdata.age = Number(data.age)
  }
  if (data.gender) {
    newdata.gender = data.gender
  }
  if (data.doctor) {
    newdata.doctor = data.doctor
  }
  if (data.dob) {
    newdata.dob = data.dob
  }
  if (data.landmark) {
    newdata.landmark = data.landmark
  }
  if (data.street) {
    newdata.street = data.street
  }
  if (data.longitude) {
    newdata.longitude = String(data.longitude)
  }
  if (data.latitude) {
    newdata.latitude = String(data.latitude)
  }
  if (data.houseNo) {
    newdata.houseNo = data.houseNo
  }
  if (data.pincode) {
    newdata.pincode = String(data.pincode)
  }
  if (data.mobileNo) {
    newdata.mobileNo = data.mobileNo
  }
  newdata.active = 'active'

  return newdata
}
