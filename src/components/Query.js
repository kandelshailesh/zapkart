import React from 'react'
import { notification } from 'antd'
import useFetching from 'hooks/useFetching'
import Loader from 'components/LayoutComponents/Loader'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import NotFound from 'pages/404'
// import ErrorMessage from './ErrorMessage'

/**
 *
 *@param  {string} url
 *@param  {object} options
 *@param  {any} children
 *@param  {any} error
 *@param  {any} loader
 *@param  {string} goBackText
 *@param  {string} to link to go back to
 *@param  {boolean} noLoader user can use loading prop to use it's own loading
 */
const Query = props => {
  const {
    url,
    options,
    children,
    error: errorRender,
    loader,
    goBackText,
    noLoader,
    to,
    nullOnError,
  } = props

  const dispatch = useDispatch()
  const [{ response, loading, error }] = useFetching(url, options)

  if (loading && !noLoader) return loader || <Loader />
  // if (error) return errorRender || <ErrorMessage message={error.message} />

  if (error) {
    if (error.status === 401) {
      notification.error({
        message: 'Logged out!',
        description: 'Invalid credentials',
      })

      return dispatch({
        type: 'user/LOGOUT',
      })
    }
    if (errorRender) {
      return errorRender(error)
    }
    notification.error({
      message: 'Error',
      description: error.message,
    })
    if (nullOnError) return null
    return (
      <NotFound
        title="Error!"
        subtitle={error.message}
        resetDefault
        goBackText={goBackText}
        to={to}
      />
    )
  }

  // return children(response, loading)

  if (response) {
    return children(response)
  }

  return null
}

Query.propTypes = {
  url: PropTypes.string.isRequired,
  options: PropTypes.object,
  children: PropTypes.any,
  error: PropTypes.any,
  loader: PropTypes.element,
  goBackText: PropTypes.string,
  noLoader: PropTypes.bool,
  to: PropTypes.string,
}

Query.defaultProps = {
  options: {},
  children: null,
  error: null,
  loader: null,
  goBackText: 'Go back home',
  noLoader: false,
  to: '/',
}

Query.displayName = 'Query'

export default React.memo(Query)
