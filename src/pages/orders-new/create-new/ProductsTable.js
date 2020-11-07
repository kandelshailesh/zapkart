/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Table, Icon, InputNumber, Input, Select, Popconfirm, Button } from 'antd'
import DescriptionList from 'components/DescriptionList'
import PlaceholderImage from 'components/PlaceholderImage'
import CardWrapper from 'components/CardWrapper'
import { deleteData } from 'services'
import { CATALOG_API_URL } from '_constants'

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false,
  }

  handleChange = (e) => {
    // const value = e.target.value
    this.setState({ value: e })
  }

  check = async () => {
    this.setState({ editable: false })
    if (this.props.onChange) {
      const changed = await this.props.onChange(this.state.value)
      if (!changed) this.setState({ value: this.props.value })
    }
  }

  edit = () => {
    this.setState({ editable: true })
  }

  render() {
    const { value, editable } = this.state
    const { min, max, type, options } = this.props
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            {type === 'number' && (
              <InputNumber
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                width="50"
                min={min}
                max={max}
              />
            )}
            {type === 'text' && (
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                width="50"
              />
            )}
            {type === 'select' && (
              <Select
                style={{ width: '100%' }}
                value={value}
                onChange={this.handleChange}
                classname="text-capitaize"
              >
                {options.map((i) => (
                  <Select.Option key={i.value} value={i.value}>
                    {i.name}
                  </Select.Option>
                ))}
              </Select>
            )}
            <Icon type="check" className="editable-cell-icon-check" onClick={this.check} />
          </div>
        ) : (
          <div className="editable-cell-text-wrapper">
            <span className="mr-2">{value || ' '}</span>
            <Icon type="edit" className="editable-cell-icon" onClick={this.edit} />
          </div>
        )}
      </div>
    )
  }
}
const EditableTable = ({ data, summary, onEditCell, onDelete }) => {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setDataSource(data)
  }, [data])

  const columns = [
    // sku, title, price, qty, total, delete
    {
      title: 'SKU',
      dataIndex: 'sku',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'images',
      render: (_, record) => (
        <div className="thumbnail-area">
          <PlaceholderImage src={record.image} alt={record.title} />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text, record) => (
        <div>
          <del>₹{record?.price?.listPrice}</del>
          <br />
          <span>₹{record?.price?.salePrice}</span>
        </div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (text, record) => {
        return (
          <EditableCell
            type="number"
            value={text}
            onChange={onCellChange(record.id, 'quantity')}
            min={record.minOrderQty || 0}
            max={record.maxOrderQty || undefined}
          />
        )
      },
    },
    {
      title: 'Total',
      dataIndex: 'subtotal',
      render: (text) => <span>₹{text}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) =>
        record.cartId && (
          <span>
            <Popconfirm title="Sure to delete?" onConfirm={() => onRemove(record.cartId)}>
              <Button icon="close" size="small" />
            </Popconfirm>
          </span>
        ),
    },
  ]

  const onRemove = async (id) => {
    const deleted = await deleteData(`${CATALOG_API_URL.deleteCart}/${id}`)
    if (deleted) {
      setDataSource((prev) => prev.filter((i) => i.cartId !== id))
      if (onDelete) onDelete(id)
    }
  }

  // closure
  const onCellChange = (key, dataIndex) => {
    return async (value) => {
      const targetIndex = dataSource?.findIndex((item) => {
        console.log(item)
        return item.id === key
      })

      if (targetIndex > -1) {
        const edited = await onEditCell({
          value,
          key: dataIndex,
          id: dataSource[targetIndex].id,
        })
        // console.log(edited)
        if (!edited) {
          return false
        }
        // dataSource[targetIndex][dataIndex] = data[targetIndex][dataIndex]
        return true
      }
      return false
    }
  }

  return (
    <>
      <CardWrapper className="order-items-table" title="Edit Order Item">
        {dataSource && (
          <Table
            bordered
            scroll={{ x: '100%' }}
            dataSource={dataSource.length > 0 ? dataSource : []}
            columns={columns}
            rowKey={(record) => record.id}
          />
        )}
        {summary && (
          <div className="border-top d-flex pr-4 pt-4">
            <DescriptionList
              className="ml-auto"
              data={summary}
              rowClassName="white-space-no-wrap"
            />
          </div>
        )}
      </CardWrapper>
    </>
  )
}

export default connect(({ user }) => ({ user }))(EditableTable)
