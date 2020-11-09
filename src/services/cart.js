import { notification } from 'antd'
import callApi from 'utils/callApi'
import { CATALOG_API_URL, ERROR_TRY_LATER } from '_constants'

export default async function getuserCart(userID) {
  const url = `${CATALOG_API_URL.getUserCart}?userId=${userID}`
  try {
    const res = await callApi(url)
    // const { products } = res
    const { success } = res
    if (success) return res
  } catch (error) {
    console.error(error)
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}
