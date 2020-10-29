import { useReducer, useEffect } from 'react'
import callApi from 'utils/callApi'

// function init(initialValues){
//   return {
//     loading:false,
//     error:null,
//     response:null,
//   }
// }

const initialValues = {
  loading: false,
  response: null,
  error: null,
  refetchCall: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'setLoading':
      return { ...state, loading: action.payload }
    case 'setResponse':
      return { ...state, response: action.payload, error: null }
    case 'setError':
      return { ...state, error: action.payload, response: null }
    case 'refetch':
      return { ...state, refetchCall: !state.refetchCall }
    default:
      return { ...state }
  }
}

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
  // everytime effect runs, reset values of loading, error, response
  const [state, dispatch] = useReducer(reducer, initialValues)
  const { response, loading, error } = state

  const refetch = () => {
    dispatch({
      type: 'refetch',
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({
          type: 'setLoading',
          payload: true,
        })
        const res = await callApi(url, options)
        dispatch({
          type: 'setLoading',
          payload: false,
        })
        dispatch({
          type: 'setResponse',
          payload: res,
        })
      } catch (err) {
        dispatch({
          type: 'setLoading',
          payload: false,
        })
        dispatch({
          type: 'setError',
          payload: { message: err.message || 'Error fetching data', status: err.status },
        })
      }
    }

    fetchData()
  }, [url, forceFetch, state.refetchCall])

  return [{ response, loading, error, refetch }]
}

export default useFetching
