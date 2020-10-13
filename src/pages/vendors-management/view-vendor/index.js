import React from 'react'
import { Helmet } from 'react-helmet'
import { Table, Button } from 'antd'
import { Link } from 'react-router-dom'
import ChartCard from 'components/CleanUIComponents/ChartCard'
import data from '../data.json'
import { getFormattedDate, getFormattedTime } from '../../../utils'

class ViewVendor extends React.Component {
  state = {
    // id: '',
    vendor: '',
    loading: true
  }

  componentDidMount () {
    const { match } = this.props
    const { params } = match
    const { id } = params
    const sellersData = data.data
    const vendor = sellersData.find(item => item.vendor_id === parseInt(id, 10))
    console.log(vendor)
    this.setState({
      vendor,
      loading: false
    })
  }

  getLastWeekTransactions = () => {
    return null
  }

  render () {
    const { vendor, loading } = this.state

    const columns = [
      // Vendor ID
      // Vendor Name
      // Order ID
      // Order Date
      // Order status
      // Order amount
      // commission %
      // Owing
      // Action
      {
        title: 'Order ID',
        dataIndex: 'id',
        key: 'order_id',
        render: (text, record) => (
          <Link
            className='utils__link--underlined'
            to={`/order-management/orders/order/${record.id}`}
          >
            {`#${text}`}
          </Link>
        ),
        sorter: (a, b) => a.id - b.id
        // ...this.getColumnSearchProps('order_id')
      },
      {
        title: 'Date',
        dataIndex: 'created_at',
        key: 'created_at',
        // ...this.getColumnSearchProps('created_at'),
        sorter: (a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          )
        },
        render: text => `${getFormattedDate(text)} ${getFormattedTime(text)}`
      },
      {
        title: 'Order Status',
        dataIndex: 'status',
        key: 'order_status',
        // ...this.getColumnSearchProps('order_status'),
        sorter: (a, b) => a.status.localeCompare(b.status)
      },
      {
        title: 'Payment status',
        dataIndex: 'payment.status',
        key: 'payment_status',
        // ...this.getColumnSearchProps('payment_status'),
        sorter: (a, b) => a.payment.status - b.payment.status
      },
      {
        title: 'User',
        dataIndex: 'user.name',
        key: 'user_name',
        // ...this.getColumnSearchProps('user_name'),
        sorter: (a, b) => a.user.name.localeCompare(b.user.name)
      },
      {
        title: 'Amount',
        dataIndex: 'order.amount',
        key: 'amount',
        // ...this.getColumnSearchProps('amount'),
        sorter: (a, b) => a.amount - b.amount
      },

      {
        title: '',
        key: 'action',
        width: '20%',
        render: () => (
          <span>
            <Button icon='edit' className='mr-1' size='small'>
              Edit
            </Button>
            <Button icon='view' className='mr-1' size='small'>
              View
            </Button>
          </span>
        )
      }
    ]

    if (loading) return <div>Loading...</div>
    // const lastWeekTransactions = this.getLastWeekTransactions()
    return (
      <>
        <Helmet title='Vendor' />
        <div className='utils__title utils__title--flat mb-3'>
          <strong className='text-uppercase font-size-16'>
            Last Week Statistics
          </strong>
        </div>
        <div className='row'>
          <div className='col-xl-4'>
            <ChartCard
              title='Orders'
              amount='11'
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [10, 20, 8, 14, 18, 20, 1],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585'
                    }
                  }
                ]
              }}
            />
          </div>
          <div className='col-xl-4'>
            <ChartCard
              title='Sales'
              amount='Rs 3500'
              chartProps={{
                width: 120,
                height: 107,
                lines: [
                  {
                    values: [10, 20, 8, 14, 18, 20, 1],
                    colors: {
                      area: 'rgba(199, 228, 255, 0.5)',
                      line: '#004585'
                    }
                  }
                ]
              }}
            />
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <Table
              className='utils__scrollTable tableCustom'
              scroll={{ x: '100%' }}
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={vendor.orders}
              onChange={this.handleChange}
              rowKey='id'
            />
          </div>
        </div>
      </>
    )
  }
}

export default ViewVendor
