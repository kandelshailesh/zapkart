/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Icon, Button, Modal, InputNumber, Input, Select } from 'antd'
import DescriptionList from 'components/DescriptionList'
import PlaceholderImage from 'components/PlaceholderImage'
import CardWrapper from 'components/CardWrapper'
import { getMerchants } from 'services/merchants'
import OrderItemForm from './OrderItemForm'

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false,
  }

  handleChange = e => {
    // const value = e.target.value
    this.setState({ value: e })
  }

  check = async () => {
    this.setState({ editable: false })
    if (this.props.onChange) {
      const changed = await this.props.onChange(this.state.value)
      console.log(' check change', changed)
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
                {options.map(i => (
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
@connect(({ user }) => ({ user }))
class EditableTable extends React.Component {
  constructor(props) {
    super(props)
    const { user } = this.props
    console.log('77www', user)
    this.columns = [
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
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        render: (text, record) => {
          if (record.shipmentStatus === 'pending' || !record.shipmentStatus)
            return (
              <EditableCell
                type="number"
                value={text}
                onChange={this.onCellChange(record.id, 'quantity')}
                min={record.minOrderQty || 0}
                max={record.maxOrderQty || undefined}
              />
            )
          return text
        },
      },
      {
        title: 'Total',
        dataIndex: 'subtotal',
        render: text => <span>₹{text}</span>,
      },
      {
        title: 'Shipment status',
        dataIndex: 'shipmentStatus',
        render: text => <span className="text-capitalize">{text}</span>,
      },
      {
        title: 'Assigned Merchant & Status',
        dataIndex: 'assignedMerchant',
        render: (_, record) => {
          console.log('AAA', this.state.merchants)
          let options = ''
          options =
            user.userTypeId !== 3
              ? this.state.merchants.map(i => ({ value: i.id, name: i.name }))
              : []
          options.push({ value: 'none', name: 'Reject' })

          return (
            <EditableCell
              value={record.assignedMerchant || ''}
              type="select"
              options={options}
              onChange={this.onCellChange(record.id, 'merchantId')}
            />

            // <div className="text-capitalize">
            //   {record.assignedMerchant || ''}
            //   <span>&nbsp;-&nbsp;{record.assignedMerchantStatus || ''}</span>
            // </div>
          )
        },
      },

      // {
      //   title: 'Action',
      //   dataIndex: 'operation',
      //   render: (text, record) => {
      //     return this.state.dataSource.length > 1 ? (
      //       <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
      //         <a href="#">Delete</a>
      //       </Popconfirm>
      //     ) : null
      //   },
      // },
    ]

    this.state = {
      dataSource: this.props.data,
      merchants: [],
      // count: this.props.data && this.props.data.length ? this.props.data.length : 0,
    }
  }

  fetchData = async () => {
    const res = await getMerchants()
    if (res && res.data)
      this.setState({
        merchants: res.data,
      })

    console.log('BBB data', res.data)
  }

  componentDidMount = () => {
    this.fetchData()
  }

  // closure
  onCellChange = (key, dataIndex) => {
    console.log('hi', key)
    const { onEditCell } = this.props
    const dataSource = [...this.state.dataSource]
    return async value => {
      console.log(key)
      const targetIndex = dataSource.findIndex(item => {
        console.log(item)
        return item.id === key
      })
      // const origIndex = data.findIndex((item) => item.id === key)
      if (targetIndex > -1) {
        const edited = await onEditCell({
          value,
          key: dataIndex,
          id: dataSource[targetIndex].id,
        })
        console.log('onCellChange res', edited)
        if (!edited) {
          return false
          // dataSource[targetIndex][dataIndex] = data[origIndex][dataIndex]
        }
        return true
      }
      return false
      // const dataSource = [...this.state.dataSource]
      // const target = dataSource.find((item) => item.key === key)
      // if (target) {
      //   target[dataIndex] = value
      //   this.setState({ dataSource })
      // }
    }
  }

  onDelete = key => {
    console.log('delete', key)
    // const { dataSource: a } = this.state
    // const dataSource = [...a]
    // this.setState({ dataSource: dataSource.filter((item) => item.key !== key) })
  }

  handleAdd = () => {
    console.log('add')
    this.setState({
      isModalOpen: true,
    })
    // const { count, dataSource } = this.state
    // const newData = {
    //   key: count,
    //   name: `Edward King ${count}`,
    //   age: 32,
    //   address: `London, Park Lane no. ${count}`,
    // }
    // this.setState({
    //   dataSource: [...dataSource, newData],
    //   count: count + 1,
    // })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  onSubmitOrderItemForm = values => {
    const { onAdd } = this.props
    if (onAdd) onAdd(values)
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { dataSource, isModalOpen } = this.state
    const { orderId, summary } = this.props

    const columns = this.columns
    return (
      <>
        <Modal
          visible={isModalOpen}
          title={`Add new product item for ${orderId}`}
          destroyOnClose
          onCancel={this.closeModal}
          footer={null}
        >
          <OrderItemForm onSubmit={this.onSubmitOrderItemForm} onCancel={this.closeModal} />
        </Modal>
        <CardWrapper className="order-items-table" title="Edit Order Item">
          <Button className="editable-add-btn" onClick={this.handleAdd}>
            Add
          </Button>
          <Table
            bordered
            scroll={{ x: '100%' }}
            dataSource={this.props.data}
            columns={columns}
            rowKey={record => record.id}
          />
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
}

export default EditableTable
