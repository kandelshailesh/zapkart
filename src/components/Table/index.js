/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Table as AntdTable, Select, Popconfirm, Button } from 'antd'
import SearchAndFilters from 'components/SearchAndFilters'
import omit from 'lodash/omit'
import PropTypes from 'prop-types'

const defaultScrollStyle = { x: '100%' }

const Table = (props) => {
  const {
    limits,
    limit: l,
    className,
    scrollStyle,
    columns,
    loading,
    currentPage,
    total,
    onDelete,
    onRowSelect,
    actionButtons,
    onActionClick,
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  console.log(pagination)

  useEffect(() => {
    const { onChange } = props
    console.log('useeffect', pagination)
    if (onChange)
      onChange({
        pagination, // filters: tableFilters.
        sorters: tableSorters,
        filters: searchers,
      })
  }, [tableFilters, tableSorters, pagination, searchers])

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      current: Number(currentPage),
      total,
    }))
  }, [initialLimit, currentPage, total])

  const handleLimitChange = (selLimit) => {
    // const { onLimitChange } = props
    setPagination((a) => ({ ...a, pageSize: Number(selLimit) }))
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

  const handlefiltersSearch = (params) => {
    console.log(params)
    setSearchers(params)
  }

  const handleClearFilters = () => {
    setSearchers({})
  }

  const onSelectChange = (sRkeys, selectedRowDetails) => {
    console.log('selectedRowKeys changed: ', sRkeys, selectedRowDetails)
    setSelectedRowKeys(sRkeys)
    if (onRowSelect) onRowSelect(selectedRowDetails)
  }
  const handleAcction = (actionType) => {
    console.log('aaaa', actionType)
    if (onActionClick) onActionClick(selectedRowKeys, actionType)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const handleDelete = () => {
    if (onDelete) onDelete(selectedRowKeys)
  }

  const restProps = omit(props, ['initialLimit', 'limit', 'limits', 'className', 'onChange'])
  // transform columns array removing search & filters before passing to antd table
  const transformedColumns = columns.map((i) => {
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
      {limits.length > 0 && (
        <div className="right-flex">
          <span>
            <strong>Items per page:&nbsp;</strong>
          </span>
          <Select value={Number(pagination.pageSize)} onChange={handleLimitChange}>
            {limits.map((i) => (
              <Select.Option key={i}>{Number(i)}</Select.Option>
            ))}
          </Select>
        </div>
      )}
      {onDelete && selectedRowKeys.length > 0 && (
        <Popconfirm
          placement="topLeft"
          title={`Delete ${selectedRowKeys.length} item(s)?`}
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" className="mb-2 d-flex ml-auto align-items-center">
            Delete
          </Button>
        </Popconfirm>
      )}
      {actionButtons && selectedRowKeys.length > 0 && (
        <div className="pull-right" style={{ zIndex: 1, position: 'relative' }}>
          {console.log('pops', actionButtons, selectedRowKeys)}
          {actionButtons?.map((i) => {
            console.log('pops', i)
            const { actionType, Component } = i
            return (
              <span className="mr-2" key={i.key}>
                {React.cloneElement(Component, {
                  onClick: () => {
                    handleAcction(actionType)
                  },
                })}
              </span>
            )
          })}
        </div>
      )}
      <AntdTable
        {...restProps}
        columns={transformedColumns}
        className={`utils__scrollTable ${className || ''} `}
        // loading={props.loading}
        scroll={scrollStyle || defaultScrollStyle}
        pagination={pagination}
        rowSelection={rowSelection}
        // columns={props.columns}
        // dataSource={props.products}
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
