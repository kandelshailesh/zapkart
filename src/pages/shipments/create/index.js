import React from 'react'
import { Helmet } from 'react-helmet'
import ShipmentFormAdmin from '../components/ShipmentFormAdmin'

const index = props => {
  const { match } = props
  const { params } = match
  const { orderId } = params

  // check user role in redux store and render accordingly

  return (
    <>
      <Helmet title="Create shipment" />
      <ShipmentFormAdmin orderId={orderId} />
    </>
  )
}

export default index
