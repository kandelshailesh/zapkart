/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Input, Button, Icon } from 'antd'
import resolvePath from 'object-resolve-path'

class SearchTable extends React.Component {
  state = {
    // searchText: '',
    // selectedRowKeys: [],
  }

  componentDidUpdate() {
    // console.log('componentiDidUpdate', 'withSearch')
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    // this.setState({ searchText: selectedKeys[0] })
  }

  handleReset = clearFilters => {
    clearFilters()
    // this.setState({ searchText: '' })
  }

  getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node
          }}
          placeholder={`Search ${title}`}
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
    onFilter: (value, record) => {
      // console.log(dataIndex, record, resolvePath(record, dataIndex))
      return resolvePath(record, dataIndex)
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select())
      }
    },
  })

  render() {
    const { columns, children } = this.props
    const columnsWithSearch = columns.map(col => {
      let colAttributes = { ...col }
      // if (searchColumns.indexOf(col.dataIndex) !== -1)
      if (col.search)
        colAttributes = { ...col, ...this.getColumnSearchProps(col.dataIndex, col.title) }
      return colAttributes
    })

    return children(columnsWithSearch)
  }
}

export default SearchTable
