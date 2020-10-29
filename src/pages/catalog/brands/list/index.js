/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  Icon,
  Dropdown,
  // Input,
  Button,
  Popconfirm,

  // Tooltip
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
import Menu from 'components/Menu'
import { getBrands, editBrandStatus, deleteBrand } from 'services/brands'
import { LINKS } from '_constants'
import FilterProvider from 'components/RenderProps/FiltersProvider'

const menuItems = [
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'hold',
    title: 'Hold',
  },
]

class BrandsList extends React.Component {
  state = {
    tableData: [],
    loading: true,
    // // data: table.data,
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    selectedRowKeys: [],
  }

  // onInputChange = e => {
  //   this.setState({ searchText: e.target.value })
  // }

  componentDidMount() {
    this.fetchDetails()
  }

  handleMenuClick = async e => {
    const { clickedId, tableData } = this.state
    // console.log('clicked on', e.key, clickedId)
    const isUpdated = await editBrandStatus(clickedId, e.key)
    if (isUpdated) {
      const recordIndex = tableData.findIndex(item => item._id === clickedId)
      tableData[recordIndex].status = e.key
      return this.setState(prev => ({
        ...prev.data,
        clickedId: null,
      }))
    }
    this.setState({ clickedId: null })
    return null
  }

  handleStatusClick = id => {
    this.setState({ clickedId: id })
  }

  handleDelete = async id => {
    const isDeleted = await deleteBrand(id)
    if (isDeleted) {
      this.setState(m => {
        const newData = m.tableData.filter(i => i._id !== id)
        return {
          ...m,
          tableData: newData,
        }
      })
    }
  }

  fetchDetails = async () => {
    this.setState({
      loading: true,
    })
    const res = await getBrands()
    if (res && res.data) this.setState({ loading: false, tableData: res.data })
    else {
      this.setState({ loading: false })
    }
  }

  // getColumnSearchProps = dataIndex => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     // statusRowId,
  //     clearFilters,
  //   }) => (
  //       // eslint-disable-next-line react/jsx-indent
  //       <div style={{ padding: 8 }}>
  //         <Input
  //           ref={node => {
  //             this.searchInput = node
  //           }}
  //           placeholder={`Search ${dataIndex}`}
  //           value={selectedKeys[0]}
  //           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //           onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
  //           style={{ width: 188, marginBottom: 8, display: 'block' }}
  //         />
  //         <Button
  //           type="primary"
  //           onClick={() => this.handleSearch(selectedKeys, confirm)}
  //           icon="search"
  //           size="small"
  //           style={{ width: 90, marginRight: 8 }}
  //         >
  //           Search
  //         </Button>
  //         <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
  //           Reset
  //         </Button>
  //       </div>
  //     ),
  //   filterIcon: filtered => (
  //     <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       .toString()
  //       .toLowerCase()
  //       .includes(value.toLowerCase()),
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //       setTimeout(() => this.searchInput.select())
  //     }
  //   },
  //   render: text => {
  //     // const { searchText } = this.statereturn
  //     // console.log(searchText)
  //     return <span>{text}</span>
  //   },
  // })

  // handleSearch = (selectedKeys, confirm) => {
  //   confirm()
  //   // this.setState({ searchText: selectedKeys[0] })
  // }

  // handleReset = clearFilters => {
  //   clearFilters()
  //   // this.setState({ searchText: '' })
  // }

  // linkSearchInput = node => {
  //   this.searchInput = node
  // }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  render() {
    // /catalog/brands/brand/:id - edit-brand
    // /catalog/brands/add-brand - add-brand
    const { tableData, selectedRowKeys, loading } = this.state
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // }

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        search: true,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Thumbnail',
        dataIndex: 'image',
        key: 'image[0].thumbnail',
        render: (_, record) => (
          <span className="thumbnail-area">
            <img src={record.image[0].thumbnail} alt={record.name} />
          </span>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          let badge = 'badge-success'
          if (record.status === 'hold') badge = 'badge-danger'
          return (
            <Dropdown
              // eslint-disable-next-line react/destructuring-assignment
              // visible={this.state.clickedId === record._id}
              overlay={menu}
              ref={this.clickId}
              id={record._id}
              onClick={() => this.handleStatusClick(record._id)}
              trigger={['click']}
            >
              <span className={`font-size-12 badge ${badge} 'badgeText'`}>
                {text.toUpperCase()}
                <Icon type="down" />
              </span>
            </Dropdown>
          )
        },
        filters: [
          {
            label: 'Active',
            value: 'active',
          },
          {
            label: 'Hold',
            value: 'hold',
          },
        ],
      },
      {
        title: 'Action',
        key: 'action',
        render: record => (
          <span>
            <Link to={`${LINKS.editBrand}/${record._id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>
            {tableData.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record._id)}>
                <Button icon="close" size="small" />
              </Popconfirm>
            ) : null}
          </span>
        ),
      },
    ]

    return (
      <div>
        <Helmet title="Brands List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Brands List</strong>
              <AddNew
                add
                selectedRowKeys={selectedRowKeys}
                attribute="brand"
                link={`${LINKS.addBrand}`}
                handleDelete={this.handleDelete}
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
                      selectedRowKeys.length === 1 ? 'product' : 'products'
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

          <div className="card-body">
            <FilterProvider columns={columns} data={tableData}>
              {filteredData => (
                <Table
                  loading={loading}
                  className="utils__scrollTable"
                  scroll={{ x: '100%' }}
                  // rowSelection={rowSelection}
                  columns={columns}
                  dataSource={filteredData}
                  rowKey={record => record._id}
                />
              )}
            </FilterProvider>
          </div>
        </div>
      </div>
    )
  }
}

export default BrandsList
