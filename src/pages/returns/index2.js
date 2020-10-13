import React from 'react'
import { Table, Icon, Input, Button} from 'antd'
import { Helmet } from 'react-helmet'
// import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'

import table from './data.json'

// import styles from './style.module.scss'

class ReturnsList extends React.Component {
  state = {
    tableData: table.data,
    // rmaReasons: table.rma_reasons,
    // rmaStatus: table.rma_status,
    // rmaActions: table.rma_actions,
    // data: table.data,
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    selectedRowKeys: []
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon='search'
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    }
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    // this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => {
    clearFilters()
    // this.setState({ searchText: '' })
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render () {
    // /catalog/brands/brand/:id - edit-brand
    // /catalog/brands/add-brand - add-brand
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
      // return_id
      // order_id
      // user.name
      // quantity
      // action
      // status
      // date
      {
        title: 'Return ID',
        dataIndex: 'return_id',
        key: 'return_id',
        render: (text, record) => (
          <Link
            className='utils__link--underlined'
            to={`/order-management/returns/return/${record.return_id}`}
          >
            {`#${text}`}
          </Link>
        ),
        sorter: (a, b) => a.id - b.id
      },
      {
        title: 'Order ID',
        dataIndex: 'order_id',
        key: 'order_id',
        render: (text, record) => (
          <Link
            className='utils__link--underlined'
            to={`/order-management/orders/order/${record.order_id}`}
          >
            {`#${text}`}
          </Link>
        ),
        sorter: (a, b) => a.id - b.id
      },
      {
        title: 'Customer',
        dataIndex: 'user.name',
        key: 'username',
        sorter: (a, b) => a.user.name.localeCompare(b.user.name),
        render: text =>
          //   <Link
          //     className='utils__link--underlined'
          //     to={`/catalog/brands/brand/${record.product_id}`}
          //   >
          ({ text })
        //   </Link>
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status)
      },
      {
        title: 'Action',
        key: 'action',
        render: record => (
          <span>
            <Link to={`/order-management/returns/return/${record.return_id}`}>
              <Button icon='edit' className='mr-1' size='small'>
                View
              </Button>
            </Link>
          </span>
        )
      }
    ]

    return (
      <div>
        <Helmet title='Returns List' />
        <div className='card'>
          <div className='card-header'>
            <div className='utils__title'>
              <strong>Returns List</strong>
            </div>
          </div>
          <div className='card-body'>
            <Table
              className='utils__scrollTable'
              scroll={{ x: '100%' }}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
              pagination
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ReturnsList
