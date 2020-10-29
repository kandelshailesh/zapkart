/* eslint-disable no-underscore-dangle */
import React, { useReducer, useEffect, useCallback, useRef } from 'react'
import { Button, Popconfirm, Dropdown, Icon, notification } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Menu from 'components/Menu'

import useFetching from 'hooks/useFetching'

import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
import Table from 'components/Table'
import { editUser } from 'services/user'
import { STRINGS } from '_constants'
import { reducer, initialState } from './reducer'

const limits = [10, 20, 50, 100]
const menuItems = [
  {
    key: 1,
    title: 'Active',
    badge: 'badge-success',
  },
  {
    key: 0,
    title: 'Disabled',
    badge: 'badge-danger',
  },
]

const UsersList = props => {
  console.log(props)
  // const { history } = props
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])

  // const [itemsPerPage, setItemsPerPage] = useState(2)
  const [state, dispatch] = useReducer(reducer, initialState)

  console.log('useReducer state', state)

  const { pagination, searchQuery, sortQuery, refresh, users } = state

  const [{ response, loading }] = useFetching(
    `/api/backend/v1/users/all?userTypeId=2` +
      `&page=${pagination.current}&limit=${pagination.pageSize}` +
      `${!isEmpty(searchQuery) ? `&${searchQuery}` : ''}` +
      `${!isEmpty(sortQuery) ? `&${sortQuery}` : ''}`,
    {},
    refresh,
  )

  const handleStatusChange = async e => {
    console.log(clickId.current)
    const res = await editUser({ active: parseInt(e.key, 10) }, clickId.current)
    console.log('USER EDIT', res)
    if (res && res.success) {
      notification.success({
        message: STRINGS.editSuccess,
      })
      dispatch({
        type: 'updateClickedStatus',
        payload: {
          id: clickId.current,
          value: e.key,
          key: 'active',
        },
      })
    }

    clickId.current = null
  }
  const handleIdClick = id => {
    return () => {
      clickId.current = id
    }
  }

  const menu = <Menu items={menuItems} onClick={handleStatusChange} />
  const clickId = useRef(null)

  useEffect(() => {
    console.log(response)
    if (response && response.users) {
      dispatch({
        type: 'setUsers',
        payload: response.users,
      })
      dispatch({
        type: 'setTotal',
        payload: response.total,
      })
    }
  }, [response])

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  const setRowKey = useCallback(record => {
    // console.log(record)
    return record.id
  })

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
      // const sortObj = {
      //   sort: {
      //     [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
      //   },
      // }
      // setSortQuery(qs.stringify(sortObj))
    }

    dispatch({
      type: 'setSearchers',
      payload: filters.search,
    })
    // setSearchQuery(qs.stringify({ search: filters.search }))
  }

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: text => `#${text}`,
      sorter: {
        multiple: 3,
      },
      search: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: {
        multiple: 2,
      },
      search: true,
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => `${record.firstName} ${record.lastName}`,
      sorter: {
        multiple: 1,
      },
      search: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      search: true,
    },
    {
      title: 'Registered date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: {
        multiple: 4,
      },
      render: text => moment(text).format('DD-MM-YYYY hh:mm a'),
    },
    // {
    //   title: 'Orders placed',
    //   dataIndex: 'orders',
    //   key: 'orders',
    //   render: () => '0',
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // sorter: (a, b) => a.status.length - b.status.length,
      render: (text, record) => {
        const item = menuItems.find(i => i.key === record.active)

        return (
          <Dropdown
            // eslint-disable-next-line react/destructuring-assignment
            // visible={this.state.clickedId === record._id}
            overlay={menu}
            ref={clickId}
            id={record.id}
            onClick={handleIdClick(record.id)}
            trigger={['click']}
          >
            <span className={`font-size-12 badge ${item ? item.badge : ''}`}>
              {item && item.title}
              <Icon type="down" />
            </span>
          </Dropdown>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Link to={`/users-management/list/${record.id}`}>
            <Button
              icon="eye"
              className="mr-1"
              size="small"
              onClick={() => dispatch({ type: 'refreshData' })}
            />
          </Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => console.log('will delete')}>
            <Button icon="close" size="small" />
          </Popconfirm>
        </span>
      ),
    },
  ]

  // if (error) {
  //   notification.error({ error: 'Error!', message: error.message })
  //   // history.goBack();
  //   // return '';
  // }

  return (
    <div>
      <Helmet title="Users List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Users List</strong>
            {/* <AddNew
              add
              // selectedRowKeys={selectedRowKeys}
              // handleDelete={handleDelete}
              attribute="product"
              link={LINKS.addProduct}
            /> */}
          </div>
        </div>
        <div className="card-body">
          <Table
            loading={loading}
            limits={limits}
            initialLimit={limits[0]}
            currentPage={pagination.current}
            limit={pagination.pageSize}
            total={pagination.total}
            // pagination={pagination}
            // onLimitChange={handleItemsChange}
            // scroll={scrollStyle}
            // pagination={pagination}
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={users}
            rowKey={setRowKey}
            onChange={handleTableChange}
          />
        </div>
        {/* )} */}
      </div>
    </div>
  )
}

export default UsersList
