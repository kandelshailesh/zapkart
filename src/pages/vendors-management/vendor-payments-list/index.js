import React from 'react'
import {
  Table,
  Icon,
  Input,
  Button
  // Popconfirm,
  // Tooltip,
  // Dropdown,
  // Menu
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
// import { getFormattedDate, getFormattedTime } from 'utils'
import table from './data.json'
// import styles from '../style.module.scss'

// const MenuItem = Menu.Item

class VendorsList extends React.Component {
  state = {
    tableData: table.data,
    statusRowId: '',
    // data: table.data,
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    selectedRowKeys: []
  }

  handleStatus = ({ key }) => {
    const { tableData, statusRowId } = this.state
    console.log(tableData, statusRowId)

    this.setState({
      tableData: tableData.map(el => {
        return el.vendor_id === statusRowId ? { ...el, status: key } : el
      })
    })
    // console.log(tableData[key])
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      // statusRowId,
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
    },
    render: text => {
      // const { searchText } = this.statereturn
      // console.log(searchText)
      return <span>{text}</span>
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

  handleChange = (pagination, filters, sorters) => {
    console.log('Various parameters', pagination, filters, sorters)
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  activateSelected = () => {
    // const { selectedRowKeys, tableData } = this.state
    // selectedRowKeys.some(function (v) {
    //     return tableData.indexOf(v) >= 0;
    // });
    // tableData.map((item, index) => index == sele)
  }

  disableSeleted = () => {}

  render () {
    const { tableData, selectedRowKeys } = this.state
    console.log(selectedRowKeys)
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange
    // }

    // const menu = (
    //   <Menu onClick={this.handleStatus}>
    //     <MenuItem className='ant-dropdown-link' key='Active'>
    //       Active
    //     </MenuItem>
    //     <MenuItem className='ant-dropdown-link' key='Pending'>
    //       Pending
    //     </MenuItem>
    //     <MenuItem className='ant-dropdown-link' key='Disabled'>
    //       Disabled
    //     </MenuItem>
    //   </Menu>
    // )

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
        title: 'Vendor',
        dataIndex: 'vendor.id',
        key: 'vendor_id',
        render: (text, record) => (
          <Link
            className='utils__link--underlined'
            to={`/vendors/vendor/${record.vendor.id}`}
          >
            {`#${text}`}
          </Link>
        ),
        sorter: (a, b) => a.vendor.id - b.vendor.id,
        ...this.getColumnSearchProps('vendor_id')
      },
      {
        title: 'Vendor Name',
        dataIndex: 'vendor.name',
        key: 'vendor_name',
        sorter: (a, b) => a.vendor.name.localeCompare(b.vendor.name),
        ...this.getColumnSearchProps('vendor_name'),
        render: (text, record) => (
          <Link
            className='utils__link--underlined'
            to={`/vendors/vendor/${record.vendor.id}`}
          >
            {text}
          </Link>
        )
      },
      {
        title: 'Order ID',
        dataIndex: 'order.id',
        key: 'order_id',
        ...this.getColumnSearchProps('order_id'),
        sorter: (a, b) => a.vendor.id - b.vendor.id
      },
      {
        title: 'Order date',
        dataIndex: 'order.date',
        key: 'order_date',
        ...this.getColumnSearchProps('order_id'),
        sorter: (a, b) =>
          new Date(a.order.createdAt).getTime() -
          new Date(b.order.createdAt).getTime()
      },
      {
        title: 'Order Status',
        dataIndex: 'order.status',
        key: 'order_status',
        sorter: (a, b) => {
          if (a.status === b.status) return 0
          if (a.status) return -1
          return 1
        }
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'order_amount',
        ...this.getColumnSearchProps('order_amount'),
        sorter: (a, b) => a.order.amount - b.order.amount
      },
      {
        title: 'Commission',
        dataIndex: 'vendor.commission_percent',
        key: 'commission',
        ...this.getColumnSearchProps('commission'),
        render: (text) => {return (
          `${text}%`
        )}
      },
      {
        title: 'owing',
        dataIndex: 'owing',
        key: 'owing',
        ...this.getColumnSearchProps('owing'),
        render: (text, record) => {
          if (parseInt(record.owing, 10) > 0) {
            return <span className='badge badge-danger'>{text}</span>
          }
          return <span className='badge badge-success'>{text}</span>
        }
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

            <Button size='small'>Pay</Button>
          </span>
        )
      }
    ]

    return (
      <div>
        <Helmet title='Vendors Payments' />
        <div className='card'>
          <div className='card-header'>
            <div className='utils__title'>
              <strong>Vendors Payments</strong>
            </div>
          </div>
          <div className='card-body'>
            <Table
              className='utils__scrollTable tableCustom'
              scroll={{ x: '100%' }}
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
              onChange={this.handleChange}
              rowKey='id'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default VendorsList
