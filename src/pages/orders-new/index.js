import React from 'react'
import { Button, Tabs } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import useFetching from 'hooks/useFetching'
import { CATALOG_API_URL } from '_constants'
import { getFormattedDate } from 'utils'
import Table from 'components/Table'
import AddNew from 'components/CustomComponents/AddNew'
import { connect } from 'react-redux'

const { TabPane } = Tabs

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

const OrdersList = ({ user }) => {
  const [{ response, loading }] = useFetching(
    user.userTypeId === 1 ? CATALOG_API_URL.getAllOrders : CATALOG_API_URL.getMerchantsOrder,
  )

  const columns = [
    // order id - id
    // customer - user.name user.profile_img
    // status - status
    // total - total
    // date added - created_at
    // date modified - modified_at
    // action
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link
          className="utils__link--underlined"
          to={`/order-management/orders/order/${record.id}`}
        >
          {`#${text}`}
        </Link>
      ),
    },
    {
      title: 'Order No.',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: 'Order Created Date.',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => getFormattedDate(text),
    },
    {
      title: 'Customer',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Amount',
      dataIndex: 'orderSubtotal',
      key: 'orderSubtotal',
      render: (text) => `₹ ${text}`,
    },

    {
      title: 'Payment status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (text) => {
        // pending completed failure refund initiated refunded
        return <span className={`badge ${paymentBadges[text]}`}>{text}</span>
      },
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (text) => {
        return <span className={`badge ${orderBadges[text]}`}>{text}</span>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Link to={`/order-management/orders/order/${record.id}`}>
            <Button icon="checkmark2" type="primary" className="mr-1" size="small" />
          </Link>
          <Link to={`/order-management/orders/order/${record.id}`}>
            <Button icon="cross" type="danger" className="mr-1" size="small" />
          </Link>
        </>
      ),
    },
  ]

  const actions = [
    {
      key: 'accept',
      Component: <Button type="primary">Accept Selected</Button>,
    },
    {
      key: 'declinet',
      Component: <Button type="danger">Decline Selected</Button>,
    },
  ]

  return (
    <div>
      <Helmet title="Orders List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Orders List</strong>
            {user && user.userTypeId === 1 && (
              <AddNew add link="/order-management/orders/add-new" />
            )}
          </div>
        </div>
        <div className="card-body">
          <Tabs
            onChange={() => {
              console.log('sdfsdf')
            }}
            type="card"
          >
            <TabPane tab="All orders" key="1">
              <Table
                className="utils__scrollTable"
                scroll={{ x: '100%' }}
                columns={columns}
                dataSource={response && response.data ? response.data : []}
                loading={loading}
              />
            </TabPane>
            <TabPane tab="Pending Orders" key="2">
              <Table
                className="utils__scrollTable"
                scroll={{ x: '100%' }}
                columns={columns}
                dataSource={response && response.data ? response.data : []}
                loading={loading}
                actionButtons={actions}
                onActionClick={(w) => {
                  console.log('aaalcik', w)
                }}
              />
            </TabPane>
            <TabPane tab="Completed order" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(OrdersList)
