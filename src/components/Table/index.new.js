/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Table as AntdTable, Select } from 'antd'
import SearchAndFilters from 'components/SearchAndFilters'
import omit from 'lodash/omit'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import startsWith from 'lodash/startsWith'

const defaultScrollStyle = { x: '100%' }

const Table = props => {
  const {
    limits,
    limit: l,
    className,
    scrollStyle,
    columns,
    loading,
    currentPage,
    total,
    dataSource,
    onChange,
  } = props
  let { initialLimit } = props
  initialLimit = initialLimit || l

  // const [limit, setLimit] = useState(initialLimit)
  const [pagination, setPagination] = useState({
    current: currentPage,
    pageSize: initialLimit,
    total,
  })
  const [tableFilters, setFilters] = useState({})
  const [tableSorters, setSorters] = useState({})
  const [searchers, setSearchers] = useState({})
  const [tableData, setTabledata] = useState(dataSource)

  console.log(pagination)

  useEffect(() => {
    if (!onChange) handleFiltersLocal()
  }, [searchers])

  useEffect(() => {
    console.log('useeffect', pagination)
    if (onChange)
      onChange({
        pagination, // filters: tableFilters.
        sorters: tableSorters,
        filters: searchers,
      })
  }, [tableFilters, tableSorters, pagination, searchers])

  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      current: Number(currentPage),
      total,
    }))
  }, [initialLimit, currentPage, total])

  const handleLimitChange = selLimit => {
    // const { onLimitChange } = props
    setPagination(a => ({ ...a, pageSize: Number(selLimit) }))
    // if (onLimitChange) onLimitChange(l)
  }

  const handleTableChange = (paginationParams, filters, sorters) => {
    console.log('handleTableChange params', paginationParams, sorters)
    const pager = { ...paginationParams, ...pagination }
    pager.current = paginationParams.current
    // pager.pageSize = limit
    setPagination(pager)
    setFilters(filters)
    setSorters(sorters)
    // if (onChange) onChange(paginationParams, filters, sorters)
  }

  const handlefiltersSearch = params => {
    console.log(params)
    setSearchers(params)
  }

  const handleClearFilters = () => {
    setSearchers({})
  }

  const handleFiltersLocal = a => {
    const { search, filters } = searchers
    console.log(a)
    if (isEmpty(search) && isEmpty(filters)) return resetData()
    setTabledata(prev => {
      let filteredData = []
      if (!isEmpty(filters))
        Object.entries(filters).forEach(([key, value]) => {
          filteredData = prev.filter(i => i[key] === value)
        })
      if (!isEmpty(search))
        Object.entries(search).forEach(([key, value]) => {
          filteredData = (filteredData.length > 0 ? filteredData : prev).filter(i => {
            console.log(i[key].toLowerCase(), value.toLowerCase())
            return startsWith(i[key].toLowerCase(), value.toLowerCase())
          })
        })

      return filteredData
    })
    return null
  }

  const resetData = () => {
    setTabledata(dataSource)
  }

  const restProps = omit(props, ['initialLimit', 'limit', 'limits', 'className', 'onChange'])
  // transform columns array removing search & filters before passing to antd table
  const transformedColumns = columns.map(i => {
    const requiredProps = omit(i, ['search', 'filters'])
    return requiredProps
  })

  return (
    <>
      <SearchAndFilters
        attributes={columns}
        onSubmit={handlefiltersSearch}
        onCancel={handleClearFilters}
        loading={loading}
      />
      {limits && limits.length > 0 && (
        <div className="right-flex">
          <span>
            <strong>Items per page:&nbsp;</strong>
          </span>
          <Select value={Number(pagination.pageSize)} onChange={handleLimitChange}>
            {limits.map(i => (
              <Select.Option key={i}>{Number(i)}</Select.Option>
            ))}
          </Select>
        </div>
      )}
      <AntdTable
        {...restProps}
        columns={transformedColumns}
        className={`utils__scrollTable ${className || ''} `}
        // loading={props.loading}
        scroll={scrollStyle || defaultScrollStyle}
        pagination={pagination}
        // rowSelection={props.rowSelection}
        // columns={props.columns}
        dataSource={tableData}
        // rowKey={props.setRowKey}
        onChange={handleTableChange}
      />
    </>
  )
}

Table.propTypes = {
  limits: PropTypes.array,
  limit: PropTypes.number,
  initialLimit: PropTypes.number,
}

Table.defaultProps = {
  limits: [],
  limit: 0,
  initialLimit: 0,
}

export default Table
