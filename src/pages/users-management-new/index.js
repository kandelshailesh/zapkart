import React from 'react'
import {
  Table,
  Icon,
  Input,
  Button,
  // Popconfirm,
  Tooltip,
  // Dropdown,
  // Menu
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
// import { getFormattedDate, getFormattedTime } from 'utils'
import table from './data.json'
import styles from './style.module.scss'

// const MenuItem = Menu.Item

class VendorsList extends React.Component {
  state = {
    tableData: table.data,
    statusRowId: '',
    // data: table.data,
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    selectedRowKeys: [],
  }

  handleStatus = ({ key }) => {
    const { tableData, statusRowId } = this.state
    console.log(tableData, statusRowId)

    this.setState({
      tableData: tableData.map(el => {
        return el.vendor_id === statusRowId ? { ...el, status: key } : el
      }),
    })
    // console.log(tableData[key])
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      // statusRowId,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
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
    },
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

  render() {
    const { tableData, selectedRowKeys } = this.state
    console.log(tableData)
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
      // name
      // email
      // ip
      // status
      {
        title: 'User ID',
        dataIndex: 'id',
        key: 'vendor_id',
        width: '5px',
        sorter: (a, b) => a.id - b.id,
        ...this.getColumnSearchProps('id'),
        render: (text, record) => (
          <Link className="utils__link--underlined" to={`/users-management/view-user/${record.id}`}>
            #{text}
          </Link>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps('vendor_name'),
        render: (text, record) => (
          <Link className="utils__link--underlined" to={`/users-management/view-user/${record.id}`}>
            {text}
          </Link>
        ),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...this.getColumnSearchProps('email'),
        sorter: (a, b) => a.email - b.email,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        ...this.getColumnSearchProps('status'),
        render: text => {
          let badge = ''
          if (text === 'active') badge = `${styles.badgeArea} badge badge-success`
          else if (text === 'pending') badge = `${styles.badgeArea} badge badge-danger`
          else if (text === 'pending') badge = `${styles.badgeArea} badge badge-secondary`
          return <span className={`${badge}`}>{text}</span>
        },
      },
      {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
      },
      {
        title: '',
        key: 'action',
        width: '20%',
        render: () => (
          <span>
            <Tooltip title="View">
              <Button icon="eye" className="mr-1" size="small" />
            </Tooltip>
            <Tooltip title="Edit">
              <Button icon="edit" className="mr-1" size="small" />
            </Tooltip>
          </span>
        ),
      },
    ]

    return (
      <div>
        <Helmet title="Users" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Users List</strong>
            </div>
          </div>
          <div className="card-body">
            <Table
              className="utils__scrollTable tableCustom"
              scroll={{ x: '100%' }}
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
              onChange={this.handleChange}
              rowKey="id"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default VendorsList
