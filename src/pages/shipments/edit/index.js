import React from 'react'
import useFetching from 'hooks/useFetchingNoReducers'
import { CATALOG_API_URL } from '_constants'
import NotFound from 'pages/404'
import { Helmet } from 'react-helmet'
import Loader from 'components/LayoutComponents/Loader'

import { editShipment } from 'services/shipments'
import EditShipmentDetails from '../components/EditShipmentDetails'

const index = props => {
  const { match } = props
  const { params } = match
  const { shipmentId } = params

  const [{ response, loading, error }] = useFetching(`${CATALOG_API_URL.shipment}/${shipmentId}`)

  const handleSubmit = async values => {
    await editShipment(values, shipmentId)
  }

  if (response && response.data)
    return (
      <>
        <Helmet title="Edit Shipment" />
        <EditShipmentDetails data={response.data} onSubmit={handleSubmit} />
      </>
    )

  if (loading) return <Loader />
  if (error) return <NotFound ttitle="Error" subtitle={error.messageÎ} />
  return null
}

export default index
