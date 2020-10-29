/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState } from 'react'
import { Table, Button, Popconfirm } from 'antd'
import { deleteData } from 'services'
import { CATALOG_API_URL } from '_constants'
// import { Link } from 'react-router-dom'

const OrdersList = ({ dataSource, loading, onEditTab }) => {
  const [initavals, setinitavals] = useState([])
  useMemo(() => {
    if (dataSource) {
      setinitavals(dataSource)
    }
  }, [dataSource])

  const openEditTab = (id) => {
    if (onEditTab) onEditTab(id)
  }

  const handleDeleteTab = (id) => {
    const URL = CATALOG_API_URL.widgetTab
    return async () => {
      const isDeleted = await deleteData(`${URL}/${id}`)
      if (isDeleted) {
        setinitavals(initavals.filter((i) => i._id !== id))
      }
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Number Of Items',
      dataIndex: 'numberOfItems',
      key: 'numberOfItems',
    },
    {
      title: 'Listing Type',
      dataIndex: 'listingType',
      key: 'listingType',
    },
    {
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line no-unused-vars
      render: (_text, _record) => (
        <>
          <Button
            icon="edit"
            className="mr-1"
            size="small"
            onClick={() => {
              openEditTab({ id: _record._id, title: _record.title })
            }}
          />
          <Popconfirm title="Sure to delete?" onConfirm={handleDeleteTab(_record._id)}>
            <Button icon="close" size="small" />
          </Popconfirm>
        </>
      ),
    },
  ]

  return (
    <Table
      className="utils__scrollTable"
      columns={columns}
      dataSource={initavals}
      loading={loading}
    />
  )
}

export default OrdersList
