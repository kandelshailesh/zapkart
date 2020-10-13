import { useState, useEffect } from 'react'
import callApi from 'utils/callApi'

/**
 *
 * @param {string} url url string
 * @param {object} options POST, GET, etc
 * @param {boolean} forceFetch refetching flag - if value changes, refetches
 * @returns {Object[]} a
 * @returns {any} a[0].response
 * @returns {boolean} a[0].loading
 * @returns {any} a[0].error
 */
const useFetching = (url, options = {}, forceFetch) => {
  // let headers = {}
  // if (typeof options.headers !== 'undefined') {
  //   headers = { ...options.headers }
  // }
  // headers = { ...headers, Authorization: `Bearer ${localStorage.getItem('token')}` }
  // options.headers = headers
  // console.log('in useFetching')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('starting fetch')
        // console.log(url, options)
        setLoading(true)
        const res = await callApi(url, options)
        // console.log('res', res)
        // const json = await res.json()
        setLoading(false)
        setResponse(res)
        setError(null)
        // console.log('json', json)
        // setResponse(json)
      } catch (err) {
        setLoading(false)
        setResponse(null)
        console.log('useFetching error', err)
        // console.log(err.message)
        setError({ message: err.message || 'Error fetching data', status: err.status })
      }
    }
    // console.log('will fetch data')
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, forceFetch])

  return [{ response, loading, error }]
}

export default useFetching
