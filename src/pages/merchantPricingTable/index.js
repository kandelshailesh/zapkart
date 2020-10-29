/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react'
import { Button, Icon, notification, Dropdown } from 'antd'
import { Helmet } from 'react-helmet'
import Menu from 'components/Menu'
import Table from 'components/Table'
import useFetching from 'hooks/useFetching'
import { editStatus, deleteProductPriceByAdmin } from 'services/priceList'
import isEmpty from 'lodash/isEmpty'
// import Upload from 'components/Upload'
// import { excelUploadSchema } from 'utils/Schema'
// import Form from 'components/Form'
import { connect } from 'react-redux'
import { reducer, initialState } from './reducer'

const scrollStyle = { x: '100%' }

const itemsPerPageOptions = [4, 10, 20, 50, 100]

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

const menuItems2 = [
  {
    key: 'approve',
    title: 'Approve',
  },
  {
    key: 'reject',
    title: 'reject',
  },
  {
    key: 'pending',
    title: 'Pending',
  },
]

const Products = (props) => {
  const { match } = props
  const { params } = match
  const { id } = params
  const [{ response, loading, error }] = useFetching(
    `/api/catalog/v1/productprice/linkproducts/${id}`,
  )
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (response && response?.price && response?.price.length > 0) {
      dispatch({
        type: 'setData',
        payload: response?.price.map((e) => ({
          ...e,
          name: e?.productId?.name || '',
          productId: e?.productId?._id || '',
        })),
      })
      dispatch({
        type: 'setTotal',
        payload: response.price.length,
      })
    }
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
  }, [response, loading, error])

  const handleMenuClick = async (e) => {
    const isUpdated = await editStatus(state.statusClickedId, { status: e.key })
    console.log('aaasda', isUpdated)

    if (isUpdated) {
      dispatch({
        type: 'updateClickedProdStatus',
        payload: e.key,
      })
    }
    dispatch({
      type: 'clearStatusClickedId',
    })
  }

  const handleApproveMenuClick = async (e) => {
    const isUpdated = await editStatus(state.statusClickedId, { approveStatus: e.key })
    if (isUpdated) {
      dispatch({
        type: 'updateClickedApprStatus',
        payload: e.key,
      })
    }
    dispatch({
      type: 'clearStatusClickedId',
    })
  }

  const onDelete = async (ids) => {
    const isUpdated = await deleteProductPriceByAdmin(ids)
    if (isUpdated) {
      const data = []
      response.price.forEach((e) => {
        if (e._id !== ids) {
          data.push({
            ...e,
            name: e?.productId?.name || '',
            productId: e?.productId?._id || '',
          })
        }
      })
      dispatch({
        type: 'setData',
        payload: data,
      })
      dispatch({
        type: 'setTotal',
        payload: response.price.length,
      })
    }
    dispatch({
      type: 'clearStatusClickedId',
    })
  }
  const menu = <Menu items={menuItems} onClick={handleMenuClick} />
  const approveMenu = <Menu items={menuItems2} onClick={handleApproveMenuClick} />

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  const setRowKey = (record) => {
    // console.log(record)
    return record._id
  }

  const handleStatusClick = React.useCallback((ids) => {
    dispatch({
      type: 'setStatusClickedId',
      payload: ids,
    })
  }, [])

  const handleTableChange = ({ pagination: param, sorters: sortParams, filters }) => {
    console.log('list handleTableChange params', param, sortParams, filters)
    dispatch({
      type: 'setCurrentPage',
      payload: param.current,
    })
    dispatch({
      type: 'setPageSize',
      payload: param.pageSize,
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

  // const handleItemsChange = a => {
  //   dispatch({
  //     type: 'setPageSize',
  //     payload: Number(a),
  //   })
  // }

  const deleteRecords = (rowKeys) => {
    console.log('will delete ok', rowKeys)
  }

  const pagination = {
    current: state.current,
    pageSize: state.pageSize,
    total: state.total,
  }

  const columns = [
    {
      title: 'Merchant Id',
      dataIndex: 'merchantId',
      key: 'merchantId',
      render: (text) => `${text}`,
    },
    {
      title: 'Merchant Name',
      dataIndex: 'merchantName',
      key: 'merchantName',
    },
    // {
    //   title: 'Product Name',
    //   dataIndex: 'name',
    //   key: 'name',
    // },

    {
      title: 'Price',
      dataIndex: 'salePrice',
      key: 'price',
      render: (_, record) => {
        return (
          <ul style={{ padding: 0 }}>
            <li>List Price ₹{record.listPrice}</li>
            <li>Sale price ₹{record.salePrice}</li>
          </ul>
        )
      },
    },

    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Sale Commision',
      dataIndex: 'saleCommision',
      key: 'saleCommision',
    },
    {
      title: 'Approve Status',
      dataIndex: 'approveStatus',
      key: 'approveStatus',
      render: (text, record) => {
        let badge = 'badge-success'
        if (record.approveStatus === 'pending') badge = 'badge-danger'
        return (
          <Dropdown
            // visible={this.state.clickedId === record._id}
            overlay={approveMenu}
            // ref={this.clickId}
            id={record._id}
            onClick={() => handleStatusClick(record._id)}
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
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Approve',
          value: 'approve',
        },
        {
          label: 'Reject',
          value: 'reject',
        },
      ],
    },

    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (text, record) => {
    //     let badge = 'badge-success'
    //     if (record.status === 'hold') badge = 'badge-danger'
    //     return (
    //       <span className={`font-size-12 badge ${badge} 'badgeText'`}>{text.toUpperCase()}</span>
    //     )
    //   },
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (record) => (
    //     <span>
    //       <Link to={`/localisation/countries/edit/${record._id}`}>
    //         <Button icon="eye" size="small" className="mr-1" />
    //       </Link>
    //     </span>
    //   ),
    // },
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
            // ref={this.clickId}
            id={record._id}
            onClick={() => handleStatusClick(record._id)}
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
      // eslint-disable-next-line no-unused-vars
      render: (record) => (
        <span>
          <Button
            onClick={() => {
              onDelete(record._id)
            }}
            icon="close"
            className="mr-1"
            size="small"
          />
        </span>
      ),
    },
  ]

  return (
    <div>
      <Helmet title="Price List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Price List</strong>
          </div>
        </div>
        <div className="card-body">
          <Table
            loading={loading}
            scroll={scrollStyle}
            pagination={pagination}
            currentPage={pagination.current}
            limit={pagination.pageSize}
            total={pagination.total}
            limits={itemsPerPageOptions}
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={state.data}
            rowKey={setRowKey}
            onChange={handleTableChange}
            onDelete={deleteRecords}
          />
        </div>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(Products)
