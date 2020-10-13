import React from 'react'
import CardWrapper from 'components/CardWrapper'
import DescriptionList from 'components/DescriptionList'
import { Table, Divider } from 'antd'
import useFetching from 'hooks/useFetching'
import { CATALOG_API_URL } from '_constants'
import HandleLoadError from 'components/HandleLoadError'
import PlaceholderImage from 'components/PlaceholderImage'
// import Link from 'react-router-dom/Link'
import { Helmet } from 'react-helmet'

const index = props => {
  const { match } = props
  const { params } = match
  const { shipmentId } = params

  const [{ response, error, loading }] = useFetching(`${CATALOG_API_URL.shipment}/${shipmentId}`)

  const data = response && response.data ? response.data : null
  const orderSummary = data
    ? {
        currentOrderStatus: (data.masterOrder && data.masterOrder.orderStatus) || '-',
        trackingNumber: data.otherTrackingUrl || '-',
        logisticPartner: data.otherLogisticPartner || '-',
        shipmentRemark: data.comment || '-',
      }
    : {}
  const columns = [
    // sku, title, price, qty, total, delete
    {
      title: 'Merchant',
      dataIndex: 'assignedMerchant',
      render: (_, record) => (
        <div>
          {record.merchantassigned &&
          record.merchantassigned.merchant &&
          record.merchantassigned.merchant.name
            ? record.merchantassigned.merchant.name
            : '-'}
        </div>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'product.sku',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'product.images',
      render: (_, record) => (
        <div className="thumbnail-area">
          <PlaceholderImage
            src={
              record.product.images && record.product.images.length
                ? record.product.images[0].thumbnail
                : ''
            }
            alt={record.product.images[0].title}
          />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'product.name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'subtotal',
      render: text => <span>₹{text}</span>,
    },
    {
      title: 'Shipment status',
      dataIndex: 'shippingStatus',
      render: () => <span className="text-capitalize">{data.shippingStatus}</span>,
    },

    // {
    //   title: 'Action',
    //   dataIndex: 'operation',
    //   render: () => (
    //     <Link to="/shipment/edit/:shipmentId">
    //       <Button icon="edit" />
    //     </Link>
    //   ),
    // },
  ]

  return (
    <>
      <Helmet title="Shipment Details" />
      <HandleLoadError error={error} loading={loading} hasResponse={response && response.data}>
        {!!data && (
          <div className="container-fluid shipment-details">
            <CardWrapper title="Shipment details">
              <div className="row shipment-details-row mb-4">
                <div className="col-md-6">
                  <div className="utils__title border-bottom mb-4">Billing Adress</div>
                  <DescriptionList
                    title="Billing Information"
                    data={data.masterOrder.billingAddress}
                  />
                </div>
                <div className="col-md-6">
                  <div className="utils__title border-bottom mb-4">Shipping Address</div>
                  <DescriptionList
                    title="Shipping Information"
                    data={data.masterOrder.shippingAddress}
                  />
                </div>
              </div>
              {/* </CardWrapper>
        <CardWrapper> */}
              <div>
                <div className="utils__title border-bottom mb-4">Products Ordered</div>
                <Table
                  bordered
                  scroll={{ x: '100%' }}
                  dataSource={data.orderItems.map(i => i.order_item)}
                  columns={columns}
                  rowKey={record => record.id}
                />
              </div>
              <Divider />
              <div className="row">
                <div className="col-6 ml-auto">
                  <DescriptionList data={orderSummary} />
                </div>
              </div>
            </CardWrapper>
          </div>
        )}
      </HandleLoadError>
    </>
  )
}

export default index
