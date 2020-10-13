import React from 'react'
import NotFound from 'pages/404'
import Loader from './LayoutComponents/Loader'

const HandleLoadError = ({ loading, error, children, hasResponse }) => {
  console.log('HASRESPONSE', hasResponse)
  if (loading) return <Loader />
  if (error) return <NotFound title="Error!" subtitle={error.message} />
  if (!hasResponse && loading) return <Loader />
  //  (!hasResponse) return <NotFound title="Error!" subtitle="Please try again later.." />
  if (hasResponse) return children
  return <NotFound title="Error!" subtitle="Please try again later.." />
}

export default HandleLoadError
