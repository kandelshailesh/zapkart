/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Table, Icon, Input, Button, notification, Skeleton, Popconfirm } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import axios from 'axios'
import { API_URL, FAILED, LINKS, SUCCESS, DELETE_SUCCESS_MESSAGE } from '_constants'

class OffersList extends React.Component {
  state = {
    tableData: [],
    // data: table.data,
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    selectedRowKeys: [],
    loading: false,
  }

  fetchOffers = async () => {
    const url = API_URL.offersUrl
    this.setState({
      loading: true,
    })
    axios.get(url).then(
      response => {
        console.log(response)
        this.setState({
          loading: false,
          tableData: response.data.data,
        })
      },
      error => {
        console.log(error)
        notification.error({
          message: FAILED,
          description: error.message,
        })
        this.setState({
          loading: false,
        })
      },
    )
    //   const options = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   }
  }

  componentDidMount = () => {
    this.fetchOffers()
  }

  handleDeleteSelected = () => {
    console.log('will delete selected product(s)')
    const { selectedRowKeys } = this.state
    this.fetchDelete(selectedRowKeys)
  }

  handleDeleteSingle = id => {
    console.log('will delete product')
    const idArr = []
    idArr.push(id)
    console.log(idArr)
    this.fetchDelete(idArr)
  }

  fetchDelete = (arr = []) => {
    console.log(arr)
    let str = ''
    arr.forEach(item => {
      str += `id[]=${item}&`
      console.log(str)
    })
    const query = str.slice(0, str.length - 1)
    console.log(query)
    const url = `${API_URL.offersUrl}?${query}`
    axios.delete(url).then(
      response => {
        console.log(response)
        notification.success({
          message: SUCCESS,
          description: DELETE_SUCCESS_MESSAGE,
        })
        this.setState({
          tableData: [],
        })
        this.fetchOffers()
      },
      error => {
        notification.error({
          message: FAILED,
          description: error.message,
        })
      },
    )
  }

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = () => {
    const { searchText, tableData } = this.state
    const reg = new RegExp(searchText, 'gi')
    this.setState({
      //   filterDropdownVisible: false,
      //   filtered: !!searchText,
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
                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
                  )}
              </span>
            ),
          }
        })
        .filter(record => !!record),
    })
  }

  //   linkSearchInput = node => {
  //     this.searchInput = node
  //   }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    // this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => {
    clearFilters()
    // this.setState({ searchText: '' })
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      // statusRowId,
      clearFilters,
    }) => (
      // eslint-disable-next-line react/jsx-indent
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

  render() {
    const {
      tableData,
      //     searchText,
      //     filtered,
      //     filterDropdownVisible,
      selectedRowKeys,
      loading,
      //     // count,
    } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    const columns = [
      // coupon_name
      // code
      // type
      // discount
      // totalAmount
      // customerLogin
      // freeShipping
      // products
      // categories
      // startDate
      // endDate
      // usesPerCoupon
      // usesPerCustomer
      // status
      //   {
      //     title: 'ID',
      //     dataIndex: '_id',
      //     key: '_id',
      //     ...this.getColumnSearchProps('_id'),
      //     // render: (text, record) => (
      //     //   <Link className="utils__link--underlined" to={`${LINKS.editOffer}/${record._id}`}>
      //     //     {`#${text}`}
      //     //   </Link>
      //     // ),
      //     sorter: (a, b) => a._id - b._id,
      //   },
      {
        title: 'Coupon name',
        dataIndex: 'couponName',
        key: 'couponName',
        ...this.getColumnSearchProps('couponName'),
        sorter: (a, b) => a.couponName - b.couponName,
      },
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        ...this.getColumnSearchProps('code'),
        sorter: (a, b) => a.code - b.code,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        sorter: (a, b) => a.type - b.type,
        filters: [
          {
            text: '%',
            value: 'percentage',
          },
          {
            text: 'Fixed Amount',
            value: 'fixedAmount',
          },
        ],
        render: (text, record) => {
          if (record.type === 'percentage') {
            return '%'
          }
          if (record.type === 'fixedAmount') {
            return 'Fixed amount'
          }
          return ''
        },
        onFilter: (value, record) => record.type.indexOf(value) === 0,
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        sorter: (a, b) => a.discount - b.discount,
      },
      {
        title: 'Total amount',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        sorter: (a, b) => a.totalAmount - b.totalAmount,
      },
      {
        title: 'Customer Login',
        dataIndex: 'customerLogin',
        key: 'customerLogin',
        render: (text, record) =>
          record.customerLogin ? (
            <span>
              <Icon type="check" />
            </span>
          ) : (
            <span>
              <Icon type="close" />
            </span>
          ),
        filters: [
          {
            text: 'Yes',
            value: 'true',
          },
          {
            text: 'No',
            value: 'false',
          },
        ],
        onFilter: (value, record) => record.customerLogin.toString().indexOf(value) === 0,
        // sorter: (a, b) => a.customerLogin - b.customerLogin,
      },
      {
        title: 'Free shipping',
        dataIndex: 'freeShipping',
        key: 'freeShipping',
        // sorter: (a, b) => a.freeShipping - b.freeShipping,
        render: (text, record) =>
          record.freeShipping ? (
            <span>
              <Icon type="check" />
            </span>
          ) : (
            <span>
              <Icon type="close" />
            </span>
          ),
        filters: [
          {
            text: 'Yes',
            value: 'true',
          },
          {
            text: 'No',
            value: 'false',
          },
        ],
        onFilter: (value, record) => record.freeShipping.toString().indexOf(value) === 0,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) =>
          record.status === 'enabled' ? (
            <span className="badge badge-success">Enabled</span>
          ) : (
            <span className="badge badge-danger">Disabled</span>
          ),
        filters: [
          {
            text: 'Enabled',
            value: 'enabled',
          },
          {
            text: 'Disabled',
            value: 'disabled',
          },
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
      },
      {
        title: 'Action',
        key: 'action',
        render: record => (
          <span>
            <Link to={`${LINKS.offersList}/${record._id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>
            {tableData.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDeleteSingle(record._id)}
              >
                <Button icon="close" size="small" />
              </Popconfirm>
            ) : null}
          </span>
        ),
      },
    ]

    return (
      <div>
        <Helmet title="Offers List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Offers List</strong>
              <AddNew
                add
                selectedRowKeys={selectedRowKeys}
                handleDelete={this.handleDeleteSelected}
                attribute="offer"
                link={LINKS.addOffer}
              />
            </div>
            {/* <div className='pull-right'>
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
        </div> */}
          </div>
          {loading && (
            <div className="card-body">
              <Skeleton active />
            </div>
          )}
          {!loading && (
            <div className="card-body">
              <Table
                className="utils__scrollTable"
                scroll={{ x: '100%' }}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={tableData}
                rowKey={record => record._id}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default OffersList
