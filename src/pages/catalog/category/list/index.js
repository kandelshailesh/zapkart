/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  // Icon, Input,
  Button,
  notification,
  Dropdown,
  Icon,
  Popconfirm,
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
// import SearchProvider from 'components/RenderProps/SearchProvider'
import Menu from 'components/Menu'
import { getCategories, editStatus, deleteCategory, editCategory } from 'services/categories'
import { LINKS, STRINGS } from '_constants'
// import SearchAndFilters from 'components/SearchAndFilters'
// import startsWith from 'lodash/startsWith'
// import isEmpty from 'lodash/isEmpty'
// import Table from 'components/Table'
import FilterProvider from 'components/RenderProps/FiltersProvider'
import omit from 'lodash/omit'
import EditableCell from 'components/EditableCellNumber'
// import styles from './style.module.scss'

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

class CategoryList extends React.PureComponent {
  state = {
    // tableData: [],
    data: [],
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    loading: false,
    selectedRowKeys: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true })
    const data = await getCategories()

    if (data && data.length > 0) this.setState({ loading: false, data })
    else {
      this.setState({ loading: false })
      notification.warning({
        message: 'No categories',
      })
    }
  }

  handleMenuClick = async e => {
    const { clickedId, data } = this.state
    // console.log('clicked on', e.key, clickedId)
    const isUpdated = await editStatus(clickedId, e.key)
    if (isUpdated) {
      notification.success({ message: STRINGS.editSuccess })
      const recordIndex = data.findIndex(item => item._id === clickedId)
      data[recordIndex].status = e.key
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
    const a = await deleteCategory(id)
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: STRINGS.deleteSuccess,
      })
      this.setState(prev => {
        const newData = prev.data.filter(i => i._id !== id)
        return {
          ...prev,
          data: [...newData],
        }
      })
    }
  }

  onCellChange = (id, key) => {
    return async value => {
      console.log(id, key, value)
      const edited = await editCategory(id, { [key]: value })
      if (edited) {
        notification.success({ message: STRINGS.editSuccess })
        return true
      }
      return false
    }
  }

  onSelectChange = sRkeys => {
    console.log('selectedRowKeys changed: ', sRkeys)
    this.setState({ selectedRowKeys: sRkeys })
  }

  deleteRecords = () => {
    this.setState({ loading: true })
    console.log('will delete ok')
    this.setState({ loading: false })
  }

  render() {
    const {
      loading,
      data,
      selectedRowKeys,
      // searchText, filtered, filterDropdownVisible
    } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        render: text => <span className="capitalize">{text}</span>,
        search: true,
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
        title: 'Priority Order',
        dataIndex: 'priorityOrder',
        key: 'priorityOrder',
        sorter: (a, b) => a.priorityOrder - b.priorityOrder,
        render: (text, record) => (
          <EditableCell
            type="number"
            value={text}
            onChange={this.onCellChange(record._id, 'priorityOrder')}
          />
        ),
      },
      {
        title: 'Parent Category',
        dataIndex: 'parent',
        key: 'parent',
        render: (_, record) => (
          <span className="capitalize">
            {record.parent && record.parent.name ? record.parent.name : '-'}
          </span>
        ),
        // sorter: (a, b) => a.parent - b.parent,
      },
      {
        title: 'Action',
        key: 'action',
        render: record => (
          <span>
            <Link to={`/catalog/category/edit/${record._id}`}>
              <Button icon="edit" className="mr-1" size="small" />
            </Link>
            <Button icon="close" onClick={() => this.handleDelete(record._id)} size="small" />
          </span>
        ),
      },
    ]

    return (
      <div>
        <Helmet title="Category List" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Category List</strong>
              <AddNew add link={LINKS.addCategory} attribute="category" />
            </div>
          </div>

          <div className="card-body">
            {/* <SearchProvider columns={columns}>
                 {columnsWithSearch => ( */}

            <FilterProvider data={data} columns={columns}>
              {filteredData => (
                <>
                  {selectedRowKeys.length > 0 && (
                    <Popconfirm
                      placement="topLeft"
                      title={`Delete ${selectedRowKeys.length} item(s)?`}
                      onConfirm={this.deleteRecords}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="primary" className="mb-2 d-flex ml-auto align-items-center">
                        Delete
                      </Button>
                    </Popconfirm>
                  )}
                  <Table
                    className="utils__scrollTable"
                    scroll={{ x: '100%' }}
                    rowKey={record => record._id}
                    columns={columns.map(i => omit(i, ['filters']))}
                    loading={loading}
                    dataSource={filteredData}
                    rowSelection={rowSelection}
                  />
                </>
              )}
            </FilterProvider>
            {/* )}
               </SearchProvider> */}
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryList
