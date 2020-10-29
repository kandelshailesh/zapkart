/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer, useState } from 'react'
import { notification, Button } from 'antd'
import Table from 'components/Table'
import useFetching from 'hooks/useFetching'
import isEmpty from 'lodash/isEmpty'
import { CATALOG_API_URL, CATALOG_BANNER_API_URL } from '_constants'
import { reducer, initialState } from './reducer'

const scrollStyle = { y: 240 }

const itemsPerPageOptions = [4, 10, 20, 50, 100]

const Products = ({ onAdd, onCancel, listType }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const [state, dispatch] = useReducer(reducer, initialState)

  const listTypeUrl = {
    brands: CATALOG_API_URL.getBrands,
    products: `/api/catalog/v1/products?status=active&page=${state.current}&limit=${
      state.pageSize
    }${isEmpty(state.sortQuery) ? '' : `&${state.sortQuery}`}${
      isEmpty(state.searchQuery) ? '' : `&${state.searchQuery}`
    }${isEmpty(state.filterQuery) ? '' : `&${state.filterQuery}`}`,
    category: CATALOG_API_URL.getCategories,
    banner: `${CATALOG_BANNER_API_URL.getBanners}/query?status=active`,
  }

  const [{ response, loading, error }] = useFetching(listTypeUrl[listType])

  useEffect(() => {
    if (response && response.data) {
      console.log(response)
      dispatch({
        type: 'setProducts',
        payload: response.data,
      })
      dispatch({
        type: 'setTotal',
        payload: response.total,
      })
    }
    console.log(error, response)
    if (error) {
      dispatch({
        type: 'clearProducts',
      })
      dispatch({
        type: 'clearPagination',
      })
      notification.error({
        message: 'Error',
        description: error.message,
      })
    }
  }, [response, error])

  const rowSelection = (val) => {
    setSelectedRowKeys(val)
  }

  const handleAdd = () => {
    if (onAdd) onAdd(selectedRowKeys)
  }
  const handleCancel = () => {
    if (onCancel) onCancel([])
  }
  const setRowKey = (record) => {
    // console.log(record)
    return record._id
  }

  const handleTableChange = ({ pagination: params, sorters: sortParams, filters }) => {
    console.log('list handleTableChange params', params, sortParams, filters)
    dispatch({
      type: 'setCurrentPage',
      payload: params.current,
    })
    dispatch({
      type: 'setPageSize',
      payload: params.pageSize,
    })

    if (!isEmpty(sortParams)) {
      console.log('sortParams.field', sortParams.field)
      console.log('sortParams.order', sortParams.order)
      dispatch({
        type: 'setSorters',
        payload: {
          sortField: sortParams.field,
          sortOrder: sortParams.order,
        },
      })
      // const sortObj = {
      //   sort: {
      //     [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
      //   },
      // }
      // setSortQuery(qs.stringify(sortObj))
    } else {
      dispatch({
        type: 'clearSorters',
      })
    }

    dispatch({
      type: 'setSearchers',
      payload: filters.search,
    })
    dispatch({
      type: 'setFilters',
      payload: filters.filters,
    })
    // setSearchQuery(qs.stringify({ search: filters.search }))
  }

  const pagination = {
    current: state.current,
    pageSize: state.pageSize,
    total: state.total,
  }

  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <div className="thumbnail-area">
          <img
            src={record.image ? record.image[0]?.thumbnail : record.images[0]?.thumbnail}
            alt=""
          />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      multiple: 1,
      search: true,
    },
  ]

  return (
    <>
      <Table
        loading={loading}
        scrollStyle={scrollStyle}
        pagination={pagination}
        currentPage={pagination.current}
        limit={pagination.pageSize}
        total={pagination.total}
        limits={itemsPerPageOptions}
        onRowSelect={rowSelection}
        columns={columns}
        dataSource={state.products}
        rowKey={setRowKey}
        onChange={handleTableChange}
      />
      {selectedRowKeys && selectedRowKeys.length > 0 && (
        <div className="row">
          <div className="col-12">
            <Button type="primary" onClick={handleAdd}>
              ADD
            </Button>
            {` OR `}
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Products
