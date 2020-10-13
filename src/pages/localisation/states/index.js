/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react'
import { Button, Popconfirm, Icon, Dropdown, notification, Table } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Menu from 'components/Menu'
import AddNew from 'components/CustomComponents/AddNew'
import useFetching from 'hooks/useFetching'
import { editData, deleteData } from 'services'
import { CATALOG_API_URL } from '_constants'
import { isEmpty } from 'lodash'
import { reducer, initialState } from './reducer'

const URL = CATALOG_API_URL.state

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

const StatesList = () => {
  // const { history } = props
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(2);

  const [state, dispatch] = useReducer(reducer, initialState)

  const [{ response, loading, error }] = useFetching(`${URL}`)

  const handleMenuClick = async (e) => {
    if (state.statusClickedId) {
      const res = await editData(
        `${URL}/${state.statusClickedId}`,
        {
          status: e.key,
        },
        'json',
      )
      if (res?.success) {
        dispatch({
          type: 'updateClickedProdStatus',
          payload: e.key,
        })
      }
      dispatch({
        type: 'clearStatusClickedId',
      })
    }
  }
  const menu = <Menu items={menuItems} onClick={handleMenuClick} />

  useEffect(() => {
    if (response && response.data) {
      dispatch({
        type: 'setData',
        payload: response.data,
      })
      dispatch({
        type: 'setTotal',
        payload: response.total,
      })
    }
    if (error) {
      dispatch({
        type: 'clearData',
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
      dispatch({
        type: 'setSorters',
        payload: {
          [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
        },
      })
    }

    dispatch({
      type: 'setSearchers',
      payload: filters.search,
    })
    // setSearchQuery(qs.stringify({ search: filters.search }))
  }

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  const handleDelete = (id) => {
    return async () => {
      const isDeleted = await deleteData(`${URL}/${id}`)
      if (isDeleted) {
        dispatch({
          type: 'deleteItem',
          payload: id,
        })
      }
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

  const columns = [
    {
      title: '#',
      dataIndex: '_id',
      key: '_id',
      render: (text, record, index) => `#${index + 1}`,
    },
    {
      title: 'Name',
      dataIndex: 'state',
      key: 'state',
      search: true,
      sorter: (a, b) => a.state - b.state,
      render: (text, record) => {
        return `${record.state}`
      },
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      search: true,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => {
        return `${record.country.country}`
      },
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
      // filters: [
      //   {
      //     label: 'Active',
      //     value: 'active',
      //   },
      //   {
      //     label: 'Hold',
      //     value: 'hold',
      //   },
      // ],
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <span>
          <Link to={`/localisation/state/edit/${record._id}`}>
            <Button icon="edit" className="mr-1" size="small" />
          </Link>
          {state.data.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={handleDelete(record._id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
          ) : null}
        </span>
      ),
    },
  ]

  return (
    <div>
      <Helmet title="States List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>States List</strong>
            <AddNew add attribute="Country" link="/localisation/state/add" />
          </div>
        </div>
        <div className="card-body">
          <Table
            onChange={handleTableChange}
            loading={loading}
            columns={columns}
            dataSource={state.data}
            rowKey={setRowKey}
          />
        </div>
      </div>
    </div>
  )
}

export default StatesList
