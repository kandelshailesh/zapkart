/* eslint-disable no-underscore-dangle */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Table, Icon, Dropdown, notification, Menu, Button, Popconfirm } from 'antd'
import './index.css'

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
// eslint-disable-next-line import/no-extraneous-dependencies
import arrayMove from 'array-move'
import { editUser } from 'services/user'
import { STRINGS, CATALOG_API_URL } from '_constants'
import useFetching from 'hooks/useFetching'
import { Link } from 'react-router-dom'
import { deleteData } from 'services'
// import SearchAndFilters from 'components/SearchAndFilters'
// import data from './data.json'

const menuItems = [
  {
    key: 0,
    title: 'Active',
    index: 'active',
    badge: 'badge-success',
  },
  {
    key: 0,
    index: 'hold',
    title: 'Disabled',
    badge: 'badge-danger',
  },
]

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const SortableTable = () => {
  const [dataSource, setDataSource] = useState([])

  const [{ response, loading }] = useFetching(`/api/catalog/v1/widget/query?status=active`)

  useEffect(() => {
    if (response?.data) {
      const dt = response?.data?.map((i, ind) => ({
        index: ind,
        key: i._id,
        title: i.title,
        diplayOrder: i.diplayOrder,
        status: i.status,
        // _id: i._id,
      }))
      setDataSource(dt)
    }
  }, [response])

  const DragHandle = sortableHandle(() => (
    <Icon type="menu" style={{ cursor: 'pointer', color: '#999' }} />
  ))

  const columns = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 100,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: 'title',
      dataIndex: 'title',
      // key: 'title',
      className: 'drag-visible',
    },
    {
      title: 'Diplay Order',
      dataIndex: 'diplayOrder',
      // key: 'diplayOrder',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      // key: 'status',
      render: (text, record) => {
        const item = menuItems.find((i) => i.index === record.status)
        return (
          <Dropdown
            // eslint-disable-next-line react/destructuring-assignment
            // visible={this.state.clickedId === record._id}
            overlay={menu}
            ref={clickId}
            id={record._id}
            onClick={handleIdClick(record._id)}
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
      // key: 'action',
      render: (_, record) => (
        <span>
          <Link to={`/widgets/add-edit/${record.key}`}>
            <Button icon="edit" className="mr-1" size="small" />
          </Link>
          <Popconfirm title="Sure to delete?" onConfirm={handleDeleteUser(record.key)}>
            <Button icon="close" size="small" />
          </Popconfirm>
        </span>
      ),
    },
  ]

  const handleStatusChange = async (e) => {
    console.log(clickId.current)
    const res = await editUser({ active: parseInt(e.key, 10) }, clickId.current)
    console.log('USER EDIT', res)
    if (res && res.success) {
      notification.success({
        message: STRINGS.editSuccess,
      })
    }

    clickId.current = null
  }

  const menu = <Menu items={menuItems} onClick={handleStatusChange} />
  const clickId = useRef(null)

  const handleIdClick = (id) => {
    return () => {
      clickId.current = id
    }
  }

  const handleDeleteUser = (id) => {
    return async () => {
      const URL = CATALOG_API_URL.widget
      const isDeleted = await deleteData(`${URL}/${id}`)
      if (isDeleted) {
        setDataSource(dataSource.filter((i) => i.key !== id))
      }
    }
  }

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log('hhe', oldIndex, newIndex)
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter((el) => !!el)
      console.log('Sorted items: ', newData)
      setDataSource(newData)
    } else setDataSource(dataSource)
  }

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key'])
    return <SortableItem index={index} {...restProps} />
  }

  const DraggableContainer = (props) => {
    return (
      <SortableContainer
        useDragHandle
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
        {...props}
      />
    )
  }
  const setRowKey = useCallback((record) => {
    // console.log(record)
    return record._id
  })

  return (
    <>
      {/* <SearchAndFilters
        attributes={columns}
        // onSubmit={handlefiltersSearch}
        // onCancel={handleClearFilters}
        loading={loading}
      /> */}
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey={setRowKey}
        loading={loading}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </>
  )
}

export default SortableTable
