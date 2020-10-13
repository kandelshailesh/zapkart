import React from 'react'
import { Button, Table, Rate } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import UserCard from 'components/CustomComponents/UserCard'
import ChartCard from 'components/CleanUIComponents/ChartCard'
import styles from './style.module.scss'
import table from '../data.json'

class User extends React.Component {
  state = {
    tableData: table.data,
    loading: true
  }

  componentDidMount () {
    const { match } = this.props
    const { params } = match
    const { id } = params

    const { tableData } = this.state
    const user = tableData.find(item => item.id === parseInt(id, 10))
    console.log(user)
    this.setState({ user, loading: false })
  }

  render () {
    const { user, loading } = this.state
    console.log(user)

    const orderColumns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => (
          <Link
            className='utils__link--underlined'
            to={`/order-management/orders/order/${record.id}`}
          >
            {`#${text}`}
          </Link>
        ),
        sorter: (a, b) => a.id - b.id
      },
      {
        title: 'Products',
        dataIndex: '',
        key: 'products',

        render: (text, record) =>
          record.products.map(item => (
            <>
              <span key={item.product_id}>{item.name}</span>
              <br />
            </>
          ))
      },
      {
        title: 'Quantity',
        dataIndex: '',
        key: 'products',

        render: (text, record) =>
          record.products.map(item => (
            <>
              <span key={item.product_id}>{item.quantity}</span>
              <br />
            </>
          ))
      },

      {
        title: 'Action',
        key: 'action',
        width: '20%',
        render: () => (
          <span>
            <Button icon='eye' className='mr-1' size='small' />
            <Button icon='edit' className='mr-1' size='small' />
          </span>
        )
      }
    ]
    const reviewColumns = [
      {
        title: 'Product ID',
        dataIndex: 'product_id',
        key: 'product_id',
        render: (text, record) => (
          <Link
            className='utils__link--underlined'
            to={`/catalog/products/${record.product_id}`}
          >
            {`#${text}`}
          </Link>
        ),
        sorter: (a, b) => a.id - b.id
      },
      {
        title: 'Product name',
        dataIndex: 'name',
        key: 'name'
      },

      {
        title: 'Review',
        key: 'text',
        render: (text, record) =>
          record.text.length > 50
            ? `${record.text.substr(0, 50)}...`
            : record.text
      },
      {
        title: 'Rating',
        key: 'rating',
        render: (text, record) => (
          <Rate disabled allowHalf defaultValue={record.rating} />
        )
      }
    ]

    if (loading) return <div>Loading...</div>

    return (
      <div>
        <Helmet title='Users' />

        <div className={`col-lg-12 ${styles.editArea} edit-wrap`}>
          <Link to={`/users-management/edit-user/${user.id}`}>
            <Button className='btn highlighted-btn'>Edit</Button>
          </Link>
        </div>
        <div className='row'>
          <div className='col-lg-8 user-details-card'>
            <UserCard user={user} />
          </div>
          <div className='col-lg-4'>
            <div className='col-lg-12'>
              <ChartCard
                title='Orders'
                amount='22'
                chartProps={{
                  width: 120,
                  height: 107,
                  lines: [
                    {
                      values: [10, 20, 8, 14, 18, 20, 30],
                      colors: {
                        area: 'rgba(199, 228, 255, 0.5)',
                        line: '#004585'
                      }
                    }
                  ]
                }}
              />
            </div>
            <div className='col-lg-12'>
              <ChartCard
                title='Reviews'
                amount='13'
                chartProps={{
                  width: 120,
                  height: 107,
                  lines: [
                    {
                      values: [6, 20, 8, 14, 18, 20, 22],
                      colors: {
                        area: 'rgba(199, 228, 255, 0.5)',
                        line: '#004585'
                      }
                    }
                  ]
                }}
              />
            </div>
            <div className='col-lg-12'>
              <ChartCard
                title='Returns'
                amount='2'
                chartProps={{
                  width: 120,
                  height: 107,
                  lines: [
                    {
                      values: [22, 20, 8, 14, 18, 20, 5],
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
        </div>

        <div className='row'>
          <div className='col-lg-6'>
            <div className='card'>
              <div className='card-header'>
                <div className='utils__title'>
                  <strong>Orders</strong>
                </div>
              </div>
              <div className='card-body'>
                <Table
                  className='utils__scrollTable tableCustom'
                  scroll={{ x: '100%' }}
                  columns={orderColumns}
                  dataSource={user.orders}
                  onChange={this.handleChange}
                  rowKey='id'
                />
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='card'>
              <div className='card-header'>
                <div className='utils__title'>
                  <strong>Reviews</strong>
                </div>
              </div>
              <div className='card-body'>
                <Table
                  className='utils__scrollTable tableCustom'
                  scroll={{ x: '100%' }}
                  columns={reviewColumns}
                  dataSource={user.review}
                  onChange={this.handleChange}
                  rowKey='product_id'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default User
