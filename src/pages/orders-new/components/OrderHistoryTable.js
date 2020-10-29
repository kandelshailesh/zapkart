import React from 'react'
import { Table } from 'antd'
import { getFormattedDate, getFormattedTime } from 'utils'
import CardWrapper from 'components/CardWrapper'

// import ordersData from '../data.json'
const paymentBadges = {
  pending: 'badge-warning',
  failed: 'badge-dandgr',
  success: 'badge-success',
}

const orderBadges = {
  hold: 'badge-dark',
  pending: 'badge-warning',
  processing: 'badge-primary',
  completed: 'badge-success',
}

const orderHistoryColumns = [
  {
    title: 'Date added',
    dataIndex: 'createdAt',
    render: text => `${getFormattedDate(text)} ${getFormattedTime(text)}`,
    sorter: (a, b) => (a.createdAt > b.createdAt ? 1 : -1),
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
  },
  {
    title: 'Order Status',
    dataIndex: 'orderStatus',
    // render: text => text || '-',
    render: text => {
      return text ? <span className={`badge ${orderBadges[text]}`}>{text}</span> : '-'
    },
    sorter: (a, b) => {
      if (a.orderStatus > b.orderStatus) return 1
      if (a.orderStatus < b.orderStatus) return -1
      return 0
    },
  },
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    // render: text => text || '-',
    render: text => {
      // pending completed failure refund initiated refunded
      return text ? <span className={`badge ${paymentBadges[text]}`}>{text}</span> : '-'
    },
    sorter: (a, b) => {
      console.log(a, b)
      if (a.paymentStatus > b.paymentStatus) return 1
      if (a.paymentStatus < b.paymentStatus) return -1
      return 0
    },
  },
  // {
  //   title: 'Notified customer',
  //   dataIndex: 'customer_notify',
  //   render: (text, record) => {
  //     return (
  //       record.customer_notify && (
  //         <span className="badge badge-primary badge-collapsed-hidden ml-2 center">Notified</span>
  //       )
  //     )
  //   },
  // },
]

const OrderHistory = props => {
  const { data } = props

  return (
    <CardWrapper title="Order Status History">
      <Table
        className="utils__scrollTable"
        scroll={{ x: '100%' }}
        bordered
        columns={orderHistoryColumns}
        dataSource={data}
        rowKey={record => record.id}
        // pagination={false}
      />
    </CardWrapper>
  )
}

export default OrderHistory
