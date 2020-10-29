/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react'
import { Button, Icon, notification, Dropdown, Popconfirm } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Menu from 'components/Menu'
import Table from 'components/Table'
import AddNew from 'components/CustomComponents/AddNew'
import useFetching from 'hooks/useFetching'
import { CATALOG_API_URL, LINKS } from '_constants'
import isEmpty from 'lodash/isEmpty'
// import Upload from 'components/Upload'
// import { excelUploadSchema } from 'utils/Schema'
// import Form from 'components/Form'
import { connect } from 'react-redux'
import { deleteData, editData } from 'services'
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

const Products = () => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(2);
  const [state, dispatch] = useReducer(reducer, initialState)

  const [{ response, loading, error }] = useFetching(
    `${CATALOG_API_URL.medicinetypes}/query?page=${state.current}&limit=${state.pageSize}`,
  )

  const handleMenuClick = async (e) => {
    // refetch
    // console.log('clicked on', e.key, clickedId)
    const isUpdated = await editData(
      `${CATALOG_API_URL.medicinetypes}/${state.statusClickedId}`,
      { status: e.key },
      'json',
    )
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
  const menu = <Menu items={menuItems} onClick={handleMenuClick} />

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

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  const handleDelete = async (id) => {
    // use refetch in usefetching
    const isDeleted = await deleteData(`${CATALOG_API_URL.medicinetypes}/${id}`)
    if (isDeleted) {
      dispatch({
        type: 'deleteProduct',
        payload: id,
      })
    }
  }

  const setRowKey = (record) => {
    // console.log(record)
    return record._id
  }

  const handleStatusClick = React.useCallback((id) => {
    dispatch({
      type: 'setStatusClickedId',
      payload: id,
    })
  }, [])

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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // sorter: (a, b) => a.name.localeCompare(b.name),
      sorter: true,
      multiple: 1,
      render: (text, record) => (
        <Link className="utils__link--underlined" to={`${LINKS.medicinetype}/${record._id}`}>
          {text}
        </Link>
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
            overlay={menu}
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
      render: (record) => (
        <span>
          <Link to={`${LINKS.editmedicinetype}/${record._id}`}>
            <Button icon="edit" className="mr-1" size="small" />
          </Link>
          {state.products.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
          ) : null}
        </span>
      ),
    },
  ]

  return (
    <div>
      <Helmet title="Medicine Type List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Medicine Type List</strong>
            <AddNew add attribute="Medicine Type" link={`${LINKS.medicinetype}/create`} />
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
            dataSource={state.products}
            rowKey={setRowKey}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(Products)
