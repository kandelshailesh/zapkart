import React from 'react'
import { CATALOG_API_URL, LINKS } from '_constants'
import useFetching from 'hooks/useFetching'
import NotFound from 'pages/404'
import { Table, Button } from 'antd'
import Link from 'react-router-dom/Link'
import CardWrapper from 'components/CardWrapper'
import Loader from 'components/LayoutComponents/Loader'
import { Helmet } from 'react-helmet'
import map from 'lodash/map'
import { getFormattedDate, getFormattedTime } from 'utils'

const index = props => {
  const { match } = props
  const { params } = match
  const { masterOrderId } = params
  let url = CATALOG_API_URL.getShipments
  if (masterOrderId) url = `${url}/?masterOrderId=${masterOrderId}`

  const [{ response, loading, error }] = useFetching(url)

  let columns = [
    // sku, title, price, qty, total, delete
    {
      title: 'Shipment ID',
      dataIndex: 'id',
      render: text => `#${text}`,
    },
    {
      title: 'OrderId',
      dataIndex: 'masterOrderId',
      render: (text, record) => (
        <Link
          to={`${LINKS.viewEditOrder}/${record.masterOrderId}`}
          className="utils__link--underlined"
        >
          #{text}
        </Link>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'user',

      render: (_, record) =>
        record.masterOrder &&
        record.masterOrder.user &&
        `${record.masterOrder.user.firstName} ${record.masterOrder.user.lastName}`,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      render: text => `${getFormattedDate(text)} ${getFormattedTime(text)}`,
    },
    {
      title: 'Origin',
      dataIndex: 'shipmentOriginDetails',

      render: (_, record) =>
        record.shipmentOriginDetails &&
        map(record.shipmentOriginDetails, i => {
          return (
            <>
              {i}
              <br />
            </>
          )
        }),
    },
    {
      title: 'Destination',
      dataIndex: 'shipmentDestinationAddress',

      render: (_, record) =>
        record.shipmentDestinationAddress &&
        map(record.shipmentDestinationAddress, i => {
          return (
            <>
              {i}
              <br />
            </>
          )
        }),
    },
    {
      title: 'Logistic Partner',
      dataIndex: 'otherLogisticPartner',
    },
    {
      title: 'Tracking Number',
      dataIndex: 'otherTrackingUrl',
    },
    {
      title: 'Current Status',
      dataIndex: 'shippingStatus',
      render: text => {
        // pending
        // shipped
        // pickup
        // delivered
        // cancelled
        // dispatched
        let badge = 'badge-warning'
        switch (text) {
          case 'shipped':
            badge = 'badge-info'
            break
          case 'pickup':
            badge = 'badge-primary'
            break
          case 'delivered':
            badge = 'badge-success'
            break
          case 'cancelled':
            badge = 'badge-danger'
            break
          case 'dispatched':
            badge = 'badge-dark'
            break
          default:
            break
        }
        return <span className={`badge ${badge}`}>{text}</span>
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <span>
            <Link to={`/shipment/view/${record.id}`}>
              <Button icon="eye" />
            </Link>
          </span>
          <span>
            <Link to={`/shipment/edit/${record.id}`}>
              <Button icon="edit" />
            </Link>
          </span>
        </>
      ),
    },
  ]

  if (masterOrderId)
    columns = columns.filter(i => i.dataIndex !== 'user' && i.dataIndex !== 'masterOrderId')

  let title = 'Shipment List'
  if (masterOrderId) title = `${title} for  Order #${masterOrderId}`

  if (response && response.data) {
    return (
      <>
        <Helmet title={title} />
        <CardWrapper title={title}>
          <Table
            scroll={{ x: '100%' }}
            dataSource={response.data}
            columns={columns}
            rowKey={record => record.id}
          />
        </CardWrapper>
      </>
    )
  }

  if (loading) return <Loader />

  if (error) return <NotFound title="Error" subtitle={error.message} />
  return null
}

export default index
