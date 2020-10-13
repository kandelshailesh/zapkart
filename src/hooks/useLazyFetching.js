import { useState, useEffect } from 'react'

/**
 *
 * @param {string} url
 * @param {Object} options
 * @param {boolean} isFetch
 */
const useLazyFetching = (url, options, isFetch) => {
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
        const res = await fetch(url, options)
        // console.log('res', res)
        const json = await res.json()
        setLoading(false)
        if (!res.ok) {
          throw new Error(json.message || 'Error fetching data!')
        }
        // console.log('json', json)
        setResponse(json)
      } catch (err) {
        setLoading(false)
        // console.log('err', err)
        // console.log(err.message)
        setError({ message: err.message || 'Error fetching data' })
      }
    }
    if (isFetch) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, isFetch])

  return { response, loading, error }
}

export default useLazyFetching
