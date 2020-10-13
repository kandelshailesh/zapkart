/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Table,
  // Icon, Input,
  Button,
  notification,
  Dropdown,
  Icon,
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'
// import SearchProvider from 'components/RenderProps/SearchProvider'
import Menu from 'components/Menu'
import { getCategories, editStatus, deleteCategory } from 'services/categories'
import { LINKS, STRINGS } from '_constants'
import SearchAndFilters from 'components/SearchAndFilters'
import omit from 'lodash/omit'
import startsWith from 'lodash/startsWith'
import isEmpty from 'lodash/isEmpty'
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

class CategoryList extends React.Component {
  state = {
    tableData: [],
    data: [],
    // filterDropdownVisible: false,
    // searchText: '',
    // filtered: false,
    loading: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true })
    const data = await getCategories()

    if (data && data.length > 0) this.setState({ loading: false, data, tableData: data })
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
      const recordIndex = data.findIndex(item => item._id === clickedId)
      data[recordIndex].status = e.key
      return this.setState(prev => ({
        ...prev.data,
        clickedId: null,
      }))
    }
    this.setState({ clickedId: null })
    // notification.error({
    //   message: 'Error!',
    //   description: 'Error updating! Please try again later!',
    // })
    return null
    // try {
    //   const a = await fetchA(`/api/departments/${clickedId}/?status=${e.key}`, { method: 'PATCH' })
    //   // console.log(a)
    //   if (a) {
    //     const recordIndex = data.findIndex(item => item._id === clickedId)
    //     data[recordIndex].status = e.key
    //     return this.setState(prev => ({
    //       ...prev.data,
    //       clickedId: null,
    //     }))
    //   }
    //   throw new Error()
    // } catch (err) {
    //   this.setState({ clickedId: null })
    //   notification.error({
    //     message: 'Error!',
    //     description: 'Error updating! Please try again later!',
    //   })
    // }
    // return null
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

  handleFilters = a => {
    console.log(a)
    if (isEmpty(a.search) && isEmpty(a.filters)) return this.resetData()
    this.setState(prev => {
      let filteredData = []
      if (!isEmpty(a.filters))
        Object.entries(a.filters).forEach(([key, value]) => {
          filteredData = prev.data.filter(i => i[key] === value)
        })
      if (!isEmpty(a.search))
        Object.entries(a.search).forEach(([key, value]) => {
          filteredData = (filteredData.length > 0 ? filteredData : prev.data).filter(i => {
            console.log(i[key].toLowerCase(), value.toLowerCase())
            return startsWith(i[key].toLowerCase(), value.toLowerCase())
          })
        })

      return {
        ...prev,
        tableData: filteredData,
      }
    })
    return null
  }

  resetData = () => {
    this.setState(prev => ({
      ...prev,
      tableData: prev.data,
    }))
  }

  // onInputChange = e => {
  //   this.setState({ searchText: e.target.value })
  // }

  // onSearch = () => {
  //   const { searchText, tableData } = this.state
  //   const reg = new RegExp(searchText, 'gi')
  //   this.setState({
  //     filterDropdownVisible: false,
  //     filtered: !!searchText,
  //     data: tableData
  //       .map(record => {
  //         const match = record.name.match(reg)
  //         if (!match) {
  //           return null
  //         }
  //         return {
  //           ...record,
  //           name: (
  //             <span>
  //               {record.name
  //                 .split(reg)
  //                 .map((text, i) =>
  //                   i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text,
  //                 )}
  //             </span>
  //           ),
  //         }
  //       })
  //       .filter(record => !!record),
  //   })
  // }

  // linkSearchInput = node => {
  //   this.searchInput = node
  // }

  render() {
    const {
      loading,
      tableData,
      // searchText, filtered, filterDropdownVisible
    } = this.state

    const menu = <Menu items={menuItems} onClick={this.handleMenuClick} />

    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: '_id',
      //   key: '_id',
      //   render: (text, record) => {
      //     console.log(record)
      //     return (
      //       <Link className="utils__link--underlined" to={`/catalog/category/edit/${record._id}`}>
      //         {text}
      //       </Link>
      //     )
      //   },
      //   // sorter: (a, b) => a._id - b._id
      // },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        render: text => <span className="capitalize">{text}</span>,
        search: true,
        // render: (text, record) => (
        //   <Link
        //     className="utils__link--underlined"
        //     to={{
        //       pathname: `/catalog/category/edit/${record._id}`,
        //       state: {
        //         // fetch from db instead of passing down as prop
        //         record,
        //       },
        //     }}
        //   >
        //     {text}
        //   </Link>
        // ),

        // filterDropdown: (
        //   <div className="custom-filter-dropdown">
        //     <Input
        //       ref={this.linkSearchInput}
        //       placeholder="Search name"
        //       value={searchText}
        //       onChange={this.onInputChange}
        //       onPressEnter={this.onSearch}
        //     />
        //     <Button type="primary" onClick={this.onSearch}>
        //       Search
        //     </Button>
        //   </div>
        // ),
        // filterIcon: <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        // filterDropdownVisible,
        // onFilterDropdownVisibleChange: visible => {
        //   this.setState(
        //     {
        //       filterDropdownVisible: visible,
        //     },
        //     () => this.searchInput && this.searchInput.focus(),
        //   )
        // },
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
            <SearchAndFilters
              onCancel={this.resetData}
              onSubmit={this.handleFilters}
              attributes={columns.map(i => omit(i, 'type'))}
              loading={loading}
            />
            <Table
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              rowKey={record => record._id}
              columns={columns.map(i => omit(i, ['filters']))}
              loading={loading}
              dataSource={tableData}
            />
            {/* )}
               </SearchProvider> */}
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryList
