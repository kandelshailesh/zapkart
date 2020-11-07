import callApi from 'utils/callApi'

const commissionByadmin = async (url, data, method = 'POST') => {
  const body = JSON.stringify(data)

  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
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

export default commissionByadmin
