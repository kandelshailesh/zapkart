/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Table, Icon } from 'antd'
import './index.css'

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move'

const SortableItem = sortableElement((props) => <tr {...props} />)
const SortableContainer = sortableContainer((props) => <tbody {...props} />)

const SortableTable = ({ data, columns, sortedItems }) => {
  const [dataSource, setDataSource] = useState([])
  const [dataColumn, setdataColumn] = useState([])

  useMemo(() => {
    if (data.length > 0) {
      const newData = []
      data.forEach((element, index) => {
        newData.push({ ...element, index })
      })
      setDataSource(newData)
      console.log('this is new', newData)
    }
  }, [data])

  useEffect(() => {
    sortedItems(dataSource)
  }, [dataSource])

  const DragHandle = sortableHandle(() => (
    <Icon type="menu" style={{ cursor: 'pointer', color: '#999' }} />
  ))

  useMemo(() => {
    if (columns.length > 0) {
      const newData = [
        {
          title: 'Sort',
          dataIndex: 'sort',
          width: 100,
          className: 'drag-visible',
          render: () => <DragHandle />,
        },
        ...columns,
      ]

      setdataColumn(newData)
    }
  }, [columns])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter((el) => !!el)
      setDataSource(newData)
    }
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
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={dataColumn}
        rowKey={setRowKey}
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
