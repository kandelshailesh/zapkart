import React from 'react'
import { Table, Button } from 'antd'
import { Helmet } from 'react-helmet'
// import PaymentCard from 'components/CleanUIComponents/PaymentCard'
// import PaymentAccount from 'components/CleanUIComponents/PaymentAccount'
// import PaymentTransaction from 'components/CleanUIComponents/PaymentTransaction'
import ChartCard from 'components/CleanUIComponents/ChartCard'
import Authorize from 'components/LayoutComponents/Authorize'
import Query from 'components/Query'
import Link from 'react-router-dom/Link'
import { CATALOG_API_URL } from '_constants'
import { getFormattedDate } from 'utils'

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
class DashboardAlpha extends React.Component {
  render() {
    const tableColumns = [
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
          <Link to={`/order-management/orders/order/${record.id}`}>
            <Button icon="eye" className="mr-1" size="small" />
          </Link>
        ),
      },
    ]
    return (
      <Authorize roles={['admin']} redirect to="/dashboard/seller">
        <Helmet title="Zapkart Admin" />
        {/* <Helmet title="Grocery Admin" /> */}
        <Query url={CATALOG_API_URL.getOrderStats}>
          {(res) => {
            console.log('pool', data)
            if (!res.data) return null
            const { data } = res
            return (
              <>
                <div className="utils__title utils__title--flat mb-3">
                  <strong className="text-uppercase font-size-16">Last Week Statistics</strong>
                </div>
                <div className="row">
                  {data.totalOrders && (
                    <div className="col-xl-3">
                      <ChartCard
                        title="Total Transactions"
                        amount={data.totalOrders}
                        chartProps={{
                          width: 120,
                          height: 107,
                          lines: [
                            {
                              values: [2, 11, 8, 14, 18, 20, 26],
                              colors: {
                                area: 'rgba(199, 228, 255, 0.5)',
                                line: '#004585',
                              },
                            },
                          ],
                        }}
                      />
                    </div>
                  )}
                  {data.totalSales && (
                    <div className="col-xl-3">
                      <ChartCard
                        title="Total Sales"
                        amount={`₹${data.totalSales}`}
                        chartProps={{
                          width: 120,
                          height: 107,
                          lines: [
                            {
                              values: [20, 80, 67, 120, 132, 66, 97],
                              colors: {
                                area: 'rgba(199, 228, 255, 0.5)',
                                line: '#004585',
                              },
                            },
                          ],
                        }}
                      />
                    </div>
                  )}
                  {data.lastWeektotalSales && (
                    <div className="col-xl-3">
                      <ChartCard
                        title="Last Week Sales"
                        amount={`₹${data.lastWeektotalSales}`}
                        chartProps={{
                          width: 120,
                          height: 107,
                          lines: [
                            {
                              values: [42, 40, 80, 67, 84, 20, 97],
                              colors: {
                                area: 'rgba(199, 228, 255, 0.5)',
                                line: '#004585',
                              },
                            },
                          ],
                        }}
                      />
                    </div>
                  )}
                  {data.lastWeektotalOrders && (
                    <div className="col-xl-3">
                      <ChartCard
                        title="Last Week Orders"
                        amount={data.lastWeektotalOrders}
                        chartProps={{
                          width: 120,
                          height: 107,
                          lines: [
                            {
                              values: [42, 40, 80, 67, 84, 20, 97],
                              colors: {
                                area: 'rgba(199, 228, 255, 0.5)',
                                line: '#004585',
                              },
                            },
                          ],
                        }}
                      />
                    </div>
                  )}
                </div>
              </>
            )
          }}
        </Query>
        <Query url={`${CATALOG_API_URL.getAllOrders}/?orderStatus=nothold&limit=10`}>
          {(res) => {
            if (res && res.data)
              return (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="utils__title">
                          <strong>Recent Orders</strong>
                        </div>
                        <div className="utils__titleDescription">Orders placed recently</div>
                      </div>
                      <div className="card-body">
                        <Table
                          className="utils__scrollTable"
                          rowKey={(record) => record.id}
                          scroll={{ x: '100%' }}
                          columns={tableColumns}
                          dataSource={res.data}
                          pagination={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            return null
          }}
        </Query>
        {/* <div className="utils__title utils__title--flat mb-3">
          <strong className="text-uppercase font-size-16">Your Cards (3)</strong>
          <Button className="ml-3">View All</Button>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <PaymentCard
              icon="lnr lnr-bookmark"
              name="Matt Daemon"
              number="4512-XXXX-1678-7528"
              type="VISA"
              footer="Expires at 02/20"
              sum="$2,156.78"
            />
          </div>
          <div className="col-lg-4">
            <PaymentCard
              icon="lnr lnr-bookmark"
              name="David Beckham"
              number="8748-XXXX-1678-5416"
              type="MASTERCARD"
              footer="Expires at 03/22"
              sum="$560,245.35"
            />
          </div>
          <div className="col-lg-4">
            <PaymentCard
              icon="lnr lnr-hourglass"
              name="Mrs. Angelina Jolie"
              number="6546-XXXX-1678-1579"
              type="VISA"
              footer="Locked Temporary"
              sum="$1,467,98"
            />
          </div>
        </div>
        <div className="utils__title utils__title--flat mb-3">
          <strong className="text-uppercase font-size-16">Your Accounts (6)</strong>
          <Button className="ml-3">View All</Button>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <PaymentAccount
              icon="lnr lnr-inbox"
              number="US 4658-1678-7528"
              footer="Current month charged: $10,200.00"
              sum="$2,156.78"
            />
          </div>
          <div className="col-lg-6">
            <PaymentAccount
              icon="lnr lnr-inbox"
              number="IBAN 445646-8748-4664-1678-5416"
              footer="Current month charged: $1,276.00"
              sum="$560,245.35"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <PaymentAccount
              icon="lnr lnr-inbox"
              number="US 4658-1678-7528"
              footer="Current month charged: $10,200.00"
              sum="$2,156.78"
            />
          </div>
          <div className="col-lg-6">
            <PaymentAccount
              icon="lnr lnr-inbox"
              number="IBAN 445646-8748-4664-1678-5416"
              footer="Current month charged: $1,276.00"
              sum="$560,245.35"
            />
          </div>
        </div>
        <div className="utils__title mb-3">
          <strong className="text-uppercase font-size-16">Recent Transactions (167)</strong>
          <Button className="ml-3">View All</Button>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <PaymentTransaction
              income={false}
              amount="-$100.00"
              info="US 4658-1678-7528"
              footer="To AMAZON COPR, NY, 1756"
            />
            <PaymentTransaction
              income
              amount="+27,080.00"
              info="4512-XXXX-1678-7528"
              footer="To DigitalOcean Cloud Hosting, Winnetka, LA"
            />
            <PaymentTransaction
              income={false}
              amount="-100,000.00"
              info="6245-XXXX-1678-3256"
              footer="To Tesla Cars, LA, USA"
            />
            <div className="text-center pb-5">
              <Button type="primary" className="width-200" loading>
                Load More...
              </Button>
            </div>
          </div>
        </div> */}
      </Authorize>
    )
  }
}

export default DashboardAlpha
