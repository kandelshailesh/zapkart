import { CATALOG_API_URL } from '_constants'
import callApi from 'utils/callApi'

const fields = ['status', 'priorityOrder', 'text', 'rating', 'title']

/**
 *
 * @param {object} data
 * @param {int} data.priorityOrder
 * @param {string} data.status
 * @param {int} data.rating not required
 * @param {string} data.text not required
 * @param {int} reviewId
 * @param {int} userId
 */
// eslint-disable-next-line import/prefer-default-export
export async function editReview(data, reviewId, userId) {
  try {
    const formData = getFormData(data)
    const options = {
      method: 'PATCH',
      body: formData,
    }
    const res = await callApi(
      `${CATALOG_API_URL.editProductUserReview}/${reviewId}/${userId}`,
      options,
    )
    return res
  } catch (error) {
    console.error(error)
    return { error: error.message }
  }
}

export async function deleteReview(reviewId, userId) {
  try {
    const options = {
      method: 'DELETE',
    }
    const res = await callApi(`${CATALOG_API_URL.deleteReview}/${reviewId}/${userId}`, options)
    return res
  } catch (error) {
    console.error(error)
    return { error: error.message }
  }
}

function getFormData(data) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (fields.includes(key)) {
      if (value) formData.append(key, value)
    }
  })
  return formData
}
