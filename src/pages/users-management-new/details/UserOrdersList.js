import React from 'react'
import { Button, Table } from 'antd'

import { CATALOG_API_URL } from '_constants'
import Query from 'components/Query'
import { Link } from 'react-router-dom'

const limits = [10, 20, 50, 100]

const orderStatus = {
  hold: 'badge-danger',
  pending: 'badge-warning',
  processing: 'badge-primary',
  completed: 'badge-success',
}

const UserOrdersList = props => {
  const { userId } = props

  // const [{ response, loading: loadingFetch }] = useFetching(
  //   `${CATALOG_API_URL.getUserOrders}/${userId}`,
  //   {},
  // )

  const setRowKey = record => record.id

  const columns = [
    {
      title: 'OrderNo',
      dataIndex: 'orderNo',
      key: 'orderNo',
      render: text => `#${text}`,
      // sorter: {
      //   multiple: 3,
      // },
      // search: true,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Subtotal',
      dataIndex: 'orderSubtotal',
      key: 'orderSubtotal',
      render: text => `₹ ${text}`,
    },
    {
      title: 'Order status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: text => {
        return <span className={`font-size-12 badge ${orderStatus[text]} 'badgeText'`}>{text}</span>
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Link to={`/order-management/orders/order/${record.id}`}>
            <Button
              icon="eye"
              className="mr-1"
              size="small"
              // onClick={() => setRefresh(prev => !prev)}
            />
          </Link>
        </span>
      ),
    },
  ]

  // if (error) {
  //   notification.error({ error: 'Error!', message: error.message })
  //   // history.goBack();
  //   // return '';
  // }

  return (
    <div>
      <Query url={`${CATALOG_API_URL.getUserOrders}/${userId}`} noLoader>
        {(response, loading) => {
          if (response && response.data)
            return (
              <div className="card">
                <div className="card-header">
                  <div className="utils__title">
                    <strong>Orders List</strong>
                  </div>
                </div>
                <div className="card-body">
                  <Table
                    className="utils__scrollTable"
                    loading={loading}
                    // limits={limits}
                    initialLimit={limits[0]}
                    noItemsPerPage
                    // onLimitChange={handleItemsChange}
                    // scroll={scrollStyle}
                    // pagination={pagination}
                    // rowSelection={rowSelection}
                    columns={columns}
                    dataSource={response.data}
                    rowKey={setRowKey}
                    // onChange={handleTableChange}
                  />
                </div>
                {/* )} */}
              </div>
            )
          return null
        }}
      </Query>
    </div>
  )
}

export default UserOrdersList
