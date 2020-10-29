import React from 'react'
import { Table, Icon, Input, Button, Popconfirm, Skeleton } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import AddNew from 'components/CustomComponents/AddNew'

// import table from './data.json'
// import { ATTRIBUTES_GROUPS_URL } from '../.././../config.json'
// import styles from './style.module.scss'


const ATTRIBUTES_GROUPS_URL = '/api/attributesGroup'
class AttributesList extends React.Component {
  abortController = new AbortController()

  state = {
    // tableData: table.data,
    // data: table.data,
    data: [],
    // editedValues :[],
    // deletedValues: [],
    // newValues: [],
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    loading: false
  }
  
  componentDidMount() {
    this.fetchUsers();
  }

componentWillUnmount() {
    this.abortController.abort()
  }


  fetchUsers = async () => {
    this.setState({
      loading: true
    })
    const url = ATTRIBUTES_GROUPS_URL;
    const options = {
      METHOD: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }
    const response = await fetch(url, options, { signal: this.abortController.signal})
    if (response.ok) {
      const responseData = await response.json()
      if (responseData.data.length > 0) {
        this.setState({
          loading: false,
          data: responseData.data
        })
      }
    }
  }

  handleDelete = key => {
    const { data } = this.state
    const dataSource = [...data]
    this.setState({ data: dataSource.filter(item => item.key !== key) })
  }

  onInputChange = e => {
    this.setState({ searchText: e.target.value })
  }

  onSearch = () => {
    const { searchText, data: tableData } = this.state
    const reg = new RegExp(searchText, 'gi')
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: tableData
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

  render() {
    const { data, searchText, filtered, filterDropdownVisible, loading } = this.state

    const columns = [
      {
        title: 'ID',
        dataIndex: '_id',
        key: 'id',
        render: (text, record) => (
          <Link
            className='utils__link--underlined'
            to={`/catalog/attributes/${record.id}`}
          >
            {text}
          </Link>
        ),
        sorter: (a, b) => a.id - b.id
      },
      {
        title: 'Attribute Group',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        render: (text, record) => (
          <Link
            className='utils__link--underlined'
            to={`/catalog/attributes/${record.id}`}
          >
            {text}
          </Link>
        ),
        filterDropdown: (
          <div className='custom-filter-dropdown'>
            <Input
              ref={this.linkSearchInput}
              placeholder='Search attribute group'
              value={searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type='primary' onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type='search'
            style={{ color: filtered ? '#108ee9' : '#aaa' }}
          />
        ),
        filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible
            },
            () => this.searchInput && this.searchInput.focus()
          )
        }
      },
      {
        title: 'Action',
        key: 'action',
        render: record => (
          <span>
            <Link to={`/catalog/attributes/${record.id}`}>
              <Button icon='edit' className='mr-1' size='small' />
            </Link>

            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => this.handleDelete(record.key)}
            >
              <Button icon='close' size='small' />
            </Popconfirm>
          </span>
        )
      }
    ]

    // if (loading) return <Skeleton active />
    return (
      <div>
        <Helmet title='Attributes List' />
        <div className='card'>
          <div className='card-header'>
            <div className='utils__title'>
              <strong>Attributes Listsaaaaa</strong>
              hiiiiiiii
              <AddNew add title="Add new attribute group" link='/' />
            </div>
          </div>
          {loading && (<div className='card-body'><Skeleton active /></div>)}
          {!loading &&
            <div className='card-body'>
              <Table
                className='utils__scrollTable'
                scroll={{ x: '100%' }}
                columns={columns}
                dataSource={data}
                rowKey={record => record.id}
              />
            </div>}
        </div>
      </div>
    )
  }
}

export default AttributesList
