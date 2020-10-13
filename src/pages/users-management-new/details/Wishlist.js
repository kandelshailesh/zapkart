/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Popconfirm } from 'antd'
import { Helmet } from 'react-helmet'
import AddNew from 'components/CustomComponents/AddNew'
import useFetching from 'hooks/useFetching'
import { LINKS } from '_constants'
import moment from 'moment'
import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
import Table from 'components/Table'

const limits = [10, 20, 50, 100]

const UserWishlist = props => {
  console.log(props)
  // const { history } = props
  const [refresh, setRefresh] = useState(1)
  // const [itemsPerPage, setItemsPerPage] = useState(2)

  const [pagination, setPagination] = useState({ current: 1, pageSize: limits[0] })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortQuery, setSortQuery] = useState('')

  const [products, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [{ response, loading: loadingFetch }] = useFetching(
    `/api/backend/v1/users/all` +
      `?page=${pagination.current}&limit=${pagination.pageSize}` +
      `${!isEmpty(searchQuery) ? `&${searchQuery}` : ''}` +
      `${!isEmpty(sortQuery) ? `&${sortQuery}` : ''}`,
    {},
    refresh,
  )

  useEffect(() => {
    setLoading(loadingFetch)
  }, [loadingFetch])

  console.log(products)

  useEffect(() => {
    if (response) {
      console.log(response)
      setUsers(response.users)
      setPagination(prev => ({ ...prev, total: response.total }))
    }
  }, [response])

  const setRowKey = useCallback(record => {
    // console.log(record)
    return record.id
  })

  const handleTableChange = ({ pagination: params, sorters: sortParams, filters }) => {
    console.log('list handleTableChange params', params, sortParams, filters)
    const pager = { ...pagination }
    pager.current = params.current
    pager.pageSize = params.pageSize
    setPagination(pager)
    if (!isEmpty(sortParams)) {
      const sortObj = {
        sort: {
          [sortParams.field]: sortParams.order === 'descend' ? 'desc' : 'asc',
        },
      }
      setSortQuery(qs.stringify(sortObj))
    }

    setSearchQuery(qs.stringify({ search: filters.search }))
  }

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
    {
      title: 'Orders placed',
      dataIndex: 'orders',
      key: 'orders',
      render: () => '0',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <span>
          <Button
            icon="edit"
            className="mr-1"
            size="small"
            onClick={() => setRefresh(prev => !prev)}
          />
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
            <AddNew
              add
              // selectedRowKeys={selectedRowKeys}
              // handleDelete={handleDelete}
              attribute="product"
              link={LINKS.addProduct}
            />
          </div>
        </div>
        <div className="card-body">
          <Table
            className="utils__scrollTable"
            loading={loading}
            limits={limits}
            initialLimit={limits[0]}
            // onLimitChange={handleItemsChange}
            // scroll={scrollStyle}
            // pagination={pagination}
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={products}
            rowKey={setRowKey}
            onChange={handleTableChange}
          />
        </div>
        {/* )} */}
      </div>
    </div>
  )
}

export default UserWishlist
