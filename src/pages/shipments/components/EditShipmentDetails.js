import React from 'react'
import CardWrapper from 'components/CardWrapper'
import DescriptionList from 'components/DescriptionList'
import { Table, Input, Divider, Button, Checkbox, DatePicker } from 'antd'
import Form from 'components/Form'

import Link from 'react-router-dom/Link'
import { editShipmentSchema } from 'utils/Schema'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import ShippingInfoForm from './ShippingInfoForm'

const formItemLayout = {
  labelCol: {
    sm: 7,
    md: 24,
    lg: 7,
  },
  wrapperCol: {
    sm: 17,
    md: 24,
    lg: 17,
  },
}

const formItemLayoutCond = {
  labelCol: {
    sm: 7,
    md: 24,
  },
  wrapperCol: {
    sm: 17,
    md: 24,
  },
}

const dispatchedInfoFI = [
  {
    type: <DatePicker placeholder="Select date" />,
    key: 'dispatchDate',
    label: 'Dispatched Date',
  },
  {
    type: <DatePicker placeholder="Select date" />,
    key: 'dispatchExpDeliveryDate',
    label: 'Expected Delivery Date',
  },
  { type: <Input.TextArea rows={3} />, key: 'dispatchStatusDetails', label: 'Details' },
]

const deliveredInfoFI = [
  { type: <DatePicker placeholder="Select date" />, key: 'deliveredDate', label: 'Delivered Date' },
  { type: <Input.TextArea rows={3} />, key: 'deliveredComment', label: 'Comment' },
]

const EditShipmentDetails = ({ data, onSubmit: onSubmitProp }) => {
  // const [isDispatch, toggleDispatch] = useState(data.dispatchDate && true)
  // const [isDelivered, togggleDelivered] = useState(data.deliveredDate && true)

  const initialValues = pick(data, [
    'dispatchExpDeliveryDate',
    'dispatchDate',
    'dispatchStatusDetails',
    'deliveredDate',
    'deliveredComment',
    'grossWeight',
    'otherLogisticPartner',
    'otherTrackingUrl',
    'packageDetails',
    'dropOffType',
    'comment',
    'trackingNumber',
    'shippingStatus',
  ])

  const columns = [
    {
      title: 'Merchant',
      dataIndex: 'merchant',
      render: (_, record) =>
        (record.order_item &&
          record.order_item.merchantassigned &&
          record.order_item.merchantassigned.name) ||
        '-',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      render: (_, record) =>
        (record.order_item && record.order_item.product && record.order_item.product.sku) || '-',
    },
    {
      title: 'Product',
      dataIndex: 'title',
      render: (_, record) =>
        (record.order_item && record.order_item.product && record.order_item.product.name) || '-',
    },

    {
      title: 'Shipping By',
      dataIndex: 'shippingBy',
      render: () => data.createdByType,
    },

    {
      title: 'Order ID',
      dataIndex: 'masterOrderId',
      render: () => (
        <Link
          title="orderID"
          to={`/order-management/orders/order/${data.masterOrderId}`}
          className="utils__link--underlined"
        >
          #{data.masterOrderId}
        </Link>
      ),
    },
    {
      title: 'Shipping Status',
      dataIndex: 'status',
      render: () => data.shippingStatus,
    },
  ]

  const handleSubmitForm = values => {
    if (!values.isDispatch)
      values = omit(values, ['dispatchExpDeliveryDate', 'dispatchDate', 'dispatchStatusDetails'])
    if (!data.isDelivered) values = omit(values, ['deliveredDate', 'deliveredComment'])
    if (onSubmitProp) onSubmitProp(values)
  }
  const toggleDispatch = setVal => {
    return e => {
      setVal(prev => ({ ...prev, isDispatch: e.target.checked }))
    }
  }

  const togggleDelivered = setVal => {
    return e => {
      setVal(prev => ({ ...prev, isDelivered: e.target.checked }))
    }
  }

  return (
    <CardWrapper title={`Edit Shipment #${data.id}`} className="shipment-details-edit">
      <Form.Provider
        initialValues={initialValues}
        schema={editShipmentSchema}
        onSubmit={handleSubmitForm}
      >
        <Form.Consumer>
          {({ onSubmit, setValues, values }) => (
            <>
              <div className="row shipment-details-row mb-4">
                <div className="col-md-6 border-right-md">
                  <div className="utils__title border-bottom pb-2 mb-3">Billing Adresss</div>
                  <DescriptionList
                    title="Billing Information"
                    data={data.masterOrder && data.masterOrder.billingAddress}
                  />
                </div>
                <div className="col-md-6 ">
                  <div className="utils__title border-bottom pb-2 mb-3">Shipping Address</div>
                  <DescriptionList
                    title="Shipping Information"
                    data={data.masterOrder && data.masterOrder.shippingAddress}
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="utils__title border-bottom pb-2 mb-4">Items in shipment</div>
                <Table
                  scroll={{ x: '100%' }}
                  dataSource={data.orderItems && data.orderItems}
                  columns={columns}
                  rowKey={record => record.id}
                />
              </div>
              <Divider />
              <div className="row border pt-4">
                <div className="col-md-6 border-right-md">
                  <ShippingInfoForm formItemLayout={formItemLayout} />
                </div>

                <div className="col-md-6">
                  <div className="row ">
                    <div className="col lg-6 shipment-edit-dispatched-info">
                      <div className="utils__title border-bottom pb-2 mb-3">
                        Dispatched Info
                        <span>
                          <Checkbox
                            value={values.isDispatch}
                            autoFocus
                            className="ml-2"
                            onChange={toggleDispatch(setValues)}
                          />
                        </span>
                      </div>
                      <div className={!values.isDispatch ? 'disabled-faded' : ''}>
                        <Form formItems={dispatchedInfoFI} formItemLayout={formItemLayoutCond} />
                      </div>
                    </div>
                    <div className="col-lg-6 shipment-edit-dispatched-info">
                      <div className="utils__title border-bottom pb-2 mb-3">
                        Delivered Info
                        <span>
                          <Checkbox
                            value={values.isDelivered}
                            autoFocus
                            className="ml-2"
                            onChange={togggleDelivered(setValues)}
                          />
                        </span>
                      </div>
                      <div className={!values.isDelivered ? 'disabled-faded' : ''}>
                        <Form formItems={deliveredInfoFI} formItemLayout={formItemLayoutCond} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button type="primary" onClick={onSubmit} className="mt-4">
                Edit Shipment
              </Button>
            </>
          )}
        </Form.Consumer>
      </Form.Provider>
    </CardWrapper>
  )
}

export default EditShipmentDetails
