/* eslint-disable no-unreachable */
import React from 'react'
import { Icon } from 'antd'
import Query from 'components/Query'
import { CATALOG_API_URL } from '_constants'
import DescriptionList from 'components/DescriptionList'
import styles from '../style.module.scss'

import OrderedProductsList from '../components/OrderedProductsList'
import OrderHistory from '../components/OrderHistory'
import dataJson from '../data.json'

// const orderRows = [
//   {
//     key: 1,
//     title: 'Order ID',
//     dataIndex: 'id',
//     render: text => <a href="#">{text}</a>,
//   },
//   {
//     key: 2,
//     title: 'Customer',
//     dataIndex: 'user.name',
//     render: text => <a href="#">{text}</a>,
//   },
//   { key: 3, title: 'Email', dataIndex: 'user.email' },
//   {
//     key: 4,
//     title: 'Order date',
//     dataIndex: 'created_at',
//     // render: text => <a href='#'>{text}</a>
//   },
//   { key: 5, title: 'Order status', dataIndex: 'status' },
//   { key: 6, title: 'Payment status', dataIndex: 'payment.status' },
//   { key: 7, title: 'Payment method', dataIndex: 'payment.payment_method' },
// ]

// const DescriptionListItem = ({ item, obj }) => {
//   return (
//     <div className="row">
//       <dt className="col-lg-5 col-md-6 col-sm-6 order-head text-right">{item.title}</dt>
//       <dd className="col-lg-7 col-md-6 col-sm-6">
//         {item.dataIndex.split('.').reduce((o, i) => o[i], obj)}
//       </dd>
//     </div>
//   )
// }

// const Details = ({ data, rows }) => {
//   return <DescriptionList rows={rows} dataSource={data} />
// }

// const DescriptionList = ({ rows, dataSource }) => {
//   const elements = rows.map(item => (
//     <DescriptionListItem obj={dataSource} key={item.key} item={item} />
//   ))
//   return <dl className="column">{elements}</dl>
// }

const SimpleList = ({ data }) => {
  // console.log(data instanceof Array)
  // eslint-disable-next-line dot-notation

  return (
    <dl>
      {Object.entries(data).map(item => (
        <dd key={item.key}>{item.value}</dd>
      ))}
    </dl>
  )
}

const ViewOrder = props => {
  const { match } = props
  const { params } = match

  const { orderId } = params

  const url = `${CATALOG_API_URL.getOrder}/${orderId}`
  const orders = dataJson.data
  const { shipping_address: shippingAddr, billing_address: billingAddr } = orders[0]

  console.log(dataJson)

  return (
    <Query url={url} goBackText="Go back to Orders" to="/order-management/orders" noLoader>
      {response => {
        if (response && response.data) {
          const { data } = response
          const orderInfoData = [
            {
              label: 'Order No',
              description: data.orderNo,
            },
            {
              label: 'Customer',
              description: data.user ? `${data.user.firstName} ${data.user.lastName}` : '',
            },
            {
              label: 'Email',
              description: data.user ? data.user.email : '',
            },
            {
              label: 'Order status',
              description: data.orderStatus,
            },
            {
              label: 'Payment method',
              description: data.paymentType,
            },
            {
              label: 'Payment status',
              description: data.paymentStatus,
            },
          ]
          return (
            <>
              <div className="row view-order-cards">
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="utils__title">
                        <Icon className={styles.icon} type="shopping-cart" />
                        <strong>Order Details</strong>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-12">
                          {/* <Details rows={orderRows} data={response.data} /> */}
                          <DescriptionList data={orderInfoData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="utils__title">
                        <Icon className={styles.icon} type="shopping-cart" />
                        <strong>Shipping info</strong>
                      </div>
                      {/* <div className='utils__titleDescription'>
                  Block with important Account information
                </div> */}
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-12">
                          <SimpleList data={shippingAddr} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="utils__title">
                        <Icon className={styles.icon} type="shopping-cart" />
                        <strong>Billing info</strong>
                      </div>
                      {/* <div className='utils__titleDescription'>
                  Block with important Account information
                </div> */}
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-12">
                          <SimpleList data={billingAddr} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <OrderedProductsList />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <OrderHistory />
                </div>
              </div>
            </>
          )
        }
        return null
      }}
    </Query>
  )
}

export default ViewOrder
