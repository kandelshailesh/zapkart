/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react'
import {
  Button,
  Popconfirm, // Select, Icon, Dropdown
} from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
// import Menu from 'components/Menu'
import AddNew from 'components/CustomComponents/AddNew'
import useFetching from 'hooks/useFetching'
// import useDidMountEffect from 'hooks/useDidMountEffect'
import { editCoupens } from 'services/coupens'
import { LINKS } from '_constants'
import moment from 'moment'
import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
import Table from 'components/Table'

const limits = [10, 20, 50, 100]

const currentPage = '0'

// const menuItems = [
//   {
//     key: 'active',
//     title: 'Active',
//   },
//   {
//     key: 'hold',
//     title: 'Hold',
//   },
// ]

const CoupenList = props => {
  console.log(props)
  // const { history } = props
  // const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // const [itemsPerPage, setItemsPerPage] = useState(2)

  const [refresh, setRefresh] = useState(false)
  const [pagination, setPagination] = useState({ current: currentPage, pageSize: limits[0] })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortQuery, setSortQuery] = useState('')
  // const [statusClickedId, setStatusClickedId] = useState('')

  const [coupens, setCoupens] = useState([])
  // const [loading, setLoading] = useState(false)
  const [{ response, loading: loadingFetch }] = useFetching(
    `/api/backend/v1/coupen` +
      `?page=${pagination.current}&limit=${pagination.pageSize}` +
      `${!isEmpty(searchQuery) ? `&${searchQuery}` : ''}` +
      `${!isEmpty(sortQuery) ? `&${sortQuery}` : ''}`,
    {},
    refresh,
  )

  // const handleMenuClick = async e => {
  //   console.log('clicked on', e.key)
  // }
  // const menu = <Menu items={menuItems} onClick={handleMenuClick} />

  useEffect(() => {
    if (response) {
      console.log(response)
      setCoupens(response.data)
      setPagination(prev => ({ ...prev, total: response.count }))
    }
  }, [response])

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  const setRowKey = useCallback(record => {
    console.log('gggggg55', record)
    return record.id
  })

  // const handleStatusClick = React.useCallback(id => {
  //   setStatusClickedId(id)
  // }, [])

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

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // }

  const handleDelete = async id => {
    const isDeleted = await editCoupens(id, { deleted: 1 })
    if (isDeleted) {
      setRefresh(true)
    }
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
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => `${record.name}`,
      sorter: {
        multiple: 1,
      },
      search: true,
    },
    {
      title: 'Coupon Code',
      dataIndex: 'coupenCode',
      key: 'coupenCode',
      render: (text, record) => `${record.coupenCode}`,
      sorter: {
        multiple: 1,
      },
      search: true,
    },
    {
      title: 'From date',
      dataIndex: 'validFrom',
      key: 'validFrom',
      sorter: {
        multiple: 4,
      },
      render: text => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: 'To date',
      dataIndex: 'validTo',
      key: 'validTo',
      sorter: {
        multiple: 4,
      },
      render: text => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <span>
          <Link to={`/coupon/edit/${record.id}`}>
            <Button
              icon="edit"
              className="mr-1"
              size="small"
              onClick={() => setRefresh(prev => !prev)}
            />
          </Link>
          {record.id >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button icon="close" size="small" />
            </Popconfirm>
          ) : null}
        </span>
      ),
    },
  ]

  // if (error) {
  //   notification.error({ error: 'Error!', message: error.message })
  //   // history.goBack();
  //   // return '';
  // }
  console.log('777', coupens.rows)
  return (
    <div>
      <Helmet title="Coupon List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Coupon List</strong>
            <AddNew add attribute="coupen" link={LINKS.addCoupens} />
          </div>
        </div>
        <div className="card-body">
          <Table
            className="utils__scrollTable"
            loading={loadingFetch}
            currentPage="0"
            limits={limits}
            initialLimit={limits[0]}
            // onLimitChange={handleItemsChange}
            // scroll={scrollStyle}
            // pagination={pagination}
            // rowSelection={rowSelection}
            columns={columns}
            dataSource={coupens.rows}
            rowKey={setRowKey}
            onChange={handleTableChange}
          />
        </div>
        {/* )} */}
      </div>
    </div>
  )
}

export default CoupenList
