import React from 'react'
import {
  Table,
  Icon,
  // Input,
  Button,
  Popconfirm,
  Tooltip
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import table from './data.json'
// import styles from './style.module.scss'

class OrdersList extends React.Component {
  state = {
    tableData: table.data,
    // data: table.data,
    // filterDropdownVisible: false,
    searchText: '',
    // filtered: false,
    selectedRowKeys: []
  }

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = () => {
    const { searchText, tableData } = this.state
    const reg = new RegExp(searchText, 'gi')
    this.setState({
      // filterDropdownVisible: false,
      // filtered: !!searchText,
      tableData: tableData
        .map(record => {
          const match = record.name.match(reg)
          if (!match) {
            return null
          }
          return {
            ...record,
            name: (
              <span>
                {record.name
                  .split(reg)
                  .map((text, i) =>
                    i > 0
                      ? [<span className='highlight'>{match[0]}</span>, text]
                      : text
                  )}
              </span>
            )
          }
        })
        .filter(record => !!record)
    })
  }

  linkSearchInput = node => {
    this.searchInput = node
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render() {
    const {
      tableData,
      // searchText,
      // filtered,
      // filterDropdownVisible,
      selectedRowKeys
    } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
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
            className='utils__link--underlined'
            to={`/order-management/orders/order/${record.id}`}
          >
            {`#${text}`}
          </Link>
        ),
        sorter: (a, b) => a.id - b.id
      },
      {
        title: 'Customer',
        dataIndex: 'user.name',
        key: 'user'
      },
      {
        title: 'Amount',
        dataIndex: 'total',
        key: 'amount',
        render: text => `Rs ${text}`
      },

      {
        title: 'Payment status',
        dataIndex: 'payment.status',
        key: 'payment_status',
        sorter: (a, b) => a.payment.status.length - b.payment.status.length,
        render: text => {
          // pending completed failure refund initiated refunded
          return <span>{text}</span>
        }
      },
      {
        title: 'Order Status',
        dataIndex: 'order_status',
        key: 'status',
        sorter: (a, b) => a.status.length - b.status.length,
        render: (text, record) => {
          console.log(record.history.slice(-1)[0].status)
          return <span>{record.history.slice(-1)[0].status}</span>
        }
      },
      {
        title: 'Seller(s)',
        dataIndex: '',
        key: 'sellers',
        render: (text, record) => {
          const { products } = record
          console.log(products)
          const sellers = products.map(item => item.seller.id)
          console.log(sellers)
          const uniqueSellers = sellers.filter(
            (item, index, array) => array.indexOf(item) === index
          )
          // const sellersA = products.map(item => item.seller)
          // const sellersUnique = sellersA.filter(item => item.id)
          console.log(uniqueSellers)
          return <span>hello</span>
        }
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button icon='eye' className='mr-1' size='small' />
            <Link to={`/order-management/orders/edit-order/${record.id}`}>
              <Button icon='edit' className='mr-1' size='small' />
            </Link>
          </span>
        )
      }
    ]

    return (
      <div>
        <Helmet title='Orders List' />
        <div className='card'>
          <div className='card-header'>
            <div className='utils__title'>
              <strong>Orders List</strong>
            </div>
            <div className='pull-right'>
              <Tooltip placement='topLeft' title='Add new product'>
                <Button type='link'>
                  <Icon
                    type='plus-circle'
                    theme='filled'
                    style={{ fontSize: '30px' }}
                  />
                </Button>
              </Tooltip>
              {selectedRowKeys.length > 0 && (
                <Tooltip
                  placement='bottomRight'
                  title={
                    selectedRowKeys.length === 1
                      ? 'Delete product'
                      : 'Delete products'
                  }
                >
                  <Popconfirm
                    title={`Delete ${selectedRowKeys.length} ${
                      selectedRowKeys.length === 1 ? 'product?' : 'products?'
                      }`}
                    onConfirm={() => this.handleDelete()}
                  >
                    <Button type='link'>
                      <Icon
                        theme='filled'
                        type='delete'
                        style={{ fontSize: '30px' }}
                      />
                    </Button>
                  </Popconfirm>
                </Tooltip>
              )}
            </div>
          </div>
          <div className='card-body'>
            <Table
              className='utils__scrollTable'
              scroll={{ x: '100%' }}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default OrdersList
